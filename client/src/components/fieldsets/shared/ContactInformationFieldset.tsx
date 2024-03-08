import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ContactPreference, Maybe } from 'graphql/v2/generated/graphql'
import React, { ChangeEventHandler, useState } from 'react'
import { AdressFormatters } from '../../../utils/formatters/Address/Address'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'
import { contactPreferenceTranslations } from '../participants/translations/participantsTranslations'
import { EmailField, SECONDARY_EMAIL_CHECKBOX_NAME } from 'components/Domain/Shared/Fields/EmailField'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ContactInformationFieldsetFormModel
    readOnly?: boolean
    alternativeFieldsetTitle?: string
    checkForDuplicate?: boolean
}

export interface ContactInformationFieldsetFormModel {
    'person.address.street'?: Maybe<string>
    'person.address.houseNumber'?: Maybe<string>
    'person.address.houseNumberSuffix'?: Maybe<string>
    'person.address.postalCode'?: Maybe<string>
    'person.address.locality'?: Maybe<string>
    'person.telephone'?: Maybe<string>
    'person.emergencyTelephone'?: Maybe<string>
    'person.email'?: Maybe<string>
    'person.contactPreference'?: Maybe<ContactPreference>
    'person.contactPreferenceOther'?: Maybe<string>
    'person.secondaryEmail'?: Maybe<string>
    [SECONDARY_EMAIL_CHECKBOX_NAME]?: Maybe<BooleanCheckboxValue>
}

type Fields = 'email' | 'telephone' | 'postalCode' | 'locality' | 'emergencyTelephone' | 'contactPreference' | 'address'

export const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls, alternativeFieldsetTitle, checkForDuplicate } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: alternativeFieldsetTitle ?? i18n._(t`Contactgegevens`),
            email: {
                label: i18n._(t`E-mailadres`),
                placeholder: i18n._(t`gebruiker@mail.nl`),
            },
            telephone: {
                label: i18n._(t`Telefoonnummer`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
            address: {
                label: i18n._(t`Straat en huisnr.`),
            },
            postalCode: {
                label: i18n._(t`Postcode`),
                placeholder: i18n._(t`1234 AB`),
            },
            locality: {
                label: i18n._(t`Plaats`),
                placeholder: i18n._(t`Plaats`),
            },
            emergencyTelephone: {
                label: i18n._(t`Tel. nr. contactpersoon`),
                description: i18n._(t`Voor noodgevallen`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
            contactPreference: {
                label: i18n._(t`Contact bij voorkeur`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            email: {},
            telephone: {},
            postalCode: {},
            emergencyTelephone: {},
            address: {},
        },
        fieldControls
    )

    const [contactPreference, setContactPreference] = useState<Maybe<ContactPreference> | undefined>(
        prefillData?.['person.contactPreference']
    )

    const onChangeContactPreference: ChangeEventHandler<HTMLInputElement> = event => {
        setContactPreference(event.currentTarget.value as ContactPreference)
    }

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                        {AdressFormatters.formattedAddress({
                            street: prefillData?.['person.address.street'],
                            houseNumber: prefillData?.['person.address.houseNumber'],
                            houseNumberSuffix: prefillData?.['person.address.houseNumberSuffix'],
                        })}
                    </ControlField>

                    <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                        <p>{prefillData?.['person.address.postalCode']}</p>
                    </ControlField>

                    <ControlField control={controls.locality} label={content.locality?.label} horizontal={true}>
                        <p>{prefillData?.['person.address.locality']}</p>
                    </ControlField>

                    <ControlField control={controls.telephone} label={content.telephone?.label} horizontal={true}>
                        <p>{prefillData?.['person.telephone']}</p>
                    </ControlField>

                    <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                        <p>{prefillData?.['person.email'] || prefillData?.['person.secondaryEmail']}</p>
                    </ControlField>

                    <ControlField
                        control={controls.emergencyTelephone}
                        label={content.emergencyTelephone?.label}
                        description={content.emergencyTelephone?.description}
                        horizontal={true}
                    >
                        <p>{prefillData?.['person.emergencyTelephone']}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPreference}
                        label={content.contactPreference?.label}
                        horizontal={true}
                    >
                        <Paragraph>
                            {prefillData?.['person.contactPreference'] &&
                                contactPreferenceTranslations[prefillData?.['person.contactPreference']]}
                        </Paragraph>
                        {prefillData?.['person.contactPreference'] === ContactPreference.Other && (
                            <Paragraph italic={true}>{prefillData?.['person.contactPreferenceOther']}</Paragraph>
                        )}
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                    <StreetNumberAdditionField
                        prefillData={{
                            street: prefillData?.['person.address.street'],
                            houseNumber: prefillData?.['person.address.houseNumber'],
                            houseNumberSuffix: prefillData?.['person.address.houseNumberSuffix'],
                        }}
                        prefixName={'person.address.'}
                    />
                </ControlField>

                <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                    <Input
                        name="person.address.postalCode"
                        placeholder={content.postalCode?.placeholder}
                        defaultValue={prefillData?.['person.address.postalCode'] || ''}
                    />
                </ControlField>

                <ControlField control={controls.locality} label={content.locality?.label} horizontal={true}>
                    <Input
                        name="person.address.locality"
                        placeholder={content.locality?.placeholder}
                        defaultValue={prefillData?.['person.address.locality'] || ''}
                    />
                </ControlField>

                <ControlField control={controls.telephone} label={content.telephone?.label} horizontal={true}>
                    <Input
                        name={'person.telephone'}
                        placeholder={content.telephone?.placeholder}
                        defaultValue={prefillData?.['person.telephone'] || ''}
                    />
                </ControlField>

                <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                    <EmailField
                        name={'person.email'}
                        placeholder={content.email?.placeholder}
                        defaultValue={prefillData?.['person.email'] || prefillData?.['person.secondaryEmail'] || ''}
                        checkForDuplicate={checkForDuplicate}
                        isSecondaryEmail={!!prefillData?.['person.secondaryEmail']}
                    />
                </ControlField>

                <ControlField
                    control={controls.emergencyTelephone}
                    label={content.emergencyTelephone?.label}
                    description={content.emergencyTelephone?.description}
                    horizontal={true}
                >
                    <Input
                        name={'person.emergencyTelephone'}
                        placeholder={content.emergencyTelephone?.placeholder}
                        defaultValue={prefillData?.['person.emergencyTelephone'] || ''}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPreference}
                    label={content.contactPreference?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        {[
                            ContactPreference.Phonecall,
                            ContactPreference.Whatsapp,
                            ContactPreference.Email,
                            ContactPreference.Other,
                        ].map((value, key, array) => (
                            <RadioButton
                                key={`${key}-${array.length}`}
                                name={'person.contactPreference'}
                                value={value}
                                defaultChecked={contactPreference === value}
                                label={contactPreferenceTranslations[value]}
                                onChange={onChangeContactPreference}
                            />
                        ))}
                        {contactPreference === ContactPreference.Other && (
                            <Input
                                name={'person.contactPreferenceOther'}
                                defaultValue={prefillData?.['person.contactPreferenceOther'] || ''}
                                placeholder={i18n._(t`Namelijk...`)}
                            />
                        )}
                    </Column>
                </ControlField>
            </Column>
        </Section>
    )
}
