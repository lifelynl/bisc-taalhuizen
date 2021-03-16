import { Type } from '../../components/Providers/UserProvider/types'
import { ManagementCoworkerParams } from './types'

const managementCoworkerBaseUrl = (
    environment: Type,
    props: ManagementCoworkerParams = {
        coworkerid: ':coworkerid',
        coworkername: ':coworkername',
    }
) => {
    return `/management/${environment}/coworkers/${props.coworkerid}/${props.coworkername}`
}

export const managementRoutes = {
    index: '/management',
    bisc: {
        index: '/management/bisc',
        overview: '/management/bisc/overview',
        coworkers: {
            index: '/management/bisc/coworkers',
            create: '/management/bisc/coworkers/create',
            update: (props?: ManagementCoworkerParams) => `${managementCoworkerBaseUrl(Type.bisc, props)}/update`,
            read: (props?: ManagementCoworkerParams) => `${managementCoworkerBaseUrl(Type.bisc, props)}/read`,
        },
    },
    taalhuis: {
        index: '/management/taalhuis',
        coworkers: {
            index: '/management/taalhuis/coworkers',
            overview: '/management/taalhuis/coworkers/overview',
            create: '/management/taalhuis/coworkers/create',
            detail: {
                index: (props?: ManagementCoworkerParams) => managementCoworkerBaseUrl(Type.taalhuis, props),
                update: (props?: ManagementCoworkerParams) =>
                    `${managementCoworkerBaseUrl(Type.taalhuis, props)}/update`,
                read: (props?: ManagementCoworkerParams) => `${managementCoworkerBaseUrl(Type.taalhuis, props)}/read`,
            },
        },
        data: {
            index: `/management/taalhuis/data`,
            read: `/management/taalhuis/data/read`,
            update: `/management/taalhuis/data/update`,
        },
    },
    aanbieder: {
        index: '/management/aanbieder',
        coworkers: {
            index: '/management/aanbieder/coworkers',
            overview: '/management/aanbieder/coworkers/overview',
            create: '/management/aanbieder/coworkers/create',
            detail: {
                index: (props?: ManagementCoworkerParams) => managementCoworkerBaseUrl(Type.aanbieder, props),
                data: {
                    index: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(Type.aanbieder, props)}/data`,
                    update: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(Type.aanbieder, props)}/data/update`,
                    read: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(Type.aanbieder, props)}/data/read`,
                },
                documents: {
                    overview: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(Type.aanbieder, props)}/documents`,
                },
                participants: {
                    overview: (props?: ManagementCoworkerParams) =>
                        `${managementCoworkerBaseUrl(Type.aanbieder, props)}/participants`,
                },
            },
        },
        data: {
            index: `/management/aanbieder/data`,
            read: `/management/aanbieder/data/read`,
            update: `/management/aanbieder/data/update`,
        },
    },
}
