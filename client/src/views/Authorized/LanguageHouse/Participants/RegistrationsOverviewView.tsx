import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { SortDirection } from 'components/Core/Table/TableHeader'
import { ParamsManager } from 'components/Domain/Shared/components/ParamManager/ParamManager'
import { RegistrationsTableContainer } from 'components/Domain/LanguageHouse/Participants/RegistrationTableContainer'
import { SortInput } from 'graphql/v2/generated/graphql'

interface Props {}

export const RegistrationsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Aanmeldingen`)} />
            <ParamsManager<{ sort: SortDirection }>
                defaultState={{ sort: { field: 'intakeDate', direction: SortInput.Desc } }}
            >
                {({ paramState, setParamState }) => {
                    return (
                        <RegistrationsTableContainer
                            onSortDirectionChange={sortDirection => setParamState({ sort: sortDirection })}
                            sortDirection={paramState.sort}
                        />
                    )
                }}
            </ParamsManager>
        </>
    )
}
