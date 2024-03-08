import { i18n } from '@lingui/core'

import {
    CivicIntegrationReason,
    CivicIntegrationRequirement,
    ContactPreference,
    EducationLevelEnum,
    Gender,
    IntakeParticipationLadder,
    MaritalStatus,
} from 'graphql/v2/generated/graphql'

export const civicIntegrationRequirementTranslations: { [key in CivicIntegrationRequirement]?: string } = {
    [CivicIntegrationRequirement.No]: i18n._(`Nee`),
    [CivicIntegrationRequirement.Yes]: i18n._(`Ja`),
    [CivicIntegrationRequirement.InProgress]: i18n._(`Volgt momenteel inburgering`),
}

export const civicIntegrationRequirementReasonTranslations: {
    [key in CivicIntegrationReason]?: string
} = {
    [CivicIntegrationReason.ExemptedOrZRoute]: i18n._(`Vanwege vrijstelling of Z-route`),
    [CivicIntegrationReason.FromEuCountry]: i18n._(`Afkomstig uit EU land`),
    [CivicIntegrationReason.Finished]: i18n._(`Afgerond`),
}

export const genderTranslations: { [key in Gender]?: string } = {
    [Gender.Male]: i18n._(`Man`),
    [Gender.Female]: i18n._(`Vrouw`),
    [Gender.X]: i18n._(`X`),
}

export const contactPreferenceTranslations: { [key in ContactPreference]?: string } = {
    [ContactPreference.Phonecall]: i18n._(`Bellen`),
    [ContactPreference.Whatsapp]: i18n._(`Whatsapp`),
    [ContactPreference.Email]: i18n._(`Mailen`),
    [ContactPreference.Other]: i18n._(`Anders, namelijk...`),
}

export const maritalStatusTranslations: { [key in MaritalStatus]?: string } = {
    [MaritalStatus.Divorced]: i18n._(`Gescheiden`),
    [MaritalStatus.MarriedPartner]: i18n._(`Getrouwd/partner`),
    [MaritalStatus.Single]: i18n._(`Alleenstaand`),
    [MaritalStatus.Widow]: i18n._(`Weduwe/weduwnaar`),
}

export const participationLadderTranslations: { [key in IntakeParticipationLadder]?: string } = {
    [IntakeParticipationLadder.Isolated]: i18n._(`1 geïsoleerd`),
    [IntakeParticipationLadder.SocialContactsOutside]: i18n._(`2 sociale contacten buiten huis`),
    [IntakeParticipationLadder.OrganizedActivityParticipation]: i18n._(`3 deelname georganiseerde activiteiten`),
    [IntakeParticipationLadder.VolunteerWork]: i18n._(`4 vrijwilligers werk/maatschappelijke activering`),
    [IntakeParticipationLadder.PaidWithSupport]: i18n._(`5 betaald werk met ondersteuning`),
    [IntakeParticipationLadder.Paid]: i18n._(`6 betaald werk`),
}

export const educationLevelTranslations: { [key in EducationLevelEnum]?: string } = {
    [EducationLevelEnum.Primary]: i18n._(`basisonderwijs`),
    [EducationLevelEnum.SpecialEd]: i18n._(`Speciaal onderwijs (PO en/of VO)`),
    [EducationLevelEnum.DomesticSchool]: i18n._(`Huishoudschool`),
    [EducationLevelEnum.BiologicSchool]: i18n._(`Biologische school`),
    [EducationLevelEnum.Lts]: i18n._(`LTS`),
    [EducationLevelEnum.Mavo]: i18n._(`mavo`),
    [EducationLevelEnum.Vmbo]: i18n._(`vmbo`),
    [EducationLevelEnum.Havo]: i18n._(`havo`),
    [EducationLevelEnum.Vwo]: i18n._(`vwo`),
    [EducationLevelEnum.Mbo]: i18n._(`mbo`),
    [EducationLevelEnum.Hbo]: i18n._(`hbo`),
    [EducationLevelEnum.Wo]: i18n._(`wo`),
    [EducationLevelEnum.Other]: i18n._(`Anders namelijk…`),
}
