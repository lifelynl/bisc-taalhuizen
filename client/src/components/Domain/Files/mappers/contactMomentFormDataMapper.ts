import { CreateStudentContactMomentInputType, EditStudentContactMomentInputType } from 'graphql/v2/generated/graphql'
import { StudentContactMomentFormData } from '../Fieldsets/ContactMomentFormFields'

export function createStudentContactMomentFieldsMapper(
    formData: StudentContactMomentFormData,
    studentId: string
): CreateStudentContactMomentInputType {
    return {
        student: studentId,
        ...getStudentContactMomentFields(formData),
    }
}

export function editStudentContactMomentFieldsMapper(
    formData: StudentContactMomentFormData,
    contactMomentId: string
): EditStudentContactMomentInputType {
    return {
        id: contactMomentId,
        ...getStudentContactMomentFields(formData),
    }
}

function getStudentContactMomentFields(formData: StudentContactMomentFormData) {
    return {
        type: formData.type,
        date: formData.date,
        explanation: formData.explanation,
    }
}
