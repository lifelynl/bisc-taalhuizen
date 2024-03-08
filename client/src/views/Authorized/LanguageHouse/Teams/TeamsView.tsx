import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { TeamDetailView } from './TeamDetailView'
import { TeamCreateView } from './TeamCreateView'
import { TeamsOverviewView } from './TeamsOverviewView'
import { TeamUpdateView } from './TeamUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { TeamsVisibilityView } from './TeamsVisibilityView'
import { TeamsVisibilityEditView } from './TeamsVisibilityEditView'

export const TeamsView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Route path={languageHouseRoutes().teams.overview} exact={true} component={TeamsOverviewView} />
            <Route path={languageHouseRoutes().teams.create} exact={true} component={TeamCreateView} />
            <Route path={languageHouseRoutes().teams.visibility} exact={true} component={TeamsVisibilityView} />
            <Route path={languageHouseRoutes().teams.editVisibility} exact={true} component={TeamsVisibilityEditView} />
            <Route path={languageHouseRoutes().teams.detail().index} exact={true} component={TeamDetailView} />
            <Route path={languageHouseRoutes().teams.detail().update} exact={true} component={TeamUpdateView} />
            <Redirect
                path={languageHouseRoutes().teams.index}
                to={languageHouseRoutes(sessionContext.organizationSlug).teams.overview}
            />
        </Switch>
    )
}
