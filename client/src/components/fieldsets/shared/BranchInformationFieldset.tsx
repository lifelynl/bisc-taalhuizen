import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
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

export interface BranchInformationFieldsetFormModel extends StreetNumberAdditionFieldModel {
    branch: string
    postalCode?: string
    locality?: string
}
export interface BranchInformationFieldsetPrefillData extends StreetNumberAdditionFieldPrefillData {
    branch?: string
    postalCode?: string
    locality?: string
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
                        <p>{`${prefillData?.street} ${prefillData?.houseNumber} ${
                            prefillData?.houseNumberSuffix ? prefillData?.houseNumberSuffix : ''
                        }`}</p>
                    </ControlField>

                    <ControlField control={controls.postcode} label={content.postcode?.label} horizontal={true}>
                        <p>{prefillData?.postalCode}</p>
                    </ControlField>

                    <ControlField control={controls.city} label={content.city?.label} horizontal={true}>
                        <p>{prefillData?.locality}</p>
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
                        prefillData={{
                            street: prefillData?.street || '',
                            houseNumber: prefillData?.houseNumber || '',
                            houseNumberSuffix: prefillData?.houseNumberSuffix || '',
                        }}
                    />
                </ControlField>

                <ControlField control={controls?.postcode} label={content?.postcode?.label} horizontal={true}>
                    <Input
                        name="postcode"
                        placeholder={content?.postcode?.placeholder}
                        validators={controls.postcode?.validators}
                        defaultValue={prefillData?.postalCode}
                    />
                </ControlField>

                <ControlField control={controls?.city} label={content.city?.label} horizontal={true}>
                    <Input
                        name="city"
                        placeholder={content.city?.placeholder}
                        defaultValue={prefillData?.locality}
                        validators={controls.city?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default BranchInformationFieldset
