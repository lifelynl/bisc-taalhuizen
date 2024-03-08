import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { useParams } from 'react-router'
import { LanguageHouseParticipantsDetailRouteParams } from 'routes/languageHouse/languageHouseRoutes'
import {
    StudentContactMomentType,
    useCanCreateStudentContactMomentQuery,
    useStudentContactMomentsQuery,
} from 'graphql/v2/generated/graphql'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { ParticipantsContactMomentsTable } from 'components/Domain/Files/Table/ParticipantsContactMomentsTable'
import Column from 'components/Core/Layout/Column/Column'
import { ParticipantDetailHeader } from './ParticipantDetailHeader'
import { DEFAULT_INITIAL_PAGE_SIZE } from 'components/Core/InfiniteScroll/InfiniteScroll'

export const ParticipantsContactMomentsView: React.FC = () => {
    const studentId = useParams<LanguageHouseParticipantsDetailRouteParams>().languageHouseParticipantId
    const { i18n } = useLingui()

    const { data, loading, error, fetchMore } = useStudentContactMomentsQuery({
        variables: {
            paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
            studentId,
        },
    })

    const canCreateContactMoment = useCanCreateStudentContactMomentQuery({ variables: { studentId } })

    return (
        <Column spacing={12}>
            <ParticipantDetailHeader activeTabId={LanguageHouseParticipantDetailTabsEnum.ContactMoments} />
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
