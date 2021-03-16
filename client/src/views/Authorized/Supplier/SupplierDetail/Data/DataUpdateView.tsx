import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import Input from '../../../../../components/Core/DataEntry/Input'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../../../components/Core/Field/Field'
import Section from '../../../../../components/Core/Field/Section'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { SupplierDetailParams } from '../../../../../routes/supplier/types'
import { Forms } from '../../../../../utils/forms'
import { GenericValidators } from '../../../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../../../utils/validators/PhoneNumberValidator'
import { supplierUpdateResponse } from './mocks/mocks'

interface FormModel {
    name: string
    street: string
    postalCode: string
    city: string
    phone: string
    email: string
}

interface Props {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<SupplierDetailParams>()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { data, loading: queryLoading, error } = useMockQuery(supplierUpdateResponse)
    const [updateSupplier, { loading: updateLoading }] = useMockMutation<FormModel, FormModel>(
        supplierUpdateResponse,
        false
    )

    const [deleteSupplier, { loading: deleteLoading }] = useMockMutation<FormModel, { id: string }>(
        supplierUpdateResponse,
        false
    )

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            await updateSupplier(data)
            NotificationsManager.success(i18n._(t`Aanbieder is bewerkt`), '')
            history.push(routes.authorized.supplier.read.data(params))
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om de aanbieder te bewerken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    const handleDelete = async () => {
        try {
            await deleteSupplier({ id: params.supplierid })
            setDeleteModalOpen(false)
            NotificationsManager.success(
                i18n._(t`Aanbieder is verwijderd`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.supplier.overview)
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om de aanbieder te verwijderen`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Aanbieder ${params.suppliername}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
            <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                <ModalView
                    onClose={() => setDeleteModalOpen(false)}
                    ContentComponent={
                        <Column spacing={6}>
                            <SectionTitle
                                title={i18n._(t`Aanbieder ${params.suppliername} verwijderen`)}
                                heading="H4"
                            />
                            <Paragraph>
                                {i18n._(
                                    t`Weet je zeker dat je de aanbieder wil verwijderen? Hiermee worden ook alle onderliggende medewerkers en deelnemers verwijderd.`
                                )}
                            </Paragraph>
                        </Column>
                    }
                    BottomComponent={
                        <>
                            <Button type={ButtonType.secondary} onClick={() => setDeleteModalOpen(false)}>
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button
                                danger={true}
                                type={ButtonType.primary}
                                icon={IconType.delete}
                                onClick={handleDelete}
                                loading={deleteLoading}
                            >
                                {i18n._(t`Verwijderen`)}
                            </Button>
                        </>
                    }
                />
            </Modal>
        </Form>
    )

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
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam aanbieder`)} horizontal={true} required={true}>
                            <Input
                                defaultValue={data?.name}
                                required={true}
                                name="name"
                                placeholder={i18n._(t`Naam`)}
                                onChange={undefined}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Input
                                defaultValue={data?.street}
                                name="street"
                                placeholder={i18n._(t`Straatnaam`)}
                                onChange={undefined}
                            />
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Input
                                defaultValue={data?.postalCode}
                                name="zipcode"
                                placeholder={i18n._(t`1234 AB`)}
                                onChange={undefined}
                            />
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Input
                                defaultValue={data?.city}
                                name="place"
                                placeholder={i18n._(t`Utrecht`)}
                                onChange={undefined}
                            />
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                defaultValue={data?.phone}
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[PhoneNumberValidators.isPhoneNumber]}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                defaultValue={data?.email}
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                onChange={undefined}
                            />
                        </Field>
                    </Column>
                </Section>
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <Button
                            type={ButtonType.secondary}
                            icon={IconType.delete}
                            danger={true}
                            onClick={() => setDeleteModalOpen(true)}
                        >
                            {i18n._(t`Aanbieder verwijderen`)}
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => history.push(routes.authorized.supplier.read.data(params))}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={updateLoading}>
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default DataUpdateView
