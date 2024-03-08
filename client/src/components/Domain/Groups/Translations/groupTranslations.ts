import { i18n } from '@lingui/core'

import {
    GroupFormality,
    GroupOfferType,
    ParticipationEndReason,
    ParticipationGroupType,
    ParticipationOutFlow,
} from 'graphql/v2/generated/graphql'

export const groupCourseTypeTranslations: { [key in GroupOfferType]?: string } = {
    [GroupOfferType.Digital]: i18n._(`Digitale vaardigheden`),
    [GroupOfferType.Language]: i18n._(`Taal`),
    [GroupOfferType.Math]: i18n._(`Rekenen`),
    [GroupOfferType.Other]: i18n._(`Overige`),
}

export const groupFormalityTranslations: Record<GroupFormality, string> = {
    [GroupFormality.Formal]: i18n._(`Formeel`),
    [GroupFormality.NonFormal]: i18n._(`Non-formeel`),
}

export const participationGroupFormationTypeTranslations: { [key in ParticipationGroupType]?: string } = {
    [ParticipationGroupType.Group]: i18n._(`In een groep`),
    [ParticipationGroupType.Individually]: i18n._(`Individueel`),
}

export const participationEndOptionsTranslations: Record<ParticipationEndReason, string> = {
    [ParticipationEndReason.Moved]: i18n._('Verhuisd'),
    [ParticipationEndReason.Work]: i18n._('Werk'),
    [ParticipationEndReason.Health]: i18n._('Ziekte/gezondheid'),
    [ParticipationEndReason.Deceased]: i18n._('Overlijden'),
    [ParticipationEndReason.CompletedSuccessfully]: i18n._('Succesvol afgerond'),
    [ParticipationEndReason.Family]: i18n._('Familie omstandigheden'),
    [ParticipationEndReason.DoesNotMeetExpectations]: i18n._('Voldoet niet aan verwachting deelnemer'),
    [ParticipationEndReason.Other]: i18n._('Overig'),
}

export const participationOutflowTranslations: Record<ParticipationOutFlow, string> = {
    [ParticipationOutFlow.Study]: i18n._('Studeren'),
    [ParticipationOutFlow.Work]: i18n._('Werken'),
    [ParticipationOutFlow.VolunteerWork]: i18n._('Vrijwilligerswerk'),
    [ParticipationOutFlow.FormalFollowUp]: i18n._('Vervolgtraject formeel'),
    [ParticipationOutFlow.NonFormalFollowUp]: i18n._('Vervolgtraject non formeel'),
    [ParticipationOutFlow.Unknown]: i18n._('Onbekend'),
    [ParticipationOutFlow.Other]: i18n._('Anders namelijk...'),
}
