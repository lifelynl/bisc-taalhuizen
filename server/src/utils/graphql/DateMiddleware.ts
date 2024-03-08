import { FieldMiddleware, NextFn } from '@nestjs/graphql'
export const dateMiddleware: FieldMiddleware = async (_, next: NextFn) => {
    const value = await next()
    return value ? new Date(value).toISOString() : value
}
