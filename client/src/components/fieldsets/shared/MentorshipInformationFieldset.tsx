import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import { Maybe } from 'graphql/jsutils/Maybe'
import { ProviderTargetGroupPreference } from 'graphql/v2/generated/graphql'
import React, { useState } from 'react'
import { BooleanCheckboxValue } from 'utils/forms'
import Paragraph from 'components/Core/Typography/Paragraph'

type Fields =
    | 'providerTargetGroupPreference'
    | 'providerVolunteeringPreference'
    | 'providerLanguageHouseVolunteeringReference'
    | 'providerTargetGroupIsExperienced'
    | 'providerTargetGroupExperience'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: MentorshipInformationFieldsetFormModel
    readOnly?: boolean
}

interface MentorshipInformationFieldsetFormModel {
    'person.providerTargetGroupPreference'?: Maybe<ProviderTargetGroupPreference[]>
    'person.providerVolunteeringPreference'?: Maybe<string>
    'person.providerLanguageHouseVolunteeringReference'?: Maybe<string>
    'person.providerTargetGroupIsExperienced'?: Maybe<BooleanCheckboxValue>
    'person.providerTargetGroupExperience'?: Maybe<string>
}

export const MentorshipInformationFieldset: React.FunctionComponent<Props> = props => {
    const { fieldNaming, fieldControls, readOnly, prefillData } = props
    const { i18n } = useLingui()
    const [experienceSelected, setExperienceSelected] = useState(
        prefillData?.['person.providerTargetGroupIsExperienced'] === BooleanCheckboxValue.yes
    )

    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(`Begeleiding`),
            providerTargetGroupPreference: {
                label: i18n._(` Doelgroep voorkeur`),
            },
            providerVolunteeringPreference: {
                label: i18n._(`Voorkeur vrijwilligerswerk`),
                placeholder: i18n._(`Voorkeur...`),
            },
            providerLanguageHouseVolunteeringReference: {
                label: i18n._(`Hoe ben je bij het Taalhuis terecht gekomen voor vrijwilligerswerk?`),
                placeholder: i18n._(`Terecht gekomen via..`),
            },
            providerTargetGroupIsExperienced: {
                label: i18n._(`Ervaring met de doelgroep`),
            },
            providerTargetGroupExperience: {
                placeholder: i18n._(`Ervaring`),
            },
        },
        fieldNaming
    )

    const controls = useFieldsetControl<Fields>(
        {
            providerTargetGroupPreference: {},
            providerVolunteeringPreference: {},
            providerLanguageHouseVolunteeringReference: {},
            providerTargetGroupIsExperienced: {},
            providerTargetGroupExperience: {
                required: experienceSelected ? true : false,
            },
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField
                        control={controls.providerTargetGroupPreference}
                        label={content.providerTargetGroupPreference?.label}
                        horizontal={true}
                    >
                        <Paragraph>{prefillData?.['person.providerTargetGroupPreference']?.join(', ')}</Paragraph>
                    </ControlField>

                    <ControlField
                        control={controls.providerVolunteeringPreference}
                        label={content.providerVolunteeringPreference?.label}
                        horizontal={true}
                    >
                        <Paragraph>{prefillData?.['person.providerVolunteeringPreference']}</Paragraph>
                    </ControlField>

                    <ControlField
                        control={controls.providerLanguageHouseVolunteeringReference}
                        label={content.providerLanguageHouseVolunteeringReference?.label}
                        horizontal={true}
                    >
                        <Paragraph>{prefillData?.['person.providerLanguageHouseVolunteeringReference']}</Paragraph>
                    </ControlField>

                    <ControlField
                        control={controls.providerTargetGroupIsExperienced}
                        label={content.providerTargetGroupIsExperienced?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {getProviderTargetGroupExperience(
                                prefillData?.['person.providerTargetGroupIsExperienced'],
                                prefillData?.['person.providerTargetGroupExperience']
                            )}
                        </Paragraph>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField
                    control={controls.providerTargetGroupPreference}
                    label={content.providerTargetGroupPreference?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Checkbox
                            inline={false}
                            label={i18n._(`NT1`)}
                            value={ProviderTargetGroupPreference.Nt1}
                            defaultChecked={prefillData?.['person.providerTargetGroupPreference']?.includes(
                                ProviderTargetGroupPreference.Nt1
                            )}
                            name={'person.providerTargetGroupPreference[]'}
                        />
                        <Checkbox
                            inline={false}
                            label={i18n._(`NT2`)}
                            value={ProviderTargetGroupPreference.Nt2}
                            defaultChecked={prefillData?.['person.providerTargetGroupPreference']?.includes(
                                ProviderTargetGroupPreference.Nt2
                            )}
                            name={'person.providerTargetGroupPreference[]'}
                        />
                    </Column>
                </ControlField>
                <ControlField
                    control={controls.providerVolunteeringPreference}
                    label={content.providerVolunteeringPreference?.label}
                    horizontal={true}
                >
                    <Input
                        name="person.providerVolunteeringPreference"
                        placeholder={content.providerVolunteeringPreference?.placeholder}
                        defaultValue={prefillData?.['person.providerVolunteeringPreference'] || undefined}
                    />
                </ControlField>
                <ControlField
                    control={controls.providerLanguageHouseVolunteeringReference}
                    label={content.providerLanguageHouseVolunteeringReference?.label}
                    horizontal={true}
                >
                    <Input
                        name="person.providerLanguageHouseVolunteeringReference"
                        placeholder={content.providerLanguageHouseVolunteeringReference?.placeholder}
                        defaultValue={prefillData?.['person.providerLanguageHouseVolunteeringReference'] || undefined}
                    />
                </ControlField>
                <ControlField
                    control={controls.providerTargetGroupIsExperienced}
                    label={content?.providerTargetGroupIsExperienced?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <RadioButton
                            name={'person.providerTargetGroupIsExperienced'}
                            value={BooleanCheckboxValue.no}
                            label={i18n._(`Nee`)}
                            onChange={() => setExperienceSelected(false)}
                            defaultChecked={
                                prefillData?.['person.providerTargetGroupIsExperienced'] === BooleanCheckboxValue.no ||
                                undefined
                            }
                        />
                        <RadioButton
                            name={'person.providerTargetGroupIsExperienced'}
                            value={BooleanCheckboxValue.yes}
                            label={i18n._(`Ja, namelijk:`)}
                            onChange={() => setExperienceSelected(true)}
                            defaultChecked={
                                prefillData?.['person.providerTargetGroupIsExperienced'] === BooleanCheckboxValue.yes ||
                                undefined
                            }
                        />
                    </Column>
                    {experienceSelected && (
                        <ControlField control={controls.providerTargetGroupExperience} horizontal={true}>
                            <Input
                                name="person.providerTargetGroupExperience"
                                placeholder={content.providerTargetGroupExperience?.placeholder}
                                defaultValue={prefillData?.['person.providerTargetGroupExperience'] || undefined}
                            />
                        </ControlField>
                    )}
                </ControlField>
            </Column>
        </Section>
    )

    function getProviderTargetGroupExperience(
        isExperienced: BooleanCheckboxValue | undefined | null,
        experience: string | undefined | null
    ) {
        if (isExperienced === BooleanCheckboxValue.yes) {
            return `${i18n._(`Ja, namelijk:`)} ${experience ? experience : ''}`
        } else if (isExperienced === BooleanCheckboxValue.no) {
            return i18n._(`Nee`)
        }
        return null
    }
}
