import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlContextType } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    // TODO: Try to use the standard AuthGuard('jwt') instead of our custom logic
    // export class JwtAuthGuard extends AuthGuard('jwt') {
    public constructor(private jwtService: JwtService, private readonly reflector: Reflector) {}

    public canActivate(host: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>('isPublic', host.getHandler())
        if (isPublic === true) {
            return true
        }

        if (host.getType() === 'http') {
            return false
        } else if (host.getType<GqlContextType>() === 'graphql') {
            const [, , context] = host.getArgs()
            const possibleUser = context?.req?.user

            // Cant use 'possibleUser instanceof UserEntity' here because we didnt instantiate a UserEntity
            if (possibleUser && possibleUser.id) {
                return true
            }
        }

        return false
    }
}
