import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import { AdressValidators } from '../../../utils/validators/AddressValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
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

interface BranchInformationFieldsetPrefillData {
    branch?: string
    branchPostalCode?: string
    branchLocality?: string
    branchStreet?: string
    branchHouseNumber?: string
    branchHouseNumberSuffix?: string
}
type Fields = 'branch' | 'branchPostalCode' | 'branchLocality' | 'branchAddress'

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
            branchPostalCode: {
                label: i18n._(t`Postcode`),
                placeholder: i18n._(t`Postcode`),
            },
            branchLocality: {
                label: i18n._(t`Plaats`),
                placeholder: i18n._(t`Plaats`),
            },
            branchAddress: {
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
            branchPostalCode: {
                validators: [AdressValidators.isValidZipcode],
            },
            branchLocality: {},
            branchAddress: {},
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

                    <ControlField
                        control={controls.branchAddress}
                        label={content.branchAddress?.label}
                        horizontal={true}
                    >
                        <p>
                            {AdressFormatters.formattedAddress({
                                street: prefillData?.branchStreet,
                                houseNumber: prefillData?.branchHouseNumber,
                                houseNumberSuffix: prefillData?.branchHouseNumberSuffix,
                            })}
                        </p>
                    </ControlField>

                    <ControlField
                        control={controls.branchPostalCode}
                        label={content.branchPostalCode?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.branchPostalCode}</p>
                    </ControlField>

                    <ControlField
                        control={controls.branchLocality}
                        label={content.branchLocality?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.branchLocality}</p>
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

                <ControlField control={controls?.branchAddress} label={content?.branchAddress?.label} horizontal={true}>
                    <StreetNumberAdditionField
                        prefixName={'branch'}
                        prefillData={{
                            street: prefillData?.branchStreet || '',
                            houseNumber: prefillData?.branchHouseNumber || '',
                            houseNumberSuffix: prefillData?.branchHouseNumberSuffix || '',
                        }}
                    />
                </ControlField>

                <ControlField
                    control={controls?.branchPostalCode}
                    label={content?.branchPostalCode?.label}
                    horizontal={true}
                >
                    <Input
                        name="branchPostalCode"
                        placeholder={content?.branchPostalCode?.placeholder}
                        validators={controls.branchPostalCode?.validators}
                        defaultValue={prefillData?.branchPostalCode}
                    />
                </ControlField>

                <ControlField
                    control={controls?.branchLocality}
                    label={content.branchLocality?.label}
                    horizontal={true}
                >
                    <Input
                        name="branchLocality"
                        placeholder={content.branchLocality?.placeholder}
                        defaultValue={prefillData?.branchLocality}
                        validators={controls.branchLocality?.validators}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default BranchInformationFieldset
