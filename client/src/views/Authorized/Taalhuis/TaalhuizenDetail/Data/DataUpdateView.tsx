import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Space from 'components/Core/Layout/Space/Space'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../components/Core/Form/Form'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Modal from '../../../../../components/Core/Modal/Modal'
import { useTaalhuisQuery, useUpdateTaalhuisMutation } from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../utils/forms'
import TaalhuisDeleteModalView from '../../Modals/TaalhuisDeleteModalView'

interface Props {}
interface FormModel extends BranchInformationFieldsetFormModel, ContactInformationFieldsetModel {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<TaalhuisDetailParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const decodedTaalhuisId = decodeURIComponent(params.taalhuisid || '')
    const { data, loading, error } = useTaalhuisQuery({
        variables: { taalhuisId: decodedTaalhuisId },
    })
    const [updateCoworker, { loading: mutationLoading }] = useUpdateTaalhuisMutation()

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`${params.taalhuisname}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            {renderViews()}
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
                            {i18n._(t`Taalhuis verwijderen`)}
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.taalhuis.read.index(params))}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button loading={mutationLoading} type={ButtonType.primary} submit={true}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <TaalhuisDeleteModalView
                    onClose={() => setModalIsVisible(false)}
                    taalhuisid={decodedTaalhuisId}
                    taalhuisname={params.taalhuisname}
                />
            </Modal>
        </Form>
    )

    function renderViews() {
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
                <BranchInformationFieldset
                    prefillData={{
                        branch: data?.taalhuis.name,
                        street: data?.taalhuis.address?.street,
                        streetNr: data?.taalhuis.address?.houseNumber,
                        streetAddition: data?.taalhuis.address?.houseNumberSuffix,
                        postcode: data?.taalhuis.address?.postalCode,
                        city: data?.taalhuis.address?.locality,
                    }}
                    fieldNaming={{
                        branch: {
                            label: i18n._(t`Naam taalhuis`),
                            placeholder: i18n._(t`Naam`),
                        },
                    }}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        phone: data?.taalhuis.telephone,
                        email: data?.taalhuis.email,
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
            </>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateCoworker({
            variables: {
                id: decodedTaalhuisId,
                address: {
                    street: formData['branch-street'] ?? data?.taalhuis.address?.street,
                    houseNumber: formData['branch-streetNr'] ?? data?.taalhuis.address?.houseNumber,
                    houseNumberSuffix: formData['branch-streetAddition'] ?? data?.taalhuis.address?.houseNumberSuffix,
                    postalCode: formData['branch-postcode'] ?? data?.taalhuis.address?.postalCode,
                    locality: formData['branch-city'] ?? data?.taalhuis.address?.locality,
                },
                name: formData.branch ?? data?.taalhuis.name,
                email: formData['contact-email'] || data?.taalhuis.email,
                phoneNumber: formData['contact-phone'] || data?.taalhuis.telephone,
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Taalhuis is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van het taalhuis`)
        )

        history.push(
            routes.authorized.taalhuis.read.data({
                taalhuisid: encodeURIComponent(response.data.updateTaalhuis.id),
                taalhuisname: response.data.updateTaalhuis.name,
            })
        )
    }
}

export default DataUpdateView
