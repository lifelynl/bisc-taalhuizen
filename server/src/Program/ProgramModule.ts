import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { OldProgramRepository } from './OldProgramRepository'
import { ProgramResolver } from './ProgramResolver'

@Module({
    providers: [OldProgramRepository, ProgramResolver],
    exports: [OldProgramRepository],
    imports: [CommonGroundAPIModule],
})
export class ProgramModule {}
