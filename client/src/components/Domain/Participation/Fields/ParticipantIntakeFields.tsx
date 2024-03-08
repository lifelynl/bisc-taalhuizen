import React from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import {
    BackgroundInformationFieldset,
    BackgroundInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import {
    ProviderBackgroundInformationFieldset,
    ProviderBackgroundInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/ProviderBackgroundInformationFieldset'
import {
    CivicIntegrationFieldset,
    CivicIntegrationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import {
    EducationInformationFieldset,
    EducationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import {
    LevelInformationFieldset,
    LevelInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LevelInformationFieldset'
import {
    MotivationInformationFieldset,
    MotivationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import {
    PermissionsFieldset,
    PermissionsFieldsetFormModel,
} from 'components/fieldsets/participants/fieldsets/PermissionsFieldset'
import ReadingTestInformationFieldset, {
    ReadingTestInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/ReadingTestInformationFieldset'
import {
    RefererInformationFieldset,
    RefererInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/RefererInformationFieldset'
import {
    WorkInformationFieldset,
    WorkInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import WritingInformationFieldset, {
    WritingInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import { AvailabilityFieldset, AvailabilityFieldsetModel } from 'components/fieldsets/shared/AvailabilityFieldset'
import {
    ContactInformationFieldset,
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import {
    CourseInformationFieldset,
    CourseInformationFieldsetModel,
} from 'components/fieldsets/shared/CourseInformationFieldset'
import { DutchNTFieldset, DutchNTFieldsetModel } from 'components/fieldsets/shared/DutchNTInformationFieldset'
import {
    GeneralInformationFieldset,
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
// import IntakeInformationFieldset from 'components/fieldsets/shared/IntakeInformationFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import {
    EducationNameEnum,
    EmployeeType,
    Maybe,
    OrganizationIntakeFields,
    OrganizationType,
    StudentForIntakeQuery,
} from 'graphql/v2/generated/graphql'
import {
    ProviderPermissionsFieldset,
    ProviderPermissionsFieldsetFormModel,
} from 'components/fieldsets/participants/fieldsets/ProviderPermissionField'
import Section from 'components/Core/Field/Section'
import Field from 'components/Core/Field/Field'
import { TeamSelect } from 'components/Domain/LanguageHouse/Select/TeamSelect'
import { useLingui } from '@lingui/react'

interface Props {
    student?: StudentForIntakeQuery['student']
    readOnly?: boolean
    disabledIntakeFields: OrganizationIntakeFields[] | null | undefined
    isProvider?: boolean
    showTeamSelectForEmployee?: (Pick<EmployeeType, 'id'> & { organization: Pick<OrganizationType, 'id'> }) | null
}

interface ParticipantIntakeFieldsFormModel
    extends CivicIntegrationFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
        GeneralInformationFieldsetModel,
        RefererInformationFieldsetModel,
        DutchNTFieldsetModel,
        LevelInformationFieldsetModel,
        EducationInformationFieldsetModel,
        CourseInformationFieldsetModel,
        WorkInformationFieldsetModel,
        MotivationInformationFieldsetModel,
        AvailabilityFieldsetModel,
        ReadingTestInformationFieldsetModel,
        WritingInformationFieldsetModel {}

export interface ProviderParticipantIntakeFieldsFormModel
    extends ParticipantIntakeFieldsFormModel,
        ProviderBackgroundInformationFieldsetModel,
        ProviderPermissionsFieldsetFormModel {}

export interface LanguageHouseParticipantIntakeFieldsFormModel
    extends ParticipantIntakeFieldsFormModel,
        BackgroundInformationFieldsetModel,
        PermissionsFieldsetFormModel {
    team?: Maybe<string>
}

export const ParticipantIntakeFields: React.FunctionComponent<Props> = props => {
    const { student, readOnly, isProvider, showTeamSelectForEmployee } = props
    const { i18n } = useLingui()

    const address = student?.person?.address
    const educations = student?.person.educations || []
    const lastFollowedEducation = educations.find(e => e.name === EducationNameEnum.LastFollowedEducation)
    const currentEducation = educations.find(e => e.name === EducationNameEnum.CurrentEducation)
    const course = educations.find(e => e.name === EducationNameEnum.Course)

    return (
        <>
            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.IntegrationMandatory) && (
                <>
                    <CivicIntegrationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'civicIntegration.requirement': student?.civicIntegration?.requirement,
                            'civicIntegration.reason': student?.civicIntegration?.reason,
                            'civicIntegration.finishDate': student?.civicIntegration?.finishDate,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            <PersonInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'person.familyName': student?.person?.familyName,
                    'person.additionalName': student?.person?.additionalName,
                    'person.givenName': student?.person?.givenName,
                    'person.gender': student?.person?.gender,
                    'person.birthday': student?.person?.birthday,
                }}
                fieldControls={{
                    birthplace: {
                        hidden: true,
                    },
                    familyName: {
                        required: true,
                    },
                }}
            />
            <HorizontalRule />

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.ContactData) && (
                <>
                    <ContactInformationFieldset
                        readOnly={readOnly}
                        checkForDuplicate={true}
                        prefillData={{
                            'person.address.street': address?.street,
                            'person.address.houseNumber': address?.houseNumber,
                            'person.address.houseNumberSuffix': address?.houseNumberSuffix,
                            'person.address.postalCode': address?.postalCode,
                            'person.address.locality': address?.locality,
                            'person.telephone': student?.person?.telephone,
                            // 'person.emergencyTelephone': student?.person?.emergencyTelephone, // TODO
                            'person.email': student?.person?.email,
                            'person.secondaryEmail': student?.person?.secondaryEmail,
                            'person.contactPreference': student?.person?.contactPreference,
                            'person.contactPreferenceOther': student?.person?.contactPreferenceOther,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.General) && (
                <>
                    <GeneralInformationFieldset
                        readOnly={readOnly}
                        showCreatedAt={!isProvider}
                        prefillData={{
                            intakeDate: student?.intakeDate,
                            'person.birthplace': student?.person?.birthplace,
                            'person.primaryLanguage': student?.person?.primaryLanguage,
                            'person.speakingLanguages': student?.person?.spokenLanguages,
                            'person.maritalStatus': student?.person?.maritalStatus,
                            'person.children': student?.person?.children,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Referer) && (
                <>
                    <RefererInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'registration.referringOrganization': student?.registration?.referringOrganization as any,
                            'registration.referringOrganizationOther':
                                student?.registration?.referringOrganizationOther,
                            'registration.referringPerson.email': student?.registration?.referringPerson?.email,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Background) && (
                <>
                    {isProvider ? (
                        <ProviderBackgroundInformationFieldset
                            readOnly={readOnly}
                            prefillData={{
                                'registration.network': student?.registration?.network,
                                'registration.participationLadder': student?.registration?.participationLadder,
                            }}
                        />
                    ) : (
                        <BackgroundInformationFieldset
                            readOnly={readOnly}
                            prefillData={{
                                'registration.foundVia': student?.registration?.foundVia,
                                'registration.foundViaOther': student?.registration?.foundViaOther,
                                'registration.wentToLanguageHouseBefore':
                                    student?.registration?.wentToLanguageHouseBefore,
                                'registration.wentToLanguageHouseBeforeReason':
                                    student?.registration?.wentToLanguageHouseBeforeReason,
                                'registration.wentToLanguageHouseBeforeYear':
                                    student?.registration?.wentToLanguageHouseBeforeYear,
                                'registration.network': student?.registration?.network,
                                'registration.participationLadder': student?.registration?.participationLadder,
                            }}
                        />
                    )}
                    <HorizontalRule />
                </>
            )}

            {showTeamSelectForEmployee && (
                <>
                    <Section title={i18n._('Team')}>
                        <Field required={true} label={i18n._('Team')} horizontal={true}>
                            <TeamSelect
                                organizationId={showTeamSelectForEmployee.organization.id}
                                filterForEmployeeId={showTeamSelectForEmployee.id}
                            />
                        </Field>
                    </Section>
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.DutchNt) && (
                <>
                    <DutchNTFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'registration.dutchNTLevel': student?.registration?.dutchNTLevel,
                            'registration.inNetherlandsSinceYear': student?.registration?.inNetherlandsSinceYear,
                            'registration.languageInDailyLife': student?.registration?.languageInDailyLife,
                            'registration.knowsLatinAlphabet': student?.registration?.knowsLatinAlphabet,
                            'registration.lastKnownLevel': student?.registration?.lastKnownLevel,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Level) && (
                <>
                    <LevelInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'registration.speakingLevel': student?.registration?.speakingLevel,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Education) && (
                <>
                    <EducationInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'lastFollowedEducation.level': lastFollowedEducation?.level,
                            'lastFollowedEducation.levelOther': lastFollowedEducation?.levelOther,
                            'lastFollowedEducation.degreeGranted': lastFollowedEducation?.degreeGranted,
                            'lastFollowedEducation.yearsFollowed': lastFollowedEducation?.yearsFollowed,

                            'currentEducation.startDate': currentEducation?.startDate,
                            'currentEducation.yearsFollowed': currentEducation?.yearsFollowed,
                            'currentEducation.level': currentEducation?.level,
                            'currentEducation.levelOther': currentEducation?.levelOther,
                            'currentEducation.institution': currentEducation?.institution,
                            'currentEducation.degree': currentEducation?.degree,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Course) && (
                <>
                    <CourseInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'courseEducation.institution': course?.institution,
                            'courseEducation.teachertype': course?.courseTeacherType,
                            'courseEducation.group': course?.group,
                            'courseEducation.hours': course?.hours,
                            'courseEducation.degree': course?.degree,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Employment) && (
                <>
                    <WorkInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'registration.dayTimeActivities': student?.registration?.dayTimeActivities,
                            'registration.dayTimeActivitiesOther': student?.registration?.dayTimeActivitiesOther,
                            'registration.lastJob': student?.registration?.lastJob,
                            'registration.trainedForJob': student?.registration?.trainedForJob,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Motivation) && (
                <>
                    <MotivationInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'desiredLearningNeedOutcome.subject':
                                student?.registration.desiredLearningNeedOutcome?.subject,
                            'desiredLearningNeedOutcome.subjectOther':
                                student?.registration.desiredLearningNeedOutcome?.subjectOther,
                            'desiredLearningNeedOutcome.application':
                                student?.registration.desiredLearningNeedOutcome?.application,
                            'desiredLearningNeedOutcome.applicationOther':
                                student?.registration.desiredLearningNeedOutcome?.applicationOther,
                            'desiredLearningNeedOutcome.level': student?.registration.desiredLearningNeedOutcome?.level,
                            'desiredLearningNeedOutcome.levelOther':
                                student?.registration.desiredLearningNeedOutcome?.levelOther,
                            'registration.hasTriedThisBefore': student?.registration?.hasTriedThisBefore,
                            'registration.hasTriedThisBeforeExplanation':
                                student?.registration?.hasTriedThisBeforeExplanation,
                            'registration.whyWantTheseskills': student?.registration?.whyWantTheseskills,
                            'registration.whyWantThisNow': student?.registration?.whyWantThisNow,
                            'registration.desiredLearningMethod': student?.registration?.desiredLearningMethod,
                            'registration.remarks': student?.registration?.remarks,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.Availability) && (
                <>
                    <AvailabilityFieldset readOnly={readOnly} prefillData={student?.person} />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.ReadingTest) && (
                <>
                    <ReadingTestInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'registration.readingTestResult': student?.registration?.readingTestResult,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {!props.disabledIntakeFields?.includes(OrganizationIntakeFields.WritingTest) && (
                <>
                    <WritingInformationFieldset
                        readOnly={readOnly}
                        prefillData={{
                            'registration.writingTestResult': student?.registration?.writingTestResult,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            {isProvider ? (
                <ProviderPermissionsFieldset
                    readOnly={readOnly}
                    prefillData={{
                        'person.didSignPermissionForm': student?.person?.didSignPermissionForm,
                        'person.hasPermissionToSendInformationAboutLibraries':
                            student?.person?.hasPermissionToSendInformationAboutLibraries,
                    }}
                />
            ) : (
                <PermissionsFieldset
                    readOnly={readOnly}
                    prefillData={{
                        'person.didSignPermissionForm': student?.person?.didSignPermissionForm,
                        'person.hasPermissionToShareDataWithProviders':
                            student?.person?.hasPermissionToShareDataWithProviders,
                        'person.hasPermissionToShareDataWithLibraries':
                            student?.person?.hasPermissionToShareDataWithLibraries,
                        'person.hasPermissionToSendInformationAboutLibraries':
                            student?.person?.hasPermissionToSendInformationAboutLibraries,
                    }}
                />
            )}
        </>
    )
}
