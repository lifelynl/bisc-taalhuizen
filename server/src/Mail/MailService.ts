export interface MailOptions {
    fromName?: string
    fromEmail?: string
    sender?: string
    to: string | string[]
    subject: string
    html: string
}

export const MailService = Symbol.for('MAIL_SERVICE')

export interface Mailer {
    send(mailOptions: MailOptions): Promise<void>
}
