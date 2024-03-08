import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedCreateProviderGroupFormFields } from 'components/Domain/Provider/ProviderGroups/providerGroupFieldsMapper'
import {
    ProviderGroupFormFields,
    ProviderGroupFormFieldsModel,
} from 'components/Domain/Provider/ProviderGroups/ProviderGroupFormFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useCreateEducationGroupMutation } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { Forms } from 'utils/forms'

export const CreateGroupView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const session = useContext(SessionContext)

    const [createGroup, { loading, error }] = useCreateEducationGroupMutation({
        update(cache) {
            cache.evict({ fieldName: 'educationGroups' })
        },
    })

    const organizationId = session.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe groep`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[breadcrumbItems.provider(session.organizationSlug).groups.overview]}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <ProviderGroupFormFields organizationId={organizationId} />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(providerRoutes(session.organizationSlug).groups.index)}
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
        const formData = Forms.getFormDataFromFormEvent<ProviderGroupFormFieldsModel>(e)
        const input = getMappedCreateProviderGroupFormFields(formData, organizationId!)

        try {
            const response = await createGroup({ variables: { input } })
            if (!response || !response.data) {
                throw new Error()
            }

            NotificationsManager.success(
                i18n._(t`Groep is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van de groep`)
            )

            history.push(
                providerRoutes(session.organizationSlug).groups.detail(response.data.createEducationGroup.id).data.index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
