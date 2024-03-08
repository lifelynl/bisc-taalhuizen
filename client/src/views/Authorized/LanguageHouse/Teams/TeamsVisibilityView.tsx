import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { DEFAULT_INITIAL_PAGE_SIZE } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Row from 'components/Core/Layout/Row/Row'
import { TeamsVisibilityTableContainer } from 'components/Domain/LanguageHouse/Team/TeamsVisibilityTableContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useTeamsQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

export const TeamsVisibilityView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const sessionContext = useContext(SessionContext)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!
    const organizationSlug = sessionContext.organizationSlug

    const teamsQuery = useTeamsQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            organizationId: organizationId,
        },
    })

    return (
        <>
            <TeamsVisibilityTableContainer teamsQuery={teamsQuery} readOnly={true} />
            {sessionContext.permissions?.canEditTeamVisibility() && (
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() => history.push(languageHouseRoutes(organizationSlug).teams.editVisibility)}
                            >
                                {i18n._(`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            )}
        </>
    )
}
