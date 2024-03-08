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
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { EmployeeRole, OrganizationTypeEnum, useOrganizationEmployeesQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ProviderManagementTabs, ProviderManagementTabsValues } from '../Tabs/ProviderManagementTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    organizationId: string
}

export const ProviderManagementCoworkersOverviewContainer: React.FunctionComponent<Props> = ({ organizationId }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const variables = { paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE }, organizationId }
    const { data, loading, error, fetchMore } = useOrganizationEmployeesQuery({
        variables,
    })
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Beheer`)} />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <ProviderManagementTabs currentTab={ProviderManagementTabsValues.Coworkers} />
                    <Button
                        hide={sessionContext.user?.currentEmployee?.role === EmployeeRole.Mentor}
                        icon={IconType.add}
                        onClick={() => history.push(providerRoutes(organizationSlug).management.coworkers.create)}
                    >
                        {i18n._(`Nieuwe medewerker`)}
                    </Button>
                </Row>
                <InfiniteScroll
                    hasMore={data?.organizationEmployees?.hasMore ?? false}
                    loadMore={paginationArgs => fetchMore({ variables: { ...variables, paginationArgs } })}
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
                    { headerLabel: i18n._(`Achternaam`), field: 'lastName' },
                    { headerLabel: i18n._(`Roepnaam`), field: 'firstName' },
                    { headerLabel: i18n._(`Rol`), field: 'role' },
                    { headerLabel: i18n._(`Aangemaakt`), field: 'createdAt' },
                    { headerLabel: i18n._(`Bewerkt`), field: 'updatedAt' },
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen medewerkers`)}
            />
        )
    }

    function getRows() {
        if (!data || !data.organizationEmployees.nodes.length) {
            return []
        }

        return data.organizationEmployees.nodes.map(coworker => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(coworker.person)}
                    to={routes.authorized.provider(organizationSlug).management.coworkers.detail(coworker.id).index}
                />,
                <Paragraph>{coworker.person.givenName}</Paragraph>,
                <Row spacing={1}>
                    {coworker.role && (
                        <RoleLabelTag role={coworker.role} organizationType={OrganizationTypeEnum.Provider} />
                    )}
                </Row>,
                <Paragraph>{DateFormatters.formattedDate(coworker.createdAt)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(coworker.updatedAt)}</Paragraph>,
            ]
        })
    }
}
