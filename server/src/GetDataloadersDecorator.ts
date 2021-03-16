import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { DataLoaders } from './DataloaderInterceptor'

export const GetDataloaders = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const dataloaders = ctx.getContext()?.req?.dataLoaders

    if (dataloaders) {
        return dataloaders as () => DataLoaders
    }

    throw new Error(`Can't get dataloaders from context`)
})
