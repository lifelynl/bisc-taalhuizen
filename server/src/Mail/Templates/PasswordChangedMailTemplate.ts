import { Injectable } from '@nestjs/common'
import { BaseMailTemplate } from 'src/Mail/Templates/BaseMailTemplate'

interface EmailArgs {
    name: string
}

@Injectable()
export class PasswordChangedMailTemplate extends BaseMailTemplate<EmailArgs> {
    public getSubject() {
        return 'Your BiSC Taalhuizen password was changed'
    }

    // TODO: Fix copy
    protected render(args: EmailArgs): string {
        return `
            <p>Dear ${args.name},</p>
            <p>The password for your BiSC account has changed. If you did this yourself you can ignore this email.</p>
            <p class="suffix">If you did not do this yourself then please contact us immediatly as your account may be compromised.</p>
        `
    }
}
