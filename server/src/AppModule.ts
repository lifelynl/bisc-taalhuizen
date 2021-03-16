import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule } from '@nestjs/jwt'
import { TerminusModule } from '@nestjs/terminus'
import { AanbiederModule } from './Aanbieder/AanbiederModule'
import { AllExceptionsFilter } from './AllExceptionsFilter'
import { AppService } from './AppService'
import { CommonGroundAPIModule } from './CommonGroundAPI/CommonGroundAPIModule'
import { Config } from './config'
import { HealthController } from './HealthController'
import { JwtMiddleware } from './JwtMiddleware'
import { PersonModule } from './Person/PersonModule'
import { ProgramModule } from './Program/ProgramModule'
import { StudentModule } from './Student/StudentModule'
import { TaalhuisModule } from './Taalhuis/TaalhuisModule'
import { UserModule } from './User/UserModule'

@Module({
    imports: [
        TerminusModule,
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            // Custom context required for JwtModule/JwtAuthGuard to work
            // see https://github.com/nestjs/graphql/issues/48#issuecomment-420693225
            context: ({ req }) => {
                return {
                    request: req,
                }
            },
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        {
            // Hack to make JwtService available in global scope, to allow usage of JwtAuthGuard in all modules
            // without having to import JwtModule.registerAsync(...) in every module separately.
            // Idea from https://github.com/nestjs/jwt/issues/103#issuecomment-598118584
            ...JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (configService: ConfigService<Config>) => {
                    return {
                        signOptions: {
                            expiresIn: '10d',
                        },
                        secret: configService.get('APP_SECRET'),
                    }
                },
            }),
            global: true,
        },
        PersonModule,
        ProgramModule,
        UserModule,
        CommonGroundAPIModule,
        TaalhuisModule,
        AanbiederModule,
        StudentModule,
    ],
    controllers: [HealthController],
    providers: [AppService, AllExceptionsFilter],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
