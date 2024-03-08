import { i18n } from '@lingui/core'

import {
    CourseTeacherTypeEnum,
    DesiredLearningMethod,
    DutchNt2Level,
    EducationGroupTypeEnum,
    IntakeDayTimeActivities,
    IntakeFoundVia,
    IntakeNetwork,
    ReadingTestResult,
    ReferringOrganizationEnum,
    SpeakingLevel,
    WritingTestResult,
} from 'graphql/v2/generated/graphql'

export const studentReferringOrganizationEnumTranslations: { [key in ReferringOrganizationEnum]?: string } = {
    [ReferringOrganizationEnum.Uwv]: i18n._(`Uitvoeringsinstituut Werknemersverzekeringen`),
    [ReferringOrganizationEnum.SocialService]: i18n._(`Sociale service`),
    [ReferringOrganizationEnum.Library]: i18n._(`Bibliotheek`),
    [ReferringOrganizationEnum.WelfareWork]: i18n._(`Welzijn`),
    [ReferringOrganizationEnum.NeighborhoodTeam]: i18n._(`Woonplaats team`),
    [ReferringOrganizationEnum.VolunteerOrganization]: i18n._(`Vrijwillige organisatie`),
    [ReferringOrganizationEnum.LanguageProvider]: i18n._(`Taal aanbieder`),
    [ReferringOrganizationEnum.Other]: i18n._(`Anders namelijk... `),
}

export const studentFoundViaEnumTranslations: { [key in IntakeFoundVia]?: string } = {
    [IntakeFoundVia.VolunteerCenter]: i18n._(`Vrijwilliger`),
    [IntakeFoundVia.LibraryWebsite]: i18n._(`Website van de bibliotheek`),
    [IntakeFoundVia.SocialMedia]: i18n._(`Social media`),
    [IntakeFoundVia.Newspaper]: i18n._(`Kran`),
    [IntakeFoundVia.ViaVia]: i18n._(`Via via`),
    [IntakeFoundVia.Other]: i18n._(`Anders namelijk...`),
}

export const studentNetworkEnumTranslations: { [key in IntakeNetwork]?: string } = {
    [IntakeNetwork.AcquaintancesSpeakingDutch]: i18n._(`Bekenden die nederlands spreken`),
    [IntakeNetwork.AcquaintancesSpeakingOwnLanguage]: i18n._(`Bekenden die dezelfde taal spreken `),
    [IntakeNetwork.AidWorkers]: i18n._(`Hulpverleners`),
    [IntakeNetwork.FamilyMembers]: i18n._(`Familieleden`),
    [IntakeNetwork.FriendsAcquaintances]: i18n._(`Vrienden`),
    [IntakeNetwork.HouseholdMembers]: i18n._(`Huisgenoten`),
    [IntakeNetwork.Neighbors]: i18n._(`Buren`),
    [IntakeNetwork.PeopleAtMosqueChurch]: i18n._(`Mensen bij een gebedshuis`),
    [IntakeNetwork.Colleagues]: i18n._(`Collega's`),
}

export const studentDutchLastKnownLevelEnumTranslations: { [key in DutchNt2Level]?: string } = {
    [DutchNt2Level.A0]: i18n._(`A0`),
    [DutchNt2Level.A1]: i18n._(`A1`),
    [DutchNt2Level.A2]: i18n._(`A2`),
    [DutchNt2Level.B1]: i18n._(`B1`),
    [DutchNt2Level.B2]: i18n._(`B2`),
    [DutchNt2Level.C1]: i18n._(`C1`),
    [DutchNt2Level.C2]: i18n._(`C2`),
    [DutchNt2Level.Unknown]: i18n._(`Onbekend`),
}

export const studentSpeakingLevelEnumEnumTranslations: { [key in SpeakingLevel]?: string } = {
    [SpeakingLevel.Beginner]: i18n._(`Beginnende deelnemer`),
    [SpeakingLevel.Reasonable]: i18n._(` Enigszins geoefende deelnemer`),
    [SpeakingLevel.Advanced]: i18n._(`Gevorderde deelnemer`),
}

export const studentMotivationDesiredLearningMethodsEnumTranslations: {
    [key in DesiredLearningMethod]?: string
} = {
    [DesiredLearningMethod.InAGroup]: i18n._(`In een groep`),
    [DesiredLearningMethod.OneOnOne]: i18n._(`Een-op-een`),
    [DesiredLearningMethod.HomeEnvironment]: i18n._(`In thuis omgeving`),
    [DesiredLearningMethod.InLibraryOrOther]: i18n._(`In de bibliotheek of elders`),
    [DesiredLearningMethod.Online]: i18n._(`Online`),
}

export const studentWritingTestResultEnumTranslations: {
    [key in WritingTestResult]?: string
} = {
    [WritingTestResult.CanNotWrite]: i18n._(`Kan niet schrijven`),
    [WritingTestResult.WriteNawDetails]: i18n._(`Kan NAW gegevens schrijven`),
    [WritingTestResult.WriteSimpleLetters]: i18n._(`Kan (eenvoudige) brieven schrijven`),
    [WritingTestResult.WriteSimpleTexts]: i18n._(`Kan eenvoudige teksten schrijven (boodschappenbriefje etc.)`),
}

export const studentReadingTestResultEnumTranslations: {
    [key in ReadingTestResult]?: string
} = {
    [ReadingTestResult.A0]: i18n._(`A0`),
    [ReadingTestResult.A1]: i18n._(`A1`),
    [ReadingTestResult.A2]: i18n._(`A2`),
    [ReadingTestResult.B1]: i18n._(`B1`),
    [ReadingTestResult.B2]: i18n._(`B2`),
    [ReadingTestResult.C1]: i18n._(`C1`),
    [ReadingTestResult.C2]: i18n._(`C2`),
    [ReadingTestResult.CanNotRead]: i18n._(`Kan niet lezen`),
}

export const educationTeacherTypeEnumTranslations: {
    [key in CourseTeacherTypeEnum]?: string
} = {
    [CourseTeacherTypeEnum.Professional]: i18n._(`Professional`),
    [CourseTeacherTypeEnum.Volunteer]: i18n._(`Vrijwilliger`),
    [CourseTeacherTypeEnum.Both]: i18n._(`Beide`),
}

export const educationGroupTypeEnumTranslations: {
    [key in EducationGroupTypeEnum]?: string
} = {
    [EducationGroupTypeEnum.Group]: i18n._(`Groep`),
    [EducationGroupTypeEnum.Individual]: i18n._(`Individueel`),
}

export const intakeDayTimeActivitiesEnumTranslations: {
    [key in IntakeDayTimeActivities]?: string
} = {
    [IntakeDayTimeActivities.SearchingForJob]: i18n._(`Op zoek naar werk`),
    [IntakeDayTimeActivities.ReIntegration]: i18n._(`Re-integratie`),
    [IntakeDayTimeActivities.School]: i18n._(`Studie/school`),
    [IntakeDayTimeActivities.VolunteerJob]: i18n._(`Vrijwilligerswerk`),
    [IntakeDayTimeActivities.Job]: i18n._(`Werk`),
    [IntakeDayTimeActivities.Other]: i18n._(`Anders, namelijk...`),
}
