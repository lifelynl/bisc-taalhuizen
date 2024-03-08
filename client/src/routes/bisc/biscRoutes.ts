import { ORGANIZATION_SLUG_PARAM } from 'routes/routes'

export interface BiscLanguageHousesDetailRouteParams {
    languageHouseId: string
}

export interface BiscLanguageHousesDetailCoworkersDetailRouteParams extends BiscLanguageHousesDetailRouteParams {
    languageHouseEmployeeId: string
}

export interface BiscProvidersDetailRouteParams {
    providerId: string
}

export interface BiscProvidersDetailCoworkersDetailRouteParams extends BiscProvidersDetailRouteParams {
    providerEmployeeId: string
}

export interface BiscManagementCoworkerDetailRouteParams {
    biscEmployeeId: string
}

export const BISC_PATH_START = 'bisc'

export const biscRoutes = (organizationSlug: string = ORGANIZATION_SLUG_PARAM) => ({
    index: `/${BISC_PATH_START}/${organizationSlug}`,
    languageHouses: {
        index: `/${BISC_PATH_START}/${organizationSlug}/language-houses`,
        create: `/${BISC_PATH_START}/${organizationSlug}/language-houses/create`,
        detail: (languageHouseId: string = ':languageHouseId') => ({
            index: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}`,
            data: {
                index: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/data`,
                update: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/update`,
            },
            coworkers: {
                index: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/coworkers`,
                create: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/coworkers/create`,
                detail: (languageHouseEmployeeId: string = ':languageHouseEmployeeId') => ({
                    index: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/coworkers/${languageHouseEmployeeId}`,
                    data: {
                        index: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/coworkers/${languageHouseEmployeeId}/data`,
                        update: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/coworkers/${languageHouseEmployeeId}/update`,
                    },
                }),
            },
            intakeSettings: {
                index: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/intake-settings/data`, //TODO: Missed these
                update: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/intake-settings/update`,
            },
            providers: {
                view: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/providers/view`,
                update: `/${BISC_PATH_START}/${organizationSlug}/language-houses/${languageHouseId}/providers/update`,
            },
        }),
    },
    providers: {
        index: `/${BISC_PATH_START}/${organizationSlug}/providers`,
        create: `/${BISC_PATH_START}/${organizationSlug}/providers/create`,
        detail: (providerId: string = ':providerId') => ({
            index: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}`,
            data: {
                index: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/data`,
                update: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/update`,
            },
            coworkers: {
                index: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/coworkers`,
                create: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/coworkers/create`,
                detail: (providerEmployeeId: string = ':providerEmployeeId') => ({
                    index: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/coworkers/${providerEmployeeId}`,
                    data: {
                        index: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/coworkers/${providerEmployeeId}/data`,
                        update: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/coworkers/${providerEmployeeId}/update`,
                        documents: `/${BISC_PATH_START}/${organizationSlug}/providers/${providerId}/coworkers/${providerEmployeeId}/documents`,
                    },
                }),
            },
        }),
    },
    reports: {
        index: `/${BISC_PATH_START}/${organizationSlug}/reports`,
        overview: `/${BISC_PATH_START}/${organizationSlug}/reports/overview/`,
    },
    management: {
        index: `/${BISC_PATH_START}/${organizationSlug}/management`,
        coworkers: {
            index: `/${BISC_PATH_START}/${organizationSlug}/management/coworkers`,
            create: `/${BISC_PATH_START}/${organizationSlug}/management/coworkers/create`,
            detail: (biscEmployeeId: string = ':biscEmployeeId') => ({
                index: `/${BISC_PATH_START}/${organizationSlug}/management/coworkers/${biscEmployeeId}`,
                data: {
                    index: `/${BISC_PATH_START}/${organizationSlug}/management/coworkers/${biscEmployeeId}/data`,
                    update: `/${BISC_PATH_START}/${organizationSlug}/management/coworkers/${biscEmployeeId}/update`,
                },
            }),
        },
    },
})
