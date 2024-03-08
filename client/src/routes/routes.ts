import { BISC_PATH_START, biscRoutes } from './bisc/biscRoutes'
import { LANGUAGEHOUSE_PATH_START, languageHouseRoutes } from './languageHouse/languageHouseRoutes'
import { PROVIDER_PATH_START, providerRoutes } from './provider/providerRoutes'

export interface ResetPasswordRouteParams {
    base64Email: string
    base64Token: string
}

export const ORGANIZATION_SLUG_PARAM = ':organizationSlug'
export const AUTHENTICATED_PATH_STARTS = [BISC_PATH_START, LANGUAGEHOUSE_PATH_START, PROVIDER_PATH_START]

export const routes = {
    public: {
        publicRegistration: '/registration',
        publicSelfRegistration: '/self-registration',
    },
    unauthorized: {
        index: '/auth',
        login: '/auth/login',
        forgotpassword: '/auth/forgotpassword',
        resetpassword: '/auth/resetpassword/:base64Email/:base64Token',
        loggedout: '/auth/loggedout',
    },
    authorized: {
        index: '/',
        select: '/select-organization',
        profile: {
            index: `/profile`,
            update: `/profile/update`,
        },
        bisc: biscRoutes,
        languageHouse: languageHouseRoutes,
        provider: providerRoutes,

        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
