import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Employee } from '../employee/employee.entity'
import { Organization } from '../organization/organization.entity'
import { PostalCodeArea } from '../postalCodeArea/postalCodeArea.entity'
import { Student } from '../student/student.entity'
import { Team } from './team.entity'
import { TeamResolver } from './team.resolver'
import { TeamService } from './team.service'

@Module({
    providers: [TeamResolver, TeamService],
    imports: [
        MikroOrmModule.forFeature({
            entities: [Organization, Team, Employee, PostalCodeArea, Student],
        }),
    ],
    exports: [TeamService],
})
export class TeamModule {}
