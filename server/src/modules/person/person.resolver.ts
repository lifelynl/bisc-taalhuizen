import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AddressRepository } from '../address/address.repository'
import { EducationRepository } from '../education/education.repository'
import { EmployeeRepository } from '../employee/employee.repository'
import { StudentRepository } from '../student/student.repository'
import { UserRepository } from '../user/user.repository'
import { PersonType } from './person.type'
import { PersonRepository } from './person.repository'

@Resolver(PersonType)
export class PersonResolver {
    public constructor(
        private readonly addressRepository: AddressRepository,
        private readonly studentRepository: StudentRepository,
        private readonly employeeRepository: EmployeeRepository,
        private readonly userRepository: UserRepository,
        private readonly educationRepository: EducationRepository,
        private readonly personRepository: PersonRepository
    ) {}

    @Query(() => Boolean)
    public async doesPersonEmailExist(@Args('email') email: string) {
        return this.personRepository.checkIfEmailExists(email.trim())
    }

    @ResolveField()
    public async address(@Parent() person: PersonType) {
        return this.addressRepository.findOne({ person: person.id })
    }

    @ResolveField()
    public async student(@Parent() person: PersonType) {
        return this.studentRepository.getForPerson(person.id)
    }

    @ResolveField()
    public async employees(@Parent() person: PersonType) {
        return this.employeeRepository.getAllForPerson(person.id)
    }

    @ResolveField()
    public user(@Parent() person: PersonType) {
        return this.userRepository.findOne({ person: person.id })
    }

    @ResolveField()
    public async educations(@Parent() person: PersonType) {
        return this.educationRepository.find({ person: person.id })
    }
}
