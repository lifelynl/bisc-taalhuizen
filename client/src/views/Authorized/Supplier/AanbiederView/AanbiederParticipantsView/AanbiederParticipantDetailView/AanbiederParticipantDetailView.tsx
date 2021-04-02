import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantDetailOverviewView } from './AanbiederParticipantDetailOverviewView'
// import { AanbiederParticipantGoalsView } from './AanbiederParticipantGoalsView/AanbiederParticipantGoalsView'
// import { AanbiederParticipantRegistrationView } from './AanbiederParticipantRegistrationView'

export interface AanbiederParticipantLocationStateProps {
    participantId: number
}

export const AanbiederParticipantDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const props = location.state as AanbiederParticipantLocationStateProps

    const basePath = routes.authorized.supplier.participants.detail

    return (
        <Switch>
            <Route path={basePath.overview} render={() => <AanbiederParticipantDetailOverviewView {...props} />} />

            {/* TODO: part of 2nd sprint */}
            {/* <Route path={basePath.registration} render={() => <AanbiederParticipantRegistrationView {...props} />} />
            <Route path={basePath.goals.index} component={AanbiederParticipantGoalsView} /> */}
        </Switch>
    )
}
