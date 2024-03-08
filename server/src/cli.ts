import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

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

    await CommandFactory.run(AppModule, ['error', 'warn'])
}
bootstrap()
