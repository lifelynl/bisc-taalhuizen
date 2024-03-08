import { Injectable } from '@nestjs/common'
import { PersonRepository } from '../person/person.repository'
import { User } from '../user/user.entity'
import { UploadedDocument } from './uploadedDocument.entity'
import { UploadedDocumentRepository } from './uploadedDocument.repository'
import {
    CreateUploadedDocumentInputType,
    GetUploadedDocumentsArgs,
    UploadedDocumentSortInputType,
} from './uploadedDocument.type'
import { StorageService } from '../utils/storage.service'
import { PaginatedInputType } from '../utils/pagination.type'
import { UploadedDocumentPolicy } from '../utils/policy/uploadedDocument.policy'
import { PolicyAction } from '../utils/policy/policy'
import { QBQueryOrderMap } from '@mikro-orm/core'
import { set } from 'lodash'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class UploadedDocumentService {
    public constructor(
        private readonly documentRepository: UploadedDocumentRepository,
        private readonly personRepository: PersonRepository,
        private readonly storageService: StorageService,
        private readonly uploadedDocumentPolicy: UploadedDocumentPolicy,
        private readonly uploadedDocumentRepository: UploadedDocumentRepository
    ) {}

    public async getUploadedDocuments(
        user: UserWithCurrentEmployee,
        { skip, take }: PaginatedInputType,
        args: GetUploadedDocumentsArgs,
        sort?: UploadedDocumentSortInputType
    ) {
        await this.uploadedDocumentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, { personId: args.person })

        const qb = this.uploadedDocumentRepository.qb()

        qb.where({ person: args.person })

        if (sort) {
            const { createdAt, fileName } = sort
            const orderBy: QBQueryOrderMap<UploadedDocument> = {}

            if (createdAt) {
                set(orderBy, 'createdAt', createdAt)
            }

            if (fileName) {
                set(orderBy, 'name', fileName)
            }

            qb.orderBy(orderBy)
        }

        return this.uploadedDocumentRepository.queryPaginated(qb, take, skip)
    }

    public async createDocument(contextUser: User, input: CreateUploadedDocumentInputType) {
        const newDoc = new UploadedDocument()
        newDoc.person = await this.personRepository.findOneOrFail(input.person)
        newDoc.createdByUser = contextUser
        newDoc.name = input.file.filename

        const filename = `${new Date().getTime()}-${input.file.filename}`
        const contentsAsBin = Buffer.from(input.file.base64, 'base64')

        const { fromBuffer: fileTypeFromBuffer } = await import('file-type')
        const fileType = await fileTypeFromBuffer(contentsAsBin)

        if (!fileType) {
            throw new DomainError('Could not determine filetype')
        }

        newDoc.size = contentsAsBin.length
        newDoc.extension = fileType.ext
        newDoc.mimeType = fileType.mime

        await this.writeFileToStorage(filename, contentsAsBin)
        newDoc.path = filename

        await this.documentRepository.persistAndFlush(newDoc)
        return newDoc
    }

    public async deleteDocument(uploadedDocumentId: string) {
        const doc = await this.documentRepository.findOneOrFail(uploadedDocumentId)
        const filePath = doc.path
        await this.documentRepository.removeAndFlush(doc)
        await this.deleteFile(filePath)
        return true
    }

    private async writeFileToStorage(filename: string, content: Buffer) {
        const storage = this.storageService.getDisk()
        await storage.put(filename, content)
    }

    public async getFileContents(filePath: string) {
        const storage = this.storageService.getDisk()
        const buffer = await storage.getBuffer(filePath)
        return buffer.content.toString('base64')
    }

    public async deleteFile(filePath: string) {
        const storage = this.storageService.getDisk()
        return !!(await storage.delete(filePath)).wasDeleted
    }
}
