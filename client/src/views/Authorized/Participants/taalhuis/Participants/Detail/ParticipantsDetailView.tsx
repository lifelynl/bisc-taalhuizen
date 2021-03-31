import React from 'react'
import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { routes } from '../../../../../../routes/routes'
import { ParticipantsFilesView } from './Files/ParticipantsFilesView'
import { ParticipantsIntakeView } from './Intake/ParticipantIntakeView'
import { ParticipantsUpdateIntakeView } from './Intake/ParticipantUpdateIntakeView'
import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantsLearningNeedsView'
import { ParticipantsRegistrationView } from './Registration/ParticipantsRegistrationsView'

interface Props {}
export interface ParticipantDetailLocationStateProps {
    participantId: string
    participantName: string
}

export const ParticipantsDetailView: React.FunctionComponent<Props> = () => {
    const location = useLocation<ParticipantDetailLocationStateProps>()
    const routeState = location.state as ParticipantDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.participants.detail.intake.read,
                    state: routeState,
                }}
            />

            {/* TODO: these routes should have their own RouteView when there are more screens then 1 */}
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.intake.read}
                exact={true}
                render={() => <ParticipantsIntakeView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.intake.update}
                exact={true}
                render={() => <ParticipantsUpdateIntakeView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.registration.index}
                exact={true}
                render={() => <ParticipantsRegistrationView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.folder.index}
                exact={true}
                render={() => <ParticipantsFilesView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.index}
                component={ParticipantsLearningNeedsView}
            />
        </Switch>
    )
}
