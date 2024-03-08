import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Paragraph from 'components/Core/Typography/Paragraph'
import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import {
    LanguageHouseDetailTabs,
    LanguageHouseDetailTabsEnum,
} from 'components/Domain/Bisc/LanguageHouses/LanguageHouseDetailTabs'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { OrganizationTypeEnum, useOrganizationEmployeesQuery } from 'graphql/v2/generated/graphql'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import Headline, { SpacingType } from '../../../../../../components/Chrome/Headline'
import Button from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import { Table } from '../../../../../../components/Core/Table/Table'
import { TableLink } from '../../../../../../components/Core/Table/TableLink'
import { routes } from '../../../../../../routes/routes'
import { NameFormatters } from '../../../../../../utils/formatters/name/Name'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'

interface Props {}

const CoworkersOverviewView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { i18n } = useLingui()

    const { data, loading, error, fetchMore } = useOrganizationEmployeesQuery({
        variables: { paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE }, organizationId: languageHouseId },
    })
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <>
            <Headline
                title={i18n._(t`Medewerkers`)}
                TopComponent={<LanguageHousesDetailBreadcrumbs organizationSlug={organizationName} />}
                spacingType={SpacingType.small}
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <LanguageHouseDetailTabs activeTabId={LanguageHouseDetailTabsEnum.Employees} />

                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push(
                                routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId)
                                    .coworkers.create
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
        if (!data || !data.organizationEmployees) {
            return []
        }

        const list = data.organizationEmployees.nodes.map(employee => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(employee.person)}
                    to={
                        routes.authorized
                            .bisc(organizationName)
                            .languageHouses.detail(languageHouseId)
                            .coworkers.detail(employee.id).index
                    }
                />,
                <p>{employee.person.givenName}</p>,
                <p>
                    {employee.role && (
                        <RoleLabelTag organizationType={OrganizationTypeEnum.LanguageHouse} role={employee.role} />
                    )}
                </p>,
                <Paragraph>{DateFormatters.formattedDate(employee?.createdAt)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(employee?.updatedAt)}</Paragraph>,
            ]
        })

        if (!list) {
            return null
        }
        return list
    }
}
export default CoworkersOverviewView
