import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { PersonResolver } from './PersonResolver'

@Module({
    providers: [PersonResolver],
    exports: [],
    imports: [CommonGroundAPIModule],
})
export class PersonModule {}
