import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField, {
    StreetNumberAdditionFieldModel,
} from '../../Core/DataEntry/StreetNumberAdditionField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: TaalhuisInformationFieldsetModel
    readOnly?: true
}

export interface TaalhuisInformationFieldsetModel extends StreetNumberAdditionFieldModel {
    taalhuis?: string
    postalCode?: string
    city?: string
    phoneNumber?: string
    email?: string
}

// NOTE: Don't use these fieldset for new screens, these should be split up in a TaalhuisBranchInformationFieldset and TaalhuisContactInformationFieldset
const TaalhuisInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.taalhuis}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.street}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.postalCode}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.city}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />

                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.phoneNumber}`)}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.email}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <Space pushTop={true} />
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                        <Input
                            required={true}
                            name="taalhuis"
                            placeholder={i18n._(t`Taalhuis X`)}
                            validators={[GenericValidators.required]}
                            defaultValue={prefillData?.taalhuis}
                        />
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <StreetNumberAdditionField
                            prefillData={{
                                street: prefillData?.street || '',
                                streetNr: prefillData?.streetNr || '',
                                addition: prefillData?.addition || '',
                            }}
                        />
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Input
                            name="postalCode"
                            placeholder={i18n._(t`1234AB`)}
                            defaultValue={prefillData?.postalCode}
                        />
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Input name="city" placeholder={i18n._(t`Utrecht`)} defaultValue={prefillData?.city} />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="phoneNumber"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[GenericValidators.required, PhoneNumberValidators.isPhoneNumber]}
                                defaultValue={prefillData?.phoneNumber}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                                defaultValue={prefillData?.email}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
        </>
    )
}

export default TaalhuisInformationFieldset
