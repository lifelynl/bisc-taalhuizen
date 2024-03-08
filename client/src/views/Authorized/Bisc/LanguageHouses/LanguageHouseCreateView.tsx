import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useHistory } from 'react-router-dom'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import LanguageHouseInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseInformationFieldset'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import {
    LanguageHouseInformationFieldsetData,
    getMappedLanguageHouseFormFields,
} from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import {
    OrganizationTypeEnum,
    useAvailablePostalCodesQuery,
    useCreateOrganizationMutation,
} from 'graphql/v2/generated/graphql'
import postalCodesSelectLoader from 'components/Domain/LanguageHouse/Select/postalCodesSelectLoader'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'

interface Props {}

interface FormModel extends LanguageHouseInformationFieldsetData {}

const LanguageHouseCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { loading: postalCodesLoading, refetch } = useAvailablePostalCodesQuery({
        variables: {
            paginationArgs: {
                skip: 0,
                take: 20,
            },
        },
        fetchPolicy: 'no-cache',
    })
    const postalCodesLoad = postalCodesSelectLoader(refetch)
    const [createOrganizationMutation, { loading: createLoading, error }] = useCreateOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizations' })
        },
    })
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuw taalhuis`)}
                TopComponent={
                    <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc(organizationName).languageHouse.overview]} />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <LanguageHouseInformationFieldset
                    postalCodesLoading={postalCodesLoading}
                    postalCodesLoad={postalCodesLoad}
                />
            </MutationErrorProvider>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} disabled={createLoading} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={createLoading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const input = getMappedLanguageHouseFormFields(formData)

        try {
            const response = await createOrganizationMutation({
                variables: {
                    input: { ...input, type: OrganizationTypeEnum.LanguageHouse },
                },
            })

            NotificationsManager.success(
                i18n._(t`Taalhuis is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van het taalhuis`)
            )

            history.push(
                biscRoutes(organizationName).languageHouses.detail(response?.data?.createOrganization.id).index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}

export default LanguageHouseCreateView
