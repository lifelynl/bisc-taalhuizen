import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../routes/routes'
import { ParticipantsReadView } from './Detail/ParticipantReadView'
import { ParticipantsUpdateView } from './Detail/ParticipantUpdateView'
import { ParticipantsCreateView } from './ParticipantsCreateView'
import { ParticipantsOverviewView } from './ParticipantsOverviewView'

interface Props {}

export const ParticipantsView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.index}
                exact={true}
                to={routes.authorized.participants.taalhuis.participants.overview}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.overview}
                exact={true}
                component={ParticipantsOverviewView}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.create}
                exact={true}
                component={ParticipantsCreateView}
            />

            {/* Detail */}
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.index()}
                exact={true}
                to={routes.authorized.participants.taalhuis.participants.detail.read()}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.read()}
                exact={true}
                component={ParticipantsReadView}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.update()}
                exact={true}
                component={ParticipantsUpdateView}
            />
        </Switch>
    )
}
