import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { RegisterStudentService } from './services/RegisterStudentService'
import { RegistrationService } from './services/RegistrationService'
import { StudentResolver } from './StudentResolver'

@Module({
    providers: [StudentResolver, RegisterStudentService, RegistrationService],
    exports: [],
    imports: [CommonGroundAPIModule],
})
export class StudentModule {}
