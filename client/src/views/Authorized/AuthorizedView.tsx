import React, { useCallback, useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import AppChrome from '../../components/Chrome/AppChrome'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { UserProvider } from '../../components/Providers/UserProvider/UserProvider'
import { routes } from '../../routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import Kitchensink from './Dev/Kitchensink'
import { LinguiExample } from './Dev/LinguiExample'
import { ManagementView } from './Management/ManagementView'
import { ParticipantsView } from './Participants/ParticipantsView'
import ProfilePage from './Profile/ProfilePage'
import { ReportsView } from './Reports/ReportsView'
import { SupplierView } from './Supplier/SupplierView'
import { TaalhuisView } from './Taalhuis/TaalhuisView'

interface Props {}

export const AuthorizedView: React.FunctionComponent<Props> = () => {
    const context = useContext(SessionContext)
    const history = useHistory()

    const handleLocation = useCallback(() => {
        if (!context.accesstoken && !context.loggedout) {
            history.replace(routes.unauthorized.login)
        }
        if (!context.accesstoken && context.loggedout) {
            history.replace(routes.unauthorized.loggedout)
        }
    }, [context.loggedout, context.accesstoken, history])

    useEffect(() => {
        handleLocation()
    }, [context.accesstoken, handleLocation])

    if (!context.accesstoken) {
        return null
    }

    return (
        <UserProvider>
            <AppChrome>
                <Switch>
                    <Route path={routes.authorized.profile} exact={true} component={ProfilePage} />

                    <Route path={routes.authorized.participants.index} component={ParticipantsView} />
                    <Route path={routes.authorized.taalhuis.index} component={TaalhuisView} />
                    <Route path={routes.authorized.supplier.index} component={SupplierView} />
                    <Route path={routes.authorized.reports.index} component={ReportsView} />
                    <Route path={routes.authorized.management.index} component={ManagementView} />

                    {/* dev only */}
                    <Route path={routes.authorized.translationsExample} exact={true} component={LinguiExample} />
                    <Route path={routes.authorized.kitchensink} exact={true} component={Kitchensink} />
                    <Route component={NotFoundView} />
                </Switch>
            </AppChrome>
        </UserProvider>
    )
}
