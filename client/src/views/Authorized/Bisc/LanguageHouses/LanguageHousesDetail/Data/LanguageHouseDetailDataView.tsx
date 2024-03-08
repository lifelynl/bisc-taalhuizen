import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import LanguageHousesDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHousesDetailBreadcrumbs'
import {
    LanguageHouseDetailTabs,
    LanguageHouseDetailTabsEnum,
} from 'components/Domain/Bisc/LanguageHouses/LanguageHouseDetailTabs'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import LanguageHouseInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseInformationFieldset'
import { OrganizationQuery, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props {}

export const LanguageHouseDetailDataView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = useParams<BiscLanguageHousesDetailRouteParams>()
    const { data, loading, error } = useOrganizationQuery({
        variables: {
            input: languageHouseId,
        },
    })
    const { i18n } = useLingui()
    const history = useHistory()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPageContent}
        </PageQuery>
    )

    function renderPageContent(data: OrganizationQuery) {
        return (
            <>
                <Headline
                    title={data?.organization.name}
                    TopComponent={<LanguageHousesDetailBreadcrumbs organizationSlug={organizationName} />}
                    spacingType={SpacingType.small}
                />

                <Column spacing={10}>
                    <Row justifyContent="space-between">
                        <LanguageHouseDetailTabs activeTabId={LanguageHouseDetailTabsEnum.Data} />
                    </Row>
                    {renderViews(data?.organization)}
                </Column>
                <Space pushTop={true} />
                {/* //TODO change it when we will know how to match UserScope to EmployeeRole */}
                {/* {userContext.user?.person?.employee?.role === EmployeeRole.Coordinator && (
                 */}
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId)
                                            .data.update
                                    )
                                }
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
                {/* )} */}
            </>
        )
    }

    function renderViews(organization: OrganizationQuery['organization']) {
        const address = organization.address
        const telephone = organization.telephone
        const email = organization.email

        return (
            <LanguageHouseInformationFieldset
                readOnly={true}
                prefillData={{
                    name: organization.name,
                    'address.street': address?.street,
                    'address.houseNumber': address?.houseNumber,
                    'address.houseNumberSuffix': address?.houseNumberSuffix,
                    'address.postalCode': address?.postalCode,
                    'address.locality': address?.locality,
                    telephone: telephone || undefined,
                    email: email || undefined,
                    postalCodes: organization?.postalCodes?.map(c => c.code),
                }}
            />
        )
    }
}
