import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useParams } from 'react-router'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ParticipationRegistrationReadFields } from 'components/Domain/Shared/Participation/ParticipationRegistrationReadFields'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { StudentType, useStudentForRegistrationQuery } from 'graphql/v2/generated/graphql'
import { LanguageHouseParticipantsDetailRouteParams } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantDetailHeader } from './ParticipantDetailHeader'

export const ParticipantsRegistrationView: React.FC = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const { i18n } = useLingui()

    const { data, loading, error } = useStudentForRegistrationQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    return (
        <Column spacing={12}>
            <ParticipantDetailHeader activeTabId={LanguageHouseParticipantDetailTabsEnum.Registration} />
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

        if (error || !data?.student) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const registeredPublicly = !!data.student?.registration?.registeredPublicly

        return (
            <Column spacing={12}>
                {registeredPublicly ? (
                    <ParticipationRegistrationReadFields student={data.student as Partial<StudentType>} />
                ) : (
                    <Paragraph subtle={true}>{i18n._(t`Geen digitale aanmelding`)}</Paragraph>
                )}
            </Column>
        )
    }
}
