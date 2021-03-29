import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import Modal from 'components/Core/Modal/Modal'
import AanbiederDeleteModalView from 'components/Domain/Bisc/Suppliers/DeleteSupplierModal'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { useAanbiederQuery, useUpdateAanbiederMutation } from 'generated/graphql'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { SupplierDetailLocationStateProps } from '../SupplierDetailView'

interface FormModel extends BranchInformationFieldsetFormModel, ContactInformationFieldsetModel {}

interface Props {
    routeState: SupplierDetailLocationStateProps
}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { data, loading: queryLoading, error } = useAanbiederQuery({ variables: { id: routeState.supplierId } })
    const [updateSupplier, { loading: updateLoading }] = useUpdateAanbiederMutation()

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateSupplier({
            variables: {
                id: routeState.supplierId,
                address: {
                    street: formData['branch-street'] ?? data?.aanbieder.address?.street,
                    houseNumber: formData['branch-streetNr'] ?? data?.aanbieder.address?.houseNumber,
                    houseNumberSuffix: formData['branch-streetAddition'] ?? data?.aanbieder.address?.houseNumberSuffix,
                    postalCode: formData['branch-postcode'] ?? data?.aanbieder.address?.postalCode,
                    locality: formData['branch-city'] ?? data?.aanbieder.address?.locality,
                },
                name: formData.branch ?? data?.aanbieder.name,
                email: formData['contact-email'] || data?.aanbieder.email,
                phoneNumber: formData['contact-phone'] || data?.aanbieder.telephone,
            },
        })

        if (response.errors?.length || !response.data) {
            throw new Error()
        }

        NotificationsManager.success(
            i18n._(t`Aanbieder is bewerkt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de aanbieder`)
        )

        history.push(routes.authorized.supplier.bisc.read.index)
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Aanbieder ${routeState.supplierName}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.bisc.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
            <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                <AanbiederDeleteModalView
                    supplierid={routeState.supplierId}
                    suppliername={routeState.supplierName}
                    onClose={() => setDeleteModalOpen(false)}
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
                <BranchInformationFieldset
                    fieldNaming={{
                        branch: {
                            label: i18n._(t`Naam aanbieder`),
                            placeholder: i18n._(t`Naam`),
                        },
                    }}
                    prefillData={{
                        branch: data?.aanbieder.name,
                        street: data?.aanbieder.address?.street,
                        streetNr: data?.aanbieder.address?.houseNumber,
                        streetAddition: data?.aanbieder.address?.houseNumberSuffix,
                        postcode: data?.aanbieder.address?.postalCode,
                        city: data?.aanbieder.address?.locality,
                    }}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        phone: data?.aanbieder.telephone,
                        email: data?.aanbieder.email,
                    }}
                    fieldControls={{
                        address: {
                            hidden: true,
                        },
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
                                onClick={() => history.push(routes.authorized.supplier.bisc.read.data)}
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
