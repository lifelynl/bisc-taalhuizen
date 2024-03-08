import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

interface MailOptions {
    to: string
}

interface InviteUserMailOptions extends MailOptions {
    inviteURL: string
    name?: string
    organization: string
}

interface PasswordForgotMailOptions extends MailOptions {
    resetURL: string
    name?: string
    organization: string
}

interface AfterPasswordResetMailOptions extends MailOptions {
    name?: string
    organization: string
}

interface RegistrationMailOptions extends MailOptions {
    stringifiedRegistrationInput: Record<string, string | undefined>
}

interface SuccessfulRegistrationMailOptions extends RegistrationMailOptions {
    organizationName: string
}

@Injectable()
export class MailService {
    public constructor(private readonly mailerService: MailerService) {}

    public async sendInviteUserMail(options: InviteUserMailOptions): Promise<void> {
        await this.mailerService.sendMail({
            to: options.to,
            subject: 'Jouw nieuwe account in TOP',
            template: 'invite-user-email',
            context: {
                inviteButtonLink: options.inviteURL,
                name: options.name,
                organization: options.organization,
            },
        })
    }

    public async sendPasswordForgotMail(options: PasswordForgotMailOptions): Promise<void> {
        await this.mailerService.sendMail({
            to: options.to,
            subject: 'Wachtwoord resetten in TOP',
            template: 'password-forgot-email',
            context: {
                resetButtonLink: options.resetURL,
                name: options.name,
                organization: options.organization,
            },
        })
    }

    public async sendAfterPasswordResetMail(options: AfterPasswordResetMailOptions): Promise<void> {
        await this.mailerService.sendMail({
            to: options.to,
            subject: 'Je wachtwoord in TOP is opnieuw ingesteld',
            template: 'after-password-reset-email',
            context: {
                name: options.name,
                organization: options.organization,
            },
        })
    }

    public async sendDuplicateRegistrationMail(options: RegistrationMailOptions & { warn?: boolean }): Promise<void> {
        await this.mailerService.sendMail({
            to: options.to,
            subject: 'Nieuwe aanmelding',
            template: options.warn ? 'duplicate-registration-warning-email' : 'duplicate-registration-email',
            context: {
                registrationInput: this.formatRegistrationInput(options.stringifiedRegistrationInput),
            },
        })
    }

    public async sendDuplicateAttemptedRegistrationMail(options: RegistrationMailOptions): Promise<void> {
        await this.mailerService.sendMail({
            to: options.to,
            subject: 'Nieuwe aanmelding',
            template: 'duplicate-attempted-registration-email',
            context: {
                registrationInput: this.formatRegistrationInput(options.stringifiedRegistrationInput),
            },
        })
    }

    public async sendSuccessfulRegistrationMail(options: SuccessfulRegistrationMailOptions): Promise<void> {
        await this.mailerService.sendMail({
            to: options.to,
            subject: 'Je aanmelding is ontvangen',
            template: 'successful-registration-email',
            context: {
                registrationInput: this.formatRegistrationInput(options.stringifiedRegistrationInput),
                organizationName: options.organizationName,
            },
        })
    }

    private formatRegistrationInput(
        stringifiedRegistrationInput: RegistrationMailOptions['stringifiedRegistrationInput']
    ) {
        return Object.entries(stringifiedRegistrationInput).map(([key, value]) => `${key}: ${value || 'NOT FILLED IN'}`)
    }
}
