import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/modules/user/user.entity'
import { JwtPayload, UserWithCurrentEmployee } from './auth.interface'
import { HashingService } from '../utils/hashing.service'
import { wrap } from '@mikro-orm/core'
import { UserRepository } from '../user/user.repository'
import { LoginInput, LoginResponse, ResetPasswordInput } from './auth.type'
import { MailService } from '../utils/mail.service'
import { ConfigService } from '@nestjs/config'
import { Person } from '../person/person.entity'
import { Organization } from '../organization/organization.entity'
import { EmployeeRepository } from '../employee/employee.repository'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonRepository } from '../person/person.repository'

@Injectable()
export class AuthService {
    public constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly employeeRepository: EmployeeRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly personRepository: PersonRepository
    ) {}

    public async findUserWithCurrentEmployee(
        username: string,
        organizationSlug: string
    ): Promise<UserWithCurrentEmployee | null> {
        const user = await this.userRepository.findOneByUsernameAndOrganizationSlug(username, organizationSlug)
        if (!user) {
            return null
        }

        const organization = await this.organizationRepository.findOne({ slug: organizationSlug })
        if (!organization) {
            return null
        }

        const currentEmployee = await this.employeeRepository.getForUserAndOrganization(user.id, organization.id)
        if (!currentEmployee) {
            return null
        }

        return Object.assign(user, { currentEmployee, accessGroup: organization.type })
    }

    public async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.userRepository.findOneByUsername(username)

        if (!user?.password) {
            return null
        }

        if (await this.hashingService.compare(pass, user.password)) {
            // Although our graphql types don't define the user's password field, the official
            // guides remove it, which is why we are too
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user

            return result as User
        }

        return null
    }

    public async login(args: LoginInput): Promise<LoginResponse> {
        const user = await this.validateUser(args.username, args.password)
        if (!user) {
            throw new UnauthorizedException()
        }

        const person = await this.personRepository.getForUser(user.id)
        const employees = await this.employeeRepository.getAllForUserOrFail(user.id)
        const { accessToken, refreshToken } = await this.getNewAccessAndRefreshTokenForUser(user.id)

        return {
            id: user.id,
            username: user.username,
            locale: user.locale,
            accessToken,
            refreshToken,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            employees,
            person,
        }
    }

    public async resetPassword(input: ResetPasswordInput) {
        const user = await this.validateTokenOrThrow(input.username, input.token)

        user.passwordResetRequestedAt = null
        user.passwordResetToken = null
        user.password = await this.hashingService.hash(input.password)

        await this.userRepository.persistAndFlush(user)

        return wrap(user).toObject()
    }

    public async refreshAccessAndRefreshTokens(refreshToken: string) {
        let payload
        try {
            payload = this.jwtService.verify<JwtPayload>(refreshToken)
        } catch (e) {}
        if (!payload) {
            throw new UnauthorizedException()
        }

        const user = await this.userRepository.findOneByUsername(payload.username)
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException()
        }

        const isTokenValid = await this.hashingService.compare(refreshToken, user.refreshToken)
        if (!isTokenValid) {
            throw new UnauthorizedException()
        }

        return await this.getNewAccessAndRefreshTokenForUser(user.id)
    }

    private async getNewAccessAndRefreshTokenForUser(userId: string) {
        const user = await this.userRepository.findOneOrFail(userId)
        const payload: JwtPayload = {
            username: user.username,
            sub: user.id,
        }

        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '2h' })

        user.refreshToken = await this.hashingService.hash(refreshToken)

        await this.userRepository.persistAndFlush(user)

        return { accessToken, refreshToken }
    }

    private async validateTokenOrThrow(username: string, token: string) {
        const user = await this.userRepository.findOneByUsername(username)

        if (!user || !user.passwordResetToken || !user.passwordResetRequestedAt) {
            throw new UnauthorizedException()
        }

        const requestDate = new Date(user.passwordResetRequestedAt) // to prevent unintentional overwrite
        requestDate.setHours(requestDate.getHours() + 168)

        const expired = new Date() > requestDate
        if (expired) {
            throw new UnauthorizedException()
        }

        const isTokenValid = await this.hashingService.compare(token, user.passwordResetToken)
        if (!isTokenValid) {
            throw new UnauthorizedException()
        }

        return user
    }

    public async requestForgotPasswordMail(email: string) {
        const user = await this.userRepository.findOneByUsernameWithPerson(email)

        if (!user || !user.person) {
            return
        }

        const organizations = await this.organizationRepository.getAllForUser(user.id)
        if (!organizations) {
            return
        }

        const resetToken = await this.hashingService.randomBytes()
        user.passwordResetToken = await this.hashingService.hash(resetToken)
        user.passwordResetRequestedAt = new Date()

        await this.userRepository.persistAndFlush(user)

        await this.sendForgotPasswordMail(user, user.person, organizations, resetToken)
    }

    public async changePassword(user: User, oldPassword: string, newPassword: string) {
        const authenticatedUser = await this.validateUser(user.username, oldPassword)
        if (!authenticatedUser) {
            throw new UnauthorizedException()
        }

        user.passwordResetRequestedAt = null
        user.passwordResetToken = null
        user.password = await this.hashingService.hash(newPassword)

        await this.userRepository.persistAndFlush(user)

        return true
    }

    private async sendForgotPasswordMail(user: User, person: Person, organizations: Organization[], token: string) {
        const url = await this.getForgotPasswordUrl(user.username, token)

        await this.mailService.sendPasswordForgotMail({
            to: user.username,
            resetURL: url,
            name: person.givenName,
            organization: organizations.map(o => o.name).join(', '),
        })
    }

    private async getForgotPasswordUrl(email: string, token: string) {
        const base64Email = Buffer.from(email).toString('base64')
        const URIEncodedBase64Email = encodeURIComponent(base64Email)

        const base64Token = Buffer.from(token).toString('base64')
        const URIEncodedBase64Token = encodeURIComponent(base64Token)

        return `${this.configService.getOrThrow(
            'FRONT_URL'
        )}/auth/resetpassword/${URIEncodedBase64Email}/${URIEncodedBase64Token}`
    }
}
