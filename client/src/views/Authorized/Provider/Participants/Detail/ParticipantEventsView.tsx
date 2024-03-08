import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { DEFAULT_INITIAL_PAGE_SIZE } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import {
    ProviderParticipantDetailHeader,
    ProviderParticipantDetailTabsEnum,
} from 'components/Domain/Provider/ProviderParticipants/ProviderParticipantHeader'
import { ParticipantsContactMomentsTable } from 'components/Domain/Files/Table/ParticipantsContactMomentsTable'
import {
    StudentContactMomentType,
    useCanCreateStudentContactMomentQuery,
    useStudentContactMomentsQuery,
} from 'graphql/v2/generated/graphql'
import React from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams } from 'routes/provider/providerRoutes'

interface Props extends RouteComponentProps<ProviderParticipantDetailRouteParams> {}

export const ParticipantEventsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { data, loading, error, fetchMore } = useStudentContactMomentsQuery({
        variables: { studentId, paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE } },
    })

    const canCreateContactMoment = useCanCreateStudentContactMomentQuery({ variables: { studentId } })

    return (
        <Column spacing={12}>
            <ProviderParticipantDetailHeader activeTabId={ProviderParticipantDetailTabsEnum.events} />
            {renderPage()}
        </Column>
    )

    function renderPage() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data?.studentContactMoments || !data?.studentContactMoments.nodes) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <ParticipantsContactMomentsTable
                rows={data?.studentContactMoments.nodes as StudentContactMomentType[]}
                canCreate={canCreateContactMoment.data?.student.canCreateContactMoment}
                hasMore={data?.studentContactMoments.hasMore ?? false}
                loadMore={paginationArgs => fetchMore({ variables: { paginationArgs } })}
                studentId={studentId}
            />
        )
    }
}
