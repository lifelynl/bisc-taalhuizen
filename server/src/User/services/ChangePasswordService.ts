import { Inject } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { Mailer, MailService } from 'src/Mail/MailService'
import { AuthService } from '../AuthService'
import { UserEntity } from '../entities/UserEntity'
import { UserService } from './UserService'

@Injectable()
export class ChangePasswordService {
    public constructor(
        private authService: AuthService,
        private userService: UserService,
        @Inject(MailService) private mailService: Mailer
    ) {}

    public async changePassword(user: UserEntity, currentPlainTextPassword: string, newPlainTextPassword: string) {
        try {
            await this.authService.login(user.username, currentPlainTextPassword)
        } catch (e) {
            // TODO: Maybe return new BadRequestException({ errorCode: ErrorCode.InputValidation, validationErrors })
            return false
        }

        await this.userService.updateUserPassword(user, newPlainTextPassword)

        return true
    }
}
