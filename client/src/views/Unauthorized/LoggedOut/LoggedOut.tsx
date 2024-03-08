import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useHistory, useLocation } from 'react-router-dom'

import Button from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Logo from 'components/Core/Logo/Logo'
import ContentGreetingPageLayout from 'components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from 'components/Core/Text/PageTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { routes } from 'routes/routes'
import { SessionLocationState } from 'components/Providers/SessionProvider/SessionProvider'

function LoggedOut() {
    const { i18n } = useLingui()
    const history = useHistory()
    const { state } = useLocation<SessionLocationState>()
    const newLocationState = state?.userHasRequestedLogout ? {} : { intendedLocation: state?.intendedLocation }

    return (
        <ContentGreetingPageLayout TopComponent={<Logo text={i18n._(t`TOP`)} />} ContentComponent={renderContent()} />
    )

    function renderContent() {
        return (
            <>
                <Column spacing={5}>
                    <PageTitle title={i18n._(t`Uitgelogd`)} />
                    <Paragraph>
                        {i18n._(t`Je bent uitgelogd. Klik op de onderstaande knop om naar de inlogpagina te gaan.`)}
                    </Paragraph>
                </Column>
                <HorizontalRule />
                <Button
                    big={true}
                    stretch={true}
                    onClick={() => history.push(routes.unauthorized.login, newLocationState)}
                >
                    {i18n._(t`Inloggen`)}
                </Button>
            </>
        )
    }
}

export default LoggedOut
