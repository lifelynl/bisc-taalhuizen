import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { useParams } from 'react-router-dom'
import { TeamDetailRouteParams } from 'routes/languageHouse/languageHouseRoutes'
import { TeamDetailContainer } from 'components/Domain/LanguageHouse/Team/TeamDetailContainer'
import { EmployeeRole, useTeamQuery } from 'graphql/v2/generated/graphql'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const TeamDetailView: React.FunctionComponent = () => {
    const { teamId } = useParams<TeamDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error, refetch } = useTeamQuery({
        variables: {
            teamId: teamId,
        },
    })

    if (!data?.team || loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }
    if (error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <>
            <Headline
                title={data.team.name}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(sessionContext.organizationSlug).teams.overview,
                        ]}
                    />
                }
                spacingType={SpacingType.default}
            />
            <TeamDetailContainer team={data.team} onEditMembers={refetch} />
            <Actionbar
                hide={sessionContext.user?.currentEmployee?.role === EmployeeRole.Employee}
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        onClick={() => history.push(languageHouseRoutes(organizationSlug).teams.detail(teamId).update)}
                    >
                        {i18n._('Bewerken')}
                    </Button>
                }
            />
        </>
    )
}
