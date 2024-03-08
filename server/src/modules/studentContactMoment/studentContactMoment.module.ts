import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Employee } from '../employee/employee.entity'
import { Student } from '../student/student.entity'
import { StudentContactMoment } from './studentContactMoment.entity'
import { StudentContactMomentResolver } from './studentContactMoment.resolver'
import { StudentContactMomentService } from './studentContactMoment.service'

@Module({
    providers: [StudentContactMomentResolver, StudentContactMomentService],
    imports: [
        MikroOrmModule.forFeature({
            entities: [Student, Employee, StudentContactMoment],
        }),
    ],
})
export class StudentContactMomentModule {}
