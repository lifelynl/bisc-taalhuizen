import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEditProviderEducationGroupMutation, useProviderEducationGroupQuery } from 'graphql/v2/generated/graphql'
import { ProviderGroupDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import {
    ProviderGroupFormFields,
    ProviderGroupFormFieldsModel,
} from 'components/Domain/Provider/ProviderGroups/ProviderGroupFormFields'
import Row from 'components/Core/Layout/Row/Row'
import Form from 'components/Core/Form/Form'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { Forms } from 'utils/forms'
import { getMappedEditProviderGroupFormFields } from 'components/Domain/Provider/ProviderGroups/providerGroupFieldsMapper'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const GroupEditView: React.FunctionComponent = () => {
    const { groupId } = useParams<ProviderGroupDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const session = useContext(SessionContext)

    const { data, loading, error } = useProviderEducationGroupQuery({ variables: { id: groupId } })
    const [editGroup, { loading: editLoading, error: editError }] = useEditProviderEducationGroupMutation({
        update(cache) {
            cache.evict({ fieldName: 'educationGroups' })
        },
    })

    const organizationId = session.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={data?.educationGroup.name || ''}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[breadcrumbItems.provider(session.organizationSlug).groups.overview]}
                    />
                }
                spacingType={SpacingType.default}
            />
            <PageQuery data={data} loading={loading} error={error}>
                {data => (
                    <MutationErrorProvider mutationError={editError?.message}>
                        <ProviderGroupFormFields prefillData={data.educationGroup} organizationId={organizationId} />
                    </MutationErrorProvider>
                )}
            </PageQuery>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._('Annuleren')}
                        </Button>
                        <Button type={ButtonType.primary} submit={true} loading={editLoading}>
                            {i18n._('Opslaan')}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ProviderGroupFormFieldsModel>(e)
        const input = getMappedEditProviderGroupFormFields(formData, groupId)

        try {
            const response = await editGroup({ variables: { input } })
            if (!response || !response.data) {
                throw new Error()
            }

            NotificationsManager.success(
                i18n._(`Groep is bijgewerkt`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(providerRoutes(session.organizationSlug).groups.detail(groupId).data.index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
