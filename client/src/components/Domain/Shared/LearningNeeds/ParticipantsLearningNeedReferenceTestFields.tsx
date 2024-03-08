import { useLingui } from '@lingui/react'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import {
    EndParticipationFieldsetModel,
    ParticipationResultEndFormSection,
} from 'components/Domain/Participation/Fields/ParticipationResultEndFormSection'
import TestInformationFieldset, {
    TestInformationFieldsetModel,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
import { ParticipationQuery } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props {
    participation?: ParticipationQuery['participation']
    readOnly?: boolean
}

export type ParticipantsLearningNeedReferenceTestFieldsModel = TestInformationFieldsetModel &
    EndParticipationFieldsetModel

export const ParticipantsLearningNeedReferenceTestFields: React.FC<Props> = (props: Props) => {
    const { participation, readOnly } = props
    const { i18n } = useLingui()

    return (
        <Column spacing={10}>
            {!readOnly && (
                <>
                    <ParticipationResultEndFormSection readOnly={readOnly} defaultValues={participation} />
                    <HorizontalRule />
                </>
            )}
            {/**
             * TODO implement missing fields
             */}
            <Section title={i18n._('Toets')}>
                <TestInformationFieldset readOnly={readOnly} testResult={participation?.testResult} />
            </Section>
        </Column>
    )
}
