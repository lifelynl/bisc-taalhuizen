import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ManagementLanguageHouseEmployeesDetailView } from './Detail/ManagementLanguageHouseEmployeesDetailView'
import { ManagementLanguageHouseEmployeesCreateView } from './ManagementLanguageHouseEmployeesCreateView'
import { ManagementLanguageHouseEmployeesOverviewView } from './ManagementLanguageHouseEmployeesOverviewView'

interface Props {}

export const ManagementLanguageHouseEmployeesView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={languageHouseRoutes().management.coworkers.index}
                exact={true}
                component={ManagementLanguageHouseEmployeesOverviewView}
            />
            <Route
                path={languageHouseRoutes().management.coworkers.create}
                exact={true}
                component={ManagementLanguageHouseEmployeesCreateView}
            />
            <Route
                path={languageHouseRoutes().management.coworkers.detail().index}
                component={ManagementLanguageHouseEmployeesDetailView}
            />
        </Switch>
    )
}
