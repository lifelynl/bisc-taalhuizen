import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { Employee } from 'src/generated/mrc-graphql'
import { MRCRepository } from '../MRCRepository'

interface EmployeesParams {
    organizationId?: string
}

interface employeeParams {
    id: string
}

type EmployeeEntity = Pick<Employee, 'id' | 'person' | 'organization'>

@Injectable()
export class EmployeeRepository extends MRCRepository {
    public async createEmployee(personId: string, organizationId: string) {
        const result = await this.sdk.createEmployee({
            input: { person: personId, organization: organizationId },
        })

        const employeeObject = result?.createEmployee?.employee
        assertNotNil(employeeObject, `Failed to create employee`)

        employeeObject.id = this.makeURLfromID(employeeObject.id)

        return this.returnNonNullable(employeeObject)
    }

    public findByOrganizationId(taalhuisId: string) {
        return this.findByParams({ organizationId: taalhuisId })
    }

    public async findByPersonId(personId: string) {
        const result = await this.sdk.findEmployeesByPersonId({ personId })

        const node = result?.employees?.edges?.pop()?.node
        if (!node) {
            return null
        }
        return {
            ...node,
            id: this.makeURLfromID(node?.id),
        }
    }

    private async findByParams(params: EmployeesParams = {}) {
        const result = await this.sdk.employees(params)

        const employeeEdges = result.employees?.edges

        if (!employeeEdges) {
            return []
        }

        const employeeEntities: EmployeeEntity[] = employeeEdges.map(employeeEdge => {
            const id = employeeEdge?.node?.id
            assertNotNil(id)

            const person = employeeEdge?.node?.person
            assertNotNil(person)

            const organization = employeeEdge?.node?.organization
            assertNotNil(organization)

            return {
                id: this.makeURLfromID(id),
                person,
                organization,
            }
        })

        return employeeEntities
    }

    public async findById(params: employeeParams) {
        let result = null
        try {
            result = await this.sdk.employee({ id: this.stripURLfromID(params.id) })
        } catch (e) {
            // a wrong ID will error, not return null
            return null
        }

        if (!result.employee) {
            return null
        }

        return {
            id: this.makeURLfromID(result.employee.id),
            person: result.employee.person,
            organization: result.employee.organization,
        }
    }

    public async deleteEmployee(id: string) {
        const result = await this.sdk.deleteEmployee({ input: { id: this.stripURLfromID(id) } })

        return !!result
    }
}
