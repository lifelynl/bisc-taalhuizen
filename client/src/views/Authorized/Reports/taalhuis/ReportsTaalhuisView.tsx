import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import { ReportsTaalhuisOverviewView } from './ReportsTaalhuisOverview'

interface Props {}

export const ReportsTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.reports.index}
                exact={true}
                to={routes.authorized.reports.taalhuis.index}
            />
            <Redirect
                path={routes.authorized.reports.taalhuis.index}
                exact={true}
                to={routes.authorized.reports.taalhuis.overview}
            />
            <Route
                path={routes.authorized.reports.taalhuis.overview}
                exact={true}
                component={ReportsTaalhuisOverviewView}
            />
        </Switch>
    )
}
