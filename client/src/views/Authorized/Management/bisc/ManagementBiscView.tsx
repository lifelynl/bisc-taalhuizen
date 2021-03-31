import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import ManagementCoworkerCreateView from './Coworkers/CoworkerCreateView'
import { CoworkerOverviewView } from './Coworkers/CoworkerOverviewView'
import ManagementCoworkerReadView from './Coworkers/Detail/CoworkerReadView'
import ManagementCoworkerUpdateView from './Coworkers/Detail/CoworkerUpdateView'

interface Props {}

export const ManagementBiscView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.bisc.index}
            />
            <Redirect
                path={routes.authorized.management.bisc.index}
                exact={true}
                to={routes.authorized.management.bisc.overview}
            />
            <Route path={routes.authorized.management.bisc.overview} component={CoworkerOverviewView} />
            <Route path={routes.authorized.management.bisc.coworkers.create} component={ManagementCoworkerCreateView} />
            <Route path={routes.authorized.management.bisc.coworkers.read()} component={ManagementCoworkerReadView} />
            <Route
                path={routes.authorized.management.bisc.coworkers.update()}
                component={ManagementCoworkerUpdateView}
            />
        </Switch>
    )
}
