import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import TextArea from 'components/Core/DataEntry/TextArea'
import { studentMotivationDesiredLearningMethodsEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import nl2br from 'react-nl2br'
import {
    DesiredLearningMethod,
    LearningResultApplication,
    LearningResultLevel,
    LearningResultSubject,
    Maybe,
} from 'graphql/v2/generated/graphql'
import { BooleanCheckboxValue } from 'utils/forms'
import LearningOutcomeOfferFieldset from './LearningOutcomeOfferFieldset'

interface Props {
    prefillData?: MotivationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface MotivationInformationFieldsetModel {
    'registration.hasTriedThisBefore'?: BooleanCheckboxValue
    'registration.hasTriedThisBeforeExplanation'?: string
    'registration.whyWantTheseskills'?: string
    'registration.whyWantThisNow'?: string
    'registration.desiredLearningMethod'?: DesiredLearningMethod[]
    'registration.remarks'?: string
    'desiredLearningNeedOutcome.subject'?: LearningResultSubject
    'desiredLearningNeedOutcome.subjectOther'?: string
    'desiredLearningNeedOutcome.application'?: LearningResultApplication
    'desiredLearningNeedOutcome.applicationOther'?: string
    'desiredLearningNeedOutcome.level'?: LearningResultLevel
    'desiredLearningNeedOutcome.levelOther'?: string
}

interface MotivationInformationFieldsetPrefillData {
    'registration.hasTriedThisBefore'?: Maybe<boolean>
    'registration.hasTriedThisBeforeExplanation'?: Maybe<string>
    'registration.whyWantTheseskills'?: Maybe<string>
    'registration.whyWantThisNow'?: Maybe<string>
    'registration.desiredLearningMethod'?: Maybe<DesiredLearningMethod[]>
    'registration.remarks'?: Maybe<string>
    'desiredLearningNeedOutcome.subject'?: Maybe<LearningResultSubject>
    'desiredLearningNeedOutcome.subjectOther'?: Maybe<string>
    'desiredLearningNeedOutcome.application'?: Maybe<LearningResultApplication>
    'desiredLearningNeedOutcome.applicationOther'?: Maybe<string>
    'desiredLearningNeedOutcome.level'?: Maybe<LearningResultLevel>
    'desiredLearningNeedOutcome.levelOther'?: Maybe<string>
}

export const MotivationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const learningPreferences = getStudentMotivationDesiredLearningMethodsEnumOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Motivatie`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                        <LearningOutcomeOfferFieldset
                            readOnly={true}
                            defaultValues={getDesiredLearningNeedOutcomeDefaultValues()}
                            paths={{
                                subject: 'desiredLearningNeedOutcome.subject',
                                subjectOther: 'desiredLearningNeedOutcome.subjectOther',
                                application: 'desiredLearningNeedOutcome.application',
                                applicationOther: 'desiredLearningNeedOutcome.applicationOther',
                                level: 'desiredLearningNeedOutcome.level',
                                levelOther: 'desiredLearningNeedOutcome.levelOther',
                            }}
                        />
                    </Field>
                    <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                        <p>{prefillData?.['registration.hasTriedThisBefore'] ? i18n._(t`Ja`) : i18n._(t`Nee`)}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                        <p>{prefillData?.['registration.hasTriedThisBeforeExplanation']}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                        <p>{prefillData?.['registration.whyWantTheseskills']}</p>
                    </Field>

                    <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                        <p>{prefillData?.['registration.whyWantThisNow']}</p>
                    </Field>

                    <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                        {renderLearningPreferenceCheckboxes()}
                    </Field>

                    <Field label={i18n._(t`Opmerkingen van de deelnemer`)} horizontal={true}>
                        <p>{nl2br(prefillData?.['registration.remarks'])}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Motivatie`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Wat wil je graag leren?`)} horizontal={true}>
                    <LearningOutcomeOfferFieldset
                        defaultValues={getDesiredLearningNeedOutcomeDefaultValues()}
                        paths={{
                            subject: 'desiredLearningNeedOutcome.subject',
                            subjectOther: 'desiredLearningNeedOutcome.subjectOther',
                            application: 'desiredLearningNeedOutcome.application',
                            applicationOther: 'desiredLearningNeedOutcome.applicationOther',
                            level: 'desiredLearningNeedOutcome.level',
                            levelOther: 'desiredLearningNeedOutcome.levelOther',
                        }}
                    />
                </Field>
                <Field label={i18n._(t`Heb je dit al eerder geprobeerd?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={`registration.hasTriedThisBefore`}
                            value={BooleanCheckboxValue.yes}
                            defaultChecked={prefillData?.['registration.hasTriedThisBefore'] === true}
                        />
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={`registration.hasTriedThisBefore`}
                            value={BooleanCheckboxValue.no}
                            defaultChecked={prefillData?.['registration.hasTriedThisBefore'] === false}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Waarom wel/niet?`)} horizontal={true}>
                    <Input
                        name="registration.hasTriedThisBeforeExplanation"
                        placeholder={i18n._(t`Reden waarom`)}
                        defaultValue={prefillData?.['registration.hasTriedThisBeforeExplanation'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je dit leren?`)} horizontal={true}>
                    <Input
                        name="registration.whyWantTheseskills"
                        placeholder={i18n._(t`Reden`)}
                        defaultValue={prefillData?.['registration.whyWantTheseskills'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Waarom wil je het nu leren?`)} horizontal={true}>
                    <Input
                        name="registration.whyWantThisNow"
                        placeholder={i18n._(t`Waarom nu`)}
                        defaultValue={prefillData?.['registration.whyWantThisNow'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Hoe wil je dit graag leren?`)} horizontal={true}>
                    <Column spacing={4}>{renderLearningPreferenceCheckboxes()}</Column>
                </Field>
                <Field
                    label={i18n._(t`Opmerkingen van de deelnemer`)}
                    description={
                        'Bijzonderheden bijv. over huis, lesnemer, gezin, wensen, taalniveau, dagbesteding etc.'
                    }
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <TextArea
                            name="registration.remarks"
                            placeholder={i18n._(t`Opmerkingen`)}
                            defaultValue={prefillData?.['registration.remarks'] ?? undefined}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderLearningPreferenceCheckboxes() {
        if (readOnly) {
            const selectedDesiredLearningMethods = prefillData?.['registration.desiredLearningMethod'] || []

            return selectedDesiredLearningMethods.map((preference, index) => {
                return (
                    <React.Fragment key={index}>
                        <p>
                            {
                                learningPreferences.find(learningPreference => learningPreference.value === preference)
                                    ?.label
                            }
                        </p>
                    </React.Fragment>
                )
            })
        }

        return learningPreferences.map((preference, index) => {
            return (
                <React.Fragment key={index}>
                    <Checkbox
                        label={preference.label}
                        name={'registration.desiredLearningMethod[]'}
                        value={preference.value}
                        defaultChecked={
                            !!prefillData?.['registration.desiredLearningMethod']?.find(
                                learningMethod => learningMethod === preference.value
                            )
                        }
                    />
                </React.Fragment>
            )
        })
    }

    function getStudentMotivationDesiredLearningMethodsEnumOptions() {
        return Object.values(DesiredLearningMethod).map(value => ({
            label: studentMotivationDesiredLearningMethodsEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }

    function getDesiredLearningNeedOutcomeDefaultValues() {
        return {
            subject: prefillData?.['desiredLearningNeedOutcome.subject'] ?? undefined,
            subjectOther: prefillData?.['desiredLearningNeedOutcome.subjectOther'] ?? undefined,
            application: prefillData?.['desiredLearningNeedOutcome.application'] ?? undefined,
            applicationOther: prefillData?.['desiredLearningNeedOutcome.applicationOther'] ?? undefined,
            level: prefillData?.['desiredLearningNeedOutcome.level'] ?? undefined,
            levelOther: prefillData?.['desiredLearningNeedOutcome.levelOther'] ?? undefined,
        }
    }
}
