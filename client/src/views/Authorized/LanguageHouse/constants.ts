import { i18n } from '@lingui/core'

import { ORGANIZATION_SLUG_PARAM } from 'routes/routes'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

export enum Tabs {
    participants = 'participants',
    registrations = 'registrations',
}

export const tabPaths = (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
    [Tabs.participants]: languageHouseRoutes(organizationSlug).participants.index,
    [Tabs.registrations]: languageHouseRoutes(organizationSlug).participants.registrations.index,
})

export const tabTranslations = {
    [Tabs.participants]: i18n._(`Deelnemers`),
    [Tabs.registrations]: i18n._(`Aanmeldingen`),
}
