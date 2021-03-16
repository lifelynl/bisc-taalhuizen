import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './AppModule'
import { Config } from './config'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { useContainer, ValidationError } from 'class-validator'
import { ErrorCode } from './ErrorCodes'
import { AllExceptionsFilter } from './AllExceptionsFilter'
import { JwtAuthGuard } from './User/guards/JwtAuthGuard'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalGuards(app.get(JwtAuthGuard))
    app.useGlobalFilters(app.get(AllExceptionsFilter))

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: false,
            validationError: { target: false },
            // This ensures we return detailed errors.
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                return new BadRequestException({ errorCode: ErrorCode.InputValidation, validationErrors })
            },
        })
    )

    const configService = app.get<ConfigService<Config>>(ConfigService)

    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    await app.listen(parseInt(configService.get('APP_PORT', '5000'), 10))
}

bootstrap()
