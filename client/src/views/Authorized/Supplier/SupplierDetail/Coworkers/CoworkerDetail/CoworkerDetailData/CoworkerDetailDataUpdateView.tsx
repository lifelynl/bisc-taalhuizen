import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../../../components/Core/Layout/Center/Center'
import Row from '../../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../../components/Core/Layout/Space/Space'
import AccountInformationFieldset, {
    AccountInformationFieldsetModel,
} from '../../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset, {
    AvailabillityFieldsetModel,
} from '../../../../../../../components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset, {
    InformationFieldsetModel,
} from '../../../../../../../components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from '../../../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../../routes/routes'
import { SupplierDetailCoworkersParams } from '../../../../../../../routes/supplier/types'
import { Forms } from '../../../../../../../utils/forms'
import { coworkerDetailMock, CoworkerDetailResponseMock, coworkersCreateMock } from '../../mocks/coworkers'

interface Props {}

interface FormModel extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetModel {
    id: number
    lastname: string
    createdAt: string
    updatedAt: string
}

const CoworkerDetailDataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<SupplierDetailCoworkersParams>()

    const { loading: queryLoading, error, data } = useMockQuery<CoworkerDetailResponseMock, {}>(
        coworkerDetailMock,
        false
    )
    const [updateCoworkerCoordinator, { loading: mutationLoading }] = useMockMutation<FormModel, FormModel>(
        coworkersCreateMock,
        false
    )

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            await updateCoworkerCoordinator(data)

            NotificationsManager.success(
                i18n._(t`Coordinator medewerker is aangemaakt`),
                i18n._(t`U word teruggestuurd naar de detail pagina`)
            )
            history.push(routes.authorized.supplier.read.coworkers.detail.data.index(params))
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een coordinator medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={`${params.coworkername}`}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
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
                <InformationFieldset
                    prefillData={{
                        lastname: data.lastname,
                        insertion: data.insertion,
                        callSign: data.callSign,
                        phonenumber: data.phonenumber,
                    }}
                />
                <HorizontalRule />
                <AvailabillityFieldset
                    prefillData={{
                        available: data.available,
                        note: data.note,
                    }}
                />
                <HorizontalRule />
                <AccountInformationFieldset
                    // roleOptions={[
                    //     [Roles.coordinator],
                    //     [Roles.mentor],
                    //     [Roles.coordinator, Roles.mentor],
                    //     [Roles.volunteer],
                    // ]}
                    prefillData={{
                        email: data.email,
                        role: data.role,
                    }}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => routes.authorized.supplier.read.coworkers.detail.index(params)}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={mutationLoading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default CoworkerDetailDataView
