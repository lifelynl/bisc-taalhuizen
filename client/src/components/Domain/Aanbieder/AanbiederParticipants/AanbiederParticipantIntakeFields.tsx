import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import CivicIntegrationFieldset from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import IntakeInformationFieldset from 'components/fieldsets/shared/IntakeInformationFieldset'
import PersonInformationFieldset from 'components/fieldsets/shared/PersonInformationFieldset'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { AanbiederParticipantDetail } from 'views/Authorized/Supplier/AanbiederView/mocks'
import GeneralInformationFieldset from 'components/fieldsets/shared/GeneralInformationFieldset'
import RefererInformationFieldset from 'components/fieldsets/participants/fieldsets/RefererInformationFieldset'
import BackgroundInformationFieldset from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import DutchNTFieldset from 'components/fieldsets/shared/DutchNTInformationFieldset'
import LevelInformationFieldset from 'components/fieldsets/participants/fieldsets/LevelInformationFieldset'
import EducationInformationFieldset from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import CourseInformationFieldset from 'components/fieldsets/shared/CourseInformationFieldset'
import WorkInformationFieldset from 'components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import MotivationInformationFieldset from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import ReadingTestInformationFieldset from 'components/fieldsets/participants/fieldsets/ReadingTestInformationFieldset'
import WritingInformationFieldset from 'components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import { PermissionsFieldset } from 'components/fieldsets/participants/fieldsets/PermissionsFieldset'

interface Props {
    participant: AanbiederParticipantDetail
}

// TODO: update fields/keys with the actual keys from the api
export const AanbiederParticipantIntakeFields: React.FunctionComponent<Props> = ({ participant }) => {
    const { i18n } = useLingui()

    return (
        <Column>
            {renderCustomerFields()}
            <HorizontalRule />
            {renderCivicIntegrationFields()}
            <HorizontalRule />
            {renderPersonalInfoFields()}
            <HorizontalRule />
            {renderContactInfoFields()}
            <HorizontalRule />
            {renderGeneralInfoFields()}
            <HorizontalRule />
            {renderReferrerFields()}
            <HorizontalRule />
            {renderBackgroundFields()}
            <HorizontalRule />
            {renderProficiencyFields()}
            <HorizontalRule />
            {renderLevelFields()}
            <HorizontalRule />
            {renderEducationFields()}
            <HorizontalRule />
            {renderClassFields()}
            <HorizontalRule />
            {renderWorkFields()}
            <HorizontalRule />
            {renderMotivationFields()}
            <HorizontalRule />
            {renderReadingTestResultField()}
            <HorizontalRule />
            {renderWritingTestResultField()}
            <HorizontalRule />
            {renderPermissionFields()}
        </Column>
    )

    function renderCustomerFields() {
        const { fullName, assignedAt } = participant.customer

        return (
            <IntakeInformationFieldset
                prefillData={{
                    nameOfCustomer: fullName,
                    dateOfIntake: DateFormatters.formattedDate(assignedAt),
                }}
            />
        )
    }

    function renderCivicIntegrationFields() {
        const { civicIntegrationReason, isCivicIntegrationRequired } = participant
        return (
            <CivicIntegrationFieldset
                readOnly={true}
                prefillData={{
                    civicIntegrationRequirement: isCivicIntegrationRequired ? i18n._(t`Ja`) : i18n._(t`Nee`),
                    civicIntegrationRequirementReason: civicIntegrationReason,
                }}
            />
        )
    }

    function renderPersonalInfoFields() {
        const { lastName, nickName, gender, birthdate } = participant

        return (
            <PersonInformationFieldset
                readOnly={true}
                prefillData={{
                    lastName,
                    nickName,
                    gender,
                    dateOfBirth: DateFormatters.formattedDate(birthdate),
                }}
                fieldControls={{
                    countryOfOrigin: { hidden: true },
                    lastName: { required: false },
                }}
            />
        )
    }

    function renderContactInfoFields() {
        const { street, building, apartment, postcode, city, contactPreference, phone } = participant.address

        return (
            <ContactInformationFieldset
                readOnly={true}
                prefillData={{
                    street: street,
                    streetNr: `${building}`,
                    addition: apartment,
                    postalCode: postcode,
                    city,
                    phone,
                    contactPreference,
                }}
            />
        )
    }

    function renderGeneralInfoFields() {
        const { countryOfOrigin, nativeLanguage, otherLanguages, children, childrenBirthdates } = participant
        const { maritalStatus } = participant

        const dateOfBirthChildren = childrenBirthdates?.length
            ? childrenBirthdates.map(DateFormatters.formattedDate).join(', ')
            : '-'

        return (
            <GeneralInformationFieldset
                readOnly={true}
                prefillData={{
                    countryOfOrigin,
                    nativeLanguage,
                    otherLanguages: otherLanguages.length ? otherLanguages.join(', ') : '-',
                    familyComposition: [maritalStatus],
                    numberOfChildren: children ? children.toString() : '-',
                    dateOfBirthChildren,
                }}
            />
        )
    }

    function renderReferrerFields() {
        const { group, name, email } = participant.referrer

        return (
            <RefererInformationFieldset
                readOnly={true}
                prefillData={{
                    notifyingParty: group,
                    referrerInstant: name,
                    referrerEmailAddress: email,
                }}
            />
        )
    }

    function renderBackgroundFields() {
        const { foundVia, foundViaBefore, networks, participationLadder } = participant.background

        return (
            <BackgroundInformationFieldset
                readOnly={true}
                prefillData={{ foundVia, foundViaBefore, networks, participationLadder }}
            />
        )
    }

    function renderProficiencyFields() {
        const { proficiency } = participant

        return <DutchNTFieldset readOnly={true} prefillData={{ NTLevel: proficiency }} />
    }

    function renderLevelFields() {
        const { level } = participant

        return <LevelInformationFieldset readOnly={true} prefillData={{ languageLevel: level }} />
    }

    function renderEducationFields() {
        const { lastTraining, graduated, isCurrentlyEnrolled } = participant.education

        return (
            <EducationInformationFieldset
                readOnly={true}
                prefillData={{
                    lastEducation: lastTraining,
                    graduated: graduated ? i18n._(t`Ja`) : i18n._(t`Nee`),
                    currentEducation: isCurrentlyEnrolled ? i18n._(t`Ja`) : i18n._(t`Nee`),
                }}
            />
        )
    }

    function renderClassFields() {
        const course = participant.isCurrentlyEnrolledInACourse ? i18n._(t`Ja`) : i18n._(t`Nee`)

        return <CourseInformationFieldset readOnly={true} prefillData={{ course }} />
    }

    function renderWorkFields() {
        const { training, lastCompany, activities } = participant.profession

        return (
            <WorkInformationFieldset
                readOnly={true}
                prefillData={{
                    trained: training,
                    lastWorkplace: lastCompany,
                    dayTimeActivities: activities,
                }}
            />
        )
    }

    function renderMotivationFields() {
        const { motivations } = participant
        const { learningGoals, isFirstTime, isFirstTimeReason, learningReason, timingReason } = motivations
        const { processPreference, customerComments } = motivations

        return (
            <MotivationInformationFieldset
                readOnly={true}
                prefillData={{
                    skills: Object.values(learningGoals).flatMap(s => s),
                    triedThisSkillBefore: isFirstTime ? i18n._(t`Ja`) : i18n._(t`Nee`),
                    reasonWhy: isFirstTimeReason,
                    learningReason,
                    whyNowLearningReason: timingReason,
                    learningPreference: processPreference,
                    remark: customerComments,
                }}
            />
        )
    }

    function renderReadingTestResultField() {
        const { readingTestResult } = participant

        return <ReadingTestInformationFieldset readOnly={true} prefillData={{ readingResults: readingTestResult }} />
    }

    function renderWritingTestResultField() {
        const { writingTestResult } = participant

        return <WritingInformationFieldset readOnly={true} prefillData={{ writingResults: writingTestResult }} />
    }

    function renderPermissionFields() {
        const { isConsentSigned, permissions } = participant
        const { sharingLearningPathway, sharingBasicData, permissionInformationFromLibrary } = permissions

        return (
            <PermissionsFieldset
                readOnly={true}
                prefillData={{
                    signed: isConsentSigned,
                    sharingLearningPathway,
                    sharingBasicData,
                    permissionInformationFromLibrary,
                }}
            />
        )
    }
}
