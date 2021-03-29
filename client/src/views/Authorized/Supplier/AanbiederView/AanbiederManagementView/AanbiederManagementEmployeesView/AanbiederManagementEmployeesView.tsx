import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederManagementEmployeeDetailOverviewView } from './AanbiederManagementEmployeeDetailOverviewView'
import { AanbiederManagementEmployeeDocumentsView } from './AanbiederManagementEmployeeDocumentsView'
import { AanbiederManagementEmployeeParticipantsView } from './AanbiederManagementEmployeeParticipantsView'
import { AanbiederManagementEmployeesOverviewView } from './AanbiederManagementEmployeesOverviewView'

export const AanbiederManagementEmployeesView: React.FunctionComponent = () => {
    const { employees } = supplierRoutes.management

    const location = useLocation()
    const props = location.state as { employeeId: number }

    return (
        <Switch>
            <Redirect path={employees.index} exact={true} to={employees.overview} />
            <Route path={employees.overview} component={AanbiederManagementEmployeesOverviewView} />
            <Route
                path={employees.detail.overview}
                render={() => <AanbiederManagementEmployeeDetailOverviewView {...props} />}
            />
            <Route
                path={employees.detail.participants}
                render={() => <AanbiederManagementEmployeeParticipantsView {...props} />}
            />
            <Route
                path={employees.detail.documents}
                render={() => <AanbiederManagementEmployeeDocumentsView {...props} />}
            />
        </Switch>
    )
}
