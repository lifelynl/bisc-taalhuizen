import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import { Page } from 'components/Core/Page/Page'
import { SortDirection } from 'components/Core/Table/TableHeader'
import { ParamsManager } from 'components/Domain/Shared/components/ParamManager/ParamManager'
import { ManagementLanguageHouseEmployeesTableContainer } from 'components/Domain/LanguageHouse/Management/Containers/ManagementLanguageHouseEmployeesTableContainer'
import { SortInput } from 'graphql/v2/generated/graphql'

interface Props {}

export const ManagementLanguageHouseEmployeesOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()

    return (
        <Page>
            <Column spacing={4}>
                <Headline title={i18n._(`Medewerkers`)} spacingType={SpacingType.small} />
                <ParamsManager<{ sort: SortDirection }>
                    defaultState={{ sort: { field: 'familyName', direction: SortInput.Desc } }}
                >
                    {({ paramState, setParamState }) => {
                        return (
                            <ManagementLanguageHouseEmployeesTableContainer
                                onSortDirectionChange={sortDirection => setParamState({ sort: sortDirection })}
                                sortDirection={paramState.sort}
                            />
                        )
                    }}
                </ParamsManager>
            </Column>
        </Page>
    )
}
