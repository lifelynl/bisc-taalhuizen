import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'
import { ParticipantsLearningNeedsDetailView } from './Details/ParticipantsLearningNeedsDetailView'
import { ParticipantsLearningNeedsOverviewView } from './ParticipantLearningNeedsOverviewView'
import { ParticipantsLearningNeedsCreateView } from './ParticipantsLearningNeedsCreateView'

export interface ParticipantsLearningNeedsLocationStateProps extends ParticipantDetailLocationStateProps {}

export const ParticipantsLearningNeedsView: React.FunctionComponent<ParticipantsLearningNeedsLocationStateProps> = () => {
    const location = useLocation<ParticipantsLearningNeedsLocationStateProps>()
    const routeState = location.state as ParticipantsLearningNeedsLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.goals.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.participants.detail.goals.overview,
                    state: routeState,
                }}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                exact={true}
                render={() => <ParticipantsLearningNeedsOverviewView routeState={routeState} />}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.create}
                exact={true}
                render={() => <ParticipantsLearningNeedsCreateView routeState={routeState} />}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.detail.index}
                component={ParticipantsLearningNeedsDetailView}
            />
        </Switch>
    )
}
