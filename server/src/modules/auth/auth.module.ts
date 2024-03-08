import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from 'src/modules/user/user.module'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard'
import { AuthResolver } from './auth.resolver'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config/config'
import { UtilsModule } from 'src/modules/utils/utils.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { User } from '../user/user.entity'
import { Employee } from '../employee/employee.entity'
import { Organization } from '../organization/organization.entity'
import { Person } from '../person/person.entity'

@Module({
    imports: [
        MikroOrmModule.forFeature({
            entities: [User, Employee, Organization, Person],
        }),
        UserModule,
        PassportModule,
        UtilsModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService<Config>) => ({
                secret: configService.getOrThrow('JWT_SECRET'),
                signOptions: { expiresIn: '30m' },
            }),
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD, // Global auth guard
            useClass: JwtAuthGuard,
        },
        AuthResolver,
    ],
    controllers: [],
})
export class AuthModule {}
