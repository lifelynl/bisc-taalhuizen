export const participantsRoutes = {
    index: '/participants',
    taalhuis: {
        index: '/participants/taalhuis',
        participants: {
            index: '/participants/taalhuis/participants',
            overview: '/participants/taalhuis/participants/overview',
            create: '/participants/taalhuis/participants/create',
            detail: {
                index: '/participants/taalhuis/participants/overview/detail',
                intake: {
                    read: '/participants/taalhuis/participants/overview/detail/read',
                    update: '/participants/taalhuis/participants/overview/detail/update',
                },
                registration: {
                    index: '/participants/taalhuis/participants/overview/detail/registration',
                },
                folder: {
                    index: '/participants/taalhuis/participants/overview/detail/folder',
                },
                goals: {
                    index: `/participants/taalhuis/participants/overview/detail/goals`,
                    overview: `/participants/taalhuis/participants/overview/detail/goals/overview`,
                    create: `/participants/taalhuis/participants/overview/detail/goals/create`,
                    detail: {
                        index: `/participants/taalhuis/participants/overview/detail/goals/detail`,
                        read: `/participants/taalhuis/participants/overview/detail/goals/detail/read`,
                        update: `/participants/taalhuis/participants/overview/detail/goals/detail/update`,
                    },
                },
                documents: {
                    index: '/participants/taalhuis/participants/overview/detail/documents',
                },
            },
        },
        registrations: {
            index: '/participants/taalhuis/registrations',
            overview: '/participants/taalhuis/registrations/overview',
            detail: {
                index: `/participants/taalhuis/registrations/overview/detail`,
                read: `/participants/taalhuis/registrations/overview/detail/read`,
            },
        },
    },
}
