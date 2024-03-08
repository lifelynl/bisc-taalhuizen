import { Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common'
import { GqlExceptionFilter } from '@nestjs/graphql'
import { DomainError } from 'src/errors/DomainError'
import { v4 as uuid } from 'uuid'

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
    public catch(exception: Error, _host: ArgumentsHost) {
        const errorCode = uuid()

        if (exception instanceof DomainError) {
            console.log(`Error Code: ${errorCode}; Error Message: ${exception?.message}; ${exception}`)
            exception.message = `${exception.message}; Error Code: ${errorCode}`
            return exception
        } else if (exception instanceof UnauthorizedException) {
            console.log(`Error Code: ${errorCode}; Error Message: ${exception?.message}; ${exception}`)
            exception.message = `${exception.message} Error Code: ${errorCode}`
            return exception
        }

        console.log(`Error Code: ${errorCode}; Error Message: ${exception?.message}; ${exception}`)
        exception.message = `Error Code: ${errorCode}`
        return exception
    }
}
