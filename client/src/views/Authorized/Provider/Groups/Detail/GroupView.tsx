import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { GroupDetailView } from './GroupDetailView'
import { GroupEditView } from './GroupEditView'
import { GroupParticipantsView } from './GroupParticipantsView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const GroupView: React.FunctionComponent = () => {
    const { organizationSlug } = useContext(SessionContext)
    const basePath = providerRoutes().groups.detail()

    return (
        <Switch>
            <Redirect
                path={basePath.index}
                exact={true}
                to={providerRoutes(organizationSlug).groups.detail().data.index}
            />
            <Route path={basePath.data.index} component={GroupDetailView} />
            <Route path={basePath.data.update} component={GroupEditView} />
            <Route path={basePath.data.participants} component={GroupParticipantsView} />
        </Switch>
    )
}
