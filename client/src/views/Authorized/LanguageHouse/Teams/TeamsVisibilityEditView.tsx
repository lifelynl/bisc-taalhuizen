import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { DEFAULT_INITIAL_PAGE_SIZE } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { TeamsVisibilityCheckboxFields } from 'components/Domain/LanguageHouse/Team/TeamsVisibilityTable'
import { TeamsVisibilityTableContainer } from 'components/Domain/LanguageHouse/Team/TeamsVisibilityTableContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useEditTeamsMutation, useTeamsQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { Forms } from 'utils/forms'

export const TeamsVisibilityEditView: React.FunctionComponent = () => {
    const history = useHistory()
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!
    const organizationSlug = sessionContext.organizationSlug

    const teamsQuery = useTeamsQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            organizationId: organizationId,
        },
    })

    const [mutate, { loading, error }] = useEditTeamsMutation({
        update(cache) {
            cache.evict({ fieldName: 'teams' })
        },
    })

    const basePath = languageHouseRoutes(organizationSlug).teams

    return (
        <Form onSubmit={handleEdit}>
            <MutationErrorProvider mutationError={error?.message}>
                <TeamsVisibilityTableContainer teamsQuery={teamsQuery} />
            </MutationErrorProvider>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            disabled={loading}
                            onClick={() => history.push(basePath.visibility)}
                        >
                            {i18n._(`Annuleren`)}
                        </Button>

                        <Button loading={loading} type={ButtonType.primary} submit={true}>
                            {i18n._(`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const selectedTeams = Forms.getFormDataFromFormEvent<TeamsVisibilityCheckboxFields>(e).teams || []
        const teams = (teamsQuery.data?.teams.nodes || []).map(t => ({
            teamId: t.id,
            hiddenFromPublic: !selectedTeams.includes(t.id),
        }))

        try {
            await mutate({ variables: { input: { teams } } })

            NotificationsManager.success(i18n._(`Teams zichtbaarheid succesvol aangepast`))

            history.push(basePath.visibility)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
