import { OrganizationIntakeFields } from 'graphql/v2/generated/graphql'

export enum MandatoryIntakeSettings {
    PersonalInfo = 'PersonalInfo',
    Permissions = 'Permissions',
    Team = 'Team',
}

export const sortedIntakeSettings: (OrganizationIntakeFields | MandatoryIntakeSettings)[] = [
    OrganizationIntakeFields.IntegrationMandatory,
    MandatoryIntakeSettings.PersonalInfo,
    OrganizationIntakeFields.ContactData,
    OrganizationIntakeFields.General,
    OrganizationIntakeFields.Referer,
    OrganizationIntakeFields.Background,
    MandatoryIntakeSettings.Team,
    OrganizationIntakeFields.DutchNt,
    OrganizationIntakeFields.Level,
    OrganizationIntakeFields.Education,
    OrganizationIntakeFields.Course,
    OrganizationIntakeFields.Employment,
    OrganizationIntakeFields.Motivation,
    OrganizationIntakeFields.Availability,
    OrganizationIntakeFields.ReadingTest,
    OrganizationIntakeFields.WritingTest,
    MandatoryIntakeSettings.Permissions,
]
