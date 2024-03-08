import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Config } from './config/config'
import { AllExceptionsFilter } from './exceptionFilters/exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new AllExceptionsFilter())
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
            validationError: { target: false },
            // This ensures we return detailed errors.
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                return new BadRequestException({ errorCode: 'INPUT_VALIDATION', validationErrors })
            },
        })
    )

    const configService = app.get<ConfigService<Config>>(ConfigService)

    app.enableCors({
        origin: configService.getOrThrow('FRONT_URL'),
    })

    await app.listen(parseInt(configService.get('APP_PORT', '5000'), 10))
}
bootstrap()
