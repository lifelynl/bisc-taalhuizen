import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/auth.decorator'
import {
    CreateUploadedDocumentInputType,
    DeleteUploadedDocumentInputType,
    UploadedDocumentType,
    GetUploadedDocumentArgs,
    GetUploadedDocumentsArgs,
    PaginatedUploadedDocumentType,
    UploadedDocumentSortInputType,
} from './uploadedDocument.type'
import { PaginatedInputType } from '../utils/pagination.type'
import { UploadedDocumentPolicy } from '../utils/policy/uploadedDocument.policy'
import { PolicyAction } from '../utils/policy/policy'
import { UploadedDocumentRepository } from './uploadedDocument.repository'
import { UploadedDocumentService } from './uploadedDocument.service'
import { UploadedDocument } from './uploadedDocument.entity'
import { PersonRepository } from '../person/person.repository'
import { UserRepository } from '../user/user.repository'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

@Resolver(UploadedDocumentType)
export class UploadedDocumentResolver {
    public constructor(
        private readonly uploadedDocumentService: UploadedDocumentService,
        private readonly uploadedDocumentPolicy: UploadedDocumentPolicy,
        private readonly uploadedDocumentRepository: UploadedDocumentRepository,
        private readonly personRepository: PersonRepository,
        private readonly userRepository: UserRepository
    ) {}
    @Query(() => PaginatedUploadedDocumentType)
    public async documents(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('paginationArgs') paginationArgs: PaginatedInputType,
        @Args() args: GetUploadedDocumentsArgs,
        @Args('sort', { nullable: true }) sort?: UploadedDocumentSortInputType
    ) {
        return this.uploadedDocumentService.getUploadedDocuments(user, paginationArgs, args, sort)
    }

    @Query(() => UploadedDocumentType)
    public async document(@CurrentUser() user: UserWithCurrentEmployee, @Args() args: GetUploadedDocumentArgs) {
        await this.uploadedDocumentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.read, {
            uploadedDocumentId: args.document,
        })

        return this.uploadedDocumentRepository.findOneOrFail(args.document)
    }

    @Mutation(() => UploadedDocumentType)
    public async createDocument(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: CreateUploadedDocumentInputType
    ) {
        await this.uploadedDocumentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.create, { personId: args.person })

        return this.uploadedDocumentService.createDocument(user, args)
    }

    @Mutation(() => Boolean)
    public async deleteDocument(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Args('input') args: DeleteUploadedDocumentInputType
    ) {
        await this.uploadedDocumentPolicy.throwIfNotSatisfiedBy(user, PolicyAction.delete, {
            uploadedDocumentId: args.document,
        })

        return this.uploadedDocumentService.deleteDocument(args.document)
    }

    @ResolveField()
    public async file(@Parent() document: UploadedDocument) {
        const base64 = await this.uploadedDocumentService.getFileContents(document.path)
        return {
            name: document.name,
            extension: document.extension,
            mimeType: document.mimeType,
            size: document.size,
            base64,
        }
    }

    @ResolveField()
    public person(@Parent() document: UploadedDocument) {
        return this.personRepository.getForDocument(document.id)
    }

    @ResolveField()
    public createdByUser(@Parent() document: UploadedDocument) {
        return this.userRepository.getForDocument(document.id)
    }
}
