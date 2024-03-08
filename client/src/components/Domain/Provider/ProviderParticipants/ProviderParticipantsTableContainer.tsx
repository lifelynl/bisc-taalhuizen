import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import {
    DEFAULT_INITIAL_PAGE_SIZE,
    InfiniteScroll,
    InfiniteScrollRef,
} from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    ParticipationStatus,
    ProviderStudentsQuery,
    SortInput,
    LearningResultSubject,
    useProviderStudentsQuery,
} from 'graphql/v2/generated/graphql'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ProviderParticipantsTabs, ProviderParticipantsTabsEnum } from './Tabs/ProviderParticipantsTabs'
import { SearchBar } from 'components/Core/SearchBar/SearchBar'
import { SortDirection } from 'components/Core/Table/TableHeader'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { learningResultSubjectTranslations } from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'
import Tooltip from 'components/Core/Feedback/Tooltip/Tooltip'

interface Props {
    participationStatus?: ParticipationStatus
    newOrReferred?: boolean
    onSortDirectionChange: (sortDirection: SortDirection) => void
    sortDirection?: SortDirection
}

export const ProviderParticipantsTableContainer: React.FunctionComponent<Props> = props => {
    const { participationStatus, newOrReferred, sortDirection, onSortDirectionChange } = props
    const { i18n } = useLingui()
    const hasLimitedEditRights = useContext(SessionContext).user?.currentEmployee?.organization.hasLimitedEditRights

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const newOrReferredCount = useProviderStudentsQuery({
        variables: { paginationArgs: { take: 1 }, newOrReferred: true },
    }).data?.providerStudents.totalCount

    const variables = useMemo(
        () => ({
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            participationStatus: participationStatus,
            newOrReferred: newOrReferred,
            sort:
                sortDirection?.field && sortDirection.direction
                    ? { [sortDirection.field]: sortDirection.direction }
                    : { intakeDate: SortInput.Desc },
        }),
        [participationStatus, sortDirection, newOrReferred]
    )

    const query = useProviderStudentsQuery({ variables })
    const { data, loading, error, fetchMore, refetch } = query
    const history = useHistory()
    const infiniteScrollRef = useRef<InfiniteScrollRef>(null)

    useEffect(() => {
        refetch(variables)
    }, [sortDirection, variables, refetch])

    return (
        <>
            <Column spacing={10}>
                <ProviderParticipantsTabs referredOrNewCount={newOrReferredCount} currentTab={getActiveTab()} />
                <Row justifyContent="space-between">
                    <SearchBar onSearch={search} />
                    {!hasLimitedEditRights && (
                        <Button
                            icon={IconType.add}
                            onClick={() => history.push(providerRoutes(organizationSlug).participants.create)}
                        >
                            {i18n._(`Nieuwe deelnemer`)}
                        </Button>
                    )}
                </Row>
                <InfiniteScroll
                    ref={infiniteScrollRef}
                    hasMore={data?.providerStudents.hasMore ?? false}
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
                headers={getHeaders()}
                rows={getRows(data?.providerStudents.nodes || [])}
                emptyMessage={i18n._(t`Er zijn nog geen deelnemers`)}
                onSortDirectionChange={d => {
                    onSortDirectionChange(d)
                    infiniteScrollRef.current?.reset()
                }}
                sortDirection={sortDirection || { field: 'intakeDate', direction: SortInput.Desc }}
            />
        )
    }

    function getActiveTab(): ProviderParticipantsTabsEnum {
        if (props.newOrReferred) {
            return ProviderParticipantsTabsEnum.ReferredOrNew
        }

        if (props.participationStatus === ParticipationStatus.Finished) {
            return ProviderParticipantsTabsEnum.Finished
        }

        if (props.participationStatus === ParticipationStatus.Ongoing) {
            return ProviderParticipantsTabsEnum.Ongoing
        }

        // should not happen:
        return ProviderParticipantsTabsEnum.Ongoing
    }

    function getHeaders() {
        return [
            { headerLabel: i18n._(`ACHTERNAAM`), field: 'familyName', sortable: true },
            { headerLabel: i18n._(`ROEPNAAM`), field: 'givenName', sortable: true },
            { headerLabel: i18n._(`ONDERWERP LEERUITKOMST`), field: 'subject' },
            { headerLabel: i18n._(`VERWEZEN DOOR`), field: 'referredBy' },
            { headerLabel: i18n._(`VERWEZEN PER`), field: 'referredAt' },
        ]
    }

    function getRows(nodes: ProviderStudentsQuery['providerStudents']['nodes']) {
        return nodes.map(n => [
            <TableLink
                text={NameFormatters.formattedLastName(n.person)}
                to={providerRoutes(organizationSlug).participants.detail(n.id).index}
            />,
            <Paragraph>{n.person.givenName}</Paragraph>,
            generateSubjectField(
                n.registration.desiredLearningNeedOutcome?.subject,
                n.registration.desiredLearningNeedOutcome?.subjectOther
            ),

            <Paragraph>{n.organization?.name}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(n.registration.createdAt)}</Paragraph>,
        ])
    }

    function search(searchValue: string) {
        refetch({ ...variables, searchName: searchValue })
    }

    function generateSubjectField(
        subject: LearningResultSubject | undefined | null,
        subjectOther: string | undefined | null
    ) {
        if (subject === LearningResultSubject.Other && subjectOther) {
            return (
                <Tooltip message={subjectOther}>
                    {`${learningResultSubjectTranslations[subject]} ${subjectOther?.slice(0, 7)}...`}
                </Tooltip>
            )
        }

        if (subject) {
            return <Paragraph>{learningResultSubjectTranslations[subject]}</Paragraph>
        }

        return <></>
    }
}
