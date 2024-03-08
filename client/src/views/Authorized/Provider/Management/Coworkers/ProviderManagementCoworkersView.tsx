import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ProviderManagementCoworkerView } from './Detail/ProviderManagementCoworkerView'
import { ProviderManagementCoworkerOverviewView } from './ProviderManagementCoworkerOverviewView'
import { ProviderManagementCoworkersCreateView } from './ProviderManagementCoworkersCreateView'

export const ProviderManagementCoworkersView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route
                path={providerRoutes().management.coworkers.create}
                component={ProviderManagementCoworkersCreateView}
            />
            <Route
                path={providerRoutes().management.coworkers.detail().index}
                component={ProviderManagementCoworkerView}
            />
            <Route
                path={providerRoutes().management.coworkers.index}
                component={ProviderManagementCoworkerOverviewView}
            />
        </Switch>
    )
}
