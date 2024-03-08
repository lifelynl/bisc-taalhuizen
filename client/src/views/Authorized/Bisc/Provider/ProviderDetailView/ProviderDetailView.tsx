import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersView from './Coworkers/CoworkersView'
import DataUpdateView from './Data/DataUpdateView'
import DataView from './Data/DataView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

const ProviderDetailView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc().providers.detail().index}
                exact={true}
                to={routes.authorized.bisc(sessionContext.organizationSlug).providers.detail().data.index}
            />
            <Route path={routes.authorized.bisc().providers.detail().data.index} exact={true} component={DataView} />
            <Route
                path={routes.authorized.bisc().providers.detail().data.update}
                exact={true}
                component={DataUpdateView}
            />
            <Route path={routes.authorized.bisc().providers.detail().coworkers.index} component={CoworkersView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default ProviderDetailView
