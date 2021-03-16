import { BaseMailTemplate } from 'src/Mail/Templates/BaseMailTemplate'

interface EmailArgs {
    name: string
    token: string
}

export class UserRegisteredMailTemplate extends BaseMailTemplate<EmailArgs> {
    public getSubject() {
        return 'Verify your BiSC Taalhuizen account'
    }

    // TODO: Fix copy
    protected render(args: EmailArgs): string {
        return `
            <p>Dear ${args.name},</p>
            <p>
                Please verify your account.<br/>
            </p>
            ${this.renderButton('Verify', this.makeUrl(`/verify-account/${args.token}`))}
        `
    }
}
