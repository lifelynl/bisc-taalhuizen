import React, { useContext, useState } from 'react'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import { TeamDetailFields, TeamDetailFormFields } from 'components/Domain/LanguageHouse/Team/TeamDetailFields'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { useParams } from 'react-router-dom'
import { TeamDetailRouteParams } from 'routes/languageHouse/languageHouseRoutes'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import Form from 'components/Core/Form/Form'
import { Forms } from 'utils/forms'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { getMappedTeamFormFields } from 'components/Domain/LanguageHouse/Team/mappers/getMappedTeamFormFields'
import { IconType } from 'components/Core/Icon/IconType'
import { TeamDeleteModalContainer } from 'components/Domain/LanguageHouse/Team/TeamDeleteModalContainer'
import { TeamQuery, useEditTeamMutation, useTeamQuery } from 'graphql/v2/generated/graphql'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const TeamUpdateView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const context = useContext(SessionContext)

    const { teamId } = useParams<TeamDetailRouteParams>()

    const [modalOpen, setModalOpen] = useState(false)

    const { data, loading, error } = useTeamQuery({
        variables: {
            teamId: teamId,
        },
    })

    const [editTeamMutation, { loading: editLoading, error: editError }] = useEditTeamMutation({
        update(cache) {
            cache.evict({ fieldName: 'teams' })
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderContent}
        </PageQuery>
    )

    function renderContent(teamQuery: TeamQuery) {
        const { team } = teamQuery

        return (
            <Form onSubmit={handleEdit(team)}>
                <Headline
                    title={team.name}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[breadcrumbItems.languageHouse(context.organizationSlug).teams.overview]}
                        />
                    }
                    spacingType={SpacingType.default}
                />
                <Column spacing={10}>
                    <MutationErrorProvider mutationError={editError?.message}>
                        <TeamDetailFields team={team} showTeamMembersTable={true} />
                    </MutationErrorProvider>
                </Column>
                <TeamDeleteModalContainer
                    team={team}
                    modalOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onDelete={() => history.push(languageHouseRoutes(context.organizationSlug).teams.index)}
                />
                <Actionbar
                    LeftComponent={
                        <Button
                            type={ButtonType.secondary}
                            danger={true}
                            icon={IconType.delete}
                            onClick={() => setModalOpen(true)}
                            disabled={editLoading}
                        >
                            {i18n._('Team opheffen')}
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                disabled={editLoading}
                                onClick={() =>
                                    history.push(
                                        languageHouseRoutes(context.organizationSlug).teams.detail(teamId).index
                                    )
                                }
                            >
                                {i18n._(`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={editLoading}>
                                {i18n._('Opslaan')}
                            </Button>
                        </Row>
                    }
                />
            </Form>
        )
    }

    function handleEdit(team: TeamQuery['team']) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<TeamDetailFormFields>(e)
            const input = getMappedTeamFormFields(formData, context.user?.currentEmployee?.organization.id, team)

            try {
                await editTeamMutation({
                    variables: {
                        input: { teamId: team.id, name: input.name, postalCodeAreaIds: input.team_postalCodes },
                    },
                })

                NotificationsManager.success(
                    i18n._(`Team is bijgewerkt`),
                    i18n._(`Je wordt teruggestuurd naar het overzicht`)
                )

                history.push(languageHouseRoutes(context.organizationSlug).teams.detail(team.id).index)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
                }
            }
        }
    }
}
