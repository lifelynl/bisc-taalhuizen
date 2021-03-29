import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import SupplierCreateView from './SupplierCreateView'
import SupplierDetailView from './SupplierDetailView/SupplierDetailView'
import { SupplierOverviewView } from './SupplierOverviewView'

interface Props {}

export const BiscSupplierView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.supplier.index} exact={true} to={routes.authorized.supplier.bisc.index} />
            <Redirect
                path={routes.authorized.supplier.bisc.index}
                exact={true}
                to={routes.authorized.supplier.bisc.overview}
            />
            <Route path={routes.authorized.supplier.bisc.overview} exact={true} component={SupplierOverviewView} />
            <Route path={routes.authorized.supplier.bisc.create} exact={true} component={SupplierCreateView} />
            <Route path={routes.authorized.supplier.bisc.read.index} component={SupplierDetailView} />
        </Switch>
    )
}
