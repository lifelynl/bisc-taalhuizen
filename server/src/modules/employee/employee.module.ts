import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Address } from '../address/address.entity'
import { AddressModule } from '../address/address.module'
import { Organization } from '../organization/organization.entity'
import { Person } from '../person/person.entity'
import { PersonModule } from '../person/person.module'
import { Student } from '../student/student.entity'
import { Team } from '../team/team.entity'
import { User } from '../user/user.entity'
import { Employee } from './employee.entity'
import { EmployeeResolver } from './employee.resolver'
import { EmployeeService } from './employee.service'

@Module({
    imports: [
        MikroOrmModule.forFeature({ entities: [Employee, Organization, User, Person, Address, Student, Team] }),
        AddressModule,
        PersonModule,
    ],
    providers: [EmployeeService, EmployeeResolver],
    exports: [EmployeeService],
})
export class EmployeeModule {}
