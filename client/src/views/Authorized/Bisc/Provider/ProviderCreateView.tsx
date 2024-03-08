import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscProviderFieldset, BiscProviderFieldsetModel } from 'components/Domain/Bisc/Provider/BiscProviderFieldset'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedProviderFormFields } from 'components/Domain/Provider/mappers/providerFieldsMappers'
import { CreateOrganizationInputType, useCreateOrganizationMutation } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

const ProviderCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    const [createOrganizationMutation, { loading, error }] = useCreateOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizations' })
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <Form onSubmit={handleCreate()}>
            <Headline
                title={i18n._(t`Nieuwe aanbieder`)}
                TopComponent={
                    <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc(organizationName).providers.overview]} />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <BiscProviderFieldset />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.bisc(organizationName).providers.index)}
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

    function handleCreate() {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<BiscProviderFieldsetModel>(e)
            const input = getMappedProviderFormFields(formData) as CreateOrganizationInputType

            try {
                const response = await createOrganizationMutation({ variables: { input } })

                NotificationsManager.success(
                    i18n._(t`Aanbieder is aangemaakt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de aanbieder`)
                )

                history.push(
                    routes.authorized.bisc(organizationName).providers.detail(response?.data?.createOrganization.id)
                        .data.index
                )
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}

export default ProviderCreateView
