import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkerDetailDataUpdateView from './CoworkerDetailData/CoworkerDetailDataUpdateView'
import CoworkerDetailDataView from './CoworkerDetailData/CoworkerDetailDataView'
import CoworkerDetailDocumentsView from './CoworkerDetailDocuments/CoworkerDetailDocumentsView'

interface Props {}

const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.read.coworkers.detail.index()}
                exact={true}
                to={routes.authorized.supplier.read.coworkers.detail.data.index()}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.data.index()}
                exact={true}
                component={CoworkerDetailDataView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.data.update()}
                exact={true}
                component={CoworkerDetailDataUpdateView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.documents.index()}
                exact={true}
                component={CoworkerDetailDocumentsView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
