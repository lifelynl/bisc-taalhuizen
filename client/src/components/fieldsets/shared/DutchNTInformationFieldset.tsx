import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Select } from 'components/Core/DataEntry/Select'
import { YearInput } from 'components/Core/DataEntry/YearInput'
import Paragraph from 'components/Core/Typography/Paragraph'
import { studentDutchLastKnownLevelEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { DutchNt2Level, DutchNtType, Maybe } from 'graphql/v2/generated/graphql'
import React, { useEffect, useState } from 'react'
import { BooleanCheckboxValue } from 'utils/forms'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: DutchNTFieldsetPrefillData
    readOnly?: boolean
}

export interface DutchNTFieldsetModel {
    'registration.dutchNTLevel'?: DutchNtType
    'registration.inNetherlandsSinceYear'?: string
    'registration.languageInDailyLife'?: string
    'registration.knowsLatinAlphabet'?: BooleanCheckboxValue
    'registration.lastKnownLevel'?: DutchNt2Level
}

interface DutchNTFieldsetPrefillData {
    'registration.dutchNTLevel'?: Maybe<DutchNtType>
    'registration.inNetherlandsSinceYear'?: Maybe<number>
    'registration.languageInDailyLife'?: Maybe<string>
    'registration.knowsLatinAlphabet'?: Maybe<boolean>
    'registration.lastKnownLevel'?: Maybe<DutchNt2Level>
}

export const DutchNTFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [dutchNTLevel, setDutchNTLevel] = useState<DutchNtType | undefined>(undefined)

    useEffect(() => {
        setDutchNTLevel(prefillData?.['registration.dutchNTLevel'] ?? undefined)
    }, [prefillData])
    const levelOptions = getStudentDutchLastKnownLevelEnumTranslationsOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Nederlands NT`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Nederlands NT1 of NT2`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>{prefillData?.['registration.dutchNTLevel']}</Paragraph>
                            {dutchNTLevel === DutchNtType.Nt2 && (
                                <ConditionalCard>
                                    <Column spacing={5}>
                                        <Field label={i18n._(t`In Nederland sinds`)}>
                                            <Paragraph>
                                                {prefillData?.['registration.inNetherlandsSinceYear']}
                                            </Paragraph>
                                        </Field>

                                        <Field
                                            label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}
                                        >
                                            <Paragraph>{prefillData?.['registration.languageInDailyLife']}</Paragraph>
                                        </Field>

                                        <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                            <Paragraph>
                                                {prefillData?.['registration.knowsLatinAlphabet']
                                                    ? i18n._(t`Ja`)
                                                    : i18n._(t`Nee`)}
                                            </Paragraph>
                                        </Field>

                                        <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                            <Paragraph>
                                                {
                                                    levelOptions.find(
                                                        levelOption =>
                                                            levelOption.value ===
                                                            prefillData?.['registration.lastKnownLevel']
                                                    )?.label
                                                }
                                            </Paragraph>
                                        </Field>
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Nederlands NT`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`NT1 of NT2`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'registration.dutchNTLevel'}
                            value={DutchNtType.Nt1}
                            label={i18n._(t`NT1`)}
                            onChange={e => setDutchNTLevel(e.target.value as DutchNtType)}
                            checked={dutchNTLevel === DutchNtType.Nt1}
                        />
                        <RadioButton
                            name={'registration.dutchNTLevel'}
                            value={DutchNtType.Nt2}
                            label={i18n._(t`NT2`)}
                            onChange={e => setDutchNTLevel(e.target.value as DutchNtType)}
                            checked={dutchNTLevel === DutchNtType.Nt2}
                        />
                        {dutchNTLevel === DutchNtType.Nt2 && (
                            <ConditionalCard>
                                <Column spacing={5}>
                                    <Field label={i18n._(t`In Nederland sinds`)}>
                                        <YearInput
                                            name="registration.inNetherlandsSinceYear"
                                            placeholder={i18n._(t`JJJJ`)}
                                            defaultValue={
                                                prefillData?.['registration.inNetherlandsSinceYear'] ?? undefined
                                            }
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}>
                                        <Input
                                            name="registration.languageInDailyLife"
                                            placeholder={i18n._(t`Taal`)}
                                            defaultValue={
                                                prefillData?.['registration.languageInDailyLife'] ?? undefined
                                            }
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                        <Column spacing={3}>
                                            <RadioButton
                                                name={'registration.knowsLatinAlphabet'}
                                                value={BooleanCheckboxValue.yes}
                                                label={i18n._(t`Ja`)}
                                                defaultChecked={
                                                    prefillData?.['registration.knowsLatinAlphabet'] === true
                                                }
                                            />
                                            <RadioButton
                                                name={'registration.knowsLatinAlphabet'}
                                                value={BooleanCheckboxValue.no}
                                                label={i18n._(t`Nee`)}
                                                defaultChecked={
                                                    prefillData?.['registration.knowsLatinAlphabet'] === false
                                                }
                                            />
                                        </Column>
                                    </Field>

                                    <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                        <Select
                                            list="registration.lastKnownLevel"
                                            name="registration.lastKnownLevel"
                                            placeholder={i18n._(t`Selecteer niveau`)}
                                            options={levelOptions}
                                            defaultValue={
                                                prefillData?.['registration.lastKnownLevel']
                                                    ? {
                                                          value: prefillData['registration.lastKnownLevel'],
                                                          label: studentDutchLastKnownLevelEnumTranslations[
                                                              prefillData['registration.lastKnownLevel']
                                                          ],
                                                      }
                                                    : undefined
                                            }
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getStudentDutchLastKnownLevelEnumTranslationsOptions() {
        return Object.values(DutchNt2Level).map(value => ({
            label: studentDutchLastKnownLevelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
