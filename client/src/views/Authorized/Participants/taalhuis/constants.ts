import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { routes } from '../../../../routes/routes'

export enum Tabs {
    participants = 'participants',
    registrations = 'registrations',
}

export const tabPaths = {
    [Tabs.participants]: routes.authorized.participants.taalhuis.participants.index,
    [Tabs.registrations]: routes.authorized.participants.taalhuis.registrations.index,
}

export const tabTranslations = {
    [Tabs.participants]: i18n._(t`Deelnemers`),
    [Tabs.registrations]: i18n._(t`Registraties`),
}
