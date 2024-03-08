import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { routes } from '../../routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import LoggedOut from './LoggedOut/LoggedOut'
import LoginView from './Login/LoginView'
import ResetPassword from './ResetPassword/ResetPassword'
import { SessionLocationState } from 'components/Providers/SessionProvider/SessionProvider'
import { CurrentUserQuery, OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import { BISC_PATH_START } from 'routes/bisc/biscRoutes'
import { LANGUAGEHOUSE_PATH_START } from 'routes/languageHouse/languageHouseRoutes'
import { PROVIDER_PATH_START } from 'routes/provider/providerRoutes'

interface Props {}

type currentEmployee = NonNullable<CurrentUserQuery['currentUser']>['currentEmployee']

export const UnauthorizedView: React.FunctionComponent<Props> = () => {
    const { user, userLoading, loggedInUser } = useContext(SessionContext)
    const history = useHistory()
    const location = useLocation<SessionLocationState>()
    const intendedLocation = location.state?.intendedLocation || undefined

    useEffect(() => {
        /**
         * If there is a user (after loading),
         * we want to redirect the user to the application.
         */

        if ((user || loggedInUser) && !userLoading) {
            if (intendedLocation && currentEmployeeHasAccessToLocation(user?.currentEmployee, intendedLocation)) {
                /**
                 * The `intendedLocation` state tells us that the user has been
                 * automatically logged out (e.g. expired token) after trying to access a
                 * specific location.
                 *
                 * We want to redirect the user back to that location now that the login
                 * has been successful.
                 */
                history.push(intendedLocation)
            } else {
                history.push(routes.authorized.index)
            }
        }
    }, [user, loggedInUser, userLoading, history, intendedLocation])

    if (userLoading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    return (
        <Switch>
            <Redirect path={routes.unauthorized.index} exact={true} to={routes.unauthorized.login} />
            <Route path={routes.unauthorized.login} exact={true} component={LoginView} />
            <Route path={routes.unauthorized.forgotpassword} exact={true} component={ForgotPassword} />
            <Route path={routes.unauthorized.resetpassword} exact={true} component={ResetPassword} />
            <Route path={routes.unauthorized.loggedout} exact={true} component={LoggedOut} />

            <Route component={NotFoundView} />
        </Switch>
    )

    function currentEmployeeHasAccessToLocation(currentEmployee: currentEmployee, intendedLocation: Location) {
        if (!currentEmployee) {
            return false
        }

        const paths = intendedLocation.pathname.split('/')
        if (paths.length < 2) {
            return false
        }

        switch (paths[1]) {
            case BISC_PATH_START:
                return currentEmployee.organization.type === OrganizationTypeEnum.Bisc
            case LANGUAGEHOUSE_PATH_START:
                return currentEmployee.organization.type === OrganizationTypeEnum.LanguageHouse
            case PROVIDER_PATH_START:
                return currentEmployee.organization.type === OrganizationTypeEnum.Provider
            default:
                return false
        }
    }
}
