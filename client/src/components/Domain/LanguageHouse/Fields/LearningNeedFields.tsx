import { t } from '@lingui/macro'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import {
    LearningQuestionsFields,
    LearningQuestionsFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningQuestionsFields'
import React from 'react'
import OfferInformationFieldset, {
    OfferInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import {
    LearningNeedQuery,
    LearningResultApplication,
    LearningResultLevel,
    LearningResultSubject,
    Maybe,
    StudentForDesiredLearningNeedOutcomeQuery,
} from 'graphql/v2/generated/graphql'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { useLingui } from '@lingui/react'
import Section from 'components/Core/Field/Section'

export interface ParticipantLearningNeedFieldsFormModel
    extends LearningQuestionsFieldsetModel,
        OfferInformationFieldsetModel {
    'desiredLearningNeedOutcome.subject': Maybe<LearningResultSubject>
    'desiredLearningNeedOutcome.subjectOther'?: Maybe<string>
    'desiredLearningNeedOutcome.application': Maybe<LearningResultApplication>
    'desiredLearningNeedOutcome.applicationOther'?: Maybe<string>
    'desiredLearningNeedOutcome.level': Maybe<LearningResultLevel>
    'desiredLearningNeedOutcome.levelOther'?: Maybe<string>
}

interface Props {
    learningNeed?: LearningNeedQuery['learningNeed']
    readOnly?: boolean
    desiredLearningNeedOutcomes?:
        | StudentForDesiredLearningNeedOutcomeQuery['student']['registration']['desiredLearningNeedOutcome']
        | null
}

export const LearningNeedFields: React.FC<Props> = props => {
    const { learningNeed, desiredLearningNeedOutcomes, readOnly } = props
    const { i18n } = useLingui()

    return (
        <Column>
            <Section title={i18n._(t`Leervraag`)}>
                <LearningQuestionsFields
                    readOnly={readOnly}
                    defaultValues={{
                        description: learningNeed?.description,
                        motivation: learningNeed?.motivation,
                    }}
                />
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Gewenste leeruitkomst`)}>
                <LearningOutcomeOfferFieldset
                    readOnly={readOnly}
                    defaultValues={learningNeed?.desiredLearningNeedOutcome || desiredLearningNeedOutcomes || undefined}
                    paths={{
                        subject: 'desiredLearningNeedOutcome.subject',
                        subjectOther: 'desiredLearningNeedOutcome.subjectOther',
                        application: 'desiredLearningNeedOutcome.application',
                        applicationOther: 'desiredLearningNeedOutcome.applicationOther',
                        level: 'desiredLearningNeedOutcome.level',
                        levelOther: 'desiredLearningNeedOutcome.levelOther',
                    }}
                />
            </Section>
            <HorizontalRule />
            <OfferInformationFieldset
                readOnly={readOnly}
                defaultValues={{
                    advisedOffer: learningNeed?.advisedOffer,
                    desiredOffer: learningNeed?.desiredOffer,
                    offerDifference: learningNeed?.offerDifference,
                    offerDifferenceOther: learningNeed?.offerDifferenceOther,
                    agreements: learningNeed?.agreements,
                }}
            />
        </Column>
    )
}
