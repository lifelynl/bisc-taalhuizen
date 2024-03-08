import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ProviderGroupDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'
import Row from 'components/Core/Layout/Row/Row'
import Column from 'components/Core/Layout/Column/Column'
import TabSwitch from 'components/Core/TabSwitch/TabSwitch'
import Tab from 'components/Core/TabSwitch/Tab'
import InfiniteScroll from 'react-infinite-scroller'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { NameFormatters } from 'utils/formatters/name/Name'
import { DEFAULT_INITIAL_PAGE_SIZE } from 'components/Core/InfiniteScroll/InfiniteScroll'
import { useProviderEducationGroupQuery, useProviderStudentsQuery } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { ORGANIZATION_SLUG_PARAM } from 'routes/routes'

enum GroupTab {
    data = 'data',
    participants = 'participants',
}

const getGroupTabPaths = (groupId: string, organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
    [GroupTab.data]: providerRoutes(organizationSlug).groups.detail(groupId).data.index,
    [GroupTab.participants]: providerRoutes(organizationSlug).groups.detail(groupId).data.participants,
})

const groupTabTranslations = {
    [GroupTab.data]: i18n._(`Gegevens`),
    [GroupTab.participants]: i18n._(`Deelnemers`),
}

export const GroupParticipantsView: React.FunctionComponent = () => {
    const { groupId } = useParams<ProviderGroupDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const educationGroupQuery = useProviderEducationGroupQuery({ variables: { id: groupId } })

    const studentsQueryVariables = {
        paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
        educationGroupId: groupId,
    }

    const studentsQuery = useProviderStudentsQuery({ variables: studentsQueryVariables })

    return (
        <>
            <Headline
                title={educationGroupQuery.data?.educationGroup.name || ''}
                TopComponent={
                    <Breadcrumbs breadcrumbItems={[breadcrumbItems.provider(organizationSlug).groups.overview]} />
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={10}>
                <Row justifyContent="flex-start">
                    <TabSwitch
                        activeTabId={GroupTab.participants}
                        onChange={props =>
                            history.push(getGroupTabPaths(groupId, organizationSlug)[props.tabid as GroupTab])
                        }
                    >
                        <Tab label={groupTabTranslations[GroupTab.data]} tabid={GroupTab.data} />
                        <Tab label={groupTabTranslations[GroupTab.participants]} tabid={GroupTab.participants} />
                    </TabSwitch>
                </Row>
                <InfiniteScroll
                    hasMore={studentsQuery.data?.providerStudents?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        studentsQuery.fetchMore({ variables: { ...studentsQueryVariables, paginationArgs } })
                    }
                >
                    {renderList()}
                </InfiniteScroll>
            </Column>
        </>
    )

    function renderList() {
        if (!studentsQuery.data && studentsQuery.loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }
        if (studentsQuery.error) {
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
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen deelnemers`)}
            />
        )
    }

    function getRows() {
        if (!studentsQuery.data || !studentsQuery.data.providerStudents.nodes.length) {
            return []
        }

        return studentsQuery.data.providerStudents.nodes.map(student => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName(student.person)}
                    to={providerRoutes(organizationSlug).participants.detail(student.id).index}
                />,
                <Paragraph>{student.person.givenName}</Paragraph>,
            ]
        })
    }
}
