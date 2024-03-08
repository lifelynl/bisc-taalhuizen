import styles from './AppChrome.module.scss'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { EmployeeRole, OrganizationTypeEnum, PersonType } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { routes } from '../../routes/routes'
import { IconType } from '../Core/Icon/IconType'
import MainNavigation from '../Core/Navigation/MainNavigation/MainNavigation'
import MainNavigationEnvironmentCard from '../Core/Navigation/MainNavigation/MainNavigationEnvironmentCard'
import MainNavigationItem from '../Core/Navigation/MainNavigation/MainNavigationItem'
import AuthorizedContentLayout from '../Core/PageLayout/AuthorizedContentLayout'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { providerRoutes } from 'routes/provider/providerRoutes'
import Icon from 'components/Core/Icon/Icon'
import classNames from 'classnames'
import UserOrganizationList from 'components/Domain/Shared/components/UserOrganizationList/UserOrganizationList'
import Column from 'components/Core/Layout/Column/Column'
import Popover from 'components/Core/Popover/Popover'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { SessionLocationState } from 'components/Providers/SessionProvider/SessionProvider'

interface Props {}

const AppChrome: React.FunctionComponent<Props> = props => {
    const { children } = props
    const { i18n } = useLingui()
    const { user, logout, permissions, organizationSlug, fetchUser } = useContext(SessionContext)

    const location = useLocation()
    const history = useHistory()

    if (!user || !user.accessGroup) {
        return null
    }

    const hasMultipleOrganizations = !!user.person?.employees?.length && user.person?.employees?.length > 1
    const fullName = user.person
        ? NameFormatters.formattedFullname(user.person as Partial<PersonType>)
        : i18n._(t`Naam niet gevonden`)

    const popperButtonContainer = classNames(styles.buttonContainer, {
        [styles['is-bisc']]: user.accessGroup === OrganizationTypeEnum.Bisc,
        [styles['is-languageHouse']]: user.accessGroup === OrganizationTypeEnum.LanguageHouse,
        [styles['is-provider']]: user.accessGroup === OrganizationTypeEnum.Provider,
    })

    return (
        <AuthorizedContentLayout
            NavigationComponent={
                <MainNavigation
                    organizationType={user.accessGroup}
                    TopComponent={
                        <MainNavigationEnvironmentCard
                            name={i18n._(t`TOP`)}
                            environment={
                                user.accessGroup === OrganizationTypeEnum.Bisc
                                    ? i18n._(t`BiSC`)
                                    : user.currentEmployee?.organization.name ?? ''
                            }
                            organizationType={user.accessGroup}
                        />
                    }
                    ListComponent={getNavigationByType()}
                    BottomComponent={
                        <>
                            {hasMultipleOrganizations && renderOrganizationSwitch()}
                            <MainNavigationItem
                                label={fullName ?? ''}
                                icon={IconType.profile}
                                to={routes.authorized.profile.index}
                                active={
                                    isActive(routes.authorized.profile.index) ||
                                    isActive(routes.authorized.profile.update)
                                }
                                organizationType={user.accessGroup}
                            />
                            <MainNavigationItem
                                label={i18n._(t`Uitloggen`)}
                                icon={IconType.logOut}
                                onClick={async () => {
                                    /**
                                     * The default app behaviour is to redirect the user back to the location he originated from,
                                     * right after successful login. But when the user manually logs out, we don't want this to happen.
                                     * The flag `userHasRequestedLogout: true` prevents this default behaviour.
                                     */
                                    history.replace(history.location, { userHasRequestedLogout: true })
                                    await logout?.()
                                }}
                                organizationType={user.accessGroup}
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

        if (user.accessGroup === OrganizationTypeEnum.Bisc) {
            return renderBiscNavigation()
        }

        if (user.accessGroup === OrganizationTypeEnum.LanguageHouse) {
            return renderLanguageHouseNavigation()
        }

        if (user.accessGroup === OrganizationTypeEnum.Provider) {
            return renderProviderNavigation()
        }

        return null
    }

    function renderBiscNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Taalhuizen`)}
                    icon={IconType.languageHouse}
                    active={isActive(routes.authorized.bisc(organizationSlug).languageHouses.index)}
                    to={routes.authorized.bisc(organizationSlug).languageHouses.index}
                    organizationType={OrganizationTypeEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Aanbieders`)}
                    icon={IconType.providers}
                    active={isActive(routes.authorized.bisc(organizationSlug).providers.index)}
                    to={routes.authorized.bisc(organizationSlug).providers.index}
                    organizationType={OrganizationTypeEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Rapportages`)}
                    icon={IconType.rapportage}
                    active={isActive(routes.authorized.bisc(organizationSlug).reports.index)}
                    to={routes.authorized.bisc(organizationSlug).reports.index}
                    organizationType={OrganizationTypeEnum.Bisc}
                />
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(routes.authorized.bisc(organizationSlug).management.index)}
                    to={routes.authorized.bisc(organizationSlug).management.index}
                    organizationType={OrganizationTypeEnum.Bisc}
                />

                {/* {renderDev()} */}
            </>
        )
    }

    function renderLanguageHouseNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.languageHouse}
                    active={isActive(languageHouseRoutes(organizationSlug).participants.index)}
                    to={languageHouseRoutes(organizationSlug).participants.index}
                    organizationType={OrganizationTypeEnum.LanguageHouse}
                />
                <MainNavigationItem
                    label={i18n._(t`Teams`)}
                    icon={IconType.profile}
                    active={isActive(languageHouseRoutes(organizationSlug).teams.index)}
                    to={languageHouseRoutes(organizationSlug).teams.index}
                    organizationType={OrganizationTypeEnum.LanguageHouse}
                />
                {user?.currentEmployee?.role === EmployeeRole.Coordinator && (
                    <MainNavigationItem
                        label={i18n._(t`Rapportages`)}
                        icon={IconType.rapportage}
                        active={isActive(languageHouseRoutes(organizationSlug).reports.index)}
                        to={languageHouseRoutes(organizationSlug).reports.index}
                        organizationType={OrganizationTypeEnum.LanguageHouse}
                    />
                )}
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(languageHouseRoutes(organizationSlug).management.index)}
                    to={languageHouseRoutes(organizationSlug).management.index}
                    organizationType={OrganizationTypeEnum.LanguageHouse}
                />
                {/* {renderDev()} */}
            </>
        )
    }

    function renderProviderNavigation() {
        return (
            <>
                <MainNavigationItem
                    label={i18n._(t`Deelnemers`)}
                    icon={IconType.languageHouse}
                    active={isActive(providerRoutes(organizationSlug).participants.index)}
                    to={providerRoutes(organizationSlug).participants.index}
                    organizationType={OrganizationTypeEnum.Provider}
                />
                <MainNavigationItem
                    label={i18n._(t`Groepen`)}
                    icon={IconType.group}
                    active={isActive(providerRoutes(organizationSlug).groups.index)}
                    to={providerRoutes(organizationSlug).groups.index}
                    organizationType={OrganizationTypeEnum.Provider}
                />
                {permissions?.canAccessExports() && (
                    <MainNavigationItem
                        label={i18n._(t`Rapportages`)}
                        icon={IconType.rapportage}
                        active={isActive(providerRoutes(organizationSlug).reports.index)}
                        to={providerRoutes(organizationSlug).reports.index}
                        organizationType={OrganizationTypeEnum.Provider}
                    />
                )}
                <MainNavigationItem
                    label={i18n._(t`Beheer`)}
                    icon={IconType.settings}
                    active={isActive(providerRoutes(organizationSlug).management.index)}
                    to={providerRoutes(organizationSlug).management.index}
                    organizationType={OrganizationTypeEnum.Provider}
                />
            </>
        )
    }

    function renderOrganizationSwitch() {
        return (
            <Popover
                buttonStyling={popperButtonContainer}
                popoverButton={() => (
                    <>
                        <Icon type={IconType.languageHouse} className={styles.icon} />
                        <p className={styles.label}>{i18n._(t`Kies een omgeving`)}</p>
                    </>
                )}
                popoverDisplay={() => (
                    <Column spacing={5}>
                        <UserOrganizationList handleClick={handleOrganizationSelect} />
                    </Column>
                )}
            />
        )
    }

    async function handleOrganizationSelect(slug: string, type: OrganizationTypeEnum) {
        let path: string
        switch (type) {
            case OrganizationTypeEnum.Bisc:
                path = biscRoutes(slug).index
                break
            case OrganizationTypeEnum.LanguageHouse:
                path = languageHouseRoutes(slug).index
                break
            case OrganizationTypeEnum.Provider:
                path = providerRoutes(slug).index
                break
            default:
                throw new Error('Unknown organization type')
        }

        const state: SessionLocationState = { switchingOrganization: true }
        history.replace(path, state)

        await fetchUser?.(slug)
    }

    function isActive(indexRoute: string) {
        return !!location.pathname.startsWith(indexRoute)
    }
}

export default AppChrome
