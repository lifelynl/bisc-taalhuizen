import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import AppChrome from 'components/Chrome/AppChrome'
import { routes } from 'routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import { LanguageHouseView } from './LanguageHouse/LanguageHouseView'
import { BiscView } from './Bisc/BiscView'
import { ProfileDataView } from './Profile/ProfileDataView'
import { ProfileUpdateView } from './Profile/ProfileUpdateView'
import { OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { accessTokenLocalstorageKey, refreshTokenLocalstorageKey } from 'components/Providers/SessionProvider/constants'
import { ProviderView } from './Provider/ProviderView'
import { SelectOrganization } from './SelectOrganization/SelectOrganization'
import { SessionLocationState } from 'components/Providers/SessionProvider/SessionProvider'

interface Props {}

export const AuthorizedView: FunctionComponent<Props> = () => {
    const { user, loggedInUser, userLoading, organizationSlug, hasMultipleEmployees, logout } =
        useContext(SessionContext)
    const history = useHistory()
    const location = useLocation<SessionLocationState>()
    const [sleepUntil, setSleepUntil] = useState<Date | null>()

    /**
     * By default, we want to send the current history.location along
     * with the auto-logout redirect. This way, the user can be redirected
     * back to this location after successful login.
     *
     * However, on manual logout, we want to prevent this default behaviour.
     * The `userHasRequestedLogout` can tell us that this is a manual logout.
     * The flag must be set in the current history state, right before handling logout.
     */
    const getHistoryStateForLogoutRedirect = useCallback(() => {
        const userHasRequestedLogout = location.state?.userHasRequestedLogout || false

        if (userHasRequestedLogout) {
            return { userHasRequestedLogout: true }
        }

        return { intendedLocation: history.location }
    }, [history, location.state])

    useEffect(() => {
        /**
         * If there is no user (after loading),
         * we want to redirect the user to the login page.
         */
        if (location.state?.switchingOrganization) {
            // if no sleep until, set & return
            if (!sleepUntil) {
                setSleepUntil(new Date(Date.now() + 3000))
                return
            }

            // if sleep until is in the future, return
            if (sleepUntil > new Date()) {
                return
            }

            // if sleep until is in the past, reset & continue
            setSleepUntil(null)
            location.state.switchingOrganization = false
        }

        if (!user && !loggedInUser && !userLoading) {
            if (hasLoggedInBefore) {
                /**
                 * The hasLoggedInBefore flag tells us that the user has been
                 * automatically logged out (e.g. expired token).
                 * We want to show the 'logged-out' page.
                 */
                logout?.()
                history.push(routes.unauthorized.loggedout, getHistoryStateForLogoutRedirect())
            } else {
                history.push(routes.unauthorized.login, getHistoryStateForLogoutRedirect())
            }
        }

        if (!user?.currentEmployee && loggedInUser && !userLoading && hasMultipleEmployees) {
            if (
                !localStorage.getItem(accessTokenLocalstorageKey) &&
                !localStorage.getItem(refreshTokenLocalstorageKey)
            ) {
                logout?.()
                history.push(routes.unauthorized.loggedout, getHistoryStateForLogoutRedirect())
                return
            }
            history.push(routes.authorized.select)
        }

        if (user || loggedInUser) {
            hasLoggedInBefore = true
        }
    }, [
        user,
        loggedInUser,
        user?.accessGroup,
        hasMultipleEmployees,
        userLoading,
        history,
        getHistoryStateForLogoutRedirect,
        logout,
        sleepUntil,
        location.state,
    ])

    if (!user && !loggedInUser) {
        return null
    }

    return (
        <Switch>
            <Route path={routes.authorized.select} component={SelectOrganization} />
            <AppChrome>
                <Route path={routes.authorized.profile.index} exact={true} component={ProfileDataView} />
                <Route path={routes.authorized.profile.update} exact={true} component={ProfileUpdateView} />
                {getRoutesForAccessGroup()}
            </AppChrome>
        </Switch>
    )

    function getRoutesForAccessGroup() {
        switch (user?.accessGroup) {
            case OrganizationTypeEnum.Bisc:
                return getBiscRoutes()
            case OrganizationTypeEnum.LanguageHouse:
                return getLanguageHouseRoutes()
            case OrganizationTypeEnum.Provider:
                return getProviderRoutes()
        }
    }

    function getBiscRoutes() {
        return (
            <Switch>
                <Redirect
                    path={routes.authorized.index}
                    exact={true}
                    to={routes.authorized.bisc(organizationSlug).index}
                />
                <Route path={routes.authorized.bisc().index} component={BiscView} />
                <Route component={NotFoundView} />
            </Switch>
        )
    }

    function getLanguageHouseRoutes() {
        return (
            <Switch>
                <Redirect
                    path={routes.authorized.index}
                    exact={true}
                    to={routes.authorized.languageHouse(organizationSlug).index}
                />
                <Route path={routes.authorized.languageHouse().index} component={LanguageHouseView} />
                <Route component={NotFoundView} />
            </Switch>
        )
    }

    function getProviderRoutes() {
        return (
            <Switch>
                <Redirect
                    path={routes.authorized.index}
                    exact={true}
                    to={routes.authorized.provider(organizationSlug).index}
                />
                <Route path={routes.authorized.provider().index} component={ProviderView} />
                <Route component={NotFoundView} />
            </Switch>
        )
    }
}

/**
 * This flag is set to false by default,
 * unless a (old) token is found in local storage.
 */
let hasLoggedInBefore: boolean =
    !!localStorage.getItem(accessTokenLocalstorageKey) || !!localStorage.getItem(refreshTokenLocalstorageKey)
