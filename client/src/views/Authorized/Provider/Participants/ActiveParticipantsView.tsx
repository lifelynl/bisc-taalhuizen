import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { SortDirection } from 'components/Core/Table/TableHeader'
import { ProviderParticipantsTableContainer } from 'components/Domain/Provider/ProviderParticipants/ProviderParticipantsTableContainer'
import { ParamsManager } from 'components/Domain/Shared/components/ParamManager/ParamManager'
import { ParticipationStatus, SortInput } from 'graphql/v2/generated/graphql'
import React from 'react'

export const ActiveParticipantsView: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <ParamsManager<{ sort: SortDirection }>
                defaultState={{ sort: { field: 'intakeDate', direction: SortInput.Desc } }}
            >
                {({ paramState, setParamState }) => {
                    return (
                        <ProviderParticipantsTableContainer
                            participationStatus={ParticipationStatus.Ongoing}
                            onSortDirectionChange={sortDirection => setParamState({ sort: sortDirection })}
                            sortDirection={paramState.sort}
                        />
                    )
                }}
            </ParamsManager>
        </>
    )
}
