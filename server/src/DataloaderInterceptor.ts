import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import DataLoader from 'dataloader'
import { Request } from 'express'
import { GraphQLResolveInfo } from 'graphql'
import { Dataloadable } from './BaseRepository'
import { AddressEntity, AddressRepository } from './CommonGroundAPI/cc/AddressRepository'

function getRequestFromContext(context: ExecutionContext): Request & { dataLoaders: DataLoaders } {
    const request = context.switchToHttp().getRequest<Request>()

    // Graphql endpoints need a context creation
    if (!request) {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req
    }

    // Interestingly, graphql field resolvers pass through the guards again. I suppose that's good?
    // These executions however provide different inputs than a fresh Http or GQL request.
    // In order to authenticate these, we can retrieve the original request from the context
    // that we configured in the GraphQL options in app.module.
    // I assign a user to every request in a middleware not shown here
    if (!request.user) {
        const [parent, , ctx, info]: [any, never, any, GraphQLResolveInfo] = context.getArgs()

        // Checking if this looks like a GQL subquery, is this hacky?
        if (parent && info.parentType) {
            return ctx.req
        }
    }

    return request as any
}

/**
 * The DataLoaders type available on the request.
 * In custom.d.ts, I've set this type on request
 */
export interface DataLoaders {
    addresses: DataLoader<string, AddressEntity | undefined>
}

/**
 * GQL context function type to get DataLoaders. When the GQL context is created, the interceptor
 * hasn't actually run yet, so a function is provided to return them at time of execution.
 */
export type GetDataLoaders = () => DataLoaders

/**
 * Creates new instances of DataLoaders on every request and makes them available on `request.dataLoaders`.
 */
@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private readonly addressRepository: AddressRepository) {}

    public intercept(context: ExecutionContext, next: CallHandler) {
        const request = getRequestFromContext(context)

        // If the request already has data loaders, then do not create them again or the benefits are negated.
        if (request.dataLoaders) {
            this.logger.debug('Data loaders exist', this.constructor.name)
        } else {
            this.logger.debug('Creating data loaders', this.constructor.name)

            // Create new instances of DataLoaders per request
            request.dataLoaders = this.createDataloaders()
        }

        return next.handle()
    }

    private createDataloaders() {
        return {
            addresses: this.createFindByIdDataloader(this.addressRepository),
        }
    }

    private createFindByIdDataloader<T extends { id: string }>(repository: Dataloadable<T>) {
        return new DataLoader(async (ids: readonly string[]) => {
            const results = await repository.findByIds(ids)

            return ids.map(id => results.find(entity => entity.id === id))
        })
    }
}
