import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscProvidersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { useCreateEmployeeMutation, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import {
    ProviderEmployeeFieldset,
    ProviderEmployeeFieldsetModel,
} from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { getMappedCreateProviderEmployeeFormFields } from 'components/Domain/Shared/mappers/providerEmployeeFieldsMappers'
import { useIsVolunteer } from 'components/Domain/Shared/hooks/useIsVolunteer'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props extends RouteComponentProps<BiscProvidersDetailRouteParams> {}

const CoworkerCreateView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const { isVolunteer, handleOnFormChange } = useIsVolunteer()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    const [createEmployee, createEmployeeMutation] = useCreateEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    const { data: providerData } = useOrganizationQuery({
        variables: { input: providerId },
        fetchPolicy: 'no-cache',
    })

    return (
        <Form onSubmit={handleCreate} onChange={handleOnFormChange}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.bisc(organizationName).providers.overview,
                            breadcrumbItems
                                .bisc(organizationName)
                                .providers.detail.index(`${providerData?.organization.name}`, providerId),
                            breadcrumbItems.bisc(organizationName).providers.detail.coworkers.overview(providerId),
                        ]}
                    />
                }
            />
            <MutationErrorProvider mutationError={createEmployeeMutation.error?.message}>
                <ProviderEmployeeFieldset isVolunteer={isVolunteer} />
            </MutationErrorProvider>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(
                                    routes.authorized.bisc(organizationName).providers.detail(providerId).coworkers
                                        .index
                                )
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button
                            type={ButtonType.primary}
                            submit={true}
                            loading={createEmployeeMutation.loading}
                            icon={IconType.send}
                        >
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { providerId } = props.match.params

        const data = Forms.getFormDataFromFormEvent<ProviderEmployeeFieldsetModel>(e)
        const createEmployeeInput = getMappedCreateProviderEmployeeFormFields(data, providerId)

        try {
            const response = await createEmployee({ variables: { createEmployeeInput } })

            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van de medewerker `)
            )

            if (data['person.email'] === sessionContext.user?.person?.email) {
                sessionContext.refetch?.()
            }

            history.push(
                routes.authorized
                    .bisc(organizationName)
                    .providers.detail(response.data?.createEmployee.organization.id)
                    .coworkers.detail(response.data?.createEmployee.id).index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}

export default CoworkerCreateView
