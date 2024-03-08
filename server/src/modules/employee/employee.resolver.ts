import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import { PolicyAction } from '../utils/policy/policy'
import { EmployeePolicy } from '../utils/policy/employee.policy'
import { EmployeeRepository } from './employee.repository'
import {
    CreateEmployeeInputType,
    EditEmployeeInputType,
    EmployeeType,
    GetOrganizationsArgs,
    OrganizationEmployeesSortInputType,
    PaginatedEmployeeResponse,
} from './employee.type'
import { EmployeeService } from './employee.service'
import { OrganizationRepository } from '../organization/organization.repository'
import { PersonRepository } from '../person/person.repository'
import { PaginatedInputType } from '../utils/pagination.type'
import { StudentRepository } from '../student/student.repository'
import { TeamRepository } from '../team/team.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(EmployeeType)
export class EmployeeResolver {
    public constructor(
        private readonly employeeRepository: EmployeeRepository,
        private readonly employeePolicy: EmployeePolicy,
        private readonly employeeService: EmployeeService,
        private readonly organizationRepository: OrganizationRepository,
        private readonly personRepository: PersonRepository,
        private readonly studentRepository: StudentRepository,
        private readonly teamRepository: TeamRepository
    ) {}

    @Query(() => EmployeeType)
    public async employee(@CurrentUser() user: UserWithCurrentEmployee, @Args('id') id: string) {
        await this.employeePolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { employeeId: id })

        return this.employeeRepository.findOneOrFail({ id })
    }

    @Query(() => PaginatedEmployeeResponse)
    public async organizationEmployees(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args() args: GetOrganizationsArgs,
        @Args('sort', { nullable: true }) sort?: OrganizationEmployeesSortInputType
    ) {
        return this.employeeService.getOrganizationEmployees(user, paginationArgs, args, sort)
    }

    @Mutation(() => EmployeeType)
    public async createEmployee(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInputType
    ) {
        const args = { organizationId: createEmployeeInput.organization }
        await this.employeePolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, args)

        return this.employeeService.createEmployee(createEmployeeInput)
    }

    @Mutation(() => EmployeeType)
    public async editEmployee(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('editEmployeeInput') args: EditEmployeeInputType
    ) {
        await this.employeePolicy.throwIfNotSatisfiedBy(user, PolicyAction.update, {
            employeeId: args.id,
        })

        await this.employeeService.editEmployee(user, args)

        return this.employeeRepository.findOneOrFail(args.id)
    }

    @Mutation(() => Boolean)
    public async deleteEmployee(@CurrentUser() user: UserWithCurrentEmployee, @Args('id') id: string) {
        await this.employeePolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, {
            employeeId: id,
        })

        return this.employeeService.deleteEmployee(id)
    }

    @ResolveField()
    public async organization(@Parent() employee: EmployeeType) {
        return this.organizationRepository.getForEmployee(employee.id)
    }

    @ResolveField()
    public async person(@Parent() employee: EmployeeType) {
        return this.personRepository.findOneOrFail({ employees: employee.id })
    }

    @ResolveField()
    public async mentees(@Parent() employee: EmployeeType) {
        return this.studentRepository.find({ mentor: employee.id })
    }

    @ResolveField()
    public async teams(@Parent() employee: EmployeeType) {
        return this.teamRepository.find({ members: employee.id })
    }
}
