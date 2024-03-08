import React, { useContext } from 'react'
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
import { ProviderGroupsTabs } from 'components/Domain/Provider/ProviderGroups/Tabs/ProviderGroupsTabs'
import {
    EducationGroupsQuery,
    EducationGroupStatus,
    EmployeeRole,
    useEducationGroupsQuery,
} from 'graphql/v2/generated/graphql'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { groupCourseTypeTranslations } from 'components/Domain/Groups/Translations/groupTranslations'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    organizationId: string
    status: EducationGroupStatus
}

export const ProviderGroupsOverviewContainer: React.FunctionComponent<Props> = ({ organizationId, status }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const variables = {
        paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
        organizationId,
        status,
    }
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error, fetchMore } = useEducationGroupsQuery({ variables })

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Groepen`)} />
            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <ProviderGroupsTabs currentTab={status} />
                    <Button
                        hide={sessionContext.user?.currentEmployee?.role === EmployeeRole.Mentor}
                        icon={IconType.add}
                        onClick={() => history.push(providerRoutes(organizationSlug).groups.create)}
                    >
                        {i18n._(`Nieuwe groep`)}
                    </Button>
                </Row>
                <InfiniteScroll
                    hasMore={data?.educationGroups?.hasMore ?? false}
                    loadMore={paginationArgs => fetchMore({ variables: { ...variables, paginationArgs } })}
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
                    { headerLabel: i18n._(`Naam`), field: 'name' },
                    { headerLabel: i18n._(`Type Cursus`), field: 'type' },
                    { headerLabel: i18n._(`Deelnemers`), field: 'participatns' },
                    { headerLabel: i18n._(`Beschikbaar`), field: 'availability' },
                    { headerLabel: i18n._(`Startdatum`), field: 'startDate' },
                    { headerLabel: i18n._(`Einddatum`), field: 'endDate' },
                ]}
                rows={getRows()}
                emptyMessage={i18n._(t`Er zijn nog geen deelnemers`)}
            />
        )
    }

    function getRows() {
        if (!data || !data.educationGroups.nodes.length) {
            return []
        }

        return data.educationGroups.nodes.map(group => {
            return [
                <TableLink
                    text={group.name || '-'}
                    to={providerRoutes(organizationSlug).groups.detail(group.id).index}
                />,
                <Paragraph>{group.type && groupCourseTypeTranslations[group.type]}</Paragraph>,
                <Paragraph>{group.participantCount || 0}</Paragraph>,
                <Paragraph>{renderAvailableParticipantsCount(group)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(group.start)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(group.end)}</Paragraph>,
            ]
        })
    }

    function renderAvailableParticipantsCount(group: EducationGroupsQuery['educationGroups']['nodes']['0']) {
        if (typeof group.maximumParticipants !== 'number') {
            return ''
        }

        if (typeof group.participantCount !== 'number') {
            return ''
        }

        return group.maximumParticipants - group.participantCount
    }
}
