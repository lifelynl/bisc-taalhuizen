import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import { AdressValidators } from '../../../utils/validators/AddressValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField, {
    StreetNumberAdditionFieldModel,
    StreetNumberAdditionFieldPrefillData,
} from '../../Core/DataEntry/StreetNumberAdditionField'
import ControlField from '../../Core/Field/ControlField'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from '../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: BranchInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface BranchInformationFieldsetFormModel {
    branch?: string
    ['branch-postcode']?: string
    ['branch-city']?: string
    ['branch-street']?: StreetNumberAdditionFieldModel['-street']
    ['branch-streetNr']?: StreetNumberAdditionFieldModel['-streetNr']
    ['branch-streetAddition']?: StreetNumberAdditionFieldModel['-streetAddition']
}
export interface BranchInformationFieldsetPrefillData extends StreetNumberAdditionFieldPrefillData {
    branch?: string
    postcode?: string
    city?: string
}
type Fields = 'branch' | 'postcode' | 'city' | 'address'

const BranchInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Vestiging`),
            branch: {
                label: i18n._(t`Naam vestiging`),
                placeholder: i18n._(t`Naam vestiging`),
            },
            postcode: {
                label: i18n._(t`Postcode`),
                placeholder: i18n._(t`Postcode`),
            },
            city: {
                label: i18n._(t`Plaats`),
                placeholder: i18n._(t`Plaats`),
            },
            address: {
                label: i18n._(t`Straat en huisnr.`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>(
        {
            branch: {
                required: true,
                validators: [GenericValidators.required],
            },
            postcode: {
                validators: [AdressValidators.isValidZipcode],
            },
            city: {},
            address: {},
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField control={controls.branch} label={content.branch?.label} horizontal={true}>
                        <p>{prefillData?.branch}</p>
                    </ControlField>

                    <ControlField control={controls.address} label={content.address?.label} horizontal={true}>
                        {AdressFormatters.formattedAddress({
                            street: prefillData?.street,
                            houseNumber: prefillData?.streetNr,
                            houseNumberSuffix: prefillData?.streetAddition,
                        })}
                    </ControlField>

                    <ControlField control={controls.postcode} label={content.postcode?.label} horizontal={true}>
                        <p>{prefillData?.postcode}</p>
                    </ControlField>

                    <ControlField control={controls.city} label={content.city?.label} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField control={controls?.branch} label={content.branch?.label} horizontal={true}>
                    <Input
                        name="branch"
                        placeholder={content.branch?.placeholder}
                        validators={controls.branch?.validators}
                        defaultValue={prefillData?.branch}
                    />
                </ControlField>

                <ControlField control={controls?.address} label={content?.address?.label} horizontal={true}>
                    <StreetNumberAdditionField
                        prefixName={'branch'}
                        prefillData={{
                            street: prefillData?.street || '',
                            streetNr: prefillData?.streetNr || '',
                            streetAddition: prefillData?.streetAddition || '',
                        }}
                    />
                </ControlField>

                <ControlField control={controls?.postcode} label={content?.postcode?.label} horizontal={true}>
                    <Input
                        name="branch-postcode"
                        placeholder={content?.postcode?.placeholder}
                        validators={controls.postcode?.validators}
                        defaultValue={prefillData?.postcode}
                    />
                </ControlField>

                <ControlField control={controls?.city} label={content.city?.label} horizontal={true}>
                    <Input
                        name="branch-city"
                        placeholder={content.city?.placeholder}
                        defaultValue={prefillData?.city}
                        validators={controls.city?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default BranchInformationFieldset
