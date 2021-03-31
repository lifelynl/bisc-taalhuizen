import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { UserEnvironmentEnum } from '../../generated/graphql'
import { routes } from '../../routes/routes'
import { NameFormatters } from '../../utils/formatters/name/Name'
import HorizontalRule from '../Core/HorizontalRule/HorizontalRule'
import { IconType } from '../Core/Icon/IconType'
import MainNavigation from '../Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationEnvironmentCard from '../Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import MainNavigationItem from '../Core/Navigation/MainNavigation/MainNavigationItem'
import AuthorizedContentLayout from '../Core/PageLayout/AuthorizedContentLayout'
import { SessionContext } from '../Providers/SessionProvider/context'
import { UserContext } from '../Providers/UserProvider/context'

interface Props {}

const AppChrome: React.FunctionComponent<Props> = props => {
    const { children } = props
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const { user } = useContext(UserContext)
    const location = useLocation()

    if (!user) {
        return null
    }

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    type={user.userEnvironment}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`Top`)}
                            environment={user.userEnvironment}
                            type={user.userEnvironment}
                        />
                    }
                    ListComponent={getNavigationByType()}
                    BottomComponent={
                        <>
                            <MainNavigationItem
                                label={NameFormatters.formattedFullname({
                                    givenName: user.givenName,
                                    additionalName: user.additionalName,
                                    familyName: user.familyName,
                                })}
                                icon={IconType.profile}
                                to={routes.authorized.profile}
                                active={isActive(routes.authorized.profile)}
                                type={user.userEnvironment}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={() => sessionContext.logout()}
                                type={user.userEnvironment}
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

        if (user.userEnvironment === UserEnvironmentEnum.Bisc) {
            return renderBiscNavigation()
        }

        if (user.userEnvironment === UserEnvironmentEnum.Aanbieder) {
            return renderAanbiederNavigation()
        }

        if (user.userEnvironment === UserEnvironmentEnum.Taalhuis) {
            return renderTaalhuisNavigation()
        }

        return null
    }

    function renderBiscNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Taalhuis`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.taalhuis.index)}
                    to={routes.authorized.taalhuis.index}
                    type={UserEnvironmentEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Aanbieders`)}
                    icon={IconType.providers}
                    active={isActive(routes.authorized.supplier.bisc.index)}
                    to={routes.authorized.supplier.bisc.index}
                    type={UserEnvironmentEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Rapportages`)}
                    icon={IconType.rapportage}
                    active={isActive(routes.authorized.reports.index)}
                    to={routes.authorized.reports.index}
                    type={UserEnvironmentEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.management.index)}
                    to={routes.authorized.management.index}
                    type={UserEnvironmentEnum.Bisc}
                />

                {renderDev()}
            </>
        )
    }

    function renderTaalhuisNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.participants.index)}
                    to={routes.authorized.participants.index}
                    type={UserEnvironmentEnum.Taalhuis}
                />
                <MainNavigationItem
                    label={i18n._(t`Rapportages`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.reports.index)}
                    to={routes.authorized.reports.index}
                    type={UserEnvironmentEnum.Taalhuis}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.management.index)}
                    to={routes.authorized.management.index}
                    type={UserEnvironmentEnum.Taalhuis}
                />
                {renderDev()}
            </>
        )
    }

    function renderAanbiederNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.taalhuis}
                    active={isActive(routes.authorized.supplier.participants.index)}
                    to={routes.authorized.supplier.participants.index}
                    type={UserEnvironmentEnum.Aanbieder}
                />
                <MainNavigationItem
                    label={i18n._(t`Groepen`)}
                    icon={IconType.group}
                    active={isActive(routes.authorized.participants.index)} // TODO: update
                    to={routes.authorized.participants.index} // TODO: update
                    type={UserEnvironmentEnum.Aanbieder}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.supplier.management.index)}
                    to={routes.authorized.supplier.management.index}
                    type={UserEnvironmentEnum.Aanbieder}
                />
                {/* TODO: delete */}
                {renderDev()}
            </>
        )
    }

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
                        type={user.userEnvironment}
                    />
                    <MainNavigationItem
                        label="Lingui example"
                        icon={IconType.biscLogo}
                        active={location.pathname === routes.authorized.translationsExample}
                        to={routes.authorized.translationsExample}
                        type={user.userEnvironment}
                    />
                </>
            )
        )
    }

    function isActive(indexRoute: string) {
        return !!location.pathname.startsWith(indexRoute)
    }
}

export default AppChrome
