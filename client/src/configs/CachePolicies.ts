import { TypePolicies } from '@apollo/client'
import { Maybe, Scalars } from 'graphql/v2/generated/graphql'

const FIELDS_WITH_PAGINATION = [
    'availablePostalCodes',
    'documents',
    'educationGroups',
    'learningNeeds',
    'organizationEmployees',
    'organizationEmployeesForDropdown',
    'organizationEmployeesForTeam',
    'organizations',
    'participations',
    'providerStudents',
    'studentContactMoments',
    'students',
]

export const CachePolicies: TypePolicies = {
    Query: {
        fields: {
            ...FIELDS_WITH_PAGINATION.reduce((spec, field) => {
                return {
                    ...spec,
                    [field]: {
                        keyArgs: keyArgsFn,
                        merge: mergePaginatedCachedType,
                    },
                }
            }, {}),

            /**
             * If you want to override a policy for a field, do it here below
             */
        },
    },
}

interface PaginatedCacheType {
    __typename?: string
    hasMore?: Maybe<Scalars['Boolean']>
    nodes: Array<{ __ref: string }>
    totalCount?: Maybe<Scalars['Int']>
}

function mergePaginatedCachedType(existing: PaginatedCacheType | undefined, incoming: PaginatedCacheType) {
    if (!existing) {
        return incoming
    }

    const mergedNodes = [...existing.nodes]

    for (const node of incoming.nodes) {
        if (!mergedNodes.find(n => n.__ref === node.__ref)) {
            mergedNodes.push(node)
        }
    }

    return {
        hasMore: incoming.hasMore,
        nodes: mergedNodes,
        totalCount: incoming.totalCount,
    }
}

function keyArgsFn(args: Record<string, any> | null) {
    if (!args) {
        return false
    }

    const keyArgs = Object.keys(args).filter(arg => {
        return !['paginationArgs', 'sort'].includes(arg)
    })

    return keyArgs
}
