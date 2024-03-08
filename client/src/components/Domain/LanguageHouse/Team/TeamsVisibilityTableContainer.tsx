import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { TeamsOverviewTabs, TeamsOverviewTabsEnum } from 'components/Domain/LanguageHouse/Team/TeamsOverviewTabs'
import { useTeamsQuery } from 'graphql/v2/generated/graphql'
import { TeamsVisibilityTable } from './TeamsVisibilityTable'

interface Props {
    teamsQuery: ReturnType<typeof useTeamsQuery>
    readOnly?: boolean
}

export const TeamsVisibilityTableContainer: React.FunctionComponent<Props> = props => {
    const { readOnly, teamsQuery } = props
    const { data, loading, error, fetchMore } = teamsQuery

    const { i18n } = useLingui()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Teams`)} />
            <Column spacing={6}>
                <Row justifyContent="space-between">
                    <TeamsOverviewTabs currentTab={TeamsOverviewTabsEnum.visibility} />
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

        return <TeamsVisibilityTable teams={data.teams.nodes} readOnly={readOnly} />
    }
}
