import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { useCreateEmployeeMutation } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscProvidersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

import Headline from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'

import { SessionContext } from 'components/Providers/SessionProvider/context'
import { getMappedCreateProviderEmployeeFormFields } from 'components/Domain/Shared/mappers/providerEmployeeFieldsMappers'
import { useIsVolunteer } from 'components/Domain/Shared/hooks/useIsVolunteer'
import {
    ProviderEmployeeFieldset,
    ProviderEmployeeFieldsetModel,
} from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'

interface Props extends RouteComponentProps<BiscProvidersDetailRouteParams> {}

export const ProviderManagementCoworkersCreateView: React.FunctionComponent<Props> = props => {
    const sessionContext = useContext(SessionContext)
    const { i18n } = useLingui()
    const history = useHistory()
    const { isVolunteer, handleOnFormChange } = useIsVolunteer()
    const providerId = sessionContext.user?.currentEmployee?.organization.id
    const [createEmployeeMutation, { loading, error }] = useCreateEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    return (
        <MutationErrorProvider mutationError={error?.message}>
            <Form onSubmit={handleCreate} onChange={handleOnFormChange}>
                <Headline
                    title={i18n._(t`Nieuwe medewerker`)}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.provider(sessionContext.organizationSlug).management.overview,
                                breadcrumbItems.provider(sessionContext.organizationSlug).management.coworkers,
                            ]}
                        />
                    }
                />

                <ProviderEmployeeFieldset isVolunteer={isVolunteer} />

                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.provider(sessionContext.organizationSlug).management.coworkers
                                            .index
                                    )
                                }
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
        </MutationErrorProvider>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (!providerId) {
                throw new Error('user has no provider id')
            }

            const data = Forms.getFormDataFromFormEvent<ProviderEmployeeFieldsetModel>(e)
            const input = getMappedCreateProviderEmployeeFormFields(data, providerId)

            const response = await createEmployeeMutation({
                variables: { createEmployeeInput: input },
            })

            if (!response || !response.data) {
                throw new Error()
            }

            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van de medewerker `)
            )

            if (data['person.email'] === sessionContext.user?.person?.email) {
                sessionContext.refetch?.()
            }

            history.push(routes.authorized.provider(sessionContext.organizationSlug).management.coworkers.index)
            // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
        }
    }
}
