import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { OrganizationTypeEnum } from '../organization/organization.entity'
import { LocalAuthGuard } from './local-auth.guard'
import { RolesGuard } from './roles.guard'
import { RequestContext } from './auth.interface'

// Use this to create a public endpoint
export const DISABLE_DEFAULT_GUARD_KEY = 'disableDefaultGuard'
export const DisableDefaultGuard = () => SetMetadata(DISABLE_DEFAULT_GUARD_KEY, true)

export const UseLocalAuthGuard = () => {
    // Since we have configured a global guard, we need to disable that
    return applyDecorators(DisableDefaultGuard(), UseGuards(LocalAuthGuard))
}

export const ACCESS_GROUP_KEY = 'authorisedAccessGroup'
export const UseRolesGuard = (accessGroup: OrganizationTypeEnum) => {
    return applyDecorators(UseGuards(RolesGuard), SetMetadata(ACCESS_GROUP_KEY, accessGroup))
}

// Get User from request context in Graphql mutations/queries
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext<RequestContext>().req.user
})

// Will only work on ENV=development and bypasses all other guards
export const DevOnlyGuard = () => SetMetadata('DevOnly', true)
