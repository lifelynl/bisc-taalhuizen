import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import { CoworkersView } from './Coworkers/CoworkersView'
import { DataUpdateView } from './Data/DataUpdateView'
import { DataView } from './Data/DataView'

interface Props {}

export const ManagementAanbiederView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.aanbieder.data.index}
            />

            {/* data */}
            <Redirect
                path={routes.authorized.management.aanbieder.data.index}
                exact={true}
                to={routes.authorized.management.aanbieder.data.read}
            />
            <Route path={routes.authorized.management.aanbieder.data.read} exact={true} component={DataView} />
            <Route path={routes.authorized.management.aanbieder.data.update} exact={true} component={DataUpdateView} />

            {/* coworkers */}
            <Route path={routes.authorized.management.aanbieder.coworkers.index} component={CoworkersView} />
        </Switch>
    )
}
