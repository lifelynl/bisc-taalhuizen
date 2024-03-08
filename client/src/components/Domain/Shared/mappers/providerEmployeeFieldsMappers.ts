import { CoworkerVolunteerFieldsModel } from 'components/Domain/Shared/Fields/CoworkerVolunteerFields'
import {
    CreateEmployeeInputType,
    EditEmployeeInputType,
    EducationNameEnum,
    EducationTypeEnum,
    EmployeeQuery,
} from 'graphql/v2/generated/graphql'
import { BooleanCheckboxValue, Forms } from 'utils/forms'
import { ProviderEmployeeFieldsetModel } from '../Fieldsets/ProviderEmployeeFieldset'

export function getMappedCreateProviderEmployeeFormFields(
    formData: ProviderEmployeeFieldsetModel,
    providerId: string
): CreateEmployeeInputType {
    return {
        person: getPersonFromFormData(formData),
        organization: providerId,
        employeeRole: formData.role,
    }
}

export function getMappedEditProviderEmployeeFormFields(
    formData: ProviderEmployeeFieldsetModel,
    employee: EmployeeQuery['employee']
): EditEmployeeInputType {
    return {
        id: employee.id,
        employeeRole: formData.role,
        person: {
            ...getPersonFromFormData(formData, employee),
            id: employee.person.id,
        },
    }
}

function getPersonFromFormData(formData: ProviderEmployeeFieldsetModel, employee?: EmployeeQuery['employee']) {
    return {
        email: formData.email,
        familyName: formData.familyName,
        additionalName: formData.additionalName,
        givenName: formData.callSign,
        telephone: formData.phonenumber,
        availability: formData.availability,
        availabilityNotes: formData.availabilityNotes,
        gender: formData['person.gender'],
        birthday: formData['person.birthday'],
        birthplace: formData['person.birthplace'],
        emergencyTelephone: formData['person.emergencyTelephone'],
        contactPreference: formData['person.contactPreference'],
        contactPreferenceOther: formData['person.contactPreferenceOther'],
        address: getAddressFromFormData(formData),
        educations: getEducationsFields(formData, employee?.person.educations),
        providerTargetGroupPreference: formData['person.providerTargetGroupPreference'] ?? null,
        providerVolunteeringPreference: formData['person.providerVolunteeringPreference'] ?? null,
        providerLanguageHouseVolunteeringReference:
            formData['person.providerLanguageHouseVolunteeringReference'] ?? null,
        providerTargetGroupIsExperienced: formData['person.providerTargetGroupIsExperienced']
            ? Forms.getBooleanValueByCheckboxValue(formData['person.providerTargetGroupIsExperienced'])
            : null,
        providerTargetGroupExperience: getProviderExperience(
            formData['person.providerTargetGroupIsExperienced'],
            formData['person.providerTargetGroupExperience']
        ),
    }
}

function getAddressFromFormData(formData: ProviderEmployeeFieldsetModel) {
    return {
        street: formData['person.address.street'],
        houseNumber: formData['person.address.houseNumber'],
        houseNumberSuffix: formData['person.address.houseNumberSuffix'],
        postalCode: formData['person.address.postalCode'],
        locality: formData['person.address.locality'],
    }
}

function getEducationsFields(
    formData: CoworkerVolunteerFieldsModel,
    defaultEducations?: EmployeeQuery['employee']['person']['educations']
) {
    const defaultCourse = defaultEducations?.find(e => e!.name === EducationNameEnum.Course)
    const defaultCurrentEducation = defaultEducations?.find(e => e!.name === EducationNameEnum.CurrentEducation)
    const defaultLastFollowedEducation = defaultEducations?.find(
        e => e.name === EducationNameEnum.LastFollowedEducation
    )
    const educations = []
    if (Forms.getBooleanValueByCheckboxValue(formData['courseEducation.hasCourse'])) {
        educations.push({
            id: defaultCourse?.id,
            name: EducationNameEnum.Course,
            type: EducationTypeEnum.Course,
            institution: formData['courseEducation.institution'],
            courseTeacherType: formData['courseEducation.teachertype'],
            group: formData['courseEducation.group'],
            hours: formData['courseEducation.hours'] ? +formData['courseEducation.hours'] : undefined,
            degree: Forms.getBooleanValueByCheckboxValue(formData['courseEducation.degree']),
            other: formData['courseEducation.other'],
        })
    }

    if (formData['employeeEducation.name'] === EducationNameEnum.CurrentEducation) {
        educations.push({
            id: defaultCurrentEducation?.id,
            name: EducationNameEnum.CurrentEducation,
            type: EducationTypeEnum.Education,
            startDate: formData['currentEducation.startDate'],
            institution: formData['currentEducation.institution'],
            degree: Forms.getBooleanValueByCheckboxValue(formData['currentEducation.degree']),
        })
    } else if (formData['employeeEducation.name'] === EducationNameEnum.LastFollowedEducation) {
        educations.push({
            id: defaultLastFollowedEducation?.id,
            name: EducationNameEnum.LastFollowedEducation,
            type: EducationTypeEnum.Education,
            level: formData['lastEducation.level'],
            levelOther: formData['lastEducation.levelOther'],
            degreeGranted: Forms.getBooleanValueByCheckboxValue(formData['lastEducation.degreeGranted']),
            endDate: formData['lastEducation.endDate'],
        })
    } else if (formData['employeeEducation.name'] === BooleanCheckboxValue.no) {
        return educations
    }

    return educations
}

function getProviderExperience(
    isExperienced: BooleanCheckboxValue | undefined | null,
    experience: string | undefined | null
) {
    if (isExperienced && experience && Forms.getBooleanValueByCheckboxValue(isExperienced)) {
        return experience
    }
    return null
}
