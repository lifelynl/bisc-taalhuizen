import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { UploadedDocument } from './uploadedDocument.entity'

export class UploadedDocumentRepository extends CustomBaseRepository<UploadedDocument> {
    protected readonly entityName = 'UploadedDocument'
}
