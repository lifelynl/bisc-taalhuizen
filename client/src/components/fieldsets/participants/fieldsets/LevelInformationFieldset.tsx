import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentSpeakingLevelEnumEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { Maybe, SpeakingLevel } from 'graphql/v2/generated/graphql'

interface Props {
    prefillData?: LevelInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface LevelInformationFieldsetModel {
    'registration.speakingLevel'?: SpeakingLevel
}
interface LevelInformationFieldsetPrefillData {
    'registration.speakingLevel'?: Maybe<SpeakingLevel>
}

export const LevelInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const languageLevels = getLanguageLevelOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Niveau`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Taalniveau qua spreken`)} description={i18n._(t`Indruk`)} horizontal={true}>
                        {prefillData?.['registration.speakingLevel'] &&
                            languageLevels.find(o => o.value === prefillData['registration.speakingLevel'])?.label}
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Niveau`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Taalniveau qua spreken`)} description={i18n._(t`Indruk`)} horizontal={true}>
                    <Column spacing={4}>
                        {[SpeakingLevel.Beginner, SpeakingLevel.Reasonable, SpeakingLevel.Advanced].map(
                            (level, index) => (
                                <RadioButton
                                    key={`${level}-${index}`}
                                    name={'registration.speakingLevel'}
                                    value={level}
                                    defaultChecked={prefillData?.['registration.speakingLevel'] === level}
                                    label={languageLevels.find(o => o.value === level)?.label}
                                />
                            )
                        )}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getLanguageLevelOptions() {
        return Object.values(SpeakingLevel).map(value => ({
            label: studentSpeakingLevelEnumEnumTranslations[value],
            value,
        }))
    }
}
