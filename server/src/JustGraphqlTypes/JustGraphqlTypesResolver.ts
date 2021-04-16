import { Args, Field, InputType, Int, Mutation, ObjectType, Query, registerEnumType, Resolver } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { AanbiederEmployeeType } from 'src/Aanbieder/types/CreateAanbiederEmployeeInputType'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedTopicEnum,
} from 'src/LearningNeed/services/LearningNeedService'
import {
    ParticipationPresenceEndParticipationReasonEnum,
    UpdateParticipationInputType,
} from 'src/LearningNeed/types/CreateParticipationInputType'
import { ParticipationType } from 'src/LearningNeed/types/ParticipationType'
import { StudentType } from 'src/Student/types/StudentType'

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
class DownloadParticipantsReportInputType {
    @Field()
    public taalhuisId!: string

    @Field({ nullable: true })
    public dateFrom?: string

    @Field({ nullable: true })
    public dateUntil?: string
}

@InputType()
class DownloadDesiredLearningOutcomesReportInputType {
    @Field()
    public taalhuisId!: string

    @Field({ nullable: true })
    public dateFrom?: string

    @Field({ nullable: true })
    public dateUntil?: string
}

@InputType()
class DownloadVolunteersReportInputType {
    @Field()
    public aanbiederId!: string

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
    public event!: StudentDossierEventEnum

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
    public event!: StudentDossierEventEnum

    @Field()
    public eventDate!: string

    @Field()
    public eventDescription!: string

    @Field(() => AanbiederEmployeeType)
    public createdByAanbiederEmployee!: AanbiederEmployeeType
}

@InputType()
class CreateTestResultInputType {
    @Field()
    public participationId!: string
    // public learningNeedId!: string

    @Field()
    public outComesGoal!: string

    @Field(() => LearningNeedTopicEnum)
    public outComesTopic?: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public outComesApplication!: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public outComesLevel!: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field()
    public examUsedExam!: string

    @Field()
    public examDate!: string

    @Field({ nullable: true })
    public examMemo!: string
}

@InputType()
class UpdateTestResultInputType {
    @Field()
    public testResultId!: string

    @Field()
    public outComesGoal!: string

    @Field(() => LearningNeedTopicEnum)
    public outComesTopic?: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public outComesApplication!: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public outComesLevel!: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field()
    public examUsedExam!: string

    @Field()
    public examDate!: string

    @Field({ nullable: true })
    public examMemo!: string
}

@ObjectType()
class TestResultType {
    @Field()
    public id!: string

    @Field(() => String, { nullable: true })
    public outComesGoal!: string | null

    @Field(() => LearningNeedTopicEnum)
    public outComesTopic!: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public outComesTopicOther!: string | null

    @Field(() => LearningNeedApplicationEnum)
    public outComesApplication!: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public outComesApplicationOther!: string | null

    @Field(() => LearningNeedLevelEnum)
    public outComesLevel!: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public outComesLevelOther!: string | null

    @Field()
    public examUsedExam!: string

    @Field()
    public examDate!: string

    @Field({ nullable: true })
    public examMemo!: string

    // TODO: Maybe enum?
    @Field({ nullable: true })
    public examResult!: string
}

enum GroupTypeCourseEnum {
    LANGUAGE = 'LANGUAGE', // Taal
    MATH = 'MATH', // Rekenen
    DIGITAL = 'DIGITAL', // Digitale vaardigheden
    OTHER = 'OTHER', // Overige
}

registerEnumType(GroupTypeCourseEnum, { name: 'GroupTypeCourseEnum' })

@InputType()
class CreateGroupAvailabilityDayInputType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@InputType()
class CreateGroupAvailabilityInputType {
    @Field()
    public monday?: CreateGroupAvailabilityDayInputType

    @Field()
    public tuesday?: CreateGroupAvailabilityDayInputType

    @Field()
    public wednesday?: CreateGroupAvailabilityDayInputType

    @Field()
    public thursday?: CreateGroupAvailabilityDayInputType

    @Field()
    public friday?: CreateGroupAvailabilityDayInputType

    @Field()
    public saturday?: CreateGroupAvailabilityDayInputType

    @Field()
    public sunday?: CreateGroupAvailabilityDayInputType
}

@InputType()
class CreateGroupInputType {
    @Field()
    public aanbiederId!: string

    @Field()
    public name!: string

    @Field(() => GroupTypeCourseEnum)
    public typeCourse!: GroupTypeCourseEnum

    @Field(() => String)
    public outComesGoal?: string

    @Field(() => LearningNeedTopicEnum)
    public outComesTopic?: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public outComesApplication?: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public outComesLevel?: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field()
    public detailsIsFormal!: boolean

    @Field(() => Int)
    public detailsTotalClassHours!: number

    @Field()
    public detailsCertificateWillBeAwarded!: boolean

    @Field(() => String, { nullable: true })
    public detailsStartDate?: string | null

    @Field(() => String, { nullable: true })
    public detailsEndDate?: string | null

    @Field({ nullable: true })
    public availability?: CreateGroupAvailabilityInputType

    @Field({ nullable: true })
    public availabilityNotes?: string

    @Field()
    public generalLocation?: string

    @Field(() => Int, { nullable: true })
    public generalParticipantsMin?: number

    @Field(() => Int, { nullable: true })
    public generalParticipantsMax?: number

    @Field({ nullable: true })
    public generalEvaluation?: string

    @Field(() => [String], { nullable: true })
    public aanbiederEmployeeIds?: string[]
}

@InputType()
class UpdateGroupInputType {
    @Field()
    public groupId!: string

    @Field()
    public name!: string

    @Field(() => GroupTypeCourseEnum)
    public typeCourse!: GroupTypeCourseEnum

    @Field(() => String)
    public outComesGoal?: string

    @Field(() => LearningNeedTopicEnum)
    public outComesTopic?: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public outComesApplication?: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public outComesLevel?: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field()
    public detailsIsFormal!: boolean

    @Field(() => Int)
    public detailsTotalClassHours!: number

    @Field()
    public detailsCertificateWillBeAwarded!: boolean

    @Field(() => String, { nullable: true })
    public detailsStartDate?: string | null

    @Field(() => String, { nullable: true })
    public detailsEndDate?: string | null

    @Field({ nullable: true })
    public availability?: CreateGroupAvailabilityInputType

    @Field({ nullable: true })
    public availabilityNotes?: string

    @Field()
    public generalLocation?: string

    @Field(() => Int, { nullable: true })
    public generalParticipantsMin?: number

    @Field(() => Int, { nullable: true })
    public generalParticipantsMax?: number

    @Field({ nullable: true })
    public generalEvaluation?: string

    @Field(() => [String], { nullable: true })
    public aanbiederEmployeeIds?: string[]
}

@ObjectType()
class GroupAvailabilityDayType {
    @Field()
    public morning?: boolean

    @Field()
    public afternoon?: boolean

    @Field()
    public evening?: boolean
}

@ObjectType()
class GroupAvailabilityDaysType {
    @Field()
    public monday?: GroupAvailabilityDayType

    @Field()
    public tuesday?: GroupAvailabilityDayType

    @Field()
    public wednesday?: GroupAvailabilityDayType

    @Field()
    public thursday?: GroupAvailabilityDayType

    @Field()
    public friday?: GroupAvailabilityDayType

    @Field()
    public saturday?: GroupAvailabilityDayType

    @Field()
    public sunday?: GroupAvailabilityDayType
}

@ObjectType()
class GroupType {
    @Field()
    public id!: string

    @Field()
    public name!: string

    @Field()
    public aanbiederName!: string

    @Field(() => GroupTypeCourseEnum)
    public typeCourse!: GroupTypeCourseEnum

    @Field(() => String)
    public outComesGoal?: string

    @Field(() => LearningNeedTopicEnum)
    public outComesTopic?: LearningNeedTopicEnum

    @Field(() => String, { nullable: true })
    public outComesTopicOther?: string | null

    @Field(() => LearningNeedApplicationEnum)
    public outComesApplication?: LearningNeedApplicationEnum

    @Field(() => String, { nullable: true })
    public outComesApplicationOther?: string | null

    @Field(() => LearningNeedLevelEnum)
    public outComesLevel?: LearningNeedLevelEnum

    @Field(() => String, { nullable: true })
    public outComesLevelOther?: string | null

    @Field()
    public detailsIsFormal!: boolean

    @Field(() => Int)
    public detailsTotalClassHours!: number

    @Field()
    public detailsCertificateWillBeAwarded!: boolean

    @Field(() => String, { nullable: true })
    public detailsStartDate?: string | null

    @Field(() => String, { nullable: true })
    public detailsEndDate?: string | null

    @Field(() => GroupAvailabilityDaysType, { nullable: true })
    public availability?: GroupAvailabilityDaysType

    @Field({ nullable: true })
    public availabilityNotes?: string

    @Field()
    public generalLocation?: string

    @Field(() => Int, { nullable: true })
    public generalParticipantsMin?: number

    @Field(() => Int, { nullable: true })
    public generalParticipantsMax?: number

    @Field({ nullable: true })
    public generalEvaluation?: string

    @Field(() => [AanbiederEmployeeType], { nullable: true })
    public aanbiederEmployees?: AanbiederEmployeeType[]
}

@InputType()
class AddOrRemoveMentorToParticipationInputType {
    @Field()
    public participationId!: string

    @Field()
    public aanbiederEmployeeId!: string
}

@InputType()
class AddOrRemoveParticipationToGroupInputType {
    @Field()
    public participationId!: string

    @Field()
    public groupId!: string
}

// @ObjectType()
// class GroupParticipationType {
//     @Field()
//     public id!: string

//     @Field()
//     public groupId!: string

//     @Field()
//     public participationId!: string

//     @Field()
//     public engagements!: string

//     @Field()
//     public startDate!: string

//     @Field()
//     public endDate!: string
// }

@InputType()
class UpdateGroupParticipationInputType {
    @Field()
    public participationId!: string

    @Field({ nullable: true })
    public presenceEngagements!: string

    @Field(() => Date, { nullable: true })
    public presenceStartDate?: Date

    @Field(() => Date, { nullable: true })
    public presenceEndDate?: Date

    @Field(() => ParticipationPresenceEndParticipationReasonEnum, { nullable: true })
    public presenceEndParticipationReason?: ParticipationPresenceEndParticipationReasonEnum
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

    // BiSC/Taalhuis: Participants report (per taalhuis)
    @Mutation(() => DownloadReportType)
    public async downloadParticipantsReport(@Args('input') input: DownloadParticipantsReportInputType) {
        return undefined
    }

    // BiSC: Desired Learning Outcomes report (per taalhuis)
    @Mutation(() => DownloadReportType)
    public async downloadDesiredLearningOutcomesReport(
        @Args('input') input: DownloadDesiredLearningOutcomesReportInputType
    ) {
        return undefined
    }

    // BiSC: Volunteers per aanbieder report
    @Mutation(() => DownloadReportType)
    public async downloadVolunteersReport(@Args('input') input: DownloadVolunteersReportInputType) {
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

    // Student Participation
    @Mutation(() => Boolean)
    public async deleteParticipation(@Args('participationId') participationId: string) {
        return undefined
    }

    @Mutation(() => ParticipationType)
    public async updateParticipation(@Args('input') input: UpdateParticipationInputType) {
        return undefined
    }

    @Query(() => [ParticipationType])
    public async participations(@Args('learningNeedId') learningNeedId: string) {
        return undefined
    }

    @Query(() => ParticipationType)
    public async participation(@Args('participationId') participationId: string) {
        return undefined
    }

    // Test result
    @Mutation(() => TestResultType)
    public async createTestResult(@Args('input') input: CreateTestResultInputType) {
        return undefined
    }

    @Mutation(() => TestResultType)
    public async updateTestResult(@Args('input') input: UpdateTestResultInputType) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async deleteTestResult(@Args('testResultId') testResultId: string) {
        return undefined
    }

    @Query(() => [TestResultType])
    public async testResults(@Args('participationId') participationId: string) {
        // public async testResults(@Args('learningNeedId') learningNeedId: string) {
        return undefined
    }

    @Query(() => TestResultType)
    public async testResult(@Args('testResultId') testResultId: string) {
        return undefined
    }

    // AanbiederEmployee mentees
    @Query(() => [StudentType])
    public async aanbiederEmployeeMentees(@Args('anbiederEmployeeId') anbiederEmployeeId: string) {
        return undefined
    }

    // Group
    @Mutation(() => GroupType)
    public async createGroup(@Args('input') input: CreateGroupInputType) {
        return undefined
    }

    @Mutation(() => GroupType)
    public async updateGroup(@Args('input') input: UpdateGroupInputType) {
        return undefined
    }

    @Query(() => GroupType)
    public async group(@Args('groupId') groupId: string) {
        return undefined
    }

    @Query(() => [GroupType])
    public async activeGroups(@Args('aanbiederId') aanbiederId: string) {
        return undefined
    }

    @Query(() => [GroupType])
    public async completedGroups(@Args('aanbiederId') aanbiederId: string) {
        return undefined
    }

    @Query(() => [GroupType])
    public async futureGroups(@Args('aanbiederId') aanbiederId: string) {
        return undefined
    }

    @Query(() => [StudentType])
    public async groupStudents(@Args('groupId') groupId: string) {
        return undefined
    }

    // Aanbieder -> Student
    @Query(() => [StudentType])
    public async newReferredStudents(@Args('aanbiederId') aanbiederId: string) {
        return undefined
    }

    @Query(() => [StudentType])
    public async activeStudents(@Args('aanbiederId') aanbiederId: string) {
        return undefined
    }

    @Query(() => [StudentType])
    public async completedStudents(@Args('aanbiederId') aanbiederId: string) {
        return undefined
    }

    // Aanbieder -> Add mentor to Participation
    @Mutation(() => AanbiederEmployeeType)
    public async addMentorToParticipation(@Args('input') input: AddOrRemoveMentorToParticipationInputType) {
        return undefined
    }

    @Mutation(() => Boolean)
    public async removeMentorFromParticipation(@Args('input') input: AddOrRemoveMentorToParticipationInputType) {
        return true
    }

    // Group -> Participation
    @Mutation(() => ParticipationType)
    public async addParticipationToGroup(@Args('input') input: AddOrRemoveParticipationToGroupInputType) {
        return true
    }

    @Mutation(() => ParticipationType)
    public async updateGroupParticipation(@Args('input') input: UpdateGroupParticipationInputType) {
        return true
    }

    @Mutation(() => Boolean)
    public async removeParticipationFromGroup(@Args('input') input: AddOrRemoveParticipationToGroupInputType) {
        return true
    }
}
