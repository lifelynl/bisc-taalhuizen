import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import {
    LanguageHouseInformationFieldsetData,
    getMappedLanguageHouseFormFields,
} from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import postalCodesSelectLoader from 'components/Domain/LanguageHouse/Select/postalCodesSelectLoader'
import LanguageHouseInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseInformationFieldset'
import {
    OrganizationQuery,
    useAvailablePostalCodesQuery,
    useEditOrganizationMutation,
    useOrganizationQuery,
} from 'graphql/v2/generated/graphql'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import LanguageHouseDeleteModalView from '../../Modals/LanguageHouseDeleteModalView'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

interface FormModel extends LanguageHouseInformationFieldsetData {}

export const LanguageHouseDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { data, error, loading } = useOrganizationQuery({
        variables: {
            input: languageHouseId,
        },
    })
    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

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
    const { i18n } = useLingui()
    const history = useHistory()

    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

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
                    LeftComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                danger={true}
                                icon={IconType.delete}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`Taalhuis verwijderen`)}
                            </Button>
                        </Row>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={editLoading}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId)
                                            .data.index
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
                NotificationsManager.success(i18n._(t`Taalhuis is bijgewerkt`))

                history.push(routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId).index)
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
            <>
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
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <LanguageHouseDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        languageHouse={organization}
                        onSuccess={() => {
                            history.push(routes.authorized.bisc(organizationName).languageHouses.index)
                        }}
                    />
                </Modal>
            </>
        )
    }
}
