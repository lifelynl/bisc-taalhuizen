import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Person } from '../person/person.entity'
import { Student } from '../student/student.entity'
import { StudentModule } from '../student/student.module'
import { EemlandImportService } from './eemland-import.service'

@Module({
    providers: [EemlandImportService],
    imports: [
        MikroOrmModule.forFeature({
            entities: [Person, Student],
        }),
        StudentModule,
    ],
    exports: [EemlandImportService],
})
export class EemlandImportModule {}
