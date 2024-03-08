import { getMockCreateRegistrationInput } from '../registration/registration.mock'
import { getMockCreatePersonInput } from '../person/person.mock'
import { CreateStudentInput, EditStudentInput, RegisterStudentInput } from './student.type'
import {
    getMockCreateCivicIntegrationInput,
    getMockEditCivicIntegrationInput,
} from '../civicIntegration/civicIntegration.mock'

export function getMockRegisterStudentInput(): RegisterStudentInput {
    return {
        person: getMockCreatePersonInput(),
        registration: getMockCreateRegistrationInput(),
        organization: 'some-id',
        team: 'some-team-id',
    }
}

export function getMockCreateStudentInput(): CreateStudentInput {
    return {
        ...getMockRegisterStudentInput(),
        civicIntegration: getMockCreateCivicIntegrationInput(),
    }
}

export function getMockEditStudentInput(): EditStudentInput {
    return {
        id: 'some-student-id',
        ...getMockCreateRegistrationInput(),
        civicIntegration: getMockEditCivicIntegrationInput(),
    }
}
