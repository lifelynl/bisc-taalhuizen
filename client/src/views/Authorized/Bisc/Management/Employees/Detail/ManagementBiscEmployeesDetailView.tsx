import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { ManagementBiscEmployeesDetailDataView } from './ManagementBiscEmployeesDetailDataView'
import { ManagementBiscEmployeesDetailUpdateView } from './ManagementBiscEmployeesDetailUpdateView'

interface Props {}

export const ManagementBiscEmployeesDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={biscRoutes().management.coworkers.detail().index}
                exact={true}
                to={biscRoutes().management.coworkers.detail().data.index}
            />

            <Route
                path={biscRoutes().management.coworkers.detail().data.index}
                exact={true}
                component={ManagementBiscEmployeesDetailDataView}
            />
            <Route
                path={biscRoutes().management.coworkers.detail().data.update}
                exact={true}
                component={ManagementBiscEmployeesDetailUpdateView}
            />
        </Switch>
    )
}
