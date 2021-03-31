import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import React from 'react'
import { AanbiederParticipantGoal } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { DesiredOutcomesFieldset } from '../../../fieldsets/participants/fieldsets/DesiredOutcomesFieldset'

interface Props {
    participantGoal: AanbiederParticipantGoal
}

export const AanbiederParticipantGoalDetailFields: React.FunctionComponent<Props> = ({ participantGoal }) => {
    const { learningQuestion, desiredOutcome } = participantGoal

    return (
        <>
            <LearningQuestionsFieldset defaultValues={learningQuestion} readOnly={true} />
            <HorizontalRule />
            <DesiredOutcomesFieldset defaultValues={desiredOutcome} readOnly={true} />
            <HorizontalRule />
            {/* TODO: add reference fieldset */}
        </>
    )
}
