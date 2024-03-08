import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import {
    DEFAULT_INITIAL_PAGE_SIZE,
    InfiniteScroll,
    InfiniteScrollRef,
} from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { SortDirection } from 'components/Core/Table/TableHeader'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import {
    LanguageHouseManagementTab,
    LanguageHouseManagementTabs,
} from 'components/Domain/LanguageHouse/Management/Tabs/LanguageHouseManagementTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { EmployeeRole, OrganizationTypeEnum, useOrganizationEmployeesQuery } from 'graphql/v2/generated/graphql'
import { useContext, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    onSortDirectionChange: (sortDirection: SortDirection) => void
    sortDirection?: SortDirection
}

export const ManagementLanguageHouseEmployeesTableContainer: React.FunctionComponent<Props> = ({
    sortDirection,
    onSortDirectionChange,
}) => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!
    const infiniteScrollRef = useRef<InfiniteScrollRef>(null)

    const variables = useMemo(
        () => ({
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            organizationId,
            sort:
                sortDirection?.field && sortDirection.direction
                    ? { [sortDirection.field]: sortDirection.direction }
                    : undefined,
        }),
        [organizationId, sortDirection]
    )

    const { data, loading, error, fetchMore, refetch } = useOrganizationEmployeesQuery({
        variables,
    })

    useEffect(() => {
        refetch(variables)
    }, [sortDirection, variables, refetch])

    return (
        <Column spacing={10}>
            <Row justifyContent="space-between">
                <LanguageHouseManagementTabs activeTabId={LanguageHouseManagementTab.LanguageHouseEmployees} />
                {sessionContext.user?.currentEmployee?.role === EmployeeRole.Coordinator && (
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(
                                languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.create
                            )
                        }
                    >
                        {i18n._(`Nieuwe medewerker`)}
                    </Button>
                )}
            </Row>
            <InfiniteScroll
                ref={infiniteScrollRef}
                hasMore={data?.organizationEmployees?.hasMore ?? false}
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
                    { headerLabel: i18n._(`Achternaam`), field: 'familyName', sortable: true },
                    { headerLabel: i18n._(`Roepnaam`), field: 'givenName', sortable: true },
                    { headerLabel: i18n._(`Rol`), field: 'role' },
                    { headerLabel: i18n._(`Teams`), field: 'teams' },
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen medewerkers`)}
                sortDirection={sortDirection}
                onSortDirectionChange={d => {
                    onSortDirectionChange(d)
                    infiniteScrollRef.current?.reset()
                }}
            />
        )
    }

    function getRows() {
        if (!data || !data.organizationEmployees) {
            return []
        }

        const list = data?.organizationEmployees.nodes.map(employee => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(employee.person)}
                    to={
                        languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.detail(employee.id)
                            .data.index
                    }
                />,
                <Paragraph>{employee.person.givenName}</Paragraph>,
                <Paragraph>
                    {employee.role && (
                        <RoleLabelTag organizationType={OrganizationTypeEnum.LanguageHouse} role={employee.role} />
                    )}
                </Paragraph>,
                <Paragraph>{employee.teams?.map(t => t.name).join(', ')}</Paragraph>,
            ]
        })

        if (!list) {
            return null
        }
        return list
    }
}
