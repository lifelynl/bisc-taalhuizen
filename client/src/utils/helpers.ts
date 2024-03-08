import { EmployeeRole, OrganizationTypeEnum } from 'graphql/v2/generated/graphql'

interface Permissions {
    canEditTeamVisibility: () => boolean
    canAccessReferredParticipants: () => boolean
    canAccessExports: () => boolean
    canEditIntake: () => boolean
}

export const permissions = (
    accessGroup?: OrganizationTypeEnum,
    employeeRole?: EmployeeRole | null,
    hasLimitedEditRights?: boolean
) => {
    if (!accessGroup || !employeeRole) {
        return undefined
    }

    if (accessGroup === OrganizationTypeEnum.LanguageHouse) {
        return getLanguageHousePermissions(employeeRole)
    }

    if (accessGroup === OrganizationTypeEnum.Provider) {
        return getProviderPermissions(employeeRole, hasLimitedEditRights)
    }
}

function getLanguageHousePermissions(employeeRole: EmployeeRole): Permissions {
    return {
        canEditTeamVisibility: () => isLanguageHouseCoordinator(employeeRole),
        canAccessReferredParticipants: () => {
            throw new Error('not yet implemented')
        },
        canAccessExports: () => {
            throw new Error('not yet implemented')
        },
        canEditIntake: () => {
            throw new Error('not yet implemented')
        },
    }
}

function getProviderPermissions(employeeRole: EmployeeRole, hasLimitedEditRights: boolean | undefined): Permissions {
    return {
        canAccessReferredParticipants: () => isProviderCoordiantor(employeeRole),
        canAccessExports: () => isProviderCoordiantor(employeeRole),
        canEditIntake: () => !hasLimitedEditRights && isProviderCoordiantor(employeeRole),
        canEditTeamVisibility: () => false, // this is a language house feature
    }
}

function isProviderCoordiantor(employeeRole: EmployeeRole) {
    return [EmployeeRole.Coordinator, EmployeeRole.CoordinatorMentor].includes(employeeRole)
}

function isLanguageHouseCoordinator(employeeRole: EmployeeRole) {
    return [EmployeeRole.Coordinator].includes(employeeRole)
}
