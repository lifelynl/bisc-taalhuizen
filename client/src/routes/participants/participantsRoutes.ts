import { Type } from '../../components/Providers/UserProvider/types'
import { ParticipantDetailParams, RegistrationsDetailParams } from './types'

const participantDetailBaseUrl = (
    environment: Type,
    props: ParticipantDetailParams = { participantid: ':participantid', participantname: ':participantname' }
) => {
    return `/participant/${environment}/participants/overview/${props.participantid}/${props.participantname}`
}

const registrationsDetailBaseUrl = (
    environment: Type,
    props: RegistrationsDetailParams = { registrationid: ':registrationid', registrationname: ':registrationname' }
) => {
    return `/participant/${environment}/registrations/overview/${props.registrationid}/${props.registrationname}`
}

export const participantsRoutes = {
    index: '/participants',
    taalhuis: {
        index: '/participants/taalhuis',
        participants: {
            index: '/participants/taalhuis/participants',
            overview: '/participants/taalhuis/participants/overview',
            create: '/participants/taalhuis/participants/overview',
            detail: {
                index: (params?: ParticipantDetailParams) => participantDetailBaseUrl(Type.taalhuis, params),
                read: (params?: ParticipantDetailParams) => `${participantDetailBaseUrl(Type.taalhuis, params)}/read`,
                update: (params?: ParticipantDetailParams) =>
                    `${participantDetailBaseUrl(Type.taalhuis, params)}/update`,
            },
        },
        registrations: {
            index: '/participants/taalhuis/registrations',
            overview: '/participants/taalhuis/registrations/overview',
            detail: {
                index: (params?: RegistrationsDetailParams) => registrationsDetailBaseUrl(Type.taalhuis, params),
                read: (params?: RegistrationsDetailParams) =>
                    `${registrationsDetailBaseUrl(Type.taalhuis, params)}/read`,
            },
        },
    },
}
