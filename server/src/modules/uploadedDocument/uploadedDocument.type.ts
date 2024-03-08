import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBase64, IsOptional, IsUUID } from 'class-validator'
import { BaseEntityObjectType } from 'src/utils/graphql/BaseEntityObjectType'
import { SortInput } from 'src/utils/graphql/SortingInputField'
import { PersonType } from '../person/person.type'
import { UserType } from '../user/user.type'
import paginationType from '../utils/pagination.type'

@ObjectType()
class UploadedFileType {
    @Field(() => String)
    public name: string

    @Field(() => String)
    public extension: string

    @Field(() => String)
    public mimeType: string

    @Field(() => String)
    public size: number

    @Field(() => String)
    public base64: string
}

@InputType()
class UploadedFileInputType {
    @Field(() => String)
    public filename: string

    @Field(() => String)
    @IsBase64()
    public base64: string
}

@ObjectType()
export class UploadedDocumentType extends BaseEntityObjectType {
    @Field()
    public file: UploadedFileType

    @Field(() => PersonType)
    public person: PersonType

    @Field(() => UserType)
    public createdByUser: UserType
}

@ObjectType()
export class PaginatedUploadedDocumentType extends paginationType(UploadedDocumentType) {}

@InputType()
export class UploadedDocumentInputType {
    @Field()
    @IsUUID()
    public person: string

    @Field(() => UploadedFileInputType)
    public file: UploadedFileInputType
}

@ArgsType()
export class GetUploadedDocumentsArgs {
    @Field()
    @IsUUID()
    public person: string
}

@ArgsType()
export class GetUploadedDocumentArgs {
    @Field()
    @IsUUID()
    public document: string
}

@InputType()
export class CreateUploadedDocumentInputType extends UploadedDocumentInputType {}

@InputType()
export class DeleteUploadedDocumentInputType {
    @Field()
    @IsUUID()
    public document: string
}

@InputType()
export class UploadedDocumentSortInputType {
    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public createdAt?: SortInput

    @Field(() => SortInput, { nullable: true })
    @IsOptional()
    public fileName?: SortInput
}
