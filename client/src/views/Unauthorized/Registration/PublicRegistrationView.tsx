import React, { useEffect, useRef, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import {
    PublicRegistrationFields,
    PublicRegistrationFieldsFormModel,
} from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'
import { PublicRegistrationActionBar } from 'components/Domain/PublicRegistration/PublicRegistrationActionBar/PublicRegistrationActionBar'
import { PublicRegistrationHeader } from 'components/Domain/PublicRegistration/PublicRegistrationHeader/PublicRegistrationHeader'
import { IconType } from 'components/Core/Icon/IconType'
import { Forms } from 'utils/forms'
import { LandingPageContainer } from 'components/Domain/LandingPage/LandingPageContainer'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { publicRegistrationFieldsMapper } from 'components/Domain/Participation/mappers/publicRegistrationFieldsMapper'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { RouteComponentProps } from 'react-router-dom'
import { useRegisterStudentMutation } from 'graphql/v2/generated/graphql'

interface Props extends RouteComponentProps {
    isSelf: boolean
}

export const PublicRegistrationView: React.FC<Props> = ({ isSelf }) => {
    const { i18n } = useLingui()

    const [hasAcceptedToShareDetailsWithLanguageHouse, setHasAcceptedToShareDetailsWithLanguageHouse] =
        useState<boolean>(false)
    const [isSucces, setIsSucces] = useState<boolean>()
    const formRef = useRef<HTMLFormElement>()
    const [registerStudentMutation, { loading, error }] = useRegisterStudentMutation()

    useEffect(() => {
        document.title = `TOP - Registratie`

        return function cleanup() {
            document.title = `TOP - Inloggen`
        }
    }, [])

    return (
        <>
            <PublicRegistrationHeader
                title={i18n._(isSelf ? t`Aanmelden bij een Taalhuis` : t`Aanmelding deelnemer Taalhuis`)}
                subtitle={i18n._(
                    isSelf
                        ? t`Met dit formulier kunt u zich aanmelden voor deelname aan activiteiten bij een Taalhuis.`
                        : t`Met dit formulier kun je een deelnemer aanmelden voor deelname aan activiteiten bij een Taalhuis.`
                )}
                description={i18n._(
                    isSelf
                        ? t`Na uw aanmelding nemen we contact met u op om een afspraak te maken. Tijdens deze afspraak bespreken we welke aanpak voor u het meest geschikt is.`
                        : t`Wanneer wij de aanmelding ontvangen hebben nemen we contact op met de deelnemer om een afspraak te maken voor een intake. Tijdens deze intake bekijken we welke aanpak voor deze deelnemer het meest geschikt is.`
                )}
                success={isSucces}
                successTitle={i18n._(isSelf ? t`U bent succesvol aangemeld` : t`Deelnemer succesvol aangemeld`)}
                fullViewportHeight={isSucces && !shouldShowForm()}
            />
            {shouldShowForm() && (
                <Form onSubmit={handleCreate} onRef={formRef}>
                    <LandingPageContainer>
                        <MutationErrorProvider mutationError={error?.message}>
                            <PublicRegistrationFields
                                hasAcceptedToShareDetailsWithLanguageHouse={hasAcceptedToShareDetailsWithLanguageHouse}
                                setHasAcceptedToShareDetailsWithLanguageHouse={
                                    setHasAcceptedToShareDetailsWithLanguageHouse
                                }
                                isSelfRegistration={isSelf}
                            />
                        </MutationErrorProvider>
                    </LandingPageContainer>
                    <PublicRegistrationActionBar>
                        <Button
                            icon={IconType.send}
                            type={ButtonType.primary}
                            submit={true}
                            loading={loading}
                            disabled={!hasAcceptedToShareDetailsWithLanguageHouse}
                        >
                            {i18n._(t`Versturen`)}
                        </Button>
                    </PublicRegistrationActionBar>
                </Form>
            )}
        </>
    )

    function shouldShowForm() {
        if (isSelf) {
            if (isSucces) {
                return false // for self registration: hide form after success
            }
        }

        return true
    }

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<PublicRegistrationFieldsFormModel>(e)
        const input = publicRegistrationFieldsMapper(formData)
        try {
            await registerStudentMutation({ variables: { input: { ...input, forSelf: isSelf } } })
            handleSuccess()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }

    function handleSuccess() {
        setIsSucces(true)
        formRef.current?.reset()
        window.scrollTo(0, 0)
    }
}
