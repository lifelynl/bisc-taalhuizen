import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { MailModule } from 'src/Mail/MailModule'
import { AuthResolver } from './AuthResolver'
import { AuthService } from './AuthService'
import { ChangePasswordResolver } from './ChangePasswordResolver'
import { JwtAuthGuard } from './guards/JwtAuthGuard'
import { PasswordResetResolver } from './PasswordResetResolver'
import { ChangePasswordService } from './services/ChangePasswordService'
import { PasswordHashingService } from './services/PasswordHashingService'
import { PasswordResetService } from './services/PasswordResetService'
import { UserService } from './services/UserService'
import { OldUserRepository } from './OldUserRepository'

@Module({
    providers: [
        UserService,
        OldUserRepository,
        AuthResolver,
        AuthService,
        PasswordResetService,
        PasswordResetResolver,
        ChangePasswordService,
        ChangePasswordResolver,
        PasswordHashingService,
        JwtAuthGuard,
    ],
    exports: [OldUserRepository, AuthService, JwtAuthGuard, PasswordHashingService],
    imports: [CommonGroundAPIModule, MailModule],
})
export class UserModule {}
