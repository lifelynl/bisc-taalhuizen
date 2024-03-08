import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import {
    LanguageHouseDetailTabs,
    LanguageHouseDetailTabsEnum,
} from 'components/Domain/Bisc/LanguageHouses/LanguageHouseDetailTabs'
import { LanguageHouseProvidersTable } from 'components/Domain/LanguageHouse/Tables/LanguageHouseProvidersTable'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import {
    OrganizationQuery,
    useOrganizationQuery,
    useProvidersForLanguageHouseQuery,
} from 'graphql/v2/generated/graphql'
import { useContext } from 'react'

interface Props {
    languageHouseId: string
    renderActions: (selectedProviderIds?: boolean) => JSX.Element
    readOnly?: boolean
}

export const LanguageHouseProvidersContainer: React.FC<Props> = props => {
    const { languageHouseId, renderActions, readOnly } = props
    const { i18n } = useLingui()
    const { organizationSlug } = useContext(SessionContext)

    const { data, loading, error } = useOrganizationQuery({ variables: { input: languageHouseId } })
    const providersQuery = useProvidersForLanguageHouseQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            languageHouseId,
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderView}
        </PageQuery>
    )

    function renderView({ organization }: OrganizationQuery) {
        return (
            <>
                <Headline
                    title={organization.name}
                    TopComponent={<LanguageHousesDetailBreadcrumbs organizationSlug={organizationSlug} />}
                    spacingType={SpacingType.small}
                />

                <Column spacing={10}>
                    <Row justifyContent="space-between">
                        <LanguageHouseDetailTabs activeTabId={LanguageHouseDetailTabsEnum.Providers} />
                    </Row>
                    <Space pushTop={true} />
                    <InfiniteScroll
                        hasMore={providersQuery.data?.organizations.hasMore ?? false}
                        loadMore={paginationArgs =>
                            providersQuery.fetchMore({
                                variables: {
                                    paginationArgs,
                                },
                            })
                        }
                    >
                        {renderList()}
                    </InfiniteScroll>
                </Column>
                {renderActions()}
            </>
        )
    }

    function renderList() {
        const { data, loading, error } = providersQuery

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
                    title={i18n._(`Er ging iets fout`)}
                    message={i18n._(`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <LanguageHouseProvidersTable providers={data.organizations.nodes} readOnly={readOnly} />
    }
}
