import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
import { LoggerMailAdapter } from 'src/Mail/adapters/LoggerMailAdapter'
import { SmtpMailerAdapter } from 'src/Mail/adapters/SMTPMailAdapter'
import { MailService } from 'src/Mail/MailService'
import { ForgetPasswordMailTemplate } from 'src/Mail/Templates/ForgetPasswordMailTemplate'
import { PasswordChangedMailTemplate } from 'src/Mail/Templates/PasswordChangedMailTemplate'
import { UserRegisteredMailTemplate } from 'src/Mail/Templates/UserRegisteredMailTemplate'

@Module({
    providers: [
        ForgetPasswordMailTemplate,
        PasswordChangedMailTemplate,
        UserRegisteredMailTemplate,
        {
            provide: MailService,
            inject: [ConfigService],
            useFactory: (config: ConfigService<Config>) => {
                const mailType = config.get('MAIL')
                const defaultFromName = config.get('MAIL_FROM_NAME')
                const defaultFromEmail = config.get('MAIL_FROM_EMAIL')

                if (mailType === 'SMTP') {
                    return new SmtpMailerAdapter({
                        host: config.get('MAIL_SMTP_HOST'),
                        port: config.get('MAIL_SMTP_PORT'),
                        auth: {
                            username: config.get('MAIL_SMTP_AUTH_USERNAME'),
                            password: config.get('MAIL_SMTP_AUTH_PASSWORD'),
                        },
                        defaultSender: config.get('MAIL_SENDER'),
                        defaultFromName,
                        defaultFromEmail,
                    })
                }

                return new LoggerMailAdapter({
                    defaultFromName,
                    defaultFromEmail,
                })
            },
        },
    ],
    exports: [MailService, ForgetPasswordMailTemplate, PasswordChangedMailTemplate, UserRegisteredMailTemplate],
})
export class MailModule {}
