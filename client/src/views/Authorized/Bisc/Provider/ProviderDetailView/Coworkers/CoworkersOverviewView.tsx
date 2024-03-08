import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button from 'components/Core/Button/Button'
// import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscProvidersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { OrganizationTypeEnum, PersonType, useOrganizationEmployeesQuery } from 'graphql/v2/generated/graphql'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { BiscProviderTab, BiscProviderTabs } from 'components/Domain/Bisc/Provider/BiscProviderTabs'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props extends RouteComponentProps<BiscProvidersDetailRouteParams> {}

const CoworkersOverviewView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    const { data, loading, error, fetchMore } = useOrganizationEmployeesQuery({
        variables: { paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE }, organizationId: providerId },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <>
            <Headline
                title={`${i18n._(t`Aanbieder`)} ${data?.organizationEmployees.nodes[0]?.organization.name || ''}`}
                TopComponent={
                    <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc(organizationName).providers.overview]} />
                }
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <BiscProviderTabs currentTab={BiscProviderTab.employees} providerId={providerId} />
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(
                                routes.authorized.bisc(organizationName).providers.detail(providerId).coworkers.create
                            )
                        }
                    >
                        {i18n._(t`Nieuwe medewerker`)}
                    </Button>
                </Row>
                <InfiniteScroll
                    hasMore={data?.organizationEmployees?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        fetchMore({
                            variables: {
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
        return (
            data?.organizationEmployees?.nodes?.map(node => [
                <TableLink
                    text={NameFormatters.formattedLastName(node.person as Partial<PersonType>)}
                    to={
                        routes.authorized.bisc(organizationName).providers.detail(providerId).coworkers.detail(node.id)
                            .index
                    }
                />,
                <Paragraph>{node.person.givenName}</Paragraph>,
                <Row spacing={1}>
                    {node.role && <RoleLabelTag role={node.role} organizationType={OrganizationTypeEnum.Provider} />}
                </Row>,
                <Paragraph>{DateFormatters.formattedDate(node.createdAt)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(node.updatedAt)}</Paragraph>,
            ]) || []
        )
    }
}
export default CoworkersOverviewView
