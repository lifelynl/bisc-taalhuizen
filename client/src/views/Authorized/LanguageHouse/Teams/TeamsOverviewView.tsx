import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TeamsOverviewTabs, TeamsOverviewTabsEnum } from 'components/Domain/LanguageHouse/Team/TeamsOverviewTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { EmployeeRole, useTeamsQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

export const TeamsOverviewView = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const sessionContext = useContext(SessionContext)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!

    const { data, loading, error, fetchMore } = useTeamsQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            organizationId: organizationId,
        },
    })

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Teams`)} />
            <Column spacing={6}>
                <Row justifyContent="space-between">
                    <TeamsOverviewTabs currentTab={TeamsOverviewTabsEnum.teams} />
                    <Button
                        hide={sessionContext.user?.currentEmployee?.role === EmployeeRole.Employee}
                        icon={IconType.add}
                        onClick={() => history.push(languageHouseRoutes(sessionContext.organizationSlug).teams.create)}
                    >
                        {i18n._(`Nieuw team`)}
                    </Button>
                </Row>
                <InfiniteScroll
                    hasMore={data?.teams?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        fetchMore({
                            variables: {
                                paginationArgs,
                            },
                        })
                    }
                >
                    {renderTable()}
                </InfiniteScroll>
            </Column>
        </>
    )

    function renderTable() {
        if (!data && loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }

        if (!data || error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <Table
                flex={1}
                headers={[
                    { headerLabel: i18n._('Team'), field: 'teamName' },
                    { headerLabel: i18n._('Medewerkers'), field: 'members' },
                    { headerLabel: i18n._('Postcodegebied(en)'), field: 'postalCodes' },
                ]}
                rows={renderTeams()}
                emptyMessage={i18n._(t`Er zijn nog geen teams`)}
            />
        )
    }

    function renderTeams() {
        if (!data?.teams) {
            return []
        }

        return data.teams.nodes.map(t => [
            <TableLink
                text={t.name}
                to={languageHouseRoutes(sessionContext.organizationSlug).teams.detail(t.id).index}
            />,
            <Paragraph>{t.members?.length}</Paragraph>,
            <Paragraph>{t.postalCodeAreas?.map(p => p.code).join(', ')}</Paragraph>,
        ])
    }
}
