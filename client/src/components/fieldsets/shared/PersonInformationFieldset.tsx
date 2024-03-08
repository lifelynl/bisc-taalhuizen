import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GenericValidators } from 'utils/validators/GenericValidators'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import { genderTranslations } from '../participants/translations/participantsTranslations'
import { Gender, Maybe, ProviderTargetGroupPreference } from 'graphql/v2/generated/graphql'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: PersonInformationFieldsetModel
    readOnly?: boolean
    alternativeFieldsetTitle?: string
}

export interface PersonInformationFieldsetModel {
    'person.familyName'?: Maybe<string>
    'person.additionalName'?: Maybe<string>
    'person.givenName'?: Maybe<string>
    'person.gender'?: Maybe<Gender>
    'person.birthday'?: Maybe<string>
    'person.birthplace'?: Maybe<string>
    'person.providerTargetGroupPreference'?: Maybe<ProviderTargetGroupPreference[]>
    'person.providerVolunteeringPreference'?: Maybe<string>
    'person.providerLanguageHouseVolunteeringReference'?: Maybe<string>
    'person.providerTargetGroupIsExperienced'?: Maybe<BooleanCheckboxValue>
    'person.providerTargetGroupExperience'?: Maybe<string>
}

type Fields = 'familyName' | 'additionalName' | 'givenName' | 'gender' | 'birthday' | 'birthplace'

export const PersonInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls, alternativeFieldsetTitle } = props

    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: alternativeFieldsetTitle ?? i18n._(t`Persoonsgegevens`),
            familyName: {
                label: i18n._(t`Achternaam`),
                placeholder: i18n._(t`Achternaam`),
            },
            additionalName: {
                label: i18n._(t`Tussenvoegsel`),
                placeholder: i18n._(t`Tussenvoegsel`),
            },
            givenName: {
                label: i18n._(t`Roepnaam`),
                placeholder: i18n._(t`Roepnaam`),
            },
            gender: {
                label: i18n._(t`Geslacht`),
                placeholder: i18n._(t`Geslacht`),
            },
            birthday: {
                label: i18n._(t`Geboortedatum`),
                placeholder: i18n._(t`Geboortedatum`),
            },
            birthplace: {
                label: i18n._(t`Land van herkomst`),
                placeholder: i18n._(t`Land`),
            },
        },
        fieldNaming
    )

    const controls = useFieldsetControl<Fields>(
        {
            familyName: {
                validators: [GenericValidators.required],
                required: true,
            },
            additionalName: {},
            givenName: { validators: [GenericValidators.required], required: true },
            gender: {},
            birthday: {},
            birthplace: {},
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.givenName} label={content.givenName?.label} horizontal={true}>
                        <Paragraph>{prefillData?.['person.givenName']}</Paragraph>
                    </ControlField>

                    <ControlField control={controls.familyName} label={content.familyName?.label} horizontal={true}>
                        <Paragraph>
                            {NameFormatters.formattedLastName({
                                additionalName: prefillData?.['person.additionalName'] || undefined,
                                familyName: prefillData?.['person.familyName'] || undefined,
                            })}
                        </Paragraph>
                    </ControlField>

                    <ControlField control={controls.gender} label={content.gender?.label} horizontal={true}>
                        <Paragraph>
                            {prefillData?.['person.gender'] && genderTranslations[prefillData?.['person.gender']]}
                        </Paragraph>
                    </ControlField>

                    <ControlField control={controls.birthday} label={content.birthday?.label} horizontal={true}>
                        <Paragraph>
                            {prefillData?.['person.birthday'] &&
                                DateFormatters.formattedDate(prefillData?.['person.birthday'])}
                        </Paragraph>
                    </ControlField>

                    <ControlField control={controls.birthplace} label={content.birthplace?.label} horizontal={true}>
                        <Paragraph>{prefillData?.['person.birthplace']}</Paragraph>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Persoonsgegevens`)}>
            <Column spacing={4}>
                <ControlField control={controls.givenName} label={content?.givenName?.label} horizontal={true}>
                    <Input
                        name="person.givenName"
                        placeholder={content.givenName?.placeholder}
                        defaultValue={prefillData?.['person.givenName'] ?? undefined}
                    />
                </ControlField>

                <ControlField
                    control={controls.additionalName}
                    label={content?.additionalName?.label}
                    horizontal={true}
                >
                    <Input
                        name="person.additionalName"
                        placeholder={content.additionalName?.placeholder}
                        defaultValue={prefillData?.['person.additionalName'] ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.familyName} label={content.familyName?.label} horizontal={true}>
                    <Input
                        name="person.familyName"
                        placeholder={content.familyName?.placeholder}
                        defaultValue={prefillData?.['person.familyName'] ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.gender} label={content?.gender?.label} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'person.gender'}
                            value={Gender.Male}
                            label={i18n._(t`Man`)}
                            defaultChecked={prefillData?.['person.gender'] === Gender.Male}
                        />
                        <RadioButton
                            name={'person.gender'}
                            value={Gender.Female}
                            label={i18n._(t`Vrouw`)}
                            defaultChecked={prefillData?.['person.gender'] === Gender.Female}
                        />
                        <RadioButton
                            name={'person.gender'}
                            value={Gender.X}
                            label={i18n._(t`X`)}
                            defaultChecked={prefillData?.['person.gender'] === Gender.X}
                        />
                    </Column>
                </ControlField>

                <ControlField control={controls.birthday} label={content.birthday?.label} horizontal={true}>
                    <DateInput
                        name="person.birthday"
                        placeholder={content.birthday?.placeholder}
                        defaultValue={prefillData?.['person.birthday'] ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.birthplace} label={content.birthplace?.label} horizontal={true}>
                    <Input
                        name="person.birthplace"
                        placeholder={i18n._(t`Land`)}
                        defaultValue={prefillData?.['person.birthplace'] ?? undefined}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}
