import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import Input from '../../../../../../components/Core/DataEntry/Input'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../../../../components/Core/Field/Field'
import Section from '../../../../../../components/Core/Field/Section'
import Form from '../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { ManagementCoworkerParams } from '../../../../../../routes/management/types'
import { routes } from '../../../../../../routes/routes'
import { Forms } from '../../../../../../utils/forms'
import { EmailValidators } from '../../../../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../../../../utils/validators/PhoneNumberValidator'
import { FormModel } from '../CoworkerOverviewView'
import { coworkersCreateResponse } from './coworkers'

interface Props {}

const CoworkerUpdateView: React.FunctionComponent<Props> = () => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<ManagementCoworkerParams>()
    const [loadMedewerker, { loading: queryLoading, error, data }] = useMockMutation<FormModel, FormModel>(
        coworkersCreateResponse,
        false
    )

    const [updateMedewerker, { loading: updateLoading }] = useMockMutation<FormModel, FormModel>(
        coworkersCreateResponse,
        false
    )

    const [deleteCoworker, { loading: loadingDelete }] = useMockMutation<boolean, boolean>(true, false)

    if (!params.coworkerid) {
        return null
    }

    return renderForm()

    async function handleDelete() {
        const response = await deleteCoworker(true)

        if (!response) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker te verwijderen`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is verwijderd`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )

        history.push(routes.authorized.management.bisc.overview)
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await updateMedewerker(formData)

            if (!response) {
                NotificationsManager.error(
                    i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                    i18n._(t`Probeer het later opnieuw`)
                )
            }
            NotificationsManager.success(
                i18n._(t`Medewerker is bijgewerkt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.management.bisc.coworkers.read(params))
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    function renderForm() {
        if (queryLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <Form onSubmit={handleEdit}>
                <Column spacing={10}>
                    <Headline
                        title={i18n._(t`Medewerker ${params.coworkername}`)}
                        spacingType={SpacingType.small}
                        TopComponent={
                            <Breadcrumbs>
                                <Breadcrumb text={i18n._(t`Beheer`)} to={routes.authorized.management.bisc.overview} />
                            </Breadcrumbs>
                        }
                    />
                    <Section title={i18n._(t`Gegevens`)}>
                        <Column spacing={4}>
                            <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                                <Input
                                    required={true}
                                    defaultValue={i18n._(t`Wit`)}
                                    name="achternaam"
                                    placeholder={i18n._(t`Achternaam`)}
                                    validators={[GenericValidators.required]}
                                />
                            </Field>

                            <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                                <Input
                                    name="tussenvoegsel"
                                    placeholder={i18n._(t`Tussenvoegsel`)}
                                    defaultValue={i18n._(t`De`)}
                                />
                            </Field>

                            <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                                <Input
                                    name="roepnaam"
                                    defaultValue={i18n._(t`Peter`)}
                                    placeholder={i18n._(t`Roepnaam`)}
                                    required={true}
                                    validators={[GenericValidators.required]}
                                />
                            </Field>

                            <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                                <Input
                                    name="telefoonnummer"
                                    defaultValue={i18n._(t`Wit`)}
                                    placeholder={i18n._(t`030 - 526 72 80`)}
                                    validators={[PhoneNumberValidators.isPhoneNumber]}
                                />
                            </Field>
                        </Column>
                    </Section>
                </Column>
                <HorizontalRule />
                <Column spacing={12}>
                    <Section title={i18n._(t`Accountgegevens`)}>
                        <Column spacing={4}>
                            <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                                <Input
                                    name="email"
                                    defaultValue={i18n._(t`medewerker@email.nl`)}
                                    placeholder={i18n._(t`medewerker@email.nl`)}
                                    required={true}
                                    validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                                />
                            </Field>
                        </Column>
                    </Section>
                </Column>
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                danger={true}
                                icon={IconType.delete}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`medewerker verwijderen`)}
                            </Button>
                        </Row>
                    }
                    RightComponent={
                        <Row>
                            <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button
                                type={ButtonType.primary}
                                icon={IconType.send}
                                submit={true}
                                loading={updateLoading}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <ModalView
                        onClose={() => setModalIsVisible(false)}
                        ContentComponent={
                            <Column spacing={6}>
                                <SectionTitle
                                    title={i18n._(t`Medewerker ${params.coworkername} verwijderen`)}
                                    heading="H4"
                                />
                                <Paragraph>
                                    {i18n._(t`
                                Weet je zeker dat je de medewerker wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.`)}
                                </Paragraph>
                            </Column>
                        }
                        BottomComponent={
                            <>
                                <Button type={ButtonType.secondary} onClick={() => setModalIsVisible(false)}>
                                    Annuleren
                                </Button>
                                <Button
                                    danger={true}
                                    type={ButtonType.primary}
                                    icon={IconType.delete}
                                    onClick={handleDelete}
                                    loading={loadingDelete}
                                >
                                    Verwijderen
                                </Button>
                            </>
                        }
                    />
                </Modal>
            </Form>
        )
    }
}

export default CoworkerUpdateView
