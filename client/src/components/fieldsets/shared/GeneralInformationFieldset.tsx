import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { maritalStatusTranslations } from '../participants/translations/participantsTranslations'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import { CountrySelect, getCountryLabelByCode } from 'components/Domain/Shared/components/CountrySelect/CountrySelect'
import { MaritalStatus, Maybe } from 'graphql/v2/generated/graphql'
import { DateFormatters } from 'utils/formatters/Date/Date'
import Paragraph from 'components/Core/Typography/Paragraph'
import DateInput from 'components/Core/DataEntry/DateInput'

interface Props {
    prefillData?: GeneralInformationFieldsetPrefillData
    readOnly?: boolean
    showCreatedAt?: boolean
}

interface GeneralInformationFieldsetPrefillData {
    intakeDate?: Maybe<string>
    'person.birthplace'?: Maybe<string>
    'person.primaryLanguage'?: Maybe<string>
    'person.speakingLanguages'?: Maybe<string>
    'person.maritalStatus'?: Maybe<MaritalStatus>
    'person.children'?: Maybe<number>
}

export interface GeneralInformationFieldsetModel {
    intakeDate?: Maybe<Date>
    'person.birthplace'?: Maybe<string>
    'person.primaryLanguage'?: string
    'person.speakingLanguages'?: string
    'person.maritalStatus'?: MaritalStatus
    'person.children'?: string
}

export const GeneralInformationFieldset: React.FunctionComponent<Props> = props => {
    const { showCreatedAt, prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Algemeen`)}>
                <Column spacing={4}>
                    {showCreatedAt && (
                        <Field label={i18n._(t`Aanmaakdatum`)} horizontal={true}>
                            <Paragraph>
                                {prefillData?.['intakeDate'] &&
                                    DateFormatters.formattedDate(prefillData?.['intakeDate'])}
                            </Paragraph>
                        </Field>
                    )}
                    <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                        <Paragraph>
                            {prefillData?.['person.birthplace'] &&
                                getCountryLabelByCode(prefillData?.['person.birthplace'])}
                        </Paragraph>
                    </Field>

                    <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                        <Paragraph>{prefillData?.['person.primaryLanguage']}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Talen naast moedertaal`)} horizontal={true}>
                        <Paragraph>{prefillData?.['person.speakingLanguages']}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                        <Paragraph>
                            {prefillData?.['person.maritalStatus'] &&
                                maritalStatusTranslations[prefillData?.['person.maritalStatus']]}
                        </Paragraph>
                    </Field>

                    <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                        <Paragraph>{prefillData?.['person.children']}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Algemeen`)}>
            <Column spacing={4}>
                {showCreatedAt && (
                    <Field label={i18n._(t`Aanmaakdatum`)} required={true} horizontal={true}>
                        <DateInput name="intakeDate" defaultValue={prefillData?.['intakeDate'] ?? undefined} />
                    </Field>
                )}
                <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                    <CountrySelect
                        name={'person.birthplace'}
                        placeholder={i18n._(t`Selecteer land`)}
                        defaultValue={prefillData?.['person.birthplace'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                    <Input
                        name={'person.primaryLanguage'}
                        placeholder={i18n._(t`Moedertaal`)}
                        defaultValue={prefillData?.['person.primaryLanguage'] || ''}
                    />
                </Field>
                <Field label={i18n._(t`Welke talen spreek je nog meer?`)} horizontal={true}>
                    <Input
                        name={'person.speakingLanguages'}
                        placeholder={i18n._(t`Talen naast moedertaal`)}
                        defaultValue={prefillData?.['person.speakingLanguages'] || ''}
                    />
                </Field>
                <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                    <Column spacing={4}>
                        {Object.values(MaritalStatus).map((value, key, array) => (
                            <RadioButton
                                key={`${key}-${array.length}`}
                                name={'person.maritalStatus'}
                                value={value}
                                defaultChecked={value === prefillData?.['person.maritalStatus']}
                                label={maritalStatusTranslations[value]}
                            />
                        ))}
                    </Column>
                </Field>
                <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                    <Input
                        type="number"
                        name={'person.children'}
                        placeholder={i18n._(t`Aantal kinderen`)}
                        defaultValue={prefillData?.['person.children'] || ''}
                        min={0}
                    />
                </Field>
            </Column>
        </Section>
    )
}
