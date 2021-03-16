import { routes } from '../../../../routes/routes'

export enum Tabs {
    data = 'data',
    coworkers = 'coworkers',
}

export const TabPaths = {
    [Tabs.data]: routes.authorized.management.aanbieder.data.index,
    [Tabs.coworkers]: routes.authorized.management.aanbieder.coworkers.index,
}
