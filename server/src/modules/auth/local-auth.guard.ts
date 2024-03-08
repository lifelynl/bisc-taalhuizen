import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

// This class helps to keep magic strings ('local') out of the codebase,
// as recommended by https://docs.nestjs.com/security/authentication
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // Getting request object is different for graphql requests
    public getRequest(context: ExecutionContext) {
        if (context.getType() === 'http') {
            const [req] = context.getArgs()

            return req
        } else if (context.getType<GqlContextType>() === 'graphql') {
            const gql = GqlExecutionContext.create(context)

            const request = gql.getContext()
            request.body = gql.getArgs().credentials

            return request
        }

        throw new BadRequestException(`Unexpected request type "${context.getType()}"`)
    }
}
