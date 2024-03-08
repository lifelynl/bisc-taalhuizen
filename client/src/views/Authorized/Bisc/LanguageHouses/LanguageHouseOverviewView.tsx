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
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { OrganizationTypeEnum, useOrganizationsQuery } from 'graphql/v2/generated/graphql'
import { FunctionComponent, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { AdressFormatters } from 'utils/formatters/Address/Address'

interface Props {}

export const LanguageHouseOverviewView: FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error, fetchMore } = useOrganizationsQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            type: OrganizationTypeEnum.LanguageHouse,
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Taalhuizen`)} />
            <Column spacing={6}>
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.bisc(organizationName).languageHouses.create,
                            })
                        }
                    >
                        {i18n._(t`Nieuw taalhuis`)}
                    </Button>
                </Row>
                <InfiniteScroll
                    hasMore={data?.organizations?.hasMore ?? false}
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
                    { headerLabel: i18n._(t`Naam`), field: 'name' },
                    { headerLabel: i18n._(t`Adres`), field: 'address' },
                    { headerLabel: i18n._(t`Plaats`), field: 'place' },
                    { headerLabel: i18n._('Postcodegebied(en)'), field: 'postalCode' },
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen taalhuizen`)}
            />
        )
    }

    function getRows() {
        if (!data?.organizations) {
            return []
        }

        return data.organizations.nodes.map(organization => {
            const address = organization.address
            return [
                <TableLink
                    to={routes.authorized.bisc(organizationName).languageHouses.detail(organization?.id).index}
                    text={organization.name}
                />,
                <Paragraph>
                    {AdressFormatters.formattedAddress({
                        street: address!.street,
                        houseNumber: address!.houseNumber,
                        postalCode: address!.postalCode,
                    })}
                </Paragraph>,
                <Paragraph>{address?.locality}</Paragraph>,
                <Paragraph>{organization!.postalCodes?.map(p => p.code).join(', ')}</Paragraph>,
            ]
        })
    }
}
