import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Address } from '../address/address.entity'
import { AddressModule } from '../address/address.module'
import { Employee } from '../employee/employee.entity'
import { Student } from '../student/student.entity'
import { PostalCodeArea } from '../postalCodeArea/postalCodeArea.entity'
import { Organization } from './organization.entity'
import { OrganizationResolver, PublicOrganizationResolver } from './organization.resolver'
import { OrganizationService } from './organization.service'
import { PostalCodeAreaModule } from '../postalCodeArea/postalCodeArea.module'
import { TeamModule } from '../team/team.module'

@Module({
    imports: [
        MikroOrmModule.forFeature({ entities: [Organization, Employee, Address, Student, PostalCodeArea] }),
        AddressModule,
        PostalCodeAreaModule,
        TeamModule,
    ],
    providers: [OrganizationService, OrganizationResolver, PublicOrganizationResolver],
    exports: [OrganizationService],
})
export class OrganizationModule {}
