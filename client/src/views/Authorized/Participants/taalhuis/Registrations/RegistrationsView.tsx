import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../routes/routes'
import { RegistrationReadView } from './Detail/RegistrationReadView'
import { RegistrationsOverviewView } from './RegistrationsOverviewView'

interface Props {}

export const RegistrationsTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.registrations.index}
                exact={true}
                to={routes.authorized.participants.taalhuis.registrations.overview}
            />
            <Route
                path={routes.authorized.participants.taalhuis.registrations.overview}
                exact={true}
                component={RegistrationsOverviewView}
            />

            {/* detail */}
            <Redirect
                path={routes.authorized.participants.taalhuis.registrations.detail.index()}
                exact={true}
                to={routes.authorized.participants.taalhuis.registrations.detail.read()}
            />
            <Route
                path={routes.authorized.participants.taalhuis.registrations.detail.read()}
                exact={true}
                component={RegistrationReadView}
            />
        </Switch>
    )
}
