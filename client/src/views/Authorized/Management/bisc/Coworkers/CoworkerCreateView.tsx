import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import Input from '../../../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../../components/Core/Field/Field'
import Section from '../../../../../components/Core/Field/Section'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { Forms } from '../../../../../utils/forms'
import { EmailValidators } from '../../../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../../../utils/validators/GenericValidators'
import { FormModel } from './CoworkerOverviewView'
import { coworkersCreateResponse } from './Detail/coworkers'

interface Props {}

const CoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createMedewerker, { data, loading }] = useMockMutation<FormModel, FormModel>(coworkersCreateResponse, false)

    return (
        <Form onSubmit={handleCreate}>
            <Column spacing={10}>
                <Headline
                    title={i18n._(t`Nieuwe Medewerker `)}
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
                                name="achternaam"
                                placeholder={i18n._(t`Wit`)}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                            <Input name="tussenvoegsel" placeholder={i18n._(t`de`)} />
                        </Field>

                        <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                            <Input
                                name="roepnaam"
                                placeholder={i18n._(t`Peter`)}
                                required={true}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input name="telefoonnummer" placeholder={i18n._(t`030 - 123 45 67`)} />
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
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                required={true}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createMedewerker(formData)

            if (!response) {
                NotificationsManager.error(
                    i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                    i18n._(t`Probeer het later opnieuw`)
                )
            }

            const medewerker = response as FormModel
            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )

            history.push(
                routes.authorized.management.bisc.coworkers.read({
                    coworkerid: medewerker.id.toString(),
                    coworkername: medewerker.roepnaam,
                })
            )
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default CoworkerCreateView
