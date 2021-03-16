import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(this.constructor.name)

    public catch(error: Error, host: ArgumentsHost) {
        this.logError(error)
        return this.handleAndFormatError(error, host)
    }

    private logError(error: Error) {
        const isUnexpectedError = error instanceof HttpException === false

        if (isUnexpectedError) {
            // Adding an identifier to the log and report will make finding the error easier.
            const errorIdentifier = Math.random().toString().substr(2)

            this.logger.error({ error, errorIdentifier }, error.stack ?? error?.toString())

            // Sentry.captureException(error, {
            //     tags: {
            //         errorIdentifier,
            //     },
            // })
        } else {
            this.logger.debug(error, error.stack ?? error?.toString())
        }
    }

    private handleAndFormatError(error: Error, host: ArgumentsHost) {
        const type = host.getType()

        if (type === 'http') {
            const ctx = host.switchToHttp()
            const response = ctx.getResponse()
            const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
            const errorResponse = error instanceof HttpException ? error.getResponse() : { status: 'error' }
            return response.status(status).json(errorResponse)
        }

        if ((type as unknown) === 'graphql') {
            const isUnexpectedError = error instanceof HttpException === false

            if (isUnexpectedError) {
                // We don't want to leak any potential internal information
                return new Error('Something went wrong')
            }

            return error
        }

        return super.catch(error, host)
    }
}
