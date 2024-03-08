import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { DISABLE_DEFAULT_GUARD_KEY } from './auth.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public constructor(private reflector: Reflector, private configService: ConfigService) {
        super()
    }

    public canActivate(context: ExecutionContext) {
        const disableDefaultGuard = this.reflector.getAllAndOverride<boolean>(DISABLE_DEFAULT_GUARD_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (disableDefaultGuard === true) {
            return true
        }

        const devOnly = this.reflector.get<boolean>('DevOnly', context.getHandler())
        if (devOnly === true) {
            return this.configService.get('ENV') === 'development'
        }

        return super.canActivate(context)
    }

    // Getting request object is different for graphql requests
    public getRequest(context: ExecutionContext) {
        if (context.getType() === 'http') {
            const [req] = context.getArgs()

            return req
        } else if (context.getType<GqlContextType>() === 'graphql') {
            const gql = GqlExecutionContext.create(context)

            return gql.getContext().req
        }

        throw new BadRequestException(`Unexpected request type "${context.getType()}"`)
    }
}
