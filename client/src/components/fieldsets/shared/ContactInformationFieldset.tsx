import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import { PostalCodeValidator } from '../../../utils/validators/PostalCodeValidators'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import StreetNumberAdditionField, {
    StreetNumberAdditionFieldModel,
    StreetNumberAdditionFieldPrefillData,
} from '../../Core/DataEntry/StreetNumberAdditionField'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ContactInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface ContactInformationFieldsetPrefillData extends StreetNumberAdditionFieldPrefillData {
    phone?: string | null
    email?: string | null
    postalCode?: string | null
    city?: string
    phoneNumberContactPerson?: string | null
    contactPreference?: string | null
}

export interface ContactInformationFieldsetFormModel extends StreetNumberAdditionFieldModel {
    phone?: string
    email?: string
    postalCode?: string
    city?: string
    phoneNumberContactPerson?: string
    contactPreference?: string
}
type Fields = 'email' | 'phone' | 'postalCode' | 'city' | 'phoneNumberContactPerson' | 'contactPreference' | 'address'

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Contactgegevens`),
            email: {
                label: i18n._(t`E-mailadres`),
                placeholder: i18n._(t`gebruiker@mail.nl`),
            },
            phone: {
                label: i18n._(t`Telefoonnummer`),
                placeholder: i18n._(t`06 - 123 456 78`),
            },
            address: {
                label: i18n._(t`Straatnaam + huisnr.`),
            },
            postalCode: {
                label: i18n._(t`Postcode`),
                placeholder: i18n._(t`1234 AB`),
            },
            city: {
                label: i18n._(t`Plaats`),
                placeholder: i18n._(t`Plaats`),
            },
            phoneNumberContactPerson: {
                label: i18n._(t`Tel. nr. contactpersoon`),
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
            email: {
                validators: [EmailValidators.isEmailAddress],
            },
            phone: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
            postalCode: {
                validators: [PostalCodeValidator.isPostalCode],
            },
            phoneNumberContactPerson: {
                validators: [PhoneNumberValidators.isPhoneNumber],
            },
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                        <p>{`${prefillData?.street} ${prefillData?.streetNr} ${
                            prefillData?.street ? prefillData?.addition : ''
                        }`}</p>
                    </ControlField>

                    <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                        <p>{prefillData?.postalCode}</p>
                    </ControlField>

                    <ControlField control={controls.city} label={content.city?.label} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </ControlField>

                    <ControlField
                        control={controls.phoneNumberContactPerson}
                        label={content.phoneNumberContactPerson?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.phoneNumberContactPerson}</p>
                    </ControlField>

                    <ControlField
                        control={controls.contactPreference}
                        label={content.contactPreference?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.contactPreference}</p>
                    </ControlField>

                    <ControlField control={controls.phone} label={content.phone?.label} horizontal={true}>
                        <p>{prefillData?.phone}</p>
                    </ControlField>

                    <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                        <p>{prefillData?.email}</p>
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
                            street: prefillData?.street,
                            streetNr: prefillData?.streetNr,
                            addition: prefillData?.addition,
                        }}
                    />
                </ControlField>

                <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                    <Input
                        name="postalCode"
                        placeholder={content.postalCode?.placeholder}
                        defaultValue={prefillData?.postalCode || ''}
                        validators={controls.postalCode?.validators}
                    />
                </ControlField>

                <ControlField control={controls.city} label={content.city?.label} horizontal={true}>
                    <Input name="city" placeholder={content.city?.placeholder} defaultValue={prefillData?.city || ''} />
                </ControlField>

                <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                    <Input
                        name="email"
                        placeholder={content.email?.placeholder}
                        defaultValue={prefillData?.email || ''}
                        validators={controls.email?.validators}
                    />
                </ControlField>

                <ControlField
                    control={controls.phoneNumberContactPerson}
                    label={content.phoneNumberContactPerson?.label}
                    horizontal={true}
                >
                    <Input
                        name="phoneNumberContactPerson"
                        placeholder={content.phoneNumberContactPerson?.placeholder}
                        defaultValue={prefillData?.phoneNumberContactPerson || ''}
                        validators={controls.phoneNumberContactPerson?.validators}
                    />
                </ControlField>

                <ControlField
                    control={controls.contactPreference}
                    label={content.contactPreference?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'contact-preference'} value="call" />
                            <p>{i18n._(t`Bellen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="whatsapp" />
                            <p>{i18n._(t`Whatsapp`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="mailen" />
                            <p>{i18n._(t`Mailen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-preference'} value="mailen" />
                            <p>{i18n._(t`Anders, namelijk:`)}</p>
                        </Row>
                        <Input name="contact-preference-input" placeholder={i18n._(t`Anders`)} />
                    </Column>
                </ControlField>

                <ControlField control={controls.phone} label={content.phone?.label} horizontal={true}>
                    <Input
                        name="phone"
                        placeholder={content.phone?.placeholder}
                        defaultValue={prefillData?.phone || ''}
                        validators={controls.phone?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
