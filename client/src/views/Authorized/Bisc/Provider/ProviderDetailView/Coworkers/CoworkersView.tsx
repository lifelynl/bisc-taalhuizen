import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { BiscProvidersDetailRouteParams } from 'routes/bisc/biscRoutes'

import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersOverviewView from './CoworkersOverviewView'
import CoworkersDetailView from './CoworkerDetail/CoworkerDetailView'
import CoworkersCreateView from './CoworkersCreateView'

interface Props extends RouteComponentProps<BiscProvidersDetailRouteParams> {}

const CoworkersView: React.FunctionComponent<Props> = props => {
    return (
        <Switch>
            <Route
                path={routes.authorized.bisc().providers.detail().coworkers.index}
                exact={true}
                component={CoworkersOverviewView}
            />

            <Route
                path={routes.authorized.bisc().providers.detail().coworkers.create}
                exact={true}
                component={CoworkersCreateView}
            />

            <Route
                path={routes.authorized.bisc().providers.detail().coworkers.detail().index}
                component={CoworkersDetailView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersView
