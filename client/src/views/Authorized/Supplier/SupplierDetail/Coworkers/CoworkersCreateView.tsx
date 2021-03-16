import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import SectionTitle from '../../../../../components/Core/Text/SectionTitle'
import AccountInformationFieldset from '../../../../../components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset from '../../../../../components/fieldsets/shared/AvailabillityFieldset'
import ContactInformationFieldset from '../../../../../components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset from '../../../../../components/fieldsets/shared/CourseInformationFieldset'
import EducationInformationFieldset from '../../../../../components/fieldsets/shared/EducationInformationFieldset'
import GuidanceInformationFieldset from '../../../../../components/fieldsets/shared/GuidanceInformationFieldset'
import InformationFieldset from '../../../../../components/fieldsets/shared/InformationFieldset'
import PersonInformationFieldset, { Roles } from '../../../../../components/fieldsets/shared/PersonInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { SupplierDetailParams } from '../../../../../routes/supplier/types'
import { Forms } from '../../../../../utils/forms'
import { coworkersCreateMock } from './mocks/coworkers'

interface FormModel {
    id: number
    lastname: string
    role: string
    createdAt: string
    updatedAt: string
}

interface Props {}

const CoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<SupplierDetailParams>()
    const [createSupplier, { loading }] = useMockMutation<FormModel, FormModel>(coworkersCreateMock, false)
    const [isVolunteer, setIsVolunteer] = useState<boolean>(false)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            await createSupplier(data)

            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.supplier.read.coworkers.index())
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    const handleOnFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)

        return setIsVolunteer(data.role.includes(Roles.volunteer))
    }

    return (
        <Form onSubmit={handleCreate} onChange={handleOnFormChange}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Medewerkers`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            <InformationFieldset />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <AccountInformationFieldset
            // roleOptions={[
            //     [Roles.coordinator],
            //     [Roles.mentor],
            //     [Roles.coordinator, Roles.mentor],
            //     [Roles.volunteer],
            // ]}
            />
            <Space pushTop={true} />
            {isVolunteer && (
                <>
                    <SectionTitle title={i18n._(t`Vrijwilliger gegevens`)} heading="H3" />
                    <Space pushTop={true} />

                    <PersonInformationFieldset />
                    <HorizontalRule />
                    <ContactInformationFieldset />
                    <HorizontalRule />
                    <GuidanceInformationFieldset />
                    <HorizontalRule />
                    <EducationInformationFieldset />
                    <HorizontalRule />
                    <CourseInformationFieldset />
                    <HorizontalRule />
                    <Space pushTop={true} />
                </>
            )}

            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.supplier.read.coworkers.overview(params))}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} icon={IconType.send}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )
}

export default CoworkerCreateView
