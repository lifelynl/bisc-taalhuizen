import { ApolloQueryResult } from '@apollo/client'
import { DefaultSelectOption } from 'components/Core/DataEntry/Select'
import { AvailablePostalCodesQuery, Exact, PaginatedInputType } from 'graphql/v2/generated/graphql'

function postalCodesSelectLoader(
    load: (
        variables?:
            | Partial<
                  Exact<{
                      paginationArgs: PaginatedInputType
                      search?: string | undefined
                  }>
              >
            | undefined
    ) => Promise<ApolloQueryResult<AvailablePostalCodesQuery>>
) {
    return async function (search: string, callback: (options: DefaultSelectOption[]) => void) {
        if (search.length < 3) {
            callback([])
            return
        }

        if (search) {
            const response = await load({
                paginationArgs: {
                    skip: 0,
                    take: 20,
                },
                search: search,
            })

            const newOptions = response.data?.availablePostalCodes?.nodes.map(code => ({
                label: code.code,
                value: code.code,
            }))
            callback(newOptions)
        }
    }
}

export default postalCodesSelectLoader
