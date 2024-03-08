import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { DEFAULT_INITIAL_PAGE_SIZE } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    ProviderManagementCoworkerTabs,
    ProviderManagementCoworkerTabsValues,
} from 'components/Domain/Provider/ProviderManagement/Tabs/ProviderManagementCoworkerTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { ProviderStudentsQuery, useEmployeeQuery, useProviderStudentsQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProviderManagementCoworkerDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ProviderManagementCoworkerMenteesView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const params = useParams<ProviderManagementCoworkerDetailRouteParams>()
    const providerEmployeeId = params.providerEmployeeId

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const employeeQuery = useEmployeeQuery({
        variables: {
            id: providerEmployeeId,
        },
    })

    const studentsQueryVariables = {
        paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
        mentorId: providerEmployeeId,
    }

    const studentsQuery = useProviderStudentsQuery({ variables: studentsQueryVariables })

    return (
        <>
            <Headline
                title={
                    (employeeQuery.data?.employee.person &&
                        NameFormatters.formattedFullname(employeeQuery.data?.employee.person)) ||
                    ''
                }
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.provider(organizationSlug).management.overview,
                            breadcrumbItems.provider(organizationSlug).management.coworkers,
                        ]}
                    />
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <ProviderManagementCoworkerTabs currentTab={ProviderManagementCoworkerTabsValues.Participants} />
                </Row>

                <PageQuery data={studentsQuery.data} loading={studentsQuery.loading} error={studentsQuery.error}>
                    {data => renderStudentsTable(data.providerStudents.nodes)}
                </PageQuery>
            </Column>
        </>
    )

    function renderStudentsTable(students: ProviderStudentsQuery['providerStudents']['nodes']) {
        return (
            <Table
                flex={1}
                headers={[
                    { headerLabel: i18n._(`ACHTERNAAM`), field: 'lastName' },
                    { headerLabel: i18n._(`ROEPNAAM`), field: 'firstName' },
                ]}
                rows={getRows(students) || []}
                emptyMessage={i18n._('Er zijn nog geen deelnemers')}
            />
        )
    }

    function getRows(students: ProviderStudentsQuery['providerStudents']['nodes']) {
        return students?.map(student => [
            <TableLink
                text={NameFormatters.formattedLastName(student.person)}
                to={providerRoutes(organizationSlug).participants.detail(student.id).index}
            />,
            <Paragraph>{student.person.givenName}</Paragraph>,
        ])
    }
}
