import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Global, Module } from '@nestjs/common'
import { EducationGroup } from '../educationGroup/educationGroup.entity'
import { Employee } from '../employee/employee.entity'
import { EmployeeModule } from '../employee/employee.module'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { Organization } from '../organization/organization.entity'
import { OrganizationModule } from '../organization/organization.module'
import { Participation } from '../participation/participation.entity'
import { ParticipationModule } from '../participation/participation.module'
import { Person } from '../person/person.entity'
import { Student } from '../student/student.entity'
import { StudentModule } from '../student/student.module'
import { StudentContactMoment } from '../studentContactMoment/studentContactMoment.entity'
import { Team } from '../team/team.entity'
import { UploadedDocument } from '../uploadedDocument/uploadedDocument.entity'
import { HashingService } from './hashing.service'
import { MailService } from './mail.service'
import { AddressPolicy } from './policy/address.policy'
import { EducationGroupPolicy } from './policy/educationGroup.policy'
import { EmployeePolicy } from './policy/employee.policy'
import { LearningneedPolicy } from './policy/learningneed.policy'
import { ExportPolicy } from './policy/export.policy'
import { OrganizationPolicy } from './policy/organization.policy'
import { ParticipationPolicy } from './policy/participation.policy'
import { PostalCodeAreaPolicy } from './policy/postalCodeArea.policy'
import { StudentPolicy } from './policy/student.policy'
import { StudentContactMomentPolicy } from './policy/studentContactMoment.policy'
import { TeamPolicy } from './policy/team.policy'
import { TestResultPolicy } from './policy/testResult.policy'
import { UploadedDocumentPolicy } from './policy/uploadedDocument.policy'
import { StorageService } from './storage.service'
import { TestResult } from '../testResult/testResult.entity'

@Global()
@Module({
    imports: [
        EmployeeModule,
        OrganizationModule,
        StudentModule,
        ParticipationModule,
        MikroOrmModule.forFeature({
            entities: [
                Employee,
                Organization,
                Student,
                UploadedDocument,
                Person,
                StudentContactMoment,
                Participation,
                LearningNeed,
                Team,
                EducationGroup,
                TestResult,
            ],
        }),
    ],
    providers: [
        StorageService,
        MailService,
        HashingService,
        EmployeePolicy,
        OrganizationPolicy,
        AddressPolicy,
        StudentPolicy,
        PostalCodeAreaPolicy,
        UploadedDocumentPolicy,
        StudentContactMomentPolicy,
        ParticipationPolicy,
        TestResultPolicy,
        TeamPolicy,
        EducationGroupPolicy,
        LearningneedPolicy,
        ExportPolicy,
    ],
    exports: [
        StorageService,
        MailService,
        HashingService,
        EmployeePolicy,
        OrganizationPolicy,
        AddressPolicy,
        StudentPolicy,
        PostalCodeAreaPolicy,
        UploadedDocumentPolicy,
        StudentContactMomentPolicy,
        ParticipationPolicy,
        TeamPolicy,
        TestResultPolicy,
        EducationGroupPolicy,
        LearningneedPolicy,
        ExportPolicy,
    ],
})
export class UtilsModule {}
