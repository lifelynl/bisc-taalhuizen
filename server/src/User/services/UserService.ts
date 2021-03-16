import { Inject, Injectable } from '@nestjs/common'
import { isEmail } from 'class-validator'
import { Mailer, MailService } from 'src/Mail/MailService'
import { PasswordChangedMailTemplate } from 'src/Mail/Templates/PasswordChangedMailTemplate'
import { UserEntity } from '../entities/UserEntity'
import { OldUserRepository } from '../OldUserRepository'
import { PasswordHashingService } from './PasswordHashingService'

@Injectable()
export class UserService {
    public constructor(
        private userRepository: OldUserRepository,
        private passwordChangedMailTemplate: PasswordChangedMailTemplate,
        private passwordHashingService: PasswordHashingService,
        @Inject(MailService) private mailService: Mailer
    ) {}

    public async updateUserPassword(user: UserEntity, newPlainTextPassword: string) {
        // Sanity check
        if (!user.username || !isEmail(user.username)) {
            throw new Error(`Username value of User ${user.id} is not an emailaddress: "${user.username}"`)
        }

        const newPasswordHash = await this.passwordHashingService.hash(newPlainTextPassword)

        await this.userRepository.updateUserPassword(user.id, newPasswordHash)

        const subject = 'Your BiSC Taalhuizen password was changed'

        await this.mailService.send({
            html: this.passwordChangedMailTemplate.make({
                subject,
                name: user.username,
            }),
            subject,
            to: user.username,
        })
    }
}
