import React from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import {
    CoworkerVolunteerFields,
    CoworkerVolunteerFieldsModel,
} from 'components/Domain/Shared/Fields/CoworkerVolunteerFields'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import { AvailabilityFieldset, AvailabilityFieldsetModel } from 'components/fieldsets/shared/AvailabilityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    AddressType,
    EducationNameEnum,
    EducationType,
    EmployeeRole,
    EmployeeType,
    OrganizationTypeEnum,
    PersonType,
} from 'graphql/v2/generated/graphql'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props {
    prefillData?: PrefillData
    readOnly?: boolean
    isVolunteer?: boolean
    onEmailChange?: (value: string) => void
    hasDarkerDivider?: boolean
}

type PrefillData = Pick<EmployeeType, 'role'> & {
    person: PersonData & {
        educations?: EducationData[]
        address?: AddressData | null
    }
}

type PersonData = Pick<
    PersonType,
    | 'familyName'
    | 'additionalName'
    | 'givenName'
    | 'telephone'
    | 'email'
    | 'birthday'
    | 'birthplace'
    | 'gender'
    | 'emergencyTelephone'
    | 'contactPreference'
    | 'contactPreferenceOther'
    | 'availability'
    | 'availabilityNotes'
    | 'providerTargetGroupPreference'
    | 'providerVolunteeringPreference'
    | 'providerLanguageHouseVolunteeringReference'
    | 'providerTargetGroupIsExperienced'
    | 'providerTargetGroupExperience'
>

type EducationData = Pick<
    EducationType,
    'name' | 'institution' | 'degreeGranted' | 'group' | 'hours' | 'degree' | 'courseTeacherType' | 'other'
>

type AddressData = Pick<
    AddressType,
    'country' | 'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
>

export type ProviderEmployeeFieldsetModel = InformationFieldsetModel &
    AvailabilityFieldsetModel &
    AccountInformationFieldsetFormModel &
    CoworkerVolunteerFieldsModel

export function ProviderEmployeeFieldset({
    readOnly,
    prefillData,
    isVolunteer,
    onEmailChange,
    hasDarkerDivider,
}: Props) {
    const { i18n } = useLingui()

    const showVolunteerFields = readOnly ? prefillData?.role === EmployeeRole.Volunteer : isVolunteer

    const course = prefillData?.person.educations?.find(e => e.name === EducationNameEnum.Course)
    const currentEducation = prefillData?.person.educations?.find(e => e.name === EducationNameEnum.CurrentEducation)
    const lastEducation = prefillData?.person.educations?.find(e => e.name === EducationNameEnum.LastFollowedEducation)

    return (
        <Column spacing={4}>
            <InformationFieldset
                prefillData={{
                    familyName: prefillData?.person.familyName,
                    additionalName: prefillData?.person.additionalName,
                    callSign: prefillData?.person.givenName,
                    phonenumber: prefillData?.person.telephone,
                }}
                readOnly={readOnly}
            />
            <HorizontalRule dark={!!hasDarkerDivider} />
            <AvailabilityFieldset prefillData={prefillData?.person} readOnly={readOnly} />
            <HorizontalRule dark={!!hasDarkerDivider} />
            <AccountInformationFieldset
                onEmailChange={onEmailChange}
                prefillData={{
                    email: prefillData?.person.email,
                    role: prefillData?.role,
                }}
                readOnly={readOnly}
                organizationType={OrganizationTypeEnum.Provider}
            />
            <HorizontalRule dark={!!hasDarkerDivider} />
            {showVolunteerFields && (
                <CoworkerVolunteerFields
                    readOnly={readOnly}
                    prefillData={{
                        'person.gender': prefillData?.person.gender,
                        'person.birthday': prefillData?.person.birthday,
                        'person.birthplace': prefillData?.person.birthplace,
                        'person.emergencyTelephone': prefillData?.person.emergencyTelephone,
                        'person.contactPreference': prefillData?.person.contactPreference,
                        'person.contactPreferenceOther': prefillData?.person.contactPreferenceOther,
                        'person.providerTargetGroupPreference': prefillData?.person.providerTargetGroupPreference,
                        'person.providerVolunteeringPreference': prefillData?.person.providerVolunteeringPreference,
                        'person.providerLanguageHouseVolunteeringReference':
                            prefillData?.person.providerLanguageHouseVolunteeringReference,
                        'person.providerTargetGroupIsExperienced': getProviderTargetGroupIsExperiencedPrefill(
                            prefillData?.person.providerTargetGroupIsExperienced
                        ),
                        'person.providerTargetGroupExperience': prefillData?.person.providerTargetGroupExperience,
                        'person.address.street': prefillData?.person.address?.street,
                        'person.address.houseNumber': prefillData?.person.address?.houseNumber,
                        'person.address.houseNumberSuffix': prefillData?.person.address?.houseNumberSuffix,
                        'person.address.postalCode': prefillData?.person.address?.postalCode,
                        'person.address.locality': prefillData?.person.address?.locality,
                        lastEducation,
                        currentEducation,
                        'courseEducation.institution': course?.institution,
                        'courseEducation.teachertype': course?.courseTeacherType,
                        'courseEducation.group': course?.group,
                        'courseEducation.hours': course?.hours,
                        'courseEducation.degree': course?.degree,
                        'courseEducation.other': course?.other,
                    }}
                    showOtherCertificates={true}
                    courseSubtitle={i18n._(
                        t`Volg je op dit moment een cursus/training die te maken heeft met het vrijwilligerswerk?`
                    )}
                    customFieldText={i18n._(t`Cursus/training`)}
                />
            )}
        </Column>
    )
}
function getProviderTargetGroupIsExperiencedPrefill(experienced: boolean | undefined | null) {
    if (typeof experienced === 'boolean') {
        return experienced ? BooleanCheckboxValue.yes : BooleanCheckboxValue.no
    }
    return undefined
}
