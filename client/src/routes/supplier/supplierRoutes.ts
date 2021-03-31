export const supplierRoutes = {
    // TODO: change back to / when all routes are refactored to environment specific routes
    index: '/supplier',
    // TODO: this should be refactored to BiscRoutes, but it has a too big of an impact right now
    bisc: {
        index: '/supplier/bisc',
        overview: '/supplier/bisc/overview',
        create: '/supplier/bisc/overview/create',
        read: {
            index: '/supplier/bisc/overview/read',
            data: '/supplier/bisc/overview/read/data',
            update: '/supplier/bisc/overview/read/update',
            coworkers: {
                index: '/supplier/bisc/overview/read/coworkers',
                overview: '/supplier/bisc/overview/read/coworkers/overview',
                create: '/supplier/bisc/overview/read/coworkers/create',
                detail: {
                    index: '/supplier/bisc/overview/read/coworkers/overview/detail',
                    data: {
                        index: '/supplier/bisc/overview/read/coworkers/overview/detail/data',
                        update: '/supplier/bisc/overview/read/coworkers/overview/detail/data/update',
                    },
                    documents: {
                        index: '/supplier/bisc/overview/read/coworkers/overview/detail/documents',
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
            create: '/supplier/management/employees/create',
            detail: {
                overview: '/supplier/management/employees/detail/overview',
                participants: '/supplier/management/employees/detail/participants',
                documents: '/supplier/management/employees/detail/documents',
            },
        },
    },
}
