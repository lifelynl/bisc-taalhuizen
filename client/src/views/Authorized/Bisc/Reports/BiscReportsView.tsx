import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { BiscReportsOverviewView } from './BiscReportsOverviewView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const BiscReportsView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc().reports.index}
                exact={true}
                to={routes.authorized.bisc(sessionContext.organizationSlug).reports.overview}
            />
            <Route path={routes.authorized.bisc().reports.overview} exact={true} component={BiscReportsOverviewView} />
        </Switch>
    )
}
