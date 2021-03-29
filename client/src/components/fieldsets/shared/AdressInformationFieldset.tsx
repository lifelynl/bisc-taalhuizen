import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField, {
    StreetNumberAdditionFieldModel,
    StreetNumberAdditionFieldPrefillData,
} from '../../Core/DataEntry/StreetNumberAdditionField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: AdressInformationPrefillData
    readOnly?: boolean
}

export interface AdressInformationFieldsetModel extends StreetNumberAdditionFieldModel {
    ['address-postalCode']?: string
    ['address-city']?: string
    ['address-street']?: StreetNumberAdditionFieldModel['-street']
    ['address-streetNr']?: StreetNumberAdditionFieldModel['-streetNr']
    ['address-streetAddition']?: StreetNumberAdditionFieldModel['-streetAddition']
}

export interface AdressInformationPrefillData extends StreetNumberAdditionFieldPrefillData {
    postalCode?: string
    city?: string
}

const AdressInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Adresgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                        <p>{`${prefillData?.street} ${prefillData?.streetNr}`}</p>
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <p>{prefillData?.postalCode}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Adresgegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                    <StreetNumberAdditionField
                        prefixName={'address'}
                        prefillData={{
                            street: prefillData?.street,
                            streetNr: prefillData?.streetNr,
                            streetAddition: prefillData?.streetAddition,
                        }}
                    />
                </Field>

                <Field label={i18n._(t`Postcode`)} horizontal={true}>
                    <Input
                        name="postalcode"
                        placeholder={i18n._(t`1234AB`)}
                        validators={[InsertionValidators.isValidInsertion]}
                        defaultValue={prefillData?.postalCode}
                    />
                </Field>

                <Field label={i18n._(t`Plaats`)} horizontal={true} required={true}>
                    <Input
                        name="city"
                        placeholder={i18n._(t`Plaats`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.city}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default AdressInformationFieldset
