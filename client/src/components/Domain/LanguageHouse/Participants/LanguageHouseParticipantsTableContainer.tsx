import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import { tabPaths, Tabs, tabTranslations } from 'views/Authorized/LanguageHouse/constants'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { DateFormatters } from 'utils/formatters/Date/Date'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Tab from 'components/Core/TabSwitch/Tab'
import {
    ParticipationType,
    RegistrationStatus,
    SortInput,
    StudentsQuery,
    TeamType,
    useStudentsQuery,
} from 'graphql/v2/generated/graphql'
import {
    DEFAULT_INITIAL_PAGE_SIZE,
    InfiniteScroll,
    InfiniteScrollRef,
} from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { t } from '@lingui/macro'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { SearchBar } from 'components/Core/SearchBar/SearchBar'
import Headline, { SpacingType, SuffixVariant } from 'components/Chrome/Headline'
import { TeamSelect } from '../Select/TeamSelect'
import { SortDirection } from 'components/Core/Table/TableHeader'

interface Props {
    onSortDirectionChange: (sortDirection: SortDirection) => void
    selectedTeam?: Pick<TeamType, 'id' | 'name'> | null
    onSelectTeam: (team: Pick<TeamType, 'id' | 'name'> | null) => void
    searchValue?: string
    onSearch: (searchValue: string) => void
    sortDirection?: SortDirection
}

export const LanguageHouseParticipantsTableContainer: React.FunctionComponent<Props> = props => {
    const { onSortDirectionChange, onSearch, onSelectTeam, sortDirection, searchValue, selectedTeam } = props
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!
    const infiniteScrollRef = useRef<InfiniteScrollRef>(null)

    const referredCount = useStudentsQuery({
        variables: {
            paginationArgs: { skip: 0, take: 1 }, // take 1, because we actually just need the total count
            organizationId: organizationId,
            status: RegistrationStatus.Pending,
        },
    }).data?.students.totalCount

    const variables = useMemo(
        () => ({
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            organizationId: organizationId,
            status: RegistrationStatus.Accepted,
            sort: sortDirection ? { [sortDirection.field]: sortDirection.direction } : { intakeDate: SortInput.Desc },
            team: selectedTeam?.id,
            searchName: searchValue,
        }),
        [organizationId, sortDirection, selectedTeam, searchValue]
    )

    const { data, loading, error, fetchMore, refetch } = useStudentsQuery({
        variables,
    })

    useEffect(() => {
        refetch(variables)
    }, [sortDirection, variables, refetch])

    const history = useHistory()

    return (
        <>
            <Headline
                spacingType={SpacingType.small}
                title={i18n._(`Deelnemers`)}
                titleSuffix={data?.students.totalCount?.toString()}
                suffixVariant={SuffixVariant.light}
            />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={Tabs.participants}
                        onChange={props => history.push(tabPaths(sessionContext.organizationSlug)[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab
                            label={tabTranslations[Tabs.registrations]}
                            tabid={Tabs.registrations}
                            indicatorCount={referredCount}
                        />
                    </TabSwitch>
                </Row>
                <Row justifyContent="space-between">
                    <Row justifyContent="flex-start">
                        <SearchBar onSearch={onSearch} defaultValue={searchValue} />
                        <TeamSelect
                            onSelect={onSelectTeam}
                            organizationId={organizationId}
                            defaultValue={selectedTeam}
                        />
                    </Row>

                    <Row justifyContent="flex-end">
                        <Button
                            icon={IconType.add}
                            onClick={() =>
                                history.push(languageHouseRoutes(sessionContext.organizationSlug).participants.create)
                            }
                        >
                            {i18n._(`Nieuwe deelnemer`)}
                        </Button>
                    </Row>
                </Row>

                <InfiniteScroll
                    hasMore={data?.students?.hasMore ?? false}
                    loadMore={paginationArgs => fetchMore({ variables: { ...variables, paginationArgs } })}
                    ref={infiniteScrollRef}
                >
                    {renderList()}
                </InfiniteScroll>
            </Column>
        </>
    )

    function renderList() {
        if (!data && loading) {
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
            <Table
                flex={1}
                headers={[
                    { headerLabel: i18n._(`ACHTERNAAM`), field: 'familyName', sortable: true },
                    { headerLabel: i18n._(`ROEPNAAM`), field: 'givenName', sortable: true },
                    { headerLabel: i18n._(`TEAM`), field: 'teamName', sortable: true },
                    { headerLabel: i18n._(`BEGELEIDER`), field: 'mentor', sortable: true },
                    { headerLabel: i18n._(`AANGEMAAKT`), field: 'intakeDate', sortable: true },
                    { headerLabel: i18n._(`VERWEZEN`), field: 'referredAt' },
                ]}
                rows={getRows(data?.students.nodes || [])}
                emptyMessage={i18n._(t`Er zijn nog geen deelnemers`)}
                onSortDirectionChange={d => {
                    onSortDirectionChange(d)
                    infiniteScrollRef.current?.reset()
                }}
                sortDirection={sortDirection || { field: 'intakeDate', direction: SortInput.Desc }}
            />
        )
    }

    function getRows(nodes: StudentsQuery['students']['nodes']) {
        return nodes.map(student => {
            const allParticipations = student.learningNeeds?.reduce<Pick<ParticipationType, 'createdAt'>[]>(
                (participations, learningNeed) => {
                    if (learningNeed?.participations) {
                        return [...participations, ...learningNeed.participations]
                    }

                    return participations
                },
                []
            )

            const firstParticipation = allParticipations?.sort(
                (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )[0] as ParticipationType

            return [
                <TableLink
                    text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                    to={
                        routes.authorized.languageHouse(sessionContext.organizationSlug).participants.detail(student.id)
                            .index
                    }
                />,
                <Paragraph>{student.person?.givenName}</Paragraph>,
                <Paragraph>{student.team?.name}</Paragraph>,
                <Paragraph>
                    {student.mentor?.person && NameFormatters.formattedFullname(student.mentor?.person)}
                </Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(student.intakeDate)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(firstParticipation?.createdAt)}</Paragraph>,
            ]
        })
    }
}
