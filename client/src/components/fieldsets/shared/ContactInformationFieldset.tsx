import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import { PostalCodeValidator } from '../../../utils/validators/PostalCodeValidators'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import StreetNumberAdditionField, {
    StreetNumberAdditionFieldModel,
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

export interface ContactInformationFieldsetModel {
    ['contact-phone']?: string
    ['contact-email']?: string
    ['contact-postalCode']?: string
    ['contact-city']?: string
    ['contact-phoneNumberContactPerson']?: string
    ['contact-contactPreference']?: string
    ['contact-contactPreference-other']?: string
    ['contact-street']?: StreetNumberAdditionFieldModel['-street']
    ['contact-streetNr']?: StreetNumberAdditionFieldModel['-streetNr']
    ['contact-streetAddition']?: StreetNumberAdditionFieldModel['-streetAddition']
}

export interface ContactInformationFieldsetPrefillData {
    phone?: string | null
    email?: string | null
    postalCode?: string | null
    city?: string | null
    phoneNumberContactPerson?: string | null
    contactPreference?: string | null
    street?: string | null
    streetNr?: string | null
    streetAddition?: string | null
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
                        <p>
                            {AdressFormatters.formattedAddress({
                                street: prefillData?.street,
                                houseNumber: prefillData?.streetNr,
                                houseNumberSuffix: prefillData?.streetAddition,
                            })}
                        </p>
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
                        prefixName={'contact'}
                        prefillData={{
                            street: prefillData?.street,
                            streetNr: prefillData?.streetNr,
                            streetAddition: prefillData?.streetAddition,
                        }}
                    />
                </ControlField>

                <ControlField control={controls.postalCode} label={content.postalCode?.label} horizontal={true}>
                    <Input
                        name="contact-postalCode"
                        placeholder={content.postalCode?.placeholder}
                        defaultValue={prefillData?.postalCode || ''}
                        validators={controls.postalCode?.validators}
                    />
                </ControlField>

                <ControlField control={controls.city} label={content.city?.label} horizontal={true}>
                    <Input
                        name="contact-city"
                        placeholder={content.city?.placeholder}
                        defaultValue={prefillData?.city || ''}
                    />
                </ControlField>

                <ControlField control={controls.email} label={content.email?.label} horizontal={true}>
                    <Input
                        name="contact-email"
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
                        name="contact-phoneNumberContactPerson"
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
                            <RadioButton name={'contact-contactPreference'} value="call" />
                            <p>{i18n._(t`Bellen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-contactPreference'} value="whatsapp" />
                            <p>{i18n._(t`Whatsapp`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-contactPreference'} value="mailen" />
                            <p>{i18n._(t`Mailen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'contact-contactPreference'} value="mailen" />
                            <p>{i18n._(t`Anders, namelijk:`)}</p>
                        </Row>
                        <Input name="contact-contactPreference-other" placeholder={i18n._(t`Anders`)} />
                    </Column>
                </ControlField>

                <ControlField control={controls.phone} label={content.phone?.label} horizontal={true}>
                    <Input
                        name="contact-phone"
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
