import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { Registration } from '../registration/registration.entity'
import { RegistrationModule } from '../registration/registration.module'
import { Organization } from '../organization/organization.entity'
import { Person } from '../person/person.entity'
import { PersonModule } from '../person/person.module'
import { Student } from './student.entity'
import { StudentResolver } from './student.resolver'
import { StudentService } from './student.service'
import { StudentPolicy } from '../utils/policy/student.policy'
import { Employee } from '../employee/employee.entity'
import { CivicIntegration } from '../civicIntegration/civicIntegration.entity'
import { CivicIntegrationModule } from '../civicIntegration/civicIntegration.module'
import { LearningNeedModule } from '../learningneed/learningneed.module'
import { Team } from '../team/team.entity'

@Module({
    imports: [
        MikroOrmModule.forFeature({
            entities: [Student, Person, Organization, Registration, Employee, CivicIntegration, LearningNeed, Team],
        }),
        PersonModule,
        RegistrationModule,
        LearningNeedModule,
        CivicIntegrationModule,
    ],
    providers: [StudentService, StudentResolver, StudentPolicy],
    exports: [StudentService],
})
export class StudentModule {}
