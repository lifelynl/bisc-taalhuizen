import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import TextArea from 'components/Core/DataEntry/TextArea'
import ControlField from 'components/Core/Field/ControlField'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import {
    LearningResultApplication,
    LearningResultLevel,
    LearningResultSubject,
    Maybe,
    ParticipationsQuery,
} from 'graphql/v2/generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props extends ConnectedFieldsetProps<Fields> {
    testResult?: ParticipationsQuery['participations']['nodes'][0]['testResult']
    readOnly?: boolean
    errorPath?: Partial<Record<keyof TestInformationFieldsetModel, string | undefined>>
}
export interface TestInformationFieldsetModel {
    usedExam?: Maybe<string>
    examDate: Maybe<string>
    memo?: Maybe<string>
    'learningNeedOutcome.subject': Maybe<LearningResultSubject>
    'learningNeedOutcome.subjectOther'?: Maybe<string>
    'learningNeedOutcome.application': Maybe<LearningResultApplication>
    'learningNeedOutcome.applicationOther'?: Maybe<string>
    'learningNeedOutcome.level': Maybe<LearningResultLevel>
    'learningNeedOutcome.levelOther'?: Maybe<string>
}

type Fields = 'usedExam' | 'examDate' | 'memo' | 'level'

const TestInformationFieldset: React.FunctionComponent<Props> = props => {
    const { testResult: defaultValues, readOnly, fieldNaming, fieldControls, errorPath } = props
    const { i18n } = useLingui()

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Toets`),
            usedExam: {
                label: i18n._(t`Gebruikte toets`),
                placeholder: i18n._(t`Gebruikte toets`),
            },
            examDate: {
                label: i18n._(t`Toetsdatum`),
                placeholder: i18n._(t`DD/MM/YYYY`),
            },
            memo: {
                label: i18n._(t`Toelichting`),
                placeholder: i18n._(t`Toelichting`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            usedExam: {},
            examDate: {},
            memo: {},
        },
        fieldControls
    )

    return <Column spacing={4}>{renderFields()}</Column>

    function renderFields() {
        if (readOnly) {
            return (
                <>
                    <ControlField
                        readOnly={true}
                        control={controls.usedExam}
                        label={content.usedExam?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.usedExam}</Paragraph>
                    </ControlField>
                    <ControlField
                        readOnly={true}
                        control={controls.examDate}
                        label={content.examDate?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {defaultValues?.examDate && DateFormatters.formattedDate(defaultValues?.examDate)}
                        </Paragraph>
                    </ControlField>
                    <ControlField readOnly={true} control={controls.memo} label={content.memo?.label} horizontal={true}>
                        <Paragraph>{defaultValues?.memo}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField control={controls.usedExam} label={content.usedExam?.label} horizontal={true}>
                    <Input
                        errorPath={errorPath?.usedExam || 'usedExam'}
                        name="usedExam"
                        placeholder={content.usedExam?.placeholder}
                        defaultValue={defaultValues?.usedExam ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.examDate} label={content.examDate?.label} horizontal={true}>
                    <Column spacing={2}>
                        <DateInput
                            errorPath={errorPath?.examDate || 'examDate'}
                            name="examDate"
                            placeholder={content.examDate?.placeholder}
                            defaultValue={defaultValues?.examDate ?? undefined}
                        />
                    </Column>
                </ControlField>

                <ControlField control={controls.memo} label={content.memo?.label} horizontal={true}>
                    <Column spacing={2}>
                        <TextArea
                            errorPath={errorPath?.memo || 'memo'}
                            name="memo"
                            placeholder={content.memo?.placeholder}
                            defaultValue={defaultValues?.memo ?? undefined}
                        />
                    </Column>
                </ControlField>
            </>
        )
    }
}

export default TestInformationFieldset
