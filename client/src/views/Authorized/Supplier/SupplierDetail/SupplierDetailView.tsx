import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'

import { NotFoundView } from '../../../Generic/NotFoundView'
import CoworkersView from './Coworkers/CoworkersView'
import DataUpdateView from './Data/DataUpdateView'
import DataView from './Data/DataView'

interface Props {}

const SupplierDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.read.index()}
                exact={true}
                to={routes.authorized.supplier.read.data()}
            />
            <Route path={routes.authorized.supplier.read.data()} exact={true} component={DataView} />
            <Route path={routes.authorized.supplier.read.update()} exact={true} component={DataUpdateView} />
            <Route path={routes.authorized.supplier.read.coworkers.index()} component={CoworkersView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default SupplierDetailView
