import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes/routes'
import TaalhuizenOverviewCreateView from './TaalhuisCreateView'
import { TaalhuisOverviewView } from './TaalhuisOverviewView'
import TaalhuizenDetailView from './TaalhuizenDetail/TaalhuizenDetailView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.taalhuis.index} exact={true} to={routes.authorized.taalhuis.overview} />
            <Route path={routes.authorized.taalhuis.overview} exact={true} component={TaalhuisOverviewView} />
            <Route path={routes.authorized.taalhuis.create} exact={true} component={TaalhuizenOverviewCreateView} />
            <Route path={routes.authorized.taalhuis.read.index()} component={TaalhuizenDetailView} />
        </Switch>
    )
}
