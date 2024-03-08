import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { ManagementBiscEmployeesDetailView } from './Detail/ManagementBiscEmployeesDetailView'
import { ManagementBiscEmployeesCreateView } from './ManagementBiscEmployeesCreateView'
import { ManagementBiscEmployeesOverviewView } from './ManagementBiscEmployeesOverviewView'

interface Props {}

export const ManagementBiscEmployeesView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={biscRoutes().management.coworkers.index}
                exact={true}
                component={ManagementBiscEmployeesOverviewView}
            />
            <Route
                path={biscRoutes().management.coworkers.create}
                exact={true}
                component={ManagementBiscEmployeesCreateView}
            />
            <Route
                path={biscRoutes().management.coworkers.detail().index}
                component={ManagementBiscEmployeesDetailView}
            />
        </Switch>
    )
}
