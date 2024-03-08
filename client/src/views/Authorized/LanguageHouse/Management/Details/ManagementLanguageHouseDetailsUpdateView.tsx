import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'

import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import {
    getMappedLanguageHouseFormFields,
    LanguageHouseInformationFieldsetData,
} from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import postalCodesSelectLoader from 'components/Domain/LanguageHouse/Select/postalCodesSelectLoader'
import LanguageHouseInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseInformationFieldset'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    OrganizationQuery,
    useAvailablePostalCodesQuery,
    useEditOrganizationMutation,
    useOrganizationQuery,
} from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { Forms } from 'utils/forms'

interface Props {}

interface FormModel extends LanguageHouseInformationFieldsetData {}

export const ManagementLanguageHouseDetailsUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!

    const { organizationSlug: organizationName } = sessionContext

    const { data, error, loading } = useOrganizationQuery({
        variables: {
            input: organizationId,
        },
    })

    const { refetch } = useAvailablePostalCodesQuery({
        variables: {
            paginationArgs: {
                skip: 0,
                take: 20,
            },
        },
        fetchPolicy: 'no-cache',
    })
    const postalCodesLoad = postalCodesSelectLoader(refetch)

    const [editOrganizationMutation, { loading: editLoading, error: editError }] = useEditOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organization' })
            cache.evict({ fieldName: 'organizations' })
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPageContent}
        </PageQuery>
    )

    function renderPageContent({ organization }: OrganizationQuery) {
        return (
            <Form onSubmit={handleEdit(organization)}>
                <Headline
                    title={organization.name}
                    TopComponent={<LanguageHousesDetailBreadcrumbs organizationSlug={organizationName} />}
                />
                {renderViews(organization)}
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={editLoading}
                                onClick={() =>
                                    history.push(
                                        languageHouseRoutes(sessionContext.organizationSlug).management
                                            .languageHouseDetails.data.index
                                    )
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button loading={editLoading} type={ButtonType.primary} submit={true}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        )
    }

    function handleEdit(organization: OrganizationQuery['organization']) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const input = getMappedLanguageHouseFormFields(formData)

            try {
                await editOrganizationMutation({
                    variables: {
                        input: { ...input, id: organization?.id },
                    },
                })

                NotificationsManager.success(i18n._(t`Gegevens zijn bijgewerkt`))

                history.push(languageHouseRoutes(sessionContext.organizationSlug).management.languageHouseDetails.index)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (!error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }

    function renderViews(organization: OrganizationQuery['organization']) {
        const address = organization.address

        return (
            <MutationErrorProvider mutationError={editError?.message}>
                <LanguageHouseInformationFieldset
                    prefillData={{
                        name: organization.name,
                        'address.street': address?.street,
                        'address.houseNumber': address?.houseNumber,
                        'address.houseNumberSuffix': address?.houseNumberSuffix,
                        'address.postalCode': address?.postalCode,
                        'address.locality': address?.locality,
                        telephone: organization.telephone,
                        email: organization.email,
                        postalCodes: organization?.postalCodes?.map(c => c.code),
                    }}
                    postalCodesLoad={postalCodesLoad}
                />
            </MutationErrorProvider>
        )
    }
}
