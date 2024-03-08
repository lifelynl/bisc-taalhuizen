import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ManagementLanguageHouseDetailsView } from './Details/ManagementLanguageHouseDetailsView'
import { ManagementLanguageHouseEmployeesView } from './Employees/ManagementLanguageHouseEmployeesView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const ManagementLanguageHouseView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    return (
        <Switch>
            <Redirect
                path={languageHouseRoutes().management.index}
                exact={true}
                to={languageHouseRoutes(sessionContext.organizationSlug).management.languageHouseDetails.index}
            />

            <Route
                path={languageHouseRoutes().management.languageHouseDetails.index}
                component={ManagementLanguageHouseDetailsView}
            />
            <Route
                path={languageHouseRoutes().management.coworkers.index}
                component={ManagementLanguageHouseEmployeesView}
            />
        </Switch>
    )
}
