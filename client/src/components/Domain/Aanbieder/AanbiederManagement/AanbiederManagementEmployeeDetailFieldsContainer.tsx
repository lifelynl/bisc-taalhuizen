import React from 'react'

import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import AccountInformationFieldset from 'components/fieldsets/shared/AccountInformationFieldset'
import { UserRoleEnum } from 'generated/graphql'
import { AanbiederEmployeeProfile } from 'views/Authorized/Supplier/AanbiederView/mocks'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'

interface Props {
    isEditing: boolean
    employee: AanbiederEmployeeProfile
}

export const AanbiederManagementEmployeeDetailFieldsContainer: React.FunctionComponent<Props> = props => {
    const { isEditing, employee } = props

    return (
        <Column spacing={4}>
            {renderPersonalInfoFields()}
            <HorizontalRule />
            {/* TODO: add availability fields (not part of current sprint) */}
            {renderAccountInfoFields()}
        </Column>
    )

    function renderPersonalInfoFields() {
        const { lastName, nickName, phone } = employee

        return (
            <InformationFieldset
                readOnly={!isEditing}
                hideInsertion={true}
                prefillData={{
                    lastname: lastName,
                    callSign: nickName,
                    phonenumber: phone,
                }}
            />
        )
    }

    function renderAccountInfoFields() {
        const { email, roles, createdAt, updatedAt } = employee

        return (
            <AccountInformationFieldset
                readOnly={!isEditing}
                prefillData={{ email, roles, createdAt, updatedAt }}
                roleOptions={[
                    [UserRoleEnum.AanbiederCoordinator],
                    [UserRoleEnum.AanbiederMentor],
                    [UserRoleEnum.AanbiederMentor, UserRoleEnum.AanbiederCoordinator],
                    [UserRoleEnum.AanbiederVolunteer],
                ]}
            />
        )
    }
}
