import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: InformationFieldsetPrefillData
    readOnly?: boolean
    hideInsertion?: boolean
}

interface InformationFieldsetPrefillData {
    familyName?: string | null
    additionalName?: string | null
    callSign?: string | null
    phonenumber?: string | null
}

export interface InformationFieldsetModel {
    familyName?: string
    additionalName?: string
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
                    <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                        <p>{prefillData?.callSign}</p>
                    </Field>

                    {!hideInsertion && (
                        <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                            <p>{prefillData?.additionalName}</p>
                        </Field>
                    )}

                    <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                        <p>{prefillData?.familyName}</p>
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
                <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                    <Input
                        name="callSign"
                        placeholder={i18n._(t`Roepnaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.callSign ?? undefined}
                    />
                </Field>

                {!hideInsertion && (
                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input
                            name="additionalName"
                            placeholder={i18n._(t`Tussenvoegsel`)}
                            defaultValue={prefillData?.additionalName ?? undefined}
                        />
                    </Field>
                )}

                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        required={true}
                        name="familyName"
                        placeholder={i18n._(t`Achternaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.familyName ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Input
                        name="phonenumber"
                        placeholder={i18n._(t`Telefoonnummer`)}
                        defaultValue={prefillData?.phonenumber ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default InformationFieldset
