import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ManagementLanguageHouseDetailsDataView } from './ManagementLanguageHouseDetailsDataView'
import { ManagementLanguageHouseDetailsUpdateView } from './ManagementLanguageHouseDetailsUpdateView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const ManagementLanguageHouseDetailsView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={languageHouseRoutes().management.languageHouseDetails.index}
                exact={true}
                to={languageHouseRoutes(sessionContext.organizationSlug).management.languageHouseDetails.data.index}
            />

            <Route
                path={languageHouseRoutes().management.languageHouseDetails.data.index}
                exact={true}
                component={ManagementLanguageHouseDetailsDataView}
            />
            <Route
                path={languageHouseRoutes().management.languageHouseDetails.data.update}
                exact={true}
                component={ManagementLanguageHouseDetailsUpdateView}
            />
        </Switch>
    )
}
