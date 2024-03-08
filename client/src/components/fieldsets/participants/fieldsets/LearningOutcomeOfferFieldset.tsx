import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import { Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    learningResultApplicationTranslations,
    learningResultLevelTranslations,
    learningResultSubjectTranslations,
} from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'
import {
    LearningNeedOutcomeType,
    LearningResultApplication,
    LearningResultLevel,
    LearningResultSubject,
} from 'graphql/v2/generated/graphql'
import React, { useState } from 'react'

interface Props {
    readOnly?: boolean
    defaultValues?: Data
    allRequired?: boolean
    paths?: Partial<Record<keyof LearningNeedOutcomeType, string | undefined>>
}

type Data = Pick<
    LearningNeedOutcomeType,
    'subject' | 'subjectOther' | 'application' | 'applicationOther' | 'level' | 'levelOther'
>

export type LearningOutcomeOfferFieldsetModel = Data

const LearningOutcomeOfferFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, allRequired, paths } = props
    const { i18n } = useLingui()
    const [learningResultSubject, setLearningResultSubjectValue] = useState<LearningResultSubject | undefined>(
        defaultValues?.subject ?? undefined
    )
    const [learningResultApplication, setLearningResultApplicationValue] = useState<
        LearningResultApplication | undefined
    >(defaultValues?.application ?? undefined)
    const [learningResultLevel, setLearningResultLevelValue] = useState<LearningResultLevel | undefined>(
        defaultValues?.level ?? undefined
    )

    return <Column spacing={4}>{renderFieldsets()}</Column>

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.subject && learningResultSubjectTranslations[defaultValues?.subject]}
                        </Paragraph>
                        {defaultValues?.subject === LearningResultSubject.Other && (
                            <Paragraph italic={true}>{defaultValues?.subjectOther}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Toepassing`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.application &&
                                learningResultApplicationTranslations[defaultValues?.application]}
                        </Paragraph>
                        {defaultValues?.application === LearningResultApplication.Other && (
                            <Paragraph italic={true}>{defaultValues?.applicationOther}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.level && learningResultLevelTranslations[defaultValues?.level]}
                        </Paragraph>
                        {defaultValues?.level === LearningResultLevel.Other && (
                            <Paragraph italic={true}>{defaultValues?.levelOther}</Paragraph>
                        )}
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field required={allRequired} label={i18n._(t`Onderwerp`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name={paths?.subject || 'subject'}
                            placeholder={i18n._(t`Selecteer onderwerp`)}
                            options={renderLearningResultSubjectOptions()}
                            onChangeValue={option =>
                                setLearningResultSubjectValue(
                                    option ? (option.value as LearningResultSubject) : undefined
                                )
                            }
                            defaultValue={
                                defaultValues?.subject
                                    ? {
                                          value: defaultValues.subject,
                                          label: learningResultSubjectTranslations[defaultValues.subject],
                                      }
                                    : undefined
                            }
                        />
                        {learningResultSubject === LearningResultSubject.Other && (
                            <ConditionalCard>
                                <Field required={allRequired} label={i18n._(t`Toepassing`)}>
                                    <Input
                                        name={paths?.subjectOther || 'subjectOther'}
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.subjectOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>

                <Field required={allRequired} label={i18n._(t`Toepassing`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name={paths?.application || 'application'}
                            placeholder={i18n._(t`Selecteer toepassing`)}
                            options={renderOutcomesApplicationsTopicOptions()}
                            onChangeValue={option =>
                                setLearningResultApplicationValue(
                                    option ? (option.value as LearningResultApplication) : undefined
                                )
                            }
                            defaultValue={
                                defaultValues?.application
                                    ? {
                                          value: defaultValues.application,
                                          label: learningResultApplicationTranslations[defaultValues.application],
                                      }
                                    : undefined
                            }
                        />
                        {learningResultApplication === LearningResultApplication.Other && (
                            <ConditionalCard>
                                <Field required={allRequired}>
                                    <Input
                                        name={paths?.applicationOther || 'applicationOther'}
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.applicationOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Niveau`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name={paths?.level || 'level'}
                            placeholder={i18n._(t`Selecteer niveau`)}
                            options={renderOutcomesLevelOptions()}
                            onChangeValue={option =>
                                setLearningResultLevelValue(option ? (option.value as LearningResultLevel) : undefined)
                            }
                            defaultValue={
                                defaultValues?.level
                                    ? {
                                          value: defaultValues.level,
                                          label: learningResultLevelTranslations[defaultValues.level],
                                      }
                                    : undefined
                            }
                        />
                        {learningResultLevel === LearningResultLevel.Other && (
                            <ConditionalCard>
                                <Field required={allRequired}>
                                    <Input
                                        name={paths?.levelOther || 'levelOther'}
                                        placeholder={i18n._(t`Namelijk...`)}
                                        defaultValue={defaultValues?.levelOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </>
        )
    }

    function renderLearningResultSubjectOptions() {
        const disabledOptions = [
            LearningResultSubject.Knowledge,
            LearningResultSubject.Skills,
            LearningResultSubject.Attitude,
            LearningResultSubject.Behaviour,
        ]

        return Object.values(LearningResultSubject)
            .filter(v => !disabledOptions.includes(v)) // filter out the disabled options
            .map(value => ({
                value,
                label: learningResultSubjectTranslations[value] ?? 'NOT SUPPORTED',
            }))
    }

    function renderOutcomesApplicationsTopicOptions() {
        return Object.values(LearningResultApplication).map(value => ({
            value,
            label: learningResultApplicationTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }

    function renderOutcomesLevelOptions() {
        return Object.values(LearningResultLevel).map(value => ({
            value,
            label: learningResultLevelTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }
}
export default LearningOutcomeOfferFieldset
