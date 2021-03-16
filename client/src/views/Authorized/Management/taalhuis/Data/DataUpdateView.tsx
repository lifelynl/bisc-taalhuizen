import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import BranchInformationFieldset from '../../../../../components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset from '../../../../../components/fieldsets/shared/ContactInformationFieldset'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { Forms } from '../../../../../utils/forms'
import { ManagementDetailDataMock, managementDetailDataMockResponse } from '../Mock/managementDetailMock'

interface Props {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [loadTaalhuis, { loading: queryLoading, error }] = useMockMutation<
        ManagementDetailDataMock,
        ManagementDetailDataMock
    >(managementDetailDataMockResponse, false)

    const { loading, data } = useMockQuery<ManagementDetailDataMock, {}>(managementDetailDataMockResponse, false)

    const [updateTaalhuis, { loading: updateLoading }] = useMockMutation<
        ManagementDetailDataMock,
        ManagementDetailDataMock
    >(managementDetailDataMockResponse, false)

    return renderForm()

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<ManagementDetailDataMock>(e)
            const response = await updateTaalhuis(formData)

            if (!response) {
                NotificationsManager.error(
                    i18n._(t`Het is niet gelukt om uw gegevens aan te passen`),
                    i18n._(t`Probeer het later opnieuw`)
                )
            }

            NotificationsManager.success(
                i18n._(t`Uw gegevens zijn opgeslagen`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.management.taalhuis.data.read)
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om uw gegevens aan te passen`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    function renderForm() {
        if (queryLoading || loading) {
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
                    <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />
                    <BranchInformationFieldset
                    // prefillData={{
                    //     nameTaalhuis: data?.nameTaalhuis ? data.nameTaalhuis : '',
                    //     street: data?.street ? data?.street : '',
                    //     streetNo: data?.streetNo ? data?.streetNo : '',
                    //     postcode: data?.postcode ? data?.postcode : '',
                    //     city: data?.city ? data?.city : '',
                    // }}
                    />
                </Column>
                <HorizontalRule />
                <ContactInformationFieldset
                // prefillData={{
                //     phoneNumberContactPerson: data?.phoneNumberContactPerson ? data?.phoneNumberContactPerson : '',
                //     contact: data?.contact ? data.contact : '',
                // }}
                />
                <Space pushTop={true} />
                <Actionbar
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
            </Form>
        )
    }
}

export default DataUpdateView
