import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ActiveParticipantsView } from './ActiveParticipantsView'
import { ParticipantDetailView } from './Detail/ParticipantDetailView'
import { FinishedParticipantsView } from './FinishedParticipantsView'
import { ParticipantsProviderCreateView } from './ParticipantsProviderCreateView'
import { NewParticipantsView } from './NewParticipantsView'

export const ParticipantsView: React.FunctionComponent = () => {
    const { permissions, organizationSlug } = useContext(SessionContext)
    const canAccessReferredParticipants = permissions?.canAccessReferredParticipants()

    return (
        <Switch>
            <Route
                path={providerRoutes().participants.overviews.ongoing}
                exact={true}
                component={ActiveParticipantsView}
            />
            <Route
                path={providerRoutes().participants.create}
                exact={true}
                component={ParticipantsProviderCreateView}
            />
            <Route
                path={providerRoutes().participants.overviews.finished}
                exact={true}
                component={FinishedParticipantsView}
            />
            {canAccessReferredParticipants && (
                <Route
                    path={providerRoutes().participants.overviews.referredOrNew}
                    exact={true}
                    component={NewParticipantsView}
                />
            )}
            <Route path={providerRoutes().participants.detail().index} component={ParticipantDetailView} />

            <Redirect
                path={providerRoutes().participants.index}
                to={providerRoutes(organizationSlug).participants.overviews.ongoing}
            />
        </Switch>
    )
}
