import {
    CreateStudentInput,
    DutchNtType,
    EditStudentInput,
    EducationNameEnum,
    EducationTypeEnum,
    StudentForIntakeQuery,
} from 'graphql/v2/generated/graphql'
import { Forms } from 'utils/forms'
import {
    LanguageHouseParticipantIntakeFieldsFormModel,
    ProviderParticipantIntakeFieldsFormModel,
} from '../Fields/ParticipantIntakeFields'

export function createStudentFieldsMapper(
    formData: ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel,
    languageHouseId: string
): CreateStudentInput {
    const createStudentParams: CreateStudentInput = {
        organization: languageHouseId,
        civicIntegration: getCivicIntegrationFields(formData),
        person: getPersonFields(formData),
        registration: getRegistrationFields(formData),
        team: ('team' in formData && formData.team) || undefined,
    }

    return createStudentParams
}

export function editStudentFieldsMapper(
    formData: ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel,
    defaultUser: StudentForIntakeQuery['student']
): EditStudentInput {
    const editStudentParams: EditStudentInput = {
        id: defaultUser.id!,
        intakeDate: formData['intakeDate'] ?? undefined,
        civicIntegration: getCivicIntegrationFields(formData, defaultUser.civicIntegration),
        person: getPersonFields(formData, defaultUser.person),
        registration: getRegistrationFields(formData, defaultUser.registration),
    }

    return editStudentParams
}

function getCivicIntegrationFields(
    formData: ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel,
    defaultCivicIntegration?: StudentForIntakeQuery['student']['civicIntegration']
) {
    return {
        requirement: formData['civicIntegration.requirement'],
        reason: formData['civicIntegration.reason'],
        finishDate: formData['civicIntegration.finishDate'],
    }
}

function getPersonFields(
    formData: ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel,
    defaultPerson?: StudentForIntakeQuery['student']['person']
) {
    let email: string | null | undefined, secondaryEmail: string | null | undefined
    if (formData['person.email'] !== undefined) {
        if (Forms.getBooleanValueByCheckboxValue(formData.saveEmailAsSecondaryEmail || undefined)) {
            email = null
            secondaryEmail = formData['person.email']
        } else {
            email = formData['person.email']
            secondaryEmail = null
        }
    }

    return {
        familyName: formData['person.familyName'],
        givenName: formData['person.givenName'] ?? '',
        additionalName: formData['person.additionalName'] || '',
        gender: formData['person.gender'],
        birthday: formData['person.birthday'],
        address: {
            street: formData['person.address.street'],
            houseNumber: formData['person.address.houseNumber'],
            houseNumberSuffix: formData['person.address.houseNumberSuffix'],
            postalCode: formData['person.address.postalCode'],
            locality: formData['person.address.locality'],
            country: 'NL',
        },
        email,
        secondaryEmail,
        telephone: formData['person.telephone'],
        contactPreference: formData['person.contactPreference'],
        contactPreferenceOther: formData['person.contactPreferenceOther'],
        birthplace: formData['person.birthplace'] ?? '',
        primaryLanguage: formData['person.primaryLanguage'] ?? '',
        spokenLanguages: formData['person.speakingLanguages'],
        maritalStatus: formData['person.maritalStatus'] ?? undefined,
        children: getNumberValueByInputValue(formData['person.children']),
        availability: formData.availability,
        availabilityNotes: formData.availabilityNotes,
        didSignPermissionForm: formData['person.didSignPermissionForm'] === 'on',
        hasPermissionToSendInformationAboutLibraries:
            formData['person.hasPermissionToSendInformationAboutLibraries'] === 'on',
        hasPermissionToShareDataWithLibraries: formData['person.hasPermissionToShareDataWithLibraries'] === 'on',
        hasPermissionToShareDataWithProviders: formData['person.hasPermissionToShareDataWithProviders'] === 'on',
        educations: getEducationsFields(formData, defaultPerson?.educations),
    }
}

function getRegistrationFields(
    formData: ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel,
    defaultRegistration?: StudentForIntakeQuery['student']['registration']
) {
    const dutchNTLevel = formData['registration.dutchNTLevel']

    return {
        referringOrganization: formData['registration.referringOrganization'],
        referringOrganizationOther: formData['registration.referringOrganizationOther'],
        referringPerson: {
            email: formData['registration.referringPerson.email'],
        },
        ...getLHRegistrationfields(formData),
        network: formData['registration.network'],
        participationLadder: formData['registration.participationLadder'],
        dutchNTLevel: formData['registration.dutchNTLevel'],
        inNetherlandsSinceYear:
            dutchNTLevel === DutchNtType.Nt2
                ? getNumberValueByInputValue(formData['registration.inNetherlandsSinceYear'])
                : null,
        languageInDailyLife: dutchNTLevel === DutchNtType.Nt2 ? formData['registration.languageInDailyLife'] : null,
        knowsLatinAlphabet:
            dutchNTLevel === DutchNtType.Nt2
                ? Forms.getBooleanValueByCheckboxValue(formData['registration.knowsLatinAlphabet'])
                : null,
        lastKnownLevel: dutchNTLevel === DutchNtType.Nt2 ? formData['registration.lastKnownLevel'] : null,
        speakingLevel: formData['registration.speakingLevel'],
        trainedForJob: formData['registration.trainedForJob'],
        lastJob: formData['registration.lastJob'],
        desiredLearningNeedOutcome: {
            id: defaultRegistration?.desiredLearningNeedOutcome?.id,
            application: formData['desiredLearningNeedOutcome.application'],
            applicationOther: formData['desiredLearningNeedOutcome.applicationOther'] ?? '',
            level: formData['desiredLearningNeedOutcome.level'],
            levelOther: formData['desiredLearningNeedOutcome.levelOther'] ?? '',
            subject: formData['desiredLearningNeedOutcome.subject'],
            subjectOther: formData['desiredLearningNeedOutcome.subjectOther'] ?? '',
        },
        hasTriedThisBefore: Forms.getBooleanValueByCheckboxValue(formData['registration.hasTriedThisBefore']),
        hasTriedThisBeforeExplanation: formData['registration.hasTriedThisBeforeExplanation'],
        whyWantTheseskills: formData['registration.whyWantTheseskills'],
        whyWantThisNow: formData['registration.whyWantThisNow'],
        desiredLearningMethod: formData['registration.desiredLearningMethod'],
        remarks: formData['registration.remarks'],
        dayTimeActivities: formData['registration.dayTimeActivities'],
        dayTimeActivitiesOther: formData['registration.dayTimeActivitiesOther'],
        readingTestResult: formData['registration.readingTestResult'],
        writingTestResult: formData['registration.writingTestResult'],
    }
}

function getLHRegistrationfields(formData: LanguageHouseParticipantIntakeFieldsFormModel) {
    if (formData['registration.foundVia']) {
        return {
            foundVia: formData['registration.foundVia'],
            foundViaOther: formData['registration.foundViaOther'],
            wentToLanguageHouseBefore: Forms.getBooleanValueByCheckboxValue(
                formData['registration.wentToLanguageHouseBefore']
            ),
            wentToLanguageHouseBeforeReason: formData['registration.wentToLanguageHouseBeforeReason'],
            wentToLanguageHouseBeforeYear: getNumberValueByInputValue(
                formData['registration.wentToLanguageHouseBeforeYear']
            ),
        }
    }
    return {}
}

function getEducationsFields(
    formData: ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel,
    defaultEducations?: StudentForIntakeQuery['student']['person']['educations']
) {
    const defaultLastFollowedEducation = defaultEducations?.find(
        e => e!.name === EducationNameEnum.LastFollowedEducation
    )
    const defaultCurrentEducation = defaultEducations?.find(e => e!.name === EducationNameEnum.CurrentEducation)
    const defaultCourse = defaultEducations?.find(e => e!.name === EducationNameEnum.Course)
    const educations = []

    // last followed education
    educations.push({
        id: defaultLastFollowedEducation?.id,
        name: EducationNameEnum.LastFollowedEducation,
        type: EducationTypeEnum.Education,
        level: formData['lastFollowedEducation.level'],
        levelOther: formData['lastFollowedEducation.levelOther'],
        degreeGranted: Forms.getBooleanValueByCheckboxValue(formData['lastFollowedEducation.degreeGranted']),
        yearsFollowed: formData['lastFollowedEducation.yearsFollowed']
            ? +formData['lastFollowedEducation.yearsFollowed']
            : undefined,
    })

    if (Forms.getBooleanValueByCheckboxValue(formData['currentEducation.hasCurrentEducation'])) {
        educations.push({
            id: defaultCurrentEducation?.id,
            name: EducationNameEnum.CurrentEducation,
            type: EducationTypeEnum.Education,
            startDate: formData['currentEducation.startDate'],
            yearsFollowed: formData['currentEducation.yearsFollowed']
                ? +formData['currentEducation.yearsFollowed']
                : undefined,
            level: formData['currentEducation.level'],
            levelOther: formData['currentEducation.levelOther'],
            institution: formData['currentEducation.institution'],
            degree: Forms.getBooleanValueByCheckboxValue(formData['currentEducation.degree']),
        })
    }

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
        })
    }

    return educations
}

function getNumberValueByInputValue(inputValue?: string) {
    if (typeof inputValue === 'string' && inputValue !== '') {
        return +inputValue
    }
}
