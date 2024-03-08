import { registerAs } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface'
import * as path from 'path'

export default registerAs('mailer', () => {
    const config: MailerOptions = {
        transport: {
            port: process.env.MAIL_SMTP_PORT,
            host: process.env.MAIL_SMTP_HOST,
            auth: {
                user: process.env.MAIL_SMTP_AUTH_USERNAME,
                pass: process.env.MAIL_SMTP_AUTH_PASSWORD,
            },
            ignoreTLS: true,
            secure: false,
        },

        defaults: {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
        },
        template: {
            dir: path.resolve(__dirname, '../../templates/pages'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
        options: {
            partials: {
                dir: path.join(__dirname, '../../templates/partials'),
                options: {
                    strict: true,
                },
            },
        },
    }

    return config
})
