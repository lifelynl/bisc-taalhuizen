import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../routes/routes'
import { CoworkerCreateView } from './CoworkerCreateView'
import { CoworkerOverviewView } from './CoworkersOverviewView'
import { DataView } from './Detail/Data/DataView'
import { DataUpdateView } from './Detail/Data/DataUpdateView'

interface Props {}

export const CoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.aanbieder.coworkers.index}
                exact={true}
                to={routes.authorized.management.aanbieder.coworkers.overview}
            />
            <Route
                path={routes.authorized.management.aanbieder.coworkers.overview}
                exact={true}
                component={CoworkerOverviewView}
            />
            <Route
                path={routes.authorized.management.aanbieder.coworkers.create}
                exact={true}
                component={CoworkerCreateView}
            />

            {/* detail */}
            <Redirect
                path={routes.authorized.management.aanbieder.coworkers.detail.index()}
                exact={true}
                to={routes.authorized.management.aanbieder.coworkers.detail.data.index()}
            />

            {/* data */}
            <Redirect
                path={routes.authorized.management.aanbieder.coworkers.detail.data.index()}
                exact={true}
                to={routes.authorized.management.aanbieder.coworkers.detail.data.read()}
            />
            <Route
                path={routes.authorized.management.aanbieder.coworkers.detail.data.read()}
                exact={true}
                component={DataView}
            />
            <Route
                path={routes.authorized.management.aanbieder.coworkers.detail.data.read()}
                exact={true}
                component={DataUpdateView}
            />

            {/* participants */}
            <Route
                path={routes.authorized.management.aanbieder.coworkers.detail.participants.overview()}
                exact={true}
                component={DataView}
            />

            {/* documents */}
            <Route
                path={routes.authorized.management.aanbieder.coworkers.detail.documents.overview()}
                exact={true}
                component={DataView}
            />
        </Switch>
    )
}
