import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../routes/routes'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import CoworkersCreateView from './CoworkersCreateView'

import CoworkersOverviewView from './CoworkersOverviewView'
import CoworkersDetailUpdateView from './detail/CoworkersDetailUpdateView'
import CoworkersDetailView from './detail/CoworkersDetailView'

interface Props {}

export const CoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.read.coworkers.index()}
                exact={true}
                to={routes.authorized.taalhuis.read.coworkers.overview()}
            />
            <Route
                path={routes.authorized.taalhuis.read.coworkers.overview()}
                exact={true}
                component={CoworkersOverviewView}
            />
            <Route
                path={routes.authorized.taalhuis.read.coworkers.create()}
                exact={true}
                component={CoworkersCreateView}
            />
            <Route
                path={routes.authorized.taalhuis.read.coworkers.detail.data()}
                exact={true}
                component={CoworkersDetailView}
            />
            <Route
                path={routes.authorized.taalhuis.read.coworkers.detail.update()}
                exact={true}
                component={CoworkersDetailUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
