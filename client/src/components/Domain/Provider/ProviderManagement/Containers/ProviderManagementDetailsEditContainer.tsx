import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { useEditOrganizationMutation, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { Forms } from 'utils/forms'
import { getMappedUpdateProviderFormFields } from '../../mappers/providerFieldsMappers'
import {
    ProviderManagementDetailFieldset,
    ProviderManagementDetailFieldsetModel,
} from '../ProviderManagementDetailFieldset'
import { ProviderManagementTabs, ProviderManagementTabsValues } from '../Tabs/ProviderManagementTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    organizationId: string
}

export const ProviderManagementDetailsEditContainer: React.FunctionComponent<Props> = ({ organizationId }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useOrganizationQuery({ variables: { input: organizationId } })
    const [editOrganizationMutation, { loading: editLoading, error: editError }] = useEditOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organization' })
        },
    })
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <Form onSubmit={e => handleEdit(e)}>
            <Headline spacingType={SpacingType.small} title={i18n._(`Beheer`)} />
            <Column spacing={10}>
                <ProviderManagementTabs currentTab={ProviderManagementTabsValues.ProviderDetails} />
                <PageQuery data={data} loading={loading} error={error}>
                    {data => (
                        <MutationErrorProvider mutationError={editError?.message}>
                            <ProviderManagementDetailFieldset prefillData={data.organization} />
                        </MutationErrorProvider>
                    )}
                </PageQuery>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button disabled={editLoading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button type={ButtonType.primary} submit={true} loading={editLoading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const data = Forms.getFormDataFromFormEvent<ProviderManagementDetailFieldsetModel>(e)
            const editOrganizationInput = getMappedUpdateProviderFormFields(data)
            const response = await editOrganizationMutation({
                variables: { input: { ...editOrganizationInput, id: organizationId } },
            })

            if (!response || !response.data) {
                throw new Error()
            }

            NotificationsManager.success(
                i18n._(t`Aanbieder is bewerkt`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van de aanbieder`)
            )

            history.push(providerRoutes(organizationSlug).management.providerDetails.index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
        }
    }
}
