import { i18n } from '@lingui/core'

import { OrganizationIntakeFields } from 'graphql/v2/generated/graphql'
import { MandatoryIntakeSettings } from './intakeSettings'

export const intakeSettingsTranslations: { [key in OrganizationIntakeFields | MandatoryIntakeSettings]?: string } = {
    [OrganizationIntakeFields.IntegrationMandatory]: i18n._(`Inburgeringsplichtig`),
    [MandatoryIntakeSettings.PersonalInfo]: i18n._(`Persoonsgegevens`),
    [OrganizationIntakeFields.ContactData]: i18n._(`Contactgegevens`),
    [OrganizationIntakeFields.General]: i18n._(`Algemeen`),
    [OrganizationIntakeFields.Referer]: i18n._(`Aanmelder`),
    [OrganizationIntakeFields.Background]: i18n._(`Achtergrond`),
    [OrganizationIntakeFields.DutchNt]: i18n._(`Nederlands`),
    [OrganizationIntakeFields.Level]: i18n._(`Niveau`),
    [OrganizationIntakeFields.Education]: i18n._(`Opleiding`),
    [OrganizationIntakeFields.Course]: i18n._(`Cursus`),
    [OrganizationIntakeFields.Employment]: i18n._(`Werk`),
    [OrganizationIntakeFields.Motivation]: i18n._(`Motivatie`),
    [OrganizationIntakeFields.Availability]: i18n._(`Beschikbaarheid`),
    [OrganizationIntakeFields.ReadingTest]: i18n._(`Leestest`),
    [OrganizationIntakeFields.WritingTest]: i18n._(`Schrijftest`),
    [MandatoryIntakeSettings.Permissions]: i18n._(`Toestemmingen`),
    [MandatoryIntakeSettings.Team]: i18n._(`Team`),
}
