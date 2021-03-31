import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederManagementEmployeesView } from './AanbiederManagementEmployeesView/AanbiederManagementEmployeesView'
import { AanbiederManagementOverviewView } from './AanbiederManagementOverviewView'

export const AanbiederManagementView: React.FunctionComponent = () => {
    const { management } = supplierRoutes

    return (
        <Switch>
            <Redirect path={management.index} exact={true} to={management.overview} />
            <Route path={management.overview} component={AanbiederManagementOverviewView} />
            <Route path={management.employees.index} component={AanbiederManagementEmployeesView} />
        </Switch>
    )
}
