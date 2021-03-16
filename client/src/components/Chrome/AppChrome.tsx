import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from '../../routes/routes'
import HorizontalRule from '../Core/HorizontalRule/HorizontalRule'
import { IconType } from '../Core/Icon/IconType'
import MainNavigation from '../Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationEnvironmentCard from '../Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import MainNavigationItem from '../Core/Navigation/MainNavigation/MainNavigationItem'
import AuthorizedContentLayout from '../Core/PageLayout/AuthorizedContentLayout'
import { SessionContext } from '../Providers/SessionProvider/context'
import { UserContext } from '../Providers/UserProvider/context'
import { Type as UserType } from '../Providers/UserProvider/types'

interface Props {}

const AppChrome: React.FunctionComponent<Props> = props => {
    const { children } = props
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const { user, changeEnvironment } = useContext(UserContext)
    const location = useLocation()

    if (!user) {
        return null
    }

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    type={user.environment}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`Top`)}
                            environment={user.environment}
                            type={user.environment}
                        />
                    }
                    ListComponent={getNavigationByType()}
                    BottomComponent={
                        <>
                            <MainNavigationItem
                                label={user.name}
                                icon={IconType.profile}
                                to={routes.authorized.profile}
                                active={active(routes.authorized.profile)}
                                type={user.environment}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={() => sessionContext.logout()}
                                type={user.environment}
                            />
                        </>
                    }
                />
            }
        >
            {children}
        </AuthorizedContentLayout>
    )

    function getNavigationByType() {
        if (!user) {
            return null
        }

        if (user.environment === UserType.bisc) {
            return (
                <>
                    <MainNavigationItem
                        label={i18n._(t`Taalhuis`)}
                        icon={IconType.taalhuis}
                        active={active(routes.authorized.taalhuis.index)}
                        to={routes.authorized.taalhuis.index}
                        type={user.environment}
                    />
                    <MainNavigationItem
                        label={i18n._(t`Aanbieders`)}
                        icon={IconType.providers}
                        active={active(routes.authorized.supplier.index)}
                        to={routes.authorized.supplier.index}
                        type={user.environment}
                    />
                    <MainNavigationItem
                        label={i18n._(t`Rapportages`)}
                        icon={IconType.rapportage}
                        active={active(routes.authorized.reports.index)}
                        to={routes.authorized.reports.index}
                        type={user.environment}
                    />
                    <MainNavigationItem
                        label={i18n._(t`Beheer`)}
                        icon={IconType.settings}
                        active={active(routes.authorized.management.index)}
                        to={routes.authorized.management.index}
                        type={user.environment}
                    />

                    {renderDev()}
                </>
            )
        }

        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.taalhuis}
                    active={active(routes.authorized.participants.index)}
                    to={routes.authorized.participants.index}
                    type={user.environment}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={active(routes.authorized.management.index)}
                    to={routes.authorized.management.index}
                    type={user.environment}
                />

                {renderDev()}
            </>
        )

        function renderDev() {
            return (
                process.env.NODE_ENV === 'development' &&
                user && (
                    <>
                        <HorizontalRule />
                        <MainNavigationItem
                            label="Kitchensink"
                            icon={IconType.biscLogo}
                            active={location.pathname === routes.authorized.kitchensink}
                            to={routes.authorized.kitchensink}
                            type={user.environment}
                        />
                        <MainNavigationItem
                            label="Lingui example"
                            icon={IconType.biscLogo}
                            active={location.pathname === routes.authorized.translationsExample}
                            to={routes.authorized.translationsExample}
                            type={user.environment}
                        />
                        <MainNavigationItem
                            label="Switch to bisc"
                            icon={IconType.biscLogo}
                            onClick={() => changeEnvironment(UserType.bisc)}
                            active={location.pathname === routes.authorized.translationsExample}
                            to={routes.authorized.translationsExample}
                            type={user.environment}
                        />
                        <MainNavigationItem
                            label="Switch to aanbieder"
                            icon={IconType.biscLogo}
                            onClick={() => changeEnvironment(UserType.aanbieder)}
                            active={location.pathname === routes.authorized.translationsExample}
                            to={routes.authorized.translationsExample}
                            type={user.environment}
                        />
                        <MainNavigationItem
                            label="Switch to taalhuis"
                            icon={IconType.biscLogo}
                            onClick={() => changeEnvironment(UserType.taalhuis)}
                            active={location.pathname === routes.authorized.translationsExample}
                            to={routes.authorized.translationsExample}
                            type={user.environment}
                        />
                    </>
                )
            )
        }
    }

    function active(indexRoute: string) {
        const firstString = location.pathname.split('/')[1]

        if (!firstString) {
            return false
        }
        return indexRoute.includes(firstString)
    }
}

export default AppChrome
