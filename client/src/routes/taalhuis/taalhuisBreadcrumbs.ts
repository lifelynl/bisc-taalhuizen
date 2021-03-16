import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { routes } from '../routes'
import { taalhuisRoutes } from './taalhuisRoutes'
import { TaalhuisDetailParams } from './types'

export const taalhuisBreadCrumbs = {
    [taalhuisRoutes.read.index()]: () => [{ to: routes.authorized.taalhuis.overview, label: i18n._(t`Taalhuizen`) }],
    [taalhuisRoutes.read.coworkers.detail.index()]: (params: TaalhuisDetailParams) => [
        { to: routes.authorized.taalhuis.overview, label: i18n._(t`Taalhuizen`) },
        { to: routes.authorized.taalhuis.read.index(params), label: params.taalhuisname },
        { to: routes.authorized.taalhuis.read.coworkers.index(params), label: i18n._(t`Medewerkers`) },
    ],
}
