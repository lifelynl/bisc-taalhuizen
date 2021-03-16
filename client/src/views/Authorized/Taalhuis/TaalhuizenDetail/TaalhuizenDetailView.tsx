import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { NotFoundView } from '../../../Generic/NotFoundView'
import DataView from './Data/DataView'
import DataUpdateView from './Data/DataUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { routes } from '../../../../routes/routes'

interface Props {}

const TaalhuizenDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.read.index()}
                exact={true}
                to={routes.authorized.taalhuis.read.data()}
            />
            <Route path={routes.authorized.taalhuis.read.data()} exact={true} component={DataView} />
            <Route path={routes.authorized.taalhuis.read.update()} exact={true} component={DataUpdateView} />
            <Route path={routes.authorized.taalhuis.read.coworkers.index()} component={CoworkersView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
