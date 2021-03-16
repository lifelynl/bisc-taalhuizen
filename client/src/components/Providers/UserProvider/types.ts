import { ApolloError } from '@apollo/client'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: User | null
    changeEnvironment: (env: Type) => void
}

export enum Type {
    bisc = 'bisc',
    taalhuis = 'taalhuis',
    aanbieder = 'aanbieder',
}

// TODO: this should be temporary
export interface User {
    name: string
    environment: Type
}
