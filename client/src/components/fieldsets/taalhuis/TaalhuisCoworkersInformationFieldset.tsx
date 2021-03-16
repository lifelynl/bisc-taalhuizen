import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import LabelTag from '../../Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from '../../Core/DataDisplay/LabelTag/types'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: TaalhuisCoworkersInformationFieldsetModel
    readOnly?: true
}

export interface TaalhuisCoworkersInformationFieldsetModel {
    lastName: string
    insertion: string
    nickName: string
    phoneNumber: string
    role: string
    email: string
    createdAt: string
    updatedAt: string
}

// NOTE: Don't use these fieldset for new screens, these should be split up into existing shared InformationFieldset and AccountInformationFieldset
const TaalhuisCoworkersInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Gegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.lastName}, ${prefillData?.insertion}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.nickName}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.phoneNumber}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.email}`)}</Paragraph>
                        </Field>
                        <Field label={'Rol'} horizontal={true}>
                            {prefillData?.role && <LabelTag label={prefillData.role} color={LabelColor.blue} />}
                        </Field>
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.createdAt}`)}</Paragraph>
                        </Field>
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.updatedAt}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <Space pushTop={true} />
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                        <Input
                            required={true}
                            name="lastName"
                            placeholder={i18n._(t`Wit`)}
                            validators={[GenericValidators.required]}
                            defaultValue={prefillData?.lastName}
                        />
                    </Field>

                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input name="insertion" placeholder={i18n._(t`de`)} defaultValue={prefillData?.insertion} />
                    </Field>

                    <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                        <Input
                            name="nickName"
                            placeholder={i18n._(t`Peter`)}
                            required={true}
                            validators={[GenericValidators.required]}
                            defaultValue={prefillData?.nickName}
                        />
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Input
                            name="phoneNumber"
                            placeholder={i18n._(t`030 - 123 45 67`)}
                            validators={[GenericValidators.required, PhoneNumberValidators.isPhoneNumber]}
                            defaultValue={prefillData?.phoneNumber}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                required={true}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                                defaultValue={prefillData?.email}
                            />
                        </Field>
                        <Field label={i18n._(t`Rol`)} horizontal={true} required={true}>
                            <Column spacing={4}>
                                <Row>
                                    <RadioButton name={'role'} value="coordinator" />
                                    <LabelTag label="Coördinator" color={LabelColor.red} />
                                </Row>
                                <Row>
                                    <RadioButton name={'role'} value="medewerker" />
                                    <LabelTag label="Medewerker" color={LabelColor.blue} />
                                </Row>
                            </Column>
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
        </>
    )
}

export default TaalhuisCoworkersInformationFieldset
