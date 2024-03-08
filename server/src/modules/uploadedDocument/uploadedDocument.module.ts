import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Employee } from '../employee/employee.entity'
import { Person } from '../person/person.entity'
import { UploadedDocument } from './uploadedDocument.entity'
import { UploadedDocumentResolver } from './uploadedDocument.resolver'
import { UploadedDocumentService } from './uploadedDocument.service'
import { UtilsModule } from '../utils/utils.module'
import { User } from '../user/user.entity'

@Module({
    imports: [MikroOrmModule.forFeature({ entities: [UploadedDocument, Person, Employee, Person, User] }), UtilsModule],
    providers: [UploadedDocumentResolver, UploadedDocumentService],
    exports: [UploadedDocumentService],
})
export class UploadedDocumentModule {}
