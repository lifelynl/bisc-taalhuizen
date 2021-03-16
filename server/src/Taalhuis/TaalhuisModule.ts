import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { UserModule } from 'src/User/UserModule'
import { CreateTaalhuisEmployeeService } from './CreateTaalhuisEmployeeService'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { DeleteTaalhuisEmployeeService } from './DeleteTaalhuisEmployeeService'
import { DeleteTaalhuisService } from './DeleteTaalhuisService'
import { TaalhuisEmployeeResolver } from './TaalhuisEmployeeResolver'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'
import { TaalhuisResolver } from './TaalhuisResolver'
import { TaalhuisUserRoleResolver } from './TaalhuisUserRoleResolver'
import { UpdateTaalhuisEmployeeService } from './UpdateTaalhuisEmployeeService'
import { UpdateTaalhuisService } from './UpdateTaalhuisService'

@Module({
    imports: [CommonGroundAPIModule, UserModule],
    providers: [
        CreateTaalhuisService,
        TaalhuisResolver,
        UpdateTaalhuisService,
        TaalhuisUserRoleResolver,
        CreateTaalhuisEmployeeService,
        TaalhuisEmployeeResolver,
        DeleteTaalhuisService,
        TaalhuisEmployeeService,
        UpdateTaalhuisEmployeeService,
        DeleteTaalhuisEmployeeService,
    ],
    exports: [],
})
export class TaalhuisModule {}
