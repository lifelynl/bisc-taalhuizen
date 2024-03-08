import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Tab from 'components/Core/TabSwitch/Tab'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { tabPaths, Tabs, tabTranslations } from 'views/Authorized/LanguageHouse/constants'
import {
    DEFAULT_INITIAL_PAGE_SIZE,
    InfiniteScroll,
    InfiniteScrollRef,
} from 'components/Core/InfiniteScroll/InfiniteScroll'
import { routes } from 'routes/routes'
import Paragraph from 'components/Core/Typography/Paragraph'
import { RegistrationStatus, useStudentsQuery } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { SortDirection } from 'components/Core/Table/TableHeader'

interface Props {
    onSortDirectionChange: (sortDirection: SortDirection) => void
    sortDirection?: SortDirection
}

export const RegistrationsTableContainer: React.FunctionComponent<Props> = ({
    sortDirection,
    onSortDirectionChange,
}) => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)

    const organizationId = sessionContext.user?.currentEmployee?.organization.id!

    const variables = useMemo(
        () => ({
            paginationArgs: { skip: 0, take: DEFAULT_INITIAL_PAGE_SIZE },
            organizationId: organizationId,
            status: RegistrationStatus.Pending,
            sort:
                sortDirection?.field && sortDirection.direction
                    ? { [sortDirection.field]: sortDirection.direction }
                    : undefined,
        }),
        [organizationId, sortDirection]
    )

    const { data, loading, error, fetchMore, refetch } = useStudentsQuery({
        variables,
    })

    useEffect(() => {
        refetch(variables)
    }, [sortDirection, variables, refetch])

    const history = useHistory()
    const infiniteScrollRef = useRef<InfiniteScrollRef>(null)

    return (
        <>
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={Tabs.registrations}
                        onChange={props => history.push(tabPaths(sessionContext.organizationSlug)[props.tabid as Tabs])}
                    >
                        <Tab label={tabTranslations[Tabs.participants]} tabid={Tabs.participants} />
                        <Tab
                            label={tabTranslations[Tabs.registrations]}
                            tabid={Tabs.registrations}
                            indicatorCount={data?.students.totalCount}
                        />
                    </TabSwitch>
                </Row>

                <InfiniteScroll
                    ref={infiniteScrollRef}
                    hasMore={data?.students?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        fetchMore({
                            variables: {
                                ...variables,
                                paginationArgs,
                            },
                        })
                    }
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
                    { headerLabel: i18n._(t`Aangemeld door`), field: 'referredBy' },
                    { headerLabel: i18n._(t`Aangemeld per`), field: 'referredAt' },
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen aanmeldingen`)}
                onSortDirectionChange={d => {
                    onSortDirectionChange(d)
                    infiniteScrollRef.current?.reset()
                }}
            />
        )
    }

    function getRows() {
        if (!data || !data.students) {
            return []
        }

        return data.students.nodes.map(student => {
            return [
                <TableLink
                    text={(student.person && NameFormatters.formattedLastName(student.person)) || '-'}
                    to={routes.authorized
                        .languageHouse(sessionContext.organizationSlug)
                        .participants.registrations.detail(student.id)}
                />,
                <Paragraph>{student.person?.givenName}</Paragraph>,
                <Paragraph>{student.team?.name}</Paragraph>,
                <Paragraph>{student.registration?.referringOrganizationOther}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(student.person?.createdAt)}</Paragraph>,
            ]
        })
    }
}
