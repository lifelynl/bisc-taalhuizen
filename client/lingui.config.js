/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: ['nl'],
    sourceLocale: 'nl',
    catalogs: [
        {
            path: 'src/locales/{locale}/messages',
            include: ['src/**'],
        },
    ],
    format: 'po',
    compileNamespace: 'es',
}
