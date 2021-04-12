import { Args, Field, InputType, Mutation, ObjectType, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

@InputType()
class CreateBiscEmployeeInputType {
    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field({ nullable: true })
    public telephone?: string
}

@InputType()
class UpdateBiscEmployeeInputType {
    @Field()
    public biscEmployeeId!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    @IsEmail()
    public email!: string

    @Field({ nullable: true })
    public telephone?: string
}

@ObjectType()
export class BiscEmployeeType {
    @Field()
    public id!: string

    @Field()
    public givenName!: string

    @Field({ nullable: true })
    public additionalName?: string

    @Field()
    public familyName!: string

    @Field()
    public email!: string

    @Field({ nullable: true })
    public telephone?: string

    @Field()
    public dateCreated?: string

    @Field()
    public dateModified?: string
}

@ObjectType()
class DownloadReportType {
    @Field()
    public filename!: string

    @Field()
    public base64data!: string
}

@InputType()
class DownloadParticipantReportInputType {
    @Field()
    public taalhuisId!: string

    @Field({ nullable: true })
    public dateFrom?: string

    @Field({ nullable: true })
    public dateUntil?: string
}

@InputType()
class CreateAanbiederEmployeeDocumentInputType {
    @Field()
    public aanbiederEmployeeId!: string

    @Field()
    public filename!: string

    @Field()
    public base64data!: string
}

@ObjectType()
class AanbiederEmployeeDocumentType {
    @Field()
    public id!: string

    @Field()
    public filename!: string

    @Field()
    public dateCreated?: string
}

@ObjectType()
class AanbiederEmployeeDocumentDownloadType {
    @Field()
    public base64data!: string
}

@ObjectType()
class StudentDocumentType extends AanbiederEmployeeDocumentType {}

@ObjectType()
class StudentDocumentDownloadType extends AanbiederEmployeeDocumentDownloadType {}

@InputType()
class CreateStudentDocumentInputType {
    @Field()
    public studentId!: string

    @Field()
    public filename!: string

    @Field()
    public base64data!: string
}

enum StudentDossierEventEnum {
    FINAL_TALK = 'FINAL_TALK', // Eindgesprek
    REMARK = 'REMARK', // Opmerking
    FOLLOW_UP_TALK = 'FOLLOW_UP_TALK', // Vervolg gesprek
    INFO_FOR_STORYTELLING = 'INFO_FOR_STORYTELLING', // Informatie voor storytelling
    INTAKE = 'INTAKE', // Intake
}

registerEnumType(StudentDossierEventEnum, { name: 'StudentDossierEventEnum' })

@InputType()
class CreateStudentDossierEventInputType {
    @Field()
    public studentId!: string

    @Field(() => StudentDossierEventEnum)
    public event!: StudentDossierEventEnum

    @Field()
    public eventDate!: string

    @Field()
    public eventDescription!: string
}

@InputType()
class UpdateStudentDossierEventInputType {
    @Field()
    public studentDossierEventId!: string

    @Field(() => StudentDossierEventEnum)
    public event!: string

    @Field()
    public eventDate!: string

    @Field()
    public eventDescription!: string
}

@ObjectType()
class StudentDossierEventType {
    @Field()
    public id!: string

    @Field(() => StudentDossierEventEnum)
    public event!: string

    @Field()
    public eventDate!: string

    @Field()
    public eventDescription!: string
}

@Resolver()
export class JustGraphqlTypesResolver {
    // BiscEmployee
    @Mutation(() => BiscEmployeeType)
    public async createBiscEmployee(@Args('input') input: CreateBiscEmployeeInputType) {
        return undefined
    }

    @Mutation(() => BiscEmployeeType)
    public async updateBiscEmployee(@Args('input') input: UpdateBiscEmployeeInputType) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteBiscEmployee(@Args('biscEmployeeId') biscEmployeeId: string): Promise<boolean> {
        return true
    }

    @Query(() => BiscEmployeeType)
    public async biscEmployee(@Args('biscEmployeeId') biscEmployeeId: string) {
        return undefined
    }

    @Query(() => [BiscEmployeeType])
    public async biscEmployees() {
        return undefined
    }

    // Participants report
    @Mutation(() => DownloadReportType)
    public async downloadParticipantsReport(@Args('input') input: DownloadParticipantReportInputType) {
        return undefined
    }

    // AanbiederEmployee documents
    @Mutation(() => AanbiederEmployeeDocumentType)
    public async createAanbiederEmployeeDocument(@Args('input') input: CreateAanbiederEmployeeDocumentInputType) {
        return undefined
    }

    @Mutation(() => AanbiederEmployeeDocumentDownloadType)
    public async downloadAanbiederEmployeeDocument(
        @Args('aanbiederEmployeeDocumentId') aanbiederEmployeeDocumentId: string
    ) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteAanbiederEmployeeDocument(
        @Args('aanbiederEmployeeDocumentId') aanbiederEmployeeDocumentId: string
    ) {
        return undefined
    }

    @Query(() => AanbiederEmployeeDocumentType)
    public async aanbiederEmployeeDocument(@Args('aanbiederEmployeeDocumentId') aanbiederEmployeeDocumentId: string) {
        return undefined
    }

    @Query(() => [AanbiederEmployeeDocumentType])
    public async aanbiederEmployeeDocuments(@Args('aanbiederEmployeeId') aanbiederEmployeeId: string) {
        return undefined
    }

    // Student documents
    @Mutation(() => StudentDocumentType)
    public async createStudentDocument(@Args('input') input: CreateStudentDocumentInputType) {
        return undefined
    }

    @Mutation(() => StudentDocumentDownloadType)
    public async downloadStudentDocument(@Args('studentDocumentId') studentDocumentId: string) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteStudentDocument(@Args('studentDocumentId') studentDocumentId: string) {
        return undefined
    }

    @Query(() => StudentDocumentType)
    public async studentDocument(@Args('studentDocumentId') studentDocumentId: string) {
        return undefined
    }

    @Query(() => [StudentDocumentType])
    public async studentDocuments(@Args('studentId') studentId: string) {
        return undefined
    }

    // Student dossier event
    @Mutation(() => StudentDossierEventType)
    public async createStudentDossierEvent(@Args('input') input: CreateStudentDossierEventInputType) {
        return undefined
    }

    @Mutation(() => StudentDossierEventType)
    public async updateStudentDossierEvent(@Args('input') input: UpdateStudentDossierEventInputType) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteStudentDossierEvent(@Args('studentDossierEventId') studentDossierEventId: string) {
        return undefined
    }

    @Query(() => StudentDossierEventType)
    public async studentDossierEvent(@Args('studentDossierEventId') studentDossierEventId: string) {
        return undefined
    }

    @Query(() => [StudentDossierEventType])
    public async studentDossierEvents(@Args('studentId') studentId: string) {
        return undefined
    }
}
