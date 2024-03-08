import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { LanguageHouseProvidersContainer } from 'components/Domain/LanguageHouse/Containers/LanguageHouseProvidersContainer'
import { LanguageHouseProvidersCheckboxFields } from 'components/Domain/LanguageHouse/Tables/LanguageHouseProvidersTable'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useEditOrganizationMutation } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams, biscRoutes } from 'routes/bisc/biscRoutes'
import { Forms } from 'utils/forms'

export const LanguageHouseProvidersEditView: React.FunctionComponent = () => {
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { i18n } = useLingui()
    const organizationSlug = useContext(SessionContext).organizationSlug
    const basePath = biscRoutes(organizationSlug).languageHouses.detail(languageHouseId).providers
    const history = useHistory()

    const [mutate, { loading, error }] = useEditOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizations' })
        },
    })

    return (
        <Form onSubmit={handleEdit}>
            <MutationErrorProvider mutationError={error?.message}>
                <LanguageHouseProvidersContainer languageHouseId={languageHouseId} renderActions={renderActionBar} />
            </MutationErrorProvider>
        </Form>
    )

    function renderActionBar() {
        return (
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            disabled={loading}
                            onClick={() => history.push(basePath.view)}
                        >
                            {i18n._(`Annuleren`)}
                        </Button>

                        <Button loading={loading} type={ButtonType.primary} submit={true}>
                            {i18n._(`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const { providers } = Forms.getFormDataFromFormEvent<LanguageHouseProvidersCheckboxFields>(e)

        try {
            await mutate({
                variables: {
                    input: { id: languageHouseId, providers: providers || [] },
                },
            })

            NotificationsManager.success(i18n._(`Taalhuis is bijgewerkt`))

            history.push(basePath.view)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
