import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../../components/Core/Modal/Modal'
import RegistratorInformationFieldset from '../../../../../../components/fieldsets/participants/fieldsets/RegistratorInformationFieldset'
import AdressInformationFieldset from '../../../../../../components/fieldsets/shared/AdressInformationFieldset'
import ContactInformationFieldset from '../../../../../../components/fieldsets/shared/ContactInformationFieldset'
import ExplanationInformationFieldset from '../../../../../../components/fieldsets/shared/ExplanationInformationFieldset'
import NameInformationFieldset from '../../../../../../components/fieldsets/shared/NameInformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../routes/routes'
import { RegistrationsMock, taalhuisRegistrationsCreateResponse } from '../../../mocks/registrations'
import { RegistrationsDetailLocationStateProps } from '../RegistrationsView'
import { RegistrationDeleteModal } from './RegistrationDeleteModal'

interface Props {
    routeState: RegistrationsDetailLocationStateProps
}

export const RegistrationReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    const { loading, error, data } = useMockQuery<RegistrationsMock, {}>(taalhuisRegistrationsCreateResponse, false)
    const [
        taalhuisRegistration,
        { loading: acceptRegistratorLoading, error: acceptRegistratorError, data: acceptRegistratorData },
    ] = useMockMutation<RegistrationsMock, {}>(taalhuisRegistrationsCreateResponse, false)

    return (
        <>
            <Headline
                title={routeState.registrationName}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.index}
                        />
                        <Breadcrumb
                            text={i18n._(t`Aanmeldingen`)}
                            to={routes.authorized.participants.taalhuis.registrations.overview}
                        />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.default}
            />
            <Column spacing={10}>{renderForm()}</Column>
        </>
    )

    function renderForm() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <NameInformationFieldset
                    prefillData={{
                        firstname: data.firstName,
                        insertion: data.insertion,
                        lastname: data.lastName,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <AdressInformationFieldset
                    prefillData={{
                        street: data.street,
                        streetNr: data.streetNr,
                        postalCode: data.postalCode,
                        city: data.city,
                    }}
                    readOnly={true}
                />
                <HorizontalRule />
                <RegistratorInformationFieldset
                    prefillData={{
                        date: data.date,
                        registeringParty: data.registeringParty,
                        registratorName: data.registratorName,
                        registratorEmail: data.registratorEmail,
                        registratorPhone: data.registratorPhone,
                    }}
                    readOnly={true}
                />

                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        email: data.email,
                        phone: data.phone,
                    }}
                    readOnly={true}
                    fieldControls={{
                        postalCode: {
                            hidden: true,
                        },
                        city: {
                            hidden: true,
                        },
                        phoneNumberContactPerson: {
                            hidden: true,
                        },
                        contactPreference: {
                            hidden: true,
                        },
                    }}
                />
                <HorizontalRule />
                <ExplanationInformationFieldset
                    prefillData={{
                        note: data.note,
                    }}
                    readOnly={true}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                icon={IconType.delete}
                                type={ButtonType.secondary}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`Aanmelding verwijderen`)}
                            </Button>
                            <Button
                                icon={IconType.checkmark}
                                type={ButtonType.primary}
                                onClick={handleRegistrator}
                                loading={acceptRegistratorLoading}
                            >
                                {i18n._(t`Aanmelding accepteren`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <RegistrationDeleteModal
                        registrationId={routeState.registrationId}
                        registrationName={routeState.registrationName}
                        onClose={() => setModalIsVisible(false)}
                    />
                </Modal>
            </>
        )
    }

    async function handleRegistrator() {
        await taalhuisRegistration(taalhuisRegistrationsCreateResponse)
        if (acceptRegistratorError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (acceptRegistratorData) {
            NotificationsManager.success(
                i18n._(t`Aanmelder is geaccepteerd`),
                i18n._(t`Je wordt teruggestuurd naar de overzichtspagina`)
            )
            history.push(routes.authorized.participants.taalhuis.registrations.overview)
        }
    }
}
