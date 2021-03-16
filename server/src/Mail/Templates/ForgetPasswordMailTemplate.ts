import { Injectable } from '@nestjs/common'
import { BaseMailTemplate } from 'src/Mail/Templates/BaseMailTemplate'
import { UserEnvironment } from 'src/User/entities/UserEntity'

interface EmailArgs {
    name: string
    username: string
    environment: UserEnvironment
    token: string
}

@Injectable()
export class ForgetPasswordMailTemplate extends BaseMailTemplate<EmailArgs> {
    public getSubject() {
        return 'Your BiSC Taalhuizen password reset token'
    }

    protected render(args: EmailArgs): string {
        return `
            <h1>Beste ${args.name ? args.name : ''},</h1>
            <p>Je bent je wachtwoord voor TOP voor ${'[ORGANIZATION]'} van de ${`[ENVIRONMENT]`} vergeten. Via onderstaande link kan je je wachtwoord opnieuw instellen. Deze link is 4 uur geldig.</p>
            ${this.renderButton(
                'Nieuw wachtwoord instellen',
                this.makeUrl(
                    `auth/reset-password?environment=${args.environment}&email=${args.username}&token=${args.token}`
                )
            )}
            <hr />
            <p>Met vriendelijke groet,</p>
            <p>TOP</p>
        `
    }
}
