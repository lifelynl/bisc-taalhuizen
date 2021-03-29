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
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from '../../../components/Chrome/Headline'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../components/Core/Form/Form'
import Row from '../../../components/Core/Layout/Row/Row'
import { TaalhuizenDocument, useCreateTaalhuisMutation } from '../../../generated/graphql'
import { routes } from '../../../routes/routes'
import { Forms } from '../../../utils/forms'

interface Props {}

interface FormModel extends BranchInformationFieldsetFormModel, ContactInformationFieldsetModel {}

const TaalhuisCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [createCoworker, { loading }] = useCreateTaalhuisMutation()
    const history = useHistory()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe taalhuis`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            <BranchInformationFieldset
                fieldNaming={{
                    branch: {
                        label: i18n._(t`Naam taalhuis`),
                        placeholder: i18n._(t`Naam`),
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
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
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.taalhuis.overview)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createCoworker({
            variables: {
                address: {
                    street: formData['branch-street'] ?? '',
                    houseNumber: formData['branch-streetNr'] ?? '',
                    houseNumberSuffix: formData['branch-streetAddition'],
                    postalCode: formData['branch-postcode'] ?? '',
                    locality: formData['branch-city'] ?? '',
                },
                name: formData.branch || '',
                email: formData['contact-email'] || '',
                phoneNumber: formData['contact-phone'] || '',
            },
            refetchQueries: [{ query: TaalhuizenDocument }],
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
                taalhuisid: encodeURIComponent(response.data.createTaalhuis.id),
                taalhuisname: response.data.createTaalhuis.name,
            })
        )
    }
}

export default TaalhuisCreateView
