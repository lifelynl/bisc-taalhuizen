import { SetMetadata } from '@nestjs/common'

/**
 * Public guard can be used to mark a route or graphql endpoint as unguarded.
 */
export const PublicGuard = () => SetMetadata('isPublic', true)
