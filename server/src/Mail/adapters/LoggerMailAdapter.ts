import { Logger } from '@nestjs/common'
import { MailOptions, Mailer } from 'src/Mail/MailService'

interface LoggerMailAdapterConfig {
    defaultFromName?: string
    defaultFromEmail?: string
}

export class LoggerMailAdapter implements Mailer {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private config: LoggerMailAdapterConfig) {}

    public async send(mailOptions: MailOptions): Promise<void> {
        this.logger.debug({ ...mailOptions, ...this.config })
    }
}
