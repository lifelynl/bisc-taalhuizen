import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ProviderManagementCoworkerDetailView } from './ProviderManagementCoworkerDetailView'
import { ProviderManagementCoworkerEditView } from './ProviderManagementCoworkerEditView'
import { ProviderManagementCoworkerMenteesView } from './ProviderManagementCoworkerMenteesView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ProviderManagementCoworkerView: React.FunctionComponent = () => {
    const { organizationSlug } = useContext(SessionContext)
    const basePath = providerRoutes().management.coworkers.detail()

    return (
        <Switch>
            <Redirect
                path={basePath.index}
                exact={true}
                to={providerRoutes(organizationSlug).management.coworkers.detail().data.index}
            />
            <Route path={basePath.data.update} component={ProviderManagementCoworkerEditView} />
            <Route path={basePath.data.index} component={ProviderManagementCoworkerDetailView} />
            <Route path={basePath.data.participants} component={ProviderManagementCoworkerMenteesView} />
        </Switch>
    )
}
