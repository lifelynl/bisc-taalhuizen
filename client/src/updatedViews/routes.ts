export const routes = {
    authorization: {
        index: '/auth',
        login: '/auth/login',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        loggedOut: '/auth/logged-out',
    },
    bisc: {
        taalhuis: {},
        aanbieder: {},
        reports: {},
        participants: {},
    },
    taalhuis: {
        reports: {},
        participants: {},
    },
    aanbieder: {
        reports: {},
        participants: {},
    },
    app: {
        // for design review/check only
        translationsExample: '/translations-example',
        kitchensink: '/kitchensink',
    },
}
