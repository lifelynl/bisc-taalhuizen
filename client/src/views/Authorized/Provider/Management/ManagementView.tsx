import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ProviderManagementCoworkersView } from './Coworkers/ProviderManagementCoworkersView'
import { ProviderManagementDetailsEditView } from './ProviderManagementDetailsEditView'
import { ProviderManagementDetailsView } from './ProviderManagementDetailsView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ManagementView: React.FunctionComponent = () => {
    const { organizationSlug } = useContext(SessionContext)
    return (
        <Switch>
            <Route
                path={providerRoutes().management.providerDetails.index}
                exact={true}
                component={ProviderManagementDetailsView}
            />
            <Route
                path={providerRoutes().management.providerDetails.update}
                exact={true}
                component={ProviderManagementDetailsEditView}
            />
            <Route path={providerRoutes().management.coworkers.index} component={ProviderManagementCoworkersView} />
            <Redirect
                path={providerRoutes().management.index}
                to={providerRoutes(organizationSlug).management.providerDetails.index}
            />
        </Switch>
    )
}
