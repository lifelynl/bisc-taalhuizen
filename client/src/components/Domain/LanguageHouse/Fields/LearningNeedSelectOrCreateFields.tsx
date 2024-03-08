import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import LearningNeedSelectFields from 'components/fieldsets/participants/fieldsets/LearningNeedSelectFields'
import {
    LearningQuestionsFields,
    LearningQuestionsFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningQuestionsFields'
import { useState } from 'react'

export interface ParticipantLearningNeedFieldsFormModel extends LearningQuestionsFieldsetModel {
    learningNeed?: string
}

interface Props {
    studentId: string
}

export const LearningNeedSelectOrCreateFields: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const [hasSelectedNewLearningNeedOption, setHasSelectedNewLearningNeedOption] = useState<boolean>(false)

    return (
        <Section title={i18n._(t`Leervraag`)}>
            <Column spacing={4}>
                <LearningNeedSelectFields studentId={props.studentId} onLearningNeedChange={onLearningNeedChange} />
                {hasSelectedNewLearningNeedOption && <LearningQuestionsFields />}
            </Column>
        </Section>
    )

    function onLearningNeedChange(selectedOther: boolean, value?: string | number) {
        if (selectedOther) {
            setHasSelectedNewLearningNeedOption(true)
        } else {
            setHasSelectedNewLearningNeedOption(false)
        }
    }
}
