import { TaalhuisCoworkersDetailParams, TaalhuisDetailParams } from './types'

const taalhuisBaseUrl = (
    props: TaalhuisDetailParams = { taalhuisid: ':taalhuisid', taalhuisname: ':taalhuisname' }
) => {
    return `/taalhuis/overview/${props.taalhuisid}/${props.taalhuisname}`
}

const taalhuisCoworkerBaseUrl = (
    props: TaalhuisCoworkersDetailParams = {
        taalhuisid: ':taalhuisid',
        taalhuisname: ':taalhuisname',
        coworkerid: ':coworkerid',
    }
) => {
    return `${taalhuisBaseUrl(props)}/read/coworkers/read/${props.coworkerid}`
}

export const taalhuisRoutes = {
    index: '/taalhuis',
    overview: '/taalhuis/overview',
    create: '/taalhuis/overview/create',
    read: {
        index: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read`,
        data: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/data`,
        update: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/update`,
        coworkers: {
            index: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/`,
            overview: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/overview`,
            create: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/create`,
            detail: {
                index: (props?: TaalhuisDetailParams) => `${taalhuisBaseUrl(props)}/read/coworkers/read`,
                data: (props?: TaalhuisCoworkersDetailParams) => `${taalhuisCoworkerBaseUrl(props)}/data`,
                update: (props?: TaalhuisCoworkersDetailParams) => `${taalhuisCoworkerBaseUrl(props)}/update`,
            },
        },
    },
}
