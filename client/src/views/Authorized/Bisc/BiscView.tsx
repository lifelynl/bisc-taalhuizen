import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ManagementBiscView } from './Management/ManagementBiscView'
import { BiscReportsView } from './Reports/BiscReportsView'
import { BiscProviderView } from './Provider/BiscProviderView'
import { LanguageHouseView } from './LanguageHouses/LanguageHouseView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const BiscView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc().index}
                exact={true}
                to={routes.authorized.bisc(sessionContext.organizationSlug).languageHouses.index}
            />
            <Route path={routes.authorized.bisc().languageHouses.index} component={LanguageHouseView} />
            <Route path={routes.authorized.bisc().providers.index} component={BiscProviderView} />
            <Route path={routes.authorized.bisc().reports.index} component={BiscReportsView} />
            <Route path={routes.authorized.bisc().management.index} component={ManagementBiscView} />
        </Switch>
    )
}
