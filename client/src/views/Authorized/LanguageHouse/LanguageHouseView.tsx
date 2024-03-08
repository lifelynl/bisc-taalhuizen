import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsTaalhuisView } from './Participants/ParticipantsTaalhuisView'
import { ReportsView } from './Reports/ReportsView'
import { ManagementLanguageHouseView } from './Management/ManagementLanguageHouseView'
import { TeamsView } from './Teams/TeamsView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const LanguageHouseView: React.FunctionComponent<Props> = () => {
    const { organizationSlug } = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={routes.authorized.languageHouse().index}
                exact={true}
                to={routes.authorized.languageHouse(organizationSlug).participants.index}
            />

            <Route path={routes.authorized.languageHouse().participants.index} component={ParticipantsTaalhuisView} />
            <Route path={routes.authorized.languageHouse().teams.index} component={TeamsView} />
            <Route path={routes.authorized.languageHouse().reports.index} component={ReportsView} />
            <Route path={routes.authorized.languageHouse().management.index} component={ManagementLanguageHouseView} />
        </Switch>
    )
}
