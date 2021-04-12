import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { JustGraphqlTypesResolver } from './JustGraphqlTypesResolver'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [JustGraphqlTypesResolver],
})
export class JustGraphqlTypesModule {}
