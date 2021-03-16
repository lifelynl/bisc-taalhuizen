import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import { ParticipantsView } from './Participants/ParticipantsView'
import { RegistrationsTaalhuisView } from './Registrations/RegistrationsView'

interface Props {}

export const ParticipantTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.index}
                exact={true}
                to={routes.authorized.participants.taalhuis.participants.index}
            />
            <Redirect
                path={routes.authorized.participants.taalhuis.index}
                exact={true}
                to={routes.authorized.participants.taalhuis.participants.index}
            />

            {/* participants */}
            <Route path={routes.authorized.participants.taalhuis.participants.index} component={ParticipantsView} />

            {/* registrations */}
            <Route
                path={routes.authorized.participants.taalhuis.registrations.index}
                component={RegistrationsTaalhuisView}
            />
        </Switch>
    )
}
