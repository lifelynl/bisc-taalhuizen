import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { ACCESS_GROUP_KEY } from './auth.decorator'
import { UserWithCurrentEmployee } from './auth.interface'

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(private reflector: Reflector) {}

    public canActivate(context: ExecutionContext): boolean {
        const accessGroup = this.reflector.get<OrganizationTypeEnum>(ACCESS_GROUP_KEY, context.getHandler())
        if (!accessGroup) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user as UserWithCurrentEmployee
        return user.accessGroup === accessGroup
    }
}
