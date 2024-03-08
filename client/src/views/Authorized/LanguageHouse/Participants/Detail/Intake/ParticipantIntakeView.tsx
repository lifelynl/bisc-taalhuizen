import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { ParticipantIntakeFields } from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { useStudentForIntakeQuery } from 'graphql/v2/generated/graphql'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantDetailHeader } from '../ParticipantDetailHeader'
import { SessionContext } from 'components/Providers/SessionProvider/context'

export const ParticipantsIntakeView: React.FunctionComponent = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { data, loading, error } = useStudentForIntakeQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })

    return (
        <Column spacing={12}>
            <ParticipantDetailHeader
                activeTabId={LanguageHouseParticipantDetailTabsEnum.Intake}
                organisation={data?.student.organization.name}
            />
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

        return (
            <>
                <ParticipantIntakeFields
                    student={data.student}
                    disabledIntakeFields={data.student.organization.disabledIntakeFields}
                    readOnly={true}
                />
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() =>
                                history.push(
                                    languageHouseRoutes(organizationSlug).participants.detail(
                                        languageHouseParticipantId
                                    ).data.update
                                )
                            }
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    }
                />
            </>
        )
    }
}
