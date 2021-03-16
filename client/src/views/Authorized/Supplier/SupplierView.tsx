import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes/routes'
import SupplierCreateView from './SupplierCreateView'
import SupplierDetailView from './SupplierDetail/SupplierDetailView'
import { SupplierOverviewView } from './SupplierOverviewView'

interface Props {}

export const SupplierView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.supplier.index} exact={true} to={routes.authorized.supplier.overview} />
            <Route path={routes.authorized.supplier.overview} exact={true} component={SupplierOverviewView} />
            <Route path={routes.authorized.supplier.create} exact={true} component={SupplierCreateView} />
            <Route path={routes.authorized.supplier.read.index()} component={SupplierDetailView} />
        </Switch>
    )
}
