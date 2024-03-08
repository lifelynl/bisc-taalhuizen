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
import Space from 'components/Core/Layout/Space/Space'
import Modal from 'components/Core/Modal/Modal'
import React, { useContext, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscProvidersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { getMappedUpdateProviderFormFields } from 'components/Domain/Provider/mappers/providerFieldsMappers'
import { BiscProviderFieldset, BiscProviderFieldsetModel } from 'components/Domain/Bisc/Provider/BiscProviderFieldset'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { DeleteModalView } from './DeleteModalView'
import { OrganizationQuery, useEditOrganizationMutation, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props extends RouteComponentProps<BiscProvidersDetailRouteParams> {}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { data, error, loading } = useOrganizationQuery({
        variables: {
            input: providerId,
        },
    })
    const [editOrganizationMutation, { loading: editLoading, error: editError }] = useEditOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organization' })
            cache.evict({ fieldName: 'organizations' })
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage({ organization }: OrganizationQuery) {
        return (
            <Form onSubmit={handleUpdate(organization)}>
                <Headline
                    title={i18n._(t`Aanbieder ${organization.name}`)}
                    TopComponent={
                        <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc(organizationName).providers.overview]} />
                    }
                />
                {renderForm(organization)}
                <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                    <DeleteModalView
                        provider={organization}
                        onClose={() => setDeleteModalOpen(false)}
                        onSuccess={() => history.push(routes.authorized.bisc(organizationName).providers.index)}
                    />
                </Modal>
            </Form>
        )
    }

    function handleUpdate(provider: OrganizationQuery['organization']) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<BiscProviderFieldsetModel>(e)
            const input = getMappedUpdateProviderFormFields(formData)

            try {
                await editOrganizationMutation({
                    variables: {
                        input: { ...input, id: provider?.id },
                    },
                })

                NotificationsManager.success(
                    i18n._(t`Aanbieder is bewerkt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de aanbieder`)
                )

                history.push(routes.authorized.bisc(organizationName).providers.detail(providerId).index)
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

    function renderForm(provider: OrganizationQuery['organization']) {
        return (
            <>
                <MutationErrorProvider mutationError={editError?.message}>
                    <BiscProviderFieldset prefillData={provider} />
                </MutationErrorProvider>
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <Button
                            type={ButtonType.secondary}
                            icon={IconType.delete}
                            danger={true}
                            onClick={() => setDeleteModalOpen(true)}
                        >
                            {i18n._(t`Aanbieder verwijderen`)}
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={loading}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.bisc(organizationName).providers.detail(providerId).data.index
                                    )
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={editLoading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default DataUpdateView
