import { t } from '@lingui/macro'
import styles from './SelectOrganization.module.scss'
import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Logo from 'components/Core/Logo/Logo'
import ContentGreetingPageLayout from 'components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from 'components/Core/Text/PageTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { NameFormatters } from 'utils/formatters/name/Name'
import UserOrganizationList from 'components/Domain/Shared/components/UserOrganizationList/UserOrganizationList'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps {}

export const SelectOrganization: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { hasMultipleEmployees, loggedInUser, fetchUser } = useContext(SessionContext)

    if (!loggedInUser || !hasMultipleEmployees) {
        // the user must have arrived at this page by accident, so we redirect them to their index
        // and resetting router state to prevent the user from going back to this page
        history.replace(routes.authorized.index, {})
        return null
    }

    const fullName = loggedInUser?.person
        ? NameFormatters.formattedFullname(loggedInUser.person)
        : i18n._(t`Naam niet gevonden`)

    return (
        <ContentGreetingPageLayout
            TopComponent={<Logo text={i18n._(t`TOP`)} />}
            ContentComponent={
                <Column spacing={8}>
                    <Column spacing={5}>
                        <PageTitle lighter={true} title={i18n._(t`Kies een omgeving`)} />
                        <Paragraph className={styles.welcomeParagraph} bold={true}>
                            {i18n._(t`Welkom terug ${fullName ?? ''}!`)}
                        </Paragraph>
                        <Paragraph className={styles.directionParagraph}>
                            {i18n._(t`Kies in welke omgeving je wilt werken.`)}
                        </Paragraph>
                        <HorizontalRule className={styles.hr} />
                        <UserOrganizationList handleClick={handleOrganizationSelect} />
                    </Column>
                </Column>
            }
        />
    )

    async function handleOrganizationSelect(slug: string) {
        await fetchUser?.(slug)

        history.push(routes.authorized.index)
    }
}
