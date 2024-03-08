import { User } from 'src/modules/user/user.entity'
import { Employee } from '../employee/employee.entity'
import { OrganizationTypeEnum } from '../organization/organization.entity'

export interface JwtPayload {
    sub: string
    username: string
}

export type RequestContext = {
    req: {
        user: UserWithCurrentEmployee
    }
}

export type UserWithCurrentEmployee = User & {
    currentEmployee: Employee
    accessGroup: OrganizationTypeEnum
}
