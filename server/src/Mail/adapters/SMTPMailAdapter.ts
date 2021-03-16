/* eslint-disable @typescript-eslint/no-explicit-any */
import * as nodemailer from 'nodemailer'
import { Mailer, MailOptions } from 'src/Mail/MailService'

export interface SmtpMailerAdapterConfig {
    host?: string
    port?: number
    secure?: boolean
    auth?: {
        username?: string
        password?: string
    }
    defaultSender?: string
    defaultFromName?: string
    defaultFromEmail?: string
}

export class SmtpMailerAdapter implements Mailer {
    public constructor(private config: SmtpMailerAdapterConfig) {
        if (config.host === undefined) {
            throw new Error(`Host is not defined`)
        }
        if (config.port === undefined) {
            throw new Error(`port is not defined`)
        }
    }

    public async send(mail: MailOptions): Promise<void> {
        const transporter = this.createNodemailerTransporter()

        const fromName = mail.fromName ?? this.config.defaultFromName
        const fromEmail = mail.fromEmail ?? this.config.defaultFromEmail
        const sender = mail.sender ?? this.config.defaultSender ?? undefined

        const options = {
            from: `"${fromName}" <${fromEmail}>`,
            to: mail.to instanceof Array ? mail.to.join(', ') : mail.to,
            subject: mail.subject,
            html: mail.html,
            sender: sender,
        }

        await new Promise<boolean>((resolve, reject) => {
            transporter.sendMail(options, error => {
                if (error) {
                    reject(error)
                    return
                }

                resolve(true)
            })
        })
    }

    /**
     * Create the nodemailer transport
     */
    private createNodemailerTransporter() {
        const options: any = {
            host: this.config.host,
            port: this.config.port,
            secure: this.config.secure || false,
        }

        if (this.config.auth) {
            options.auth = {
                user: this.config.auth.username,
                pass: this.config.auth.password,
            }
        }

        return nodemailer.createTransport(options)
    }
}
