import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../routes/routes'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import CoworkersDetailView from './CoworkerDetail/CoworkerDetailView'
import CoworkerCreateView from './CoworkersCreateView'
import { CoworkersOverviewView } from './CoworkersOverviewView'

interface Props {}

const CoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.read.coworkers.index()}
                exact={true}
                to={routes.authorized.supplier.read.coworkers.overview()}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.overview()}
                exact={true}
                component={CoworkersOverviewView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.create()}
                exact={true}
                component={CoworkerCreateView}
            />
            <Route path={routes.authorized.supplier.read.coworkers.detail.index()} component={CoworkersDetailView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersView
