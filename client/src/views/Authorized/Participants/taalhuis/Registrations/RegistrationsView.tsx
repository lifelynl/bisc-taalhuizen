import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from '../../../../../routes/routes'
import { RegistrationReadView } from './Detail/RegistrationReadView'
import { RegistrationsOverviewView } from './RegistrationsOverviewView'

interface Props {}
export interface RegistrationsDetailLocationStateProps {
    registrationId: string
    registrationName: string
}

export const RegistrationsTaalhuisView: React.FunctionComponent<Props> = () => {
    const location = useLocation<RegistrationsDetailLocationStateProps>()
    const routeState = location.state as RegistrationsDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.registrations.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.registrations.overview,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.participants.taalhuis.registrations.overview}
                exact={true}
                component={RegistrationsOverviewView}
            />

            {/* detail */}
            <Redirect
                path={routes.authorized.participants.taalhuis.registrations.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.participants.taalhuis.registrations.detail.read,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.participants.taalhuis.registrations.detail.read}
                exact={true}
                render={() => <RegistrationReadView routeState={routeState} />}
            />
        </Switch>
    )
}
