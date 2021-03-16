import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from '../../../components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { useCreateTaalhuisMutation } from '../../../generated/graphql'
import { routes } from '../../../routes/routes'
import { Forms } from '../../../utils/forms'

interface Props {}

interface FormModel extends TaalhuisInformationFieldsetModel {}

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
            <TaalhuisInformationFieldset />
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
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createCoworker({
                variables: {
                    address: {
                        street: formData.street || '',
                        houseNumber: formData.streetNr || '',
                        houseNumberSuffix: formData.addition,
                        postalCode: formData.postalCode || '',
                        locality: formData.city || '',
                    },
                    name: formData.taalhuis || '',
                    email: formData.email || '',
                    phoneNumber: formData.phoneNumber || '',
                },
            })

            if (response.errors?.length || !response.data) {
                throw new Error()
            }

            if (response) {
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
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een taalhuis aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default TaalhuisCreateView
