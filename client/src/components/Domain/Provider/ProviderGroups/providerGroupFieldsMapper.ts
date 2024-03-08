import {
    CreateEducationGroupInputType,
    EditEducationGroupInputType,
    GroupOfferType,
} from 'graphql/v2/generated/graphql'
import { Forms } from 'utils/forms'
import { ProviderGroupFormFieldsModel } from './ProviderGroupFormFields'

export function getMappedCreateProviderGroupFormFields(
    formData: ProviderGroupFormFieldsModel,
    organizationId: string
): CreateEducationGroupInputType {
    return {
        organizationId,
        type: formData.type as GroupOfferType,
        name: formData.name ?? '',
        availability: formData.availability,
        availabilityNotes: formData.availabilityNotes,
        location: formData.location ?? '',
        minimumParticipants: formData.minimumParticipants ? parseInt(formData.minimumParticipants, 10) : 0,
        maximumParticipants: formData.maximumParticipants ? parseInt(formData.maximumParticipants, 10) : 0,
        evaluation: formData.evaluation,
        lessonHours: formData.lessonHours ? parseInt(formData.lessonHours, 10) : undefined,
        formality: formData.formality,
        start: formData.start ? new Date(formData.start) : undefined,
        end: formData.end ? new Date(formData.end) : undefined,
        degree: Forms.getBooleanValueByCheckboxValue(formData.degree),
        employees: formData.employeeIds ? formData.employeeIds.split(',') : [],
        desiredLearningNeedOutcome: {
            subject: formData.subject,
            subjectOther: formData.subjectOther,
            application: formData.application,
            applicationOther: formData.applicationOther,
            level: formData.level,
            levelOther: formData.levelOther,
        },
    }
}

export function getMappedEditProviderGroupFormFields(
    formData: ProviderGroupFormFieldsModel,
    educationGroupId: string
): EditEducationGroupInputType {
    return {
        educationGroupId,
        type: formData.type,
        name: formData.name,
        availability: formData.availability,
        availabilityNotes: formData.availabilityNotes,
        location: formData.location,
        minimumParticipants: formData.minimumParticipants ? parseInt(formData.minimumParticipants, 10) : undefined,
        maximumParticipants: formData.maximumParticipants ? parseInt(formData.maximumParticipants, 10) : undefined,
        evaluation: formData.evaluation,
        lessonHours: formData.lessonHours ? parseInt(formData.lessonHours, 10) : undefined,
        formality: formData.formality,
        degree: Forms.getBooleanValueByCheckboxValue(formData.degree),
        start: formData.start ? new Date(formData.start) : undefined,
        end: formData.end ? new Date(formData.end) : undefined,
        employees: formData.employeeIds ? formData.employeeIds.split(',') : [],
        desiredLearningNeedOutcome: {
            subject: formData.subject,
            subjectOther: formData.subjectOther,
            application: formData.application,
            applicationOther: formData.applicationOther,
            level: formData.level,
            levelOther: formData.levelOther,
        },
    }
}
