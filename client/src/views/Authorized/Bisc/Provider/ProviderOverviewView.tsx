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
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { OrganizationTypeEnum, useOrganizationsQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { AdressFormatters } from 'utils/formatters/Address/Address'

interface Props {}

export const ProviderOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    const { data, loading, error, fetchMore } = useOrganizationsQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            type: OrganizationTypeEnum.Provider,
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Aanbieders`)} />

            <Column spacing={6}>
                <Row justifyContent="flex-end">
                    <Button
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.bisc(organizationName).providers.create)}
                    >
                        {i18n._(t`Nieuwe aanbieder`)}
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
                    { headerLabel: i18n._(t`Plaats`), field: 'street' },
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen aanbieders`)}
            />
        )
    }

    function getRows() {
        if (!data || !data?.organizations) {
            return []
        }

        return data.organizations.nodes.map(provider => {
            const address = provider.address

            return [
                <TableLink
                    text={provider.name || ''}
                    to={routes.authorized.bisc(organizationName).providers.detail(provider?.id).index}
                />,
                <p>
                    {AdressFormatters.formattedAddress({
                        street: address?.street,
                        houseNumber: address?.houseNumber,
                        postalCode: address?.postalCode,
                    })}
                </p>,
                <p>{address?.locality}</p>,
            ]
        })
    }
}
