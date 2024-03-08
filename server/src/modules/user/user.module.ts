import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { UtilsModule } from 'src/modules/utils/utils.module'
import { Employee } from '../employee/employee.entity'
import { Person } from '../person/person.entity'
import { User } from './user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [User, Person, Employee] }), UtilsModule],
    providers: [UserService, UserResolver],
    exports: [UserService],
})
export class UserModule {}
