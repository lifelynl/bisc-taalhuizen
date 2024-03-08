import { i18n } from '@lingui/core'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { EmployeeRole, useProviderEducationGroupQuery } from 'graphql/v2/generated/graphql'
import { ProviderGroupDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { ProviderGroupFormFields } from 'components/Domain/Provider/ProviderGroups/ProviderGroupFormFields'
import Row from 'components/Core/Layout/Row/Row'
import Column from 'components/Core/Layout/Column/Column'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Tab from 'components/Core/TabSwitch/Tab'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { ORGANIZATION_SLUG_PARAM } from 'routes/routes'

enum GroupTab {
    data = 'data',
    participants = 'participants',
}

const getGroupTabPaths = (groupId: string, organizationName: string = ORGANIZATION_SLUG_PARAM) => ({
    [GroupTab.data]: providerRoutes(organizationName).groups.detail(groupId).data.index,
    [GroupTab.participants]: providerRoutes(organizationName).groups.detail(groupId).data.participants,
})

const groupTabTranslations = {
    [GroupTab.data]: i18n._(`Gegevens`),
    [GroupTab.participants]: i18n._(`Deelnemers`),
}

export const GroupDetailView: React.FunctionComponent = () => {
    const { groupId } = useParams<ProviderGroupDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const session = useContext(SessionContext)

    const { data, loading, error } = useProviderEducationGroupQuery({ variables: { id: groupId } })

    const organizationId = session.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return (
        <>
            <Headline
                title={data?.educationGroup.name || ''}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[breadcrumbItems.provider(session.organizationSlug).groups.overview]}
                    />
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={GroupTab.data}
                        onChange={props =>
                            history.push(getGroupTabPaths(groupId, session.organizationSlug)[props.tabid as GroupTab])
                        }
                    >
                        <Tab label={groupTabTranslations[GroupTab.data]} tabid={GroupTab.data} />
                        <Tab label={groupTabTranslations[GroupTab.participants]} tabid={GroupTab.participants} />
                    </TabSwitch>
                </Row>
                <PageQuery data={data} loading={loading} error={error}>
                    {data => (
                        <ProviderGroupFormFields
                            prefillData={data.educationGroup}
                            organizationId={organizationId}
                            readOnly={true}
                        />
                    )}
                </PageQuery>
            </Column>
            <Actionbar
                hide={session.user?.currentEmployee?.role === EmployeeRole.Mentor}
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._('Annuleren')}
                        </Button>
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(
                                    providerRoutes(session.organizationSlug).groups.detail(groupId).data.update
                                )
                            }
                        >
                            {i18n._('Bewerken')}
                        </Button>
                    </Row>
                }
            />
        </>
    )
}
