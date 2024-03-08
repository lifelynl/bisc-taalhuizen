import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import Button from 'components/Core/Button/Button'
import Field from 'components/Core/Field/Field'
import Input from 'components/Core/DataEntry/Input'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Link from 'components/Core/Link/Link'
import Logo from 'components/Core/Logo/Logo'
import ContentGreetingPageLayout from 'components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from 'components/Core/Text/PageTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Forms } from 'utils/forms'
import { routes } from 'routes/routes'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface FormModel {
    email: string
    password: string
}

function LoginView() {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)

    return (
        <ContentGreetingPageLayout
            TopComponent={<Logo text={i18n._(t`TOP`)} />}
            ContentComponent={
                <form onSubmit={handleOnLogin}>
                    <Column spacing={8}>
                        <Column spacing={5}>
                            <PageTitle title={i18n._(t`Log in`)} />
                            <Paragraph>{i18n._(t`Welkom terug! Log in met je email en wachtwoord.`)}</Paragraph>
                            <HorizontalRule />
                        </Column>
                        <Column spacing={12}>
                            <Column spacing={6}>
                                <Field label={i18n._(t`E-mailadres`)}>
                                    <Input
                                        grow={true}
                                        name={'email'}
                                        type={'email'}
                                        placeholder={i18n._(t`john@doe.com`)}
                                        tabIndex={1}
                                    />
                                </Field>
                                <Field
                                    label={i18n._(t`Wachtwoord`)}
                                    RightComponent={
                                        <Link to={routes.unauthorized.forgotpassword} isInline={true} tabIndex={4}>
                                            {i18n._(t`Wachtwoord vergeten?`)}
                                        </Link>
                                    }
                                >
                                    <Input
                                        grow={true}
                                        name={'password'}
                                        type={'password'}
                                        placeholder={i18n._(t`6+ Karakters`)}
                                        tabIndex={2}
                                    />
                                </Field>
                            </Column>
                            <Button
                                big={true}
                                stretch={true}
                                submit={true}
                                loading={sessionContext?.loginLoading}
                                tabIndex={3}
                            >
                                {i18n._(t`Inloggen`)}
                            </Button>
                        </Column>
                    </Column>
                </form>
            }
        />
    )

    async function handleOnLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)

        if (!sessionContext.login) {
            throw new Error('Could not login: SessionContext provider not mounted')
        }

        try {
            const response = await sessionContext.login({
                credentials: {
                    username: data.email,
                    password: data.password,
                },
            })

            if (response.data?.login) {
                NotificationsManager.success(
                    i18n._(t`Je bent ingelogd`),
                    i18n._(t`Je wordt doorgestuurd naar de TOP omgeving`)
                )
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.message === 'Unauthorized') {
                NotificationsManager.error(i18n._(t`Deze combinatie e-mailadres & wachtwoord is onjuist`))
            } else {
                NotificationsManager.error(i18n._(t`Er is een fout opgetreden bij het inloggen.`))
            }
        }
    }
}

export default LoginView
