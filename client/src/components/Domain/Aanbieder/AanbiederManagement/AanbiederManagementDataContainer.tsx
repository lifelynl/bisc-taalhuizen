import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import { AanbiederManagementProfile } from 'views/Authorized/Supplier/AanbiederView/mocks'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import BranchInformationFieldset from 'components/fieldsets/shared/BranchInformationFieldset'

interface Props {
    isEditing: boolean
    defaultValues?: AanbiederManagementProfile
}

export const AanbiederManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { name, address, phone, email } = getDefaultValues()

    return (
        <Column spacing={4}>
            {renderEstablishmentFields()}
            <HorizontalRule />
            {renderContactFields()}
        </Column>
    )

    function renderEstablishmentFields() {
        const { isEditing } = props
        const { street, building, apartment, postcode, city } = address

        return (
            <BranchInformationFieldset
                readOnly={!isEditing}
                fieldNaming={{
                    branch: {
                        label: i18n._(t`Naam aanbieder`),
                        placeholder: i18n._(t`Naam aanbieder`),
                    },
                }}
                prefillData={{
                    branch: name,
                    postcode,
                    city,
                    street,
                    streetNr: building.toString(),
                    addition: apartment,
                }}
            />
        )
    }

    function renderContactFields() {
        const { isEditing } = props

        return (
            <ContactInformationFieldset
                readOnly={!isEditing}
                prefillData={{ email, phone }}
                fieldControls={{
                    postalCode: { hidden: true },
                    city: { hidden: true },
                    phoneNumberContactPerson: { hidden: true },
                    contactPreference: { hidden: true },
                    address: { hidden: true },
                }}
            />
        )
    }

    function getDefaultValues() {
        const { defaultValues } = props

        if (!defaultValues) {
            return {
                name: '',
                address: {
                    street: '',
                    building: '',
                    apartment: '',
                    postcode: '',
                    city: '',
                },
                phone: '',
                email: '',
            }
        }

        return defaultValues
    }
}
