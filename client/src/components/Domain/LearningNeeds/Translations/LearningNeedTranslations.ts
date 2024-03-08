import { i18n } from '@lingui/core'

import {
    LearningResultApplication,
    LearningResultLevel,
    LearningResultSubject,
    OfferDifference,
} from 'graphql/v2/generated/graphql'

export const learningResultSubjectTranslations: { [key in LearningResultSubject]?: string } = {
    [LearningResultSubject.Attitude]: i18n._(`Houding`),
    [LearningResultSubject.Behaviour]: i18n._(`Gedrag`),
    [LearningResultSubject.Math]: i18n._(`Rekenen`),
    [LearningResultSubject.DigitalSkills]: i18n._(`Digitale vaardigheden`),
    [LearningResultSubject.DutchRead]: i18n._(`Nederlands: Lezen`),
    [LearningResultSubject.DutchWrite]: i18n._(`Nederlands: Schrijven`),
    [LearningResultSubject.DutchSpeaking]: i18n._(`Nederlands: Spreken`),
    [LearningResultSubject.Knowledge]: i18n._(`Kennis`),
    [LearningResultSubject.Other]: i18n._(`Anders, namelijk:`),
    [LearningResultSubject.Skills]: i18n._(`Vaardigheden`),
}

export const learningResultApplicationTranslations: { [key in LearningResultApplication]?: string } = {
    [LearningResultApplication.LaborMarketAndWork]: i18n._(`Arbeidsmarkt en werk`),
    [LearningResultApplication.FamilyAndUpbringing]: i18n._(`Gezin en opvoeden`),
    [LearningResultApplication.HealthAndWellbeing]: i18n._(`Gezondheid en welzijn`),
    [LearningResultApplication.LivingAndNeighborhood]: i18n._(`Wonen en buur`),
    [LearningResultApplication.SelfSustainability]: i18n._(`Zelfredzaamheid`),
    [LearningResultApplication.Other]: i18n._(`Anders, namelijk:`),
}

export const learningResultLevelTranslations: { [key in LearningResultLevel]?: string } = {
    [LearningResultLevel.Influx]: i18n._(`Instroom`),
    [LearningResultLevel.Nlqf1]: i18n._(`NLQF 1`),
    [LearningResultLevel.Nlqf2]: i18n._(`NLQF 2`),
    [LearningResultLevel.Nlqf3]: i18n._(`NLQF 3`),
    [LearningResultLevel.Nlqf4]: i18n._(`NLQF 4`),
    [LearningResultLevel.Other]: i18n._(`Anders, namelijk:`),
}

export const learningNeedOfferDifferencesTranslations: { [key in OfferDifference]?: string } = {
    [OfferDifference.No]: i18n._(`Nee, er is geen verschil`),
    [OfferDifference.YesNotOfferedInTravelRange]: i18n._(`Ja, want: niet aangeboden binnen bereisbare afstand`),
    [OfferDifference.YesOther]: i18n._(`Ja, want: anders`),
    [OfferDifference.YesQueue]: i18n._(`Ja, want: wachtlijs`),
}
