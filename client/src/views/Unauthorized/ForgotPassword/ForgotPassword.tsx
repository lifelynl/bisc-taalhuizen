import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Input from '../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../components/Core/Field/Field'
import HorizontalRule from '../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../components/Core/Icon/IconType'
import Column from '../../../components/Core/Layout/Column/Column'
import Logo from '../../../components/Core/Logo/Logo'
import ContentGreetingPageLayout from '../../../components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from '../../../components/Core/Text/PageTitle'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import { useRequestPasswordResetMutation } from '../../../generated/graphql'
import { routes } from '../../../routes/routes'
import { Forms } from '../../../utils/forms'

interface FormModel {
    email: string
}

function ForgotPassword() {
    const { i18n } = useLingui()
    const history = useHistory()
    const [success, setSuccess] = useState(false)
    const [requestPasswordReset, { loading }] = useRequestPasswordResetMutation()

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await requestPasswordReset({ variables: { email: data.email } })

            if (response.errors) {
                throw new Error(response.errors[0].message)
            }

            NotificationsManager.success(
                i18n._(t`Wij hebben uw verzoek ontvangen`),
                i18n._(t`U heeft een E-mail onvangen waarmee u uw wachtwoord kunt wijzigen.`)
            )
            setSuccess(true)
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Wij hebben uw aanvraag niet ontvangen`),
                i18n._(t`Controleeer uw gegevens en probeer het later opnieuw`)
            )
        }
    }

    return (
        <ContentGreetingPageLayout
            greeting={i18n._(t`Welkom bij Top`)}
            TopComponent={
                success ? (
                    <Logo text={i18n._(t`Top`)} />
                ) : (
                    <Link to={routes.unauthorized.login}>
                        <Button round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                    </Link>
                )
            }
            ContentComponent={renderContent()}
        />
    )

    function renderContent() {
        if (success) {
            return (
                <Column spacing={8}>
                    <Column spacing={5}>
                        <PageTitle title={i18n._(t`De wachtwoordlink is verstuurd`)} />
                        <Paragraph>
                            {i18n._(
                                t`Bedankt voor jouw aanvraag. Je ontvangt een e-mail met een link. Klik op deze link om een nieuw wachtwoord in te stellen.`
                            )}
                        </Paragraph>
                        <Button big={true} stretch={true} onClick={() => history.push(routes.unauthorized.login)}>
                            {i18n._(t`Terug naar login`)}
                        </Button>
                    </Column>
                </Column>
            )
        }

        return (
            <form onSubmit={handleForgotPassword}>
                <Column spacing={8}>
                    <Column spacing={5}>
                        <PageTitle title={i18n._(t`Wachtwoord vergeten?`)} />
                        <Paragraph>
                            {i18n._(
                                t`Vul je e-mailadres in. We mailen je dan een link om een nieuw wachtwoord in te stellen.`
                            )}
                        </Paragraph>
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
                                />
                            </Field>
                        </Column>
                        <Button big={true} stretch={true} submit={true} loading={loading}>
                            {i18n._(t`Stuur email`)}
                        </Button>
                    </Column>
                </Column>
            </form>
        )
    }
}

export default ForgotPassword
