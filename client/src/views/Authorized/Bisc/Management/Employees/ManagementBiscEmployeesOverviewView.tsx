import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Page } from 'components/Core/Page/Page'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { PersonType, useOrganizationEmployeesQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {}

export const ManagementBiscEmployeesOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = sessionContext.user?.currentEmployee?.organization.id || ''
    const { organizationSlug: organizationName } = sessionContext

    const { data, loading, error, fetchMore } = useOrganizationEmployeesQuery({
        variables: { paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE }, organizationId },
    })

    return (
        <Page>
            <Column spacing={4}>
                <Headline title={i18n._(t`Medewerkers`)} />
                <Column spacing={10}>
                    <Row justifyContent="flex-end">
                        <Button
                            icon={IconType.add}
                            onClick={() => history.push(biscRoutes(organizationName).management.coworkers.create)}
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
            </Column>
        </Page>
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

        const list = data?.organizationEmployees.nodes.map(employee => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(employee?.person as Partial<PersonType>)}
                    to={biscRoutes(organizationName).management.coworkers.detail(employee?.id).data.index}
                />,
                <p>{employee?.person.givenName}</p>,
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
