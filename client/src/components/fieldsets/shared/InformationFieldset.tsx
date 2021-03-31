import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: InformationFieldsetPrefillData
    readOnly?: boolean
    hideInsertion?: boolean
}

export interface InformationFieldsetPrefillData {
    lastname?: string | null
    insertion?: string | null
    callSign?: string | null
    phonenumber?: string | null
}

export interface InformationFieldsetModel {
    lastname?: string
    insertion?: string
    callSign?: string
    phonenumber?: string
}

const InformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, hideInsertion } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                        <p>{prefillData?.lastname}</p>
                    </Field>

                    {!hideInsertion && (
                        <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                            <p>{prefillData?.insertion}</p>
                        </Field>
                    )}

                    <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                        <p>{prefillData?.callSign}</p>
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <p>{prefillData?.phonenumber}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Gegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        required={true}
                        name="lastname"
                        placeholder={i18n._(t`Achternaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.lastname ?? undefined}
                    />
                </Field>

                {!hideInsertion && (
                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input
                            name="insertion"
                            placeholder={i18n._(t`Tussenvoegsel`)}
                            validators={[InsertionValidators.isValidInsertion]}
                            defaultValue={prefillData?.insertion ?? undefined}
                        />
                    </Field>
                )}

                <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                    <Input
                        name="callSign"
                        placeholder={i18n._(t`Roepnaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.callSign ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Input
                        name="phonenumber"
                        placeholder={i18n._(t`Telefoonnummer`)}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                        defaultValue={prefillData?.phonenumber ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default InformationFieldset
