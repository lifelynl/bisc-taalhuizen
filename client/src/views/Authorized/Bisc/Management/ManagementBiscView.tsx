import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { ManagementBiscEmployeesView } from './Employees/ManagementBiscEmployeesView'

interface Props {}

export const ManagementBiscView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={biscRoutes().management.index} exact={true} to={biscRoutes().management.coworkers.index} />

            <Route path={biscRoutes().management.coworkers.index} component={ManagementBiscEmployeesView} />
        </Switch>
    )
}
