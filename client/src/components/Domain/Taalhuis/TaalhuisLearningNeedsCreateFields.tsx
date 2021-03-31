import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import { DesiredOutcomesFieldset } from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import OfferInfortmationInformationFieldset from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import React from 'react'
import { LearningNeedsDetails } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'

interface Props {
    learningNeed?: LearningNeedsDetails
    readOnly?: boolean
}

export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = ({ learningNeed, readOnly }) => {
    return (
        <Column>
            <LearningQuestionsFieldset readOnly={readOnly} defaultValues={learningNeed?.learningQuestion} />
            <HorizontalRule />
            <DesiredOutcomesFieldset readOnly={readOnly} defaultValues={learningNeed?.desiredOutcome} />
            <HorizontalRule />
            {!readOnly && <OfferInfortmationInformationFieldset defaultValues={learningNeed?.learningQuestion} />}
        </Column>
    )
}
