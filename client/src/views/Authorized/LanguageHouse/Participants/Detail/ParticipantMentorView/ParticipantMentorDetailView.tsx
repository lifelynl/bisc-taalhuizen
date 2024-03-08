import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { LanguageHouseParticipantMentorFields } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantMentorFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useStudentForMentorQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'

export const ParticipantMentorDetailView: React.FunctionComponent = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error } = useStudentForMentorQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

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

    return (
        <>
            <LanguageHouseParticipantMentorFields student={data?.student} readOnly={true} />
            <Actionbar
                RightComponent={
                    <Button
                        onClick={() =>
                            history.push(
                                languageHouseRoutes(organizationSlug).participants.detail(languageHouseParticipantId)
                                    .data.mentor.update
                            )
                        }
                    >
                        {i18n._('Bewerken')}
                    </Button>
                }
            />
        </>
    )
}
