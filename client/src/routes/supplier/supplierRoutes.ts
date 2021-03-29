export const supplierRoutes = {
    // TODO: this should be refactored to BiscRoutes, but it has a too big of an impact right now
    index: '/',
    bisc: {
        index: '/bisc/suppliers',
        overview: '/bisc/suppliers/overview',
        create: '/bisc/suppliers/overview/create',
        read: {
            index: '/bisc/suppliers/overview/read',
            data: `/bisc/suppliers/overview/read/data`,
            update: `/bisc/suppliers/overview/read/update`,
            coworkers: {
                index: `/bisc/suppliers/overview/read/coworkers`,
                overview: `/bisc/suppliers/overview/read/coworkers/overview`,
                create: `/bisc/suppliers/overview/read/coworkers/create`,
                detail: {
                    index: `/bisc/suppliers/overview/read/coworkers/overview/detail`,
                    data: {
                        index: `/bisc/suppliers/overview/read/coworkers/overview/detail/data`,
                        update: `/bisc/suppliers/overview/read/coworkers/overview/detail/data/update`,
                    },
                    documents: {
                        index: `/bisc/suppliers/overview/read/coworkers/overview/detail/documents`,
                    },
                },
            },
        },
    },
    participants: {
        index: '/supplier/participants',
        active: '/supplier/participants/active',
        completed: '/supplier/participants/completed',
        referred: '/supplier/participants/referred',
        detail: {
            index: '/supplier/participants/detail',
            overview: '/supplier/participants/detail/overview',
            registration: '/supplier/participants/detail/registration',
            folder: '/supplier/participants/detail/folder',
            goals: {
                index: '/supplier/participants/detail/goals',
                overview: '/supplier/participants/detail/goals/overview',
                detail: '/supplier/participants/detail/goals/detail',
            },
            documents: '/supplier/participants/detail/documents',
        },
    },
    // do not confuse with the bisc environment. this is for aanbieder management
    management: {
        index: '/supplier/management',
        overview: '/supplier/management/overview',
        employees: {
            index: '/supplier/management/employees',
            overview: '/supplier/management/employees/overview',
            detail: {
                overview: '/supplier/management/employees/detail/overview',
                participants: '/supplier/management/employees/detail/participants',
                documents: '/supplier/management/employees/detail/documents',
            },
        },
    },
}
