import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedTeamFormFields } from 'components/Domain/LanguageHouse/Team/mappers/getMappedTeamFormFields'
import { TeamDetailFields, TeamDetailFormFields } from 'components/Domain/LanguageHouse/Team/TeamDetailFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useCreateTeamMutation } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { Forms } from 'utils/forms'

export const TeamCreateView = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const context = useContext(SessionContext)
    const organizationId = context.user?.currentEmployee?.organization.id!

    const [createTeamMutation, { loading: createLoading, error }] = useCreateTeamMutation({
        update(cache) {
            cache.evict({ fieldName: 'teams' })
        },
    })

    return (
        <>
            <Headline
                title={i18n._(`Nieuw team`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[breadcrumbItems.languageHouse(context.organizationSlug).teams.overview]}
                    />
                }
            />
            <Form onSubmit={handleSubmit}>
                <Column spacing={10}>
                    <MutationErrorProvider mutationError={error?.message}>
                        <TeamDetailFields />
                    </MutationErrorProvider>
                </Column>
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={createLoading}
                                onClick={() => history.push(languageHouseRoutes(context.organizationSlug).teams.index)}
                            >
                                {i18n._(`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={createLoading}>
                                {i18n._('Toevoegen')}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        </>
    )

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<TeamDetailFormFields>(e)
        const input = getMappedTeamFormFields(formData, context.user?.currentEmployee?.organization.id)

        try {
            if (input.name) {
                const response = await createTeamMutation({
                    variables: {
                        input: {
                            name: input.name,
                            organizationId,
                            memberIds: input.members,
                            postalCodeAreaIds: input.team_postalCodes,
                        },
                    },
                })

                NotificationsManager.success(
                    i18n._(`Team is aangemaakt`),
                    i18n._(`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(
                    languageHouseRoutes(context.organizationSlug).teams.detail(response?.data?.createTeam.id).index
                )
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
