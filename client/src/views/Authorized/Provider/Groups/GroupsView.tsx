import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { ActiveGroupsOverviewView } from './ActiveGroupsOverviewView'
import { CreateGroupView } from './CreateGroupView'
import { GroupView } from './Detail/GroupView'
import { FutureGroupsOverviewView } from './FutureGroupsOverviewView'
import { PastGroupsOverviewView } from './PastGroupsOverviewView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const GroupsView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={providerRoutes().groups.index}
                exact={true}
                to={providerRoutes(sessionContext.organizationSlug).groups.overviews.active}
            />
            <Route path={providerRoutes().groups.overviews.future} component={FutureGroupsOverviewView} />
            <Route path={providerRoutes().groups.overviews.past} component={PastGroupsOverviewView} />
            <Route path={providerRoutes().groups.overviews.active} component={ActiveGroupsOverviewView} />
            <Route path={providerRoutes().groups.create} component={CreateGroupView} />
            <Route path={providerRoutes().groups.detail().index} component={GroupView} />
        </Switch>
    )
}
