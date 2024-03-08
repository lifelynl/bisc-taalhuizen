import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import ProviderCreateView from './ProviderCreateView'
import ProviderDetailView from './ProviderDetailView/ProviderDetailView'
import { ProviderOverviewView } from './ProviderOverviewView'

interface Props {}

export const BiscProviderView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route path={routes.authorized.bisc().providers.index} exact={true} component={ProviderOverviewView} />
            <Route path={routes.authorized.bisc().providers.create} exact={true} component={ProviderCreateView} />
            <Route path={routes.authorized.bisc().providers.detail().index} component={ProviderDetailView} />
        </Switch>
    )
}
