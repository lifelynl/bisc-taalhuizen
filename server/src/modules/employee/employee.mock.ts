import { Employee, EmployeeRole } from './employee.entity'

export function getMockEmployee() {
    const employee = new Employee()
    employee.role = EmployeeRole.coordinator

    return employee
}
