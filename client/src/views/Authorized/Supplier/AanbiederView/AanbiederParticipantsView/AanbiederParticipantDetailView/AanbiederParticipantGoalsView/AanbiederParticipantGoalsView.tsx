import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantGoalDetailView } from './AanbiederParticipantGoalDetailView'
import { AanbiederParticipantGoalsOverviewView } from './AanbiederParticipantGoalsOverviewView'

interface LocationStateProps {
    participantId: number
    participantGoalId: number
}

export const AanbiederParticipantGoalsView: React.FunctionComponent = () => {
    const location = useLocation()
    const props = location.state as LocationStateProps

    const basePath = routes.authorized.supplier.participants.detail.goals

    return (
        <Switch>
            <Route path={basePath.overview} render={() => <AanbiederParticipantGoalsOverviewView {...props} />} />
            <Route path={basePath.detail} render={() => <AanbiederParticipantGoalDetailView {...props} />} />
        </Switch>
    )
}
