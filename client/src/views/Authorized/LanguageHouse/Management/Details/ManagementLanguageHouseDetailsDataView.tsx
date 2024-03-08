import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import LanguageHouseInformationFieldset from 'components/fieldsets/languageHouse/LanguageHouseInformationFieldset'
import React, { useContext } from 'react'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { useHistory } from 'react-router-dom'
import {
    LanguageHouseManagementTab,
    LanguageHouseManagementTabs,
} from 'components/Domain/LanguageHouse/Management/Tabs/LanguageHouseManagementTabs'
import { EmployeeRole, OrganizationQuery, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const ManagementLanguageHouseDetailsDataView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const userContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = userContext.user?.currentEmployee?.organization.id!

    const { data, loading, error } = useOrganizationQuery({
        variables: {
            input: organizationId,
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPageContent}
        </PageQuery>
    )

    function renderPageContent(data: OrganizationQuery) {
        return (
            <>
                <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />

                <Column spacing={10}>
                    <LanguageHouseManagementTabs activeTabId={LanguageHouseManagementTab.LanguageHouseDetails} />
                    {renderView(data.organization)}
                </Column>
                <Space pushTop={true} />
                <Actionbar
                    hide={userContext.user?.currentEmployee?.role === EmployeeRole.Employee}
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.primary}
                                onClick={() =>
                                    history.push(
                                        languageHouseRoutes(userContext.organizationSlug).management
                                            .languageHouseDetails.data.update
                                    )
                                }
                            >
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    function renderView(organization: OrganizationQuery['organization']) {
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
                    postalCodes: organization.postalCodes?.map(c => c.code),
                }}
            />
        )
    }
}
