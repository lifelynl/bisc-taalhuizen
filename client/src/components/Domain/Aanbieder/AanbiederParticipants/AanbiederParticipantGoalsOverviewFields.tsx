import React from 'react'
import { NavLink } from 'react-router-dom'

import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederParticipantDetail } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    participant: AanbiederParticipantDetail
}

// TODO
export const AanbiederParticipantGoalsOverviewFields: React.FunctionComponent<Props> = props => {
    return (
        // TODO: remove -- dev only
        <NavLink
            to={{
                pathname: supplierRoutes.participants.detail.goals.detail,
                hash: '',
                search: '',
                state: { participantGoalId: 1, participantId: props.participant.id },
            }}
        >
            to detail view
        </NavLink>
    )
}
