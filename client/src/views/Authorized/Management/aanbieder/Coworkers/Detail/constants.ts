import { ManagementCoworkerParams } from '../../../../../../routes/management/types'
import { routes } from '../../../../../../routes/routes'

export enum Tabs {
    data = 'data',
    participants = 'participants',
    documents = 'documents',
}

export const TabPaths = {
    [Tabs.data]: (params: ManagementCoworkerParams) =>
        routes.authorized.management.aanbieder.coworkers.detail.data.index(params),
    [Tabs.participants]: (params: ManagementCoworkerParams) =>
        routes.authorized.management.aanbieder.coworkers.detail.participants.overview(params),
    [Tabs.documents]: (params: ManagementCoworkerParams) =>
        routes.authorized.management.aanbieder.coworkers.detail.documents.overview(params),
}
