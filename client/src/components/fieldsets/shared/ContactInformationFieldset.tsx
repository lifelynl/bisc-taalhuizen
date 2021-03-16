import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import { PostalCodeValidator } from '../../../utils/validators/PostalCodeValidators'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: ContactInformationFieldsetModel
    readOnly?: true
}

export interface ContactInformationFieldsetModel {
    street: string
    streetNo: string
    streetNoAddition: string
    postalCode: string
    city: string
    phoneNumberContactPerson: string
    contact: string
}

const ContactInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                        <p>{`${prefillData?.street} ${prefillData?.streetNo} ${
                            prefillData?.streetNoAddition ? prefillData?.streetNoAddition : ''
                        }`}</p>
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <p>{prefillData?.postalCode}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </Field>

                    <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                        <p>{prefillData?.phoneNumberContactPerson}</p>
                    </Field>

                    <Field label={i18n._(t`Contact bij voorkeur`)} horizontal={true}>
                        <p>{prefillData?.contact}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Contactgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                    <StreetNumberAdditionField
                        prefillData={{
                            street: prefillData?.street || '',
                            streetNr: prefillData?.streetNo || '',
                            addition: prefillData?.streetNoAddition || '',
                        }}
                    />
                </Field>
                <Field label={i18n._(t`Postcode`)} horizontal={true}>
                    <Input
                        name="postal-code"
                        placeholder={i18n._(t`1234 AB`)}
                        defaultValue={prefillData?.postalCode}
                        validators={[PostalCodeValidator.isPostalCode]}
                    />
                </Field>
                <Field label={i18n._(t`Plaats`)} horizontal={true}>
                    <Input name="city" placeholder={i18n._(t`Plaats`)} defaultValue={prefillData?.city} />
                </Field>
                <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                    <Input
                        name="phone-number"
                        placeholder={i18n._(t`06 - 123 456 78`)}
                        defaultValue={prefillData?.phoneNumberContactPerson}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                    />
                </Field>
                <Field label={i18n._(t`Contact bij voorkeur`)} horizontal={true}>
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
                </Field>
            </Column>
        </Section>
    )
}

export default ContactInformationFieldset
