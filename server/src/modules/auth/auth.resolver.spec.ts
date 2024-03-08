import { MailerService } from '@nestjs-modules/mailer'
import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { HashingService } from 'src/modules/utils/hashing.service'
import { EmployeeRepository } from '../employee/employee.repository'
import { mockDefaultUserFields, mockUser } from '../user/user.mock'
import { UserRepository } from '../user/user.repository'
import { MailService } from '../utils/mail.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonRepository } from '../person/person.repository'

describe(AuthResolver.name, () => {
    let authResolver: AuthResolver
    let hashingService: HashingService
    const findOne = jest.fn()
    const findOneOrFail = jest.fn()
    const findOneByUsername = jest.fn()
    const persistAndFlush = jest.fn()
    const constructor = jest.fn()
    const sendMail = jest.fn()
    const getForUser = jest.fn()

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                JwtModule.registerAsync({
                    useFactory: () => ({
                        secret: process.env.JWT_SECRET,
                        signOptions: { expiresIn: '30m' },
                    }),
                }),
            ],
            providers: [
                AuthResolver,
                AuthService,
                HashingService,
                ConfigService,
                MailService,
                { provide: PersonRepository, useValue: { getForUser } },
                { provide: OrganizationRepository, useValue: { getForEmployee: jest.fn().mockResolvedValue({}) } },
                { provide: MailerService, useValue: { constructor, sendMail } },
                { provide: EmployeeRepository, useValue: { getForUser, getAllForUserOrFail: getForUser } },
                {
                    provide: UserRepository,
                    useValue: {
                        findOne,
                        findOneOrFail,
                        findOneByUsername,
                        persistAndFlush,
                    },
                },
            ],
        }).compile()

        authResolver = module.get<AuthResolver>(AuthResolver)
        hashingService = module.get<HashingService>(HashingService)

        findOneByUsername.mockImplementation(async (username: string) => {
            const user = await mockUser(hashingService)

            if (username === user.username) {
                return user
            }

            return null
        })

        findOneOrFail.mockImplementation(async (id: string) => {
            return await mockUser(hashingService, { id })
        })
    })

    beforeEach(async () => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(authResolver).toBeDefined()
        expect(hashingService).toBeDefined()
    })

    describe('login', () => {
        it('should throw if user not found', async () => {
            const loginCall = authResolver.login({ username: 'invalid-username', password: 'kbj' })

            await expect(loginCall).rejects.toThrow(UnauthorizedException)
        })

        it('should return user if valid', async () => {
            const user = mockDefaultUserFields()
            getForUser.mockResolvedValueOnce([{ organizationId: 'some-id' }])
            const loginCall = authResolver.login({ username: user.username, password: user.password })

            await expect(loginCall).resolves.toMatchObject({
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
                username: user.username,
            })
        })
    })
})
