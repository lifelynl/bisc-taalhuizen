import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { GroupsView } from './Groups/GroupsView'
import { ManagementView } from './Management/ManagementView'
import { ParticipantsView } from './Participants/ParticipantsView'
import { ReportsView } from './Reports/ReportsView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ProviderView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={providerRoutes().index}
                exact={true}
                to={providerRoutes(sessionContext.organizationSlug).participants.index}
            />
            <Route path={providerRoutes().participants.index} component={ParticipantsView} />
            <Route path={providerRoutes().groups.index} component={GroupsView} />
            <Route path={providerRoutes().reports.index} component={ReportsView} />
            <Route path={providerRoutes().management.index} component={ManagementView} />
        </Switch>
    )
}
