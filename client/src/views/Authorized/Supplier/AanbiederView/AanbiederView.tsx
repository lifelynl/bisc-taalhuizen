import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederParticipantsView } from './AanbiederParticipantsView/AanbiederParticipantsView'
import { AanbiederManagementView } from './AanbiederManagementView/AanbiederManagementView'

export const AanbiederView: React.FunctionComponent = () => {
    const { participants, management } = supplierRoutes

    return (
        <Switch>
            <Redirect path={supplierRoutes.index} exact={true} to={participants.index} />
            <Route path={participants.index} component={AanbiederParticipantsView} />
            <Route path={management.index} component={AanbiederManagementView} />
        </Switch>
    )
}
