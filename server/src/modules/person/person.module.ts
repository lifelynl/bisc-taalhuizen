import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Address } from '../address/address.entity'
import { AddressModule } from '../address/address.module'
import { Education } from '../education/education.entity'
import { EducationModule } from '../education/education.module'
import { Employee } from '../employee/employee.entity'
import { Student } from '../student/student.entity'
import { User } from '../user/user.entity'
import { Person } from './person.entity'
import { PersonResolver } from './person.resolver'
import { PersonService } from './person.service'

@Module({
    imports: [
        MikroOrmModule.forFeature({ entities: [Person, Address, Student, Employee, User, Education] }),
        AddressModule,
        EducationModule,
    ],
    providers: [PersonService, PersonResolver],
    exports: [PersonService],
})
export class PersonModule {}
