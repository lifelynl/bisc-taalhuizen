import { gql } from '@apollo/client/core'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** The `Iterable` scalar type represents an array or a Traversable with any kind of data. */
    Iterable: any
}

export type Query = {
    __typename?: 'Query'
    node?: Maybe<Node>
    result?: Maybe<Result>
    results?: Maybe<ResultConnection>
    test?: Maybe<Test>
    tests?: Maybe<TestConnection>
    group?: Maybe<Group>
    groups?: Maybe<GroupConnection>
    activity?: Maybe<Activity>
    activities?: Maybe<ActivityConnection>
    course?: Maybe<Course>
    courses?: Maybe<CourseConnection>
    educationEvent?: Maybe<EducationEvent>
    educationEvents?: Maybe<EducationEventConnection>
    participant?: Maybe<Participant>
    participants?: Maybe<ParticipantConnection>
    review?: Maybe<Review>
    reviews?: Maybe<ReviewConnection>
    program?: Maybe<Program>
    programs?: Maybe<ProgramConnection>
    stage?: Maybe<Stage>
    stages?: Maybe<StageConnection>
    question?: Maybe<Question>
    questions?: Maybe<QuestionConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryResultArgs = {
    id: Scalars['ID']
}

export type QueryResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    participant_id?: Maybe<Scalars['String']>
    participant_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    activity_id?: Maybe<Scalars['String']>
    activity_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryTestArgs = {
    id: Scalars['ID']
}

export type QueryTestsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryGroupArgs = {
    id: Scalars['ID']
}

export type QueryGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryActivityArgs = {
    id: Scalars['ID']
}

export type QueryActivitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    course_id?: Maybe<Scalars['String']>
    course_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryCourseArgs = {
    id: Scalars['ID']
}

export type QueryCoursesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    additionalType?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
}

export type QueryEducationEventArgs = {
    id: Scalars['ID']
}

export type QueryEducationEventsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryParticipantArgs = {
    id: Scalars['ID']
}

export type QueryParticipantsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ParticipantFilter_Order>
    dateCreated?: Maybe<ParticipantFilter_DateCreated>
    dateModified?: Maybe<ParticipantFilter_DateModified>
    person?: Maybe<Scalars['String']>
    person_list?: Maybe<Array<Maybe<Scalars['String']>>>
    course_id?: Maybe<Scalars['String']>
    course_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    program_id?: Maybe<Scalars['String']>
    program_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    results_id?: Maybe<Scalars['String']>
    results_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryReviewArgs = {
    id: Scalars['ID']
}

export type QueryReviewsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryProgramArgs = {
    id: Scalars['ID']
}

export type QueryProgramsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    provider?: Maybe<Scalars['String']>
}

export type QueryStageArgs = {
    id: Scalars['ID']
}

export type QueryStagesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryQuestionArgs = {
    id: Scalars['ID']
}

export type QueryQuestionsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

export type QueryAuditTrailArgs = {
    id: Scalars['ID']
}

export type QueryAuditTrailsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AuditTrailFilter_Order>
    request?: Maybe<Scalars['String']>
    request_list?: Maybe<Array<Maybe<Scalars['String']>>>
    user?: Maybe<Scalars['String']>
    user_list?: Maybe<Array<Maybe<Scalars['String']>>>
    subject?: Maybe<Scalars['String']>
    subject_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resourceType?: Maybe<Scalars['String']>
    endpoint?: Maybe<Scalars['String']>
    endpoint_list?: Maybe<Array<Maybe<Scalars['String']>>>
    contentType?: Maybe<Scalars['String']>
    contentType_list?: Maybe<Array<Maybe<Scalars['String']>>>
    content?: Maybe<Scalars['String']>
    content_list?: Maybe<Array<Maybe<Scalars['String']>>>
    session?: Maybe<Scalars['String']>
    session_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated?: Maybe<AuditTrailFilter_DateCreated>
    dateModified?: Maybe<AuditTrailFilter_DateModified>
}

export type QueryChangeLogArgs = {
    id: Scalars['ID']
}

export type QueryChangeLogsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ChangeLogFilter_Order>
    action?: Maybe<Scalars['String']>
    action_list?: Maybe<Array<Maybe<Scalars['String']>>>
    objectId?: Maybe<Scalars['String']>
    objectId_list?: Maybe<Array<Maybe<Scalars['String']>>>
    objectClass?: Maybe<Scalars['String']>
    objectClass_list?: Maybe<Array<Maybe<Scalars['String']>>>
    version?: Maybe<Scalars['Int']>
    version_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    dateCreated?: Maybe<ChangeLogFilter_DateCreated>
    dateModified?: Maybe<ChangeLogFilter_DateModified>
}

/** A node, according to the Relay specification. */
export type Node = {
    /** The id of this node. */
    id: Scalars['ID']
}

export type Result = Node & {
    __typename?: 'Result'
    id: Scalars['ID']
    /** The name of this Result. */
    name: Scalars['String']
    /** The description of this Result. */
    description?: Maybe<Scalars['String']>
    /** The moment this Result had status: completed. */
    completionDate?: Maybe<Scalars['String']>
    participant?: Maybe<Participant>
    activity?: Maybe<Activity>
    test?: Maybe<Test>
    course?: Maybe<Course>
    program?: Maybe<Program>
    reviews?: Maybe<ReviewConnection>
    /** The moment this Result was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Result was last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type ResultReviewsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type Participant = Node & {
    __typename?: 'Participant'
    id: Scalars['ID']
    /** The contact of this Participant. */
    person: Scalars['String']
    /** The moment this Participant was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Participant was last Modified */
    dateModified?: Maybe<Scalars['String']>
    program?: Maybe<Program>
    course?: Maybe<Course>
    results?: Maybe<ResultConnection>
    groups?: Maybe<GroupConnection>
}

/** A Participant is a person who participates in a Course or an Program. */
export type ParticipantResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    participant_id?: Maybe<Scalars['String']>
    participant_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    activity_id?: Maybe<Scalars['String']>
    activity_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Participant is a person who participates in a Course or an Program. */
export type ParticipantGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type Program = Node & {
    __typename?: 'Program'
    id: Scalars['ID']
    /** The name of this Program. */
    name: Scalars['String']
    /** The description of this Program. */
    description?: Maybe<Scalars['String']>
    /** The day that people can start to apply for this Program. */
    applicationStartDate?: Maybe<Scalars['String']>
    /** The day that people can no longer apply for this Program. */
    applicationDeadline?: Maybe<Scalars['String']>
    /** The moment this Program starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this Program ends. */
    endDate?: Maybe<Scalars['String']>
    /** The financialAidEligible of this Program. */
    financialAidEligible?: Maybe<Scalars['String']>
    /** The maximum number of students who may be enrolled in the program.. */
    maximumEnrollment?: Maybe<Scalars['Int']>
    /** The numberOfCredits of this Program. */
    numberOfCredits?: Maybe<Scalars['Int']>
    /** A category describing the job, preferably using a term from a taxonomy such as BLS O*NET-SOC, ISCO-08 or similar. */
    occupationalCategory?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    occupationalCredentialAwarded?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    educationalCredentialAwarded?: Maybe<Scalars['String']>
    /** The educationalProgramMode of this Program. */
    educationalProgramMode?: Maybe<Scalars['String']>
    /** The offers of this Program. */
    offers?: Maybe<Scalars['String']>
    /** The programPrerequisites of this Program. */
    programPrerequisites?: Maybe<Scalars['Iterable']>
    /** The programType of this Program. */
    programType?: Maybe<Scalars['String']>
    /** The provider of this Program. */
    provider?: Maybe<Scalars['String']>
    /** The salaryUponCompletion of this Program. */
    salaryUponCompletion?: Maybe<Scalars['String']>
    /** The termDuration of this Program. */
    termDuration?: Maybe<Scalars['String']>
    /** The termsPerYear of this Program. */
    termsPerYear?: Maybe<Scalars['Int']>
    /** The dayOfWeek of this Program. */
    dayOfWeek?: Maybe<Scalars['String']>
    /** The timeOfDay of this Program. */
    timeOfDay?: Maybe<Scalars['String']>
    /** The timeToComplete of this Program. */
    timeToComplete?: Maybe<Scalars['String']>
    /** The trainingSalary of this Program. */
    trainingSalary?: Maybe<Scalars['String']>
    /** The typicalCreditsPerTerm of this Program. */
    typicalCreditsPerTerm?: Maybe<Scalars['Int']>
    participants?: Maybe<ParticipantConnection>
    courses?: Maybe<CourseConnection>
    results?: Maybe<ResultConnection>
    /** The moment this Program was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Program was last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type ProgramParticipantsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ParticipantFilter_Order>
    dateCreated?: Maybe<ParticipantFilter_DateCreated>
    dateModified?: Maybe<ParticipantFilter_DateModified>
    person?: Maybe<Scalars['String']>
    person_list?: Maybe<Array<Maybe<Scalars['String']>>>
    course_id?: Maybe<Scalars['String']>
    course_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    program_id?: Maybe<Scalars['String']>
    program_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    results_id?: Maybe<Scalars['String']>
    results_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type ProgramCoursesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    additionalType?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type ProgramResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    participant_id?: Maybe<Scalars['String']>
    participant_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    activity_id?: Maybe<Scalars['String']>
    activity_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ParticipantFilter_Order = {
    id?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ParticipantFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ParticipantFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Participant. */
export type ParticipantConnection = {
    __typename?: 'ParticipantConnection'
    edges?: Maybe<Array<Maybe<ParticipantEdge>>>
    pageInfo: ParticipantPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Participant. */
export type ParticipantEdge = {
    __typename?: 'ParticipantEdge'
    node?: Maybe<Participant>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ParticipantPageInfo = {
    __typename?: 'ParticipantPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for Course. */
export type CourseConnection = {
    __typename?: 'CourseConnection'
    edges?: Maybe<Array<Maybe<CourseEdge>>>
    pageInfo: CoursePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Course. */
export type CourseEdge = {
    __typename?: 'CourseEdge'
    node?: Maybe<Course>
    cursor: Scalars['String']
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type Course = Node & {
    __typename?: 'Course'
    id: Scalars['ID']
    /** The name of this Course. */
    name: Scalars['String']
    /** The uri of the submitter (organization) */
    organization: Scalars['String']
    /** The description of this Course. */
    description?: Maybe<Scalars['String']>
    /** The actual content of this Course. */
    text?: Maybe<Scalars['String']>
    /** The courseCode of this Course. */
    courseCode?: Maybe<Scalars['String']>
    /** The coursePrerequisites of this Course. */
    coursePrerequisites?: Maybe<Scalars['Iterable']>
    /** An instance of a Course which is distinct from other instances because it is offered at a different time or location or through different media or modes of study or to a specific section of students. */
    hasCourseInstance?: Maybe<Scalars['String']>
    /** The numberOfCredits of this Course. */
    numberOfCredits?: Maybe<Scalars['Int']>
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    occupationalCredentialAwarded?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    educationalCredentialAwarded?: Maybe<Scalars['String']>
    /** The moment this Course was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Course was last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** An array of URLs pointing to skills related to this course */
    skills?: Maybe<Scalars['Iterable']>
    /** An array of URLs pointing to competences this course teaches the participant */
    competences?: Maybe<Scalars['Iterable']>
    /** An array of URLs pointing to products from the pdc related to this course */
    products?: Maybe<Scalars['Iterable']>
    /** The Type of this course. */
    additionalType?: Maybe<Scalars['String']>
    /** The url linking to a video which belongs to this course */
    video?: Maybe<Scalars['String']>
    /** The time Required to complete this Course. */
    timeRequired?: Maybe<Scalars['String']>
    programs?: Maybe<ProgramConnection>
    educationEvents?: Maybe<EducationEventConnection>
    activities?: Maybe<ActivityConnection>
    results?: Maybe<ResultConnection>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type CourseProgramsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    provider?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type CourseEducationEventsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type CourseActivitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    course_id?: Maybe<Scalars['String']>
    course_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type CourseResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    participant_id?: Maybe<Scalars['String']>
    participant_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    activity_id?: Maybe<Scalars['String']>
    activity_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Connection for Program. */
export type ProgramConnection = {
    __typename?: 'ProgramConnection'
    edges?: Maybe<Array<Maybe<ProgramEdge>>>
    pageInfo: ProgramPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Program. */
export type ProgramEdge = {
    __typename?: 'ProgramEdge'
    node?: Maybe<Program>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ProgramPageInfo = {
    __typename?: 'ProgramPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for EducationEvent. */
export type EducationEventConnection = {
    __typename?: 'EducationEventConnection'
    edges?: Maybe<Array<Maybe<EducationEventEdge>>>
    pageInfo: EducationEventPageInfo
    totalCount: Scalars['Int']
}

/** Edge of EducationEvent. */
export type EducationEventEdge = {
    __typename?: 'EducationEventEdge'
    node?: Maybe<EducationEvent>
    cursor: Scalars['String']
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type EducationEvent = Node & {
    __typename?: 'EducationEvent'
    id: Scalars['ID']
    /** The name of this EducationEvent. */
    name: Scalars['String']
    /** The description of this EducationEvent. */
    description?: Maybe<Scalars['String']>
    /** The assesses of this EducationEvent. */
    assesses?: Maybe<Scalars['String']>
    /** The educationalLevel of this EducationEvent. */
    educationalLevel?: Maybe<Scalars['String']>
    /** The teaches of this EducationEvent. */
    teaches?: Maybe<Scalars['String']>
    /** The moment this EducationEvent starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this EducationEvent ends. */
    endDate?: Maybe<Scalars['String']>
    /** The moment this EducationEvent was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this EducationEvent was last Modified */
    dateModified?: Maybe<Scalars['String']>
    course: Course
}

/** Information about the current page. */
export type EducationEventPageInfo = {
    __typename?: 'EducationEventPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for Activity. */
export type ActivityConnection = {
    __typename?: 'ActivityConnection'
    edges?: Maybe<Array<Maybe<ActivityEdge>>>
    pageInfo: ActivityPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Activity. */
export type ActivityEdge = {
    __typename?: 'ActivityEdge'
    node?: Maybe<Activity>
    cursor: Scalars['String']
}

/** An activity like a class on a cource. */
export type Activity = Node & {
    __typename?: 'Activity'
    id: Scalars['ID']
    /** The name of this Activity. */
    name: Scalars['String']
    /** The description of this Activity. */
    description?: Maybe<Scalars['String']>
    /** Denotes if this activity needs a review with a rating before it can be completed. */
    needsReview: Scalars['Boolean']
    course: Course
    /** Could be 'assignment', 'group work' or 'test'. */
    educationalUse: Scalars['String']
    results?: Maybe<ResultConnection>
    /** The moment this Activity was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Activity was last Modified */
    dateModified?: Maybe<Scalars['String']>
    tests?: Maybe<TestConnection>
}

/** An activity like a class on a cource. */
export type ActivityResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    participant_id?: Maybe<Scalars['String']>
    participant_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    activity_id?: Maybe<Scalars['String']>
    activity_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** An activity like a class on a cource. */
export type ActivityTestsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** Connection for Result. */
export type ResultConnection = {
    __typename?: 'ResultConnection'
    edges?: Maybe<Array<Maybe<ResultEdge>>>
    pageInfo: ResultPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Result. */
export type ResultEdge = {
    __typename?: 'ResultEdge'
    node?: Maybe<Result>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ResultPageInfo = {
    __typename?: 'ResultPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for Test. */
export type TestConnection = {
    __typename?: 'TestConnection'
    edges?: Maybe<Array<Maybe<TestEdge>>>
    pageInfo: TestPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Test. */
export type TestEdge = {
    __typename?: 'TestEdge'
    node?: Maybe<Test>
    cursor: Scalars['String']
}

export type Test = Node & {
    __typename?: 'Test'
    id: Scalars['ID']
    /** The name of this Test. */
    name: Scalars['String']
    /** The description of this Test. */
    description?: Maybe<Scalars['String']>
    /** Denotes if this test needs a review with a rating before it can be completed. */
    needsReview: Scalars['Boolean']
    /** The moment this Test was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Test was last Modified */
    dateModified?: Maybe<Scalars['String']>
    results?: Maybe<ResultConnection>
    /** The activity that this test belongs to */
    activity: Activity
    /** The stages of this test */
    stages?: Maybe<StageConnection>
}

export type TestResultsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    participant_id?: Maybe<Scalars['String']>
    participant_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    activity_id?: Maybe<Scalars['String']>
    activity_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type TestStagesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** Connection for Stage. */
export type StageConnection = {
    __typename?: 'StageConnection'
    edges?: Maybe<Array<Maybe<StageEdge>>>
    pageInfo: StagePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Stage. */
export type StageEdge = {
    __typename?: 'StageEdge'
    node?: Maybe<Stage>
    cursor: Scalars['String']
}

/** A stage within a test. */
export type Stage = Node & {
    __typename?: 'Stage'
    id: Scalars['ID']
    /** The name of this Stage. */
    name: Scalars['String']
    /** The description of this Stage. */
    description?: Maybe<Scalars['String']>
    /** The moment this Stage was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Stage was last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** Whether or not this stage is the starting point of a test */
    start: Scalars['Boolean']
    /** Whether or not this stage is the last point of a test */
    end: Scalars['Boolean']
    /** The test that this stage belongs to */
    test: Test
    /** the questions of this stage */
    questions?: Maybe<QuestionConnection>
    /** The place in the order where the stage should be rendered */
    orderNumber: Scalars['Int']
}

/** A stage within a test. */
export type StageQuestionsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
}

/** Connection for Question. */
export type QuestionConnection = {
    __typename?: 'QuestionConnection'
    edges?: Maybe<Array<Maybe<QuestionEdge>>>
    pageInfo: QuestionPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Question. */
export type QuestionEdge = {
    __typename?: 'QuestionEdge'
    node?: Maybe<Question>
    cursor: Scalars['String']
}

export type Question = Node & {
    __typename?: 'Question'
    id: Scalars['ID']
    /** The name of this Question. */
    name: Scalars['String']
    /** The Question. */
    description: Scalars['String']
    /** The moment this Question was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Question was last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** Denotes if this question is the first question of the stage */
    start: Scalars['Boolean']
    /** Denotes if this question is the last question of the stage */
    end: Scalars['Boolean']
    /** The Answer to this Question. */
    answer: Scalars['String']
    /** The answerOptions of this Question. */
    answerOptions?: Maybe<Scalars['Iterable']>
    /** the stage this stage belongs to */
    stage: Stage
    /** The place in the order where the question should be rendered */
    orderNumber: Scalars['Int']
}

/** Information about the current page. */
export type QuestionPageInfo = {
    __typename?: 'QuestionPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type StagePageInfo = {
    __typename?: 'StagePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type TestPageInfo = {
    __typename?: 'TestPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type ActivityPageInfo = {
    __typename?: 'ActivityPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type CoursePageInfo = {
    __typename?: 'CoursePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for Group. */
export type GroupConnection = {
    __typename?: 'GroupConnection'
    edges?: Maybe<Array<Maybe<GroupEdge>>>
    pageInfo: GroupPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Group. */
export type GroupEdge = {
    __typename?: 'GroupEdge'
    node?: Maybe<Group>
    cursor: Scalars['String']
}

/** An activity like a class on a cource. */
export type Group = Node & {
    __typename?: 'Group'
    id: Scalars['ID']
    /** The name of this Group. */
    name: Scalars['String']
    /** The description of this Group. */
    description?: Maybe<Scalars['String']>
    /** The moment this Participant was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Participant was last Modified */
    dateModified?: Maybe<Scalars['String']>
    participants?: Maybe<ParticipantConnection>
}

/** An activity like a class on a cource. */
export type GroupParticipantsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ParticipantFilter_Order>
    dateCreated?: Maybe<ParticipantFilter_DateCreated>
    dateModified?: Maybe<ParticipantFilter_DateModified>
    person?: Maybe<Scalars['String']>
    person_list?: Maybe<Array<Maybe<Scalars['String']>>>
    course_id?: Maybe<Scalars['String']>
    course_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    program_id?: Maybe<Scalars['String']>
    program_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    results_id?: Maybe<Scalars['String']>
    results_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Information about the current page. */
export type GroupPageInfo = {
    __typename?: 'GroupPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for Review. */
export type ReviewConnection = {
    __typename?: 'ReviewConnection'
    edges?: Maybe<Array<Maybe<ReviewEdge>>>
    pageInfo: ReviewPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Review. */
export type ReviewEdge = {
    __typename?: 'ReviewEdge'
    node?: Maybe<Review>
    cursor: Scalars['String']
}

export type Review = Node & {
    __typename?: 'Review'
    id: Scalars['ID']
    /** The name of this Review. */
    name: Scalars['String']
    /** The description of this Review. */
    description?: Maybe<Scalars['String']>
    result: Result
    body?: Maybe<Scalars['String']>
    rating?: Maybe<Scalars['Int']>
    /** The moment this Review was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this Review was last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type ReviewPageInfo = {
    __typename?: 'ReviewPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** An resource representing a log line. */
export type AuditTrail = Node & {
    __typename?: 'AuditTrail'
    id: Scalars['ID']
    /** The id of the request within that application */
    request?: Maybe<Scalars['String']>
    /** The user on behalf of wich the request was made */
    user?: Maybe<Scalars['String']>
    /** ??? */
    subject?: Maybe<Scalars['String']>
    /** The procces on behalf of wich the request was made */
    process?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dataElements?: Maybe<Scalars['Iterable']>
    /** The moment this request was created */
    dataSubjects?: Maybe<Scalars['Iterable']>
    /** The resource that was requested */
    resource?: Maybe<Scalars['String']>
    /** The type of the resource that was requested */
    resourceType?: Maybe<Scalars['String']>
    /** The moment this request was created */
    route?: Maybe<Scalars['String']>
    /** The endpoint that the request was made to */
    endpoint?: Maybe<Scalars['String']>
    /** The method that was used */
    method?: Maybe<Scalars['String']>
    /** The contentType that was reqousted */
    accept?: Maybe<Scalars['String']>
    /** The contentType that was suplieds */
    contentType?: Maybe<Scalars['String']>
    /** The moment this request was created */
    content?: Maybe<Scalars['String']>
    /** The moment this request was created */
    ip?: Maybe<Scalars['String']>
    /** The moment this request was created */
    session: Scalars['String']
    /** The headers supplied by client */
    headers: Scalars['Iterable']
    /** The status code returned to client */
    statusCode?: Maybe<Scalars['Int']>
    /** Whether or not the reqousted endpoint was found */
    notFound?: Maybe<Scalars['Boolean']>
    /** Whether or not the client was allowed to the reqousted endpoint */
    forbidden?: Maybe<Scalars['Boolean']>
    /** Whether or not there where any problems */
    ok?: Maybe<Scalars['Boolean']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type AuditTrailFilter_Order = {
    application?: Maybe<Scalars['String']>
    request?: Maybe<Scalars['String']>
    user?: Maybe<Scalars['String']>
    subject?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    resourceType?: Maybe<Scalars['String']>
    endpoint?: Maybe<Scalars['String']>
    contentType?: Maybe<Scalars['String']>
    content?: Maybe<Scalars['String']>
    session?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type AuditTrailFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type AuditTrailFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for AuditTrail. */
export type AuditTrailConnection = {
    __typename?: 'AuditTrailConnection'
    edges?: Maybe<Array<Maybe<AuditTrailEdge>>>
    pageInfo: AuditTrailPageInfo
    totalCount: Scalars['Int']
}

/** Edge of AuditTrail. */
export type AuditTrailEdge = {
    __typename?: 'AuditTrailEdge'
    node?: Maybe<AuditTrail>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AuditTrailPageInfo = {
    __typename?: 'AuditTrailPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** An resource representing a log line. */
export type ChangeLog = Node & {
    __typename?: 'ChangeLog'
    id: Scalars['ID']
    /** The moment this request was created */
    session?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
    action: Scalars['String']
    objectClass: Scalars['String']
    objectId?: Maybe<Scalars['String']>
    username?: Maybe<Scalars['String']>
    data?: Maybe<Scalars['Iterable']>
    version: Scalars['Int']
}

export type ChangeLogFilter_Order = {
    action?: Maybe<Scalars['String']>
    objectId?: Maybe<Scalars['String']>
    objectClass?: Maybe<Scalars['String']>
    version?: Maybe<Scalars['String']>
    username?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ChangeLogFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ChangeLogFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for ChangeLog. */
export type ChangeLogConnection = {
    __typename?: 'ChangeLogConnection'
    edges?: Maybe<Array<Maybe<ChangeLogEdge>>>
    pageInfo: ChangeLogPageInfo
    totalCount: Scalars['Int']
}

/** Edge of ChangeLog. */
export type ChangeLogEdge = {
    __typename?: 'ChangeLogEdge'
    node?: Maybe<ChangeLog>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ChangeLogPageInfo = {
    __typename?: 'ChangeLogPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Mutation = {
    __typename?: 'Mutation'
    /** Deletes a Result. */
    deleteResult?: Maybe<DeleteResultPayload>
    /** Updates a Result. */
    updateResult?: Maybe<UpdateResultPayload>
    /** Creates a Result. */
    createResult?: Maybe<CreateResultPayload>
    /** Deletes a Test. */
    deleteTest?: Maybe<DeleteTestPayload>
    /** Updates a Test. */
    updateTest?: Maybe<UpdateTestPayload>
    /** Creates a Test. */
    createTest?: Maybe<CreateTestPayload>
    /** Deletes a Group. */
    deleteGroup?: Maybe<DeleteGroupPayload>
    /** Updates a Group. */
    updateGroup?: Maybe<UpdateGroupPayload>
    /** Creates a Group. */
    createGroup?: Maybe<CreateGroupPayload>
    /** Deletes a Activity. */
    deleteActivity?: Maybe<DeleteActivityPayload>
    /** Updates a Activity. */
    updateActivity?: Maybe<UpdateActivityPayload>
    /** Creates a Activity. */
    createActivity?: Maybe<CreateActivityPayload>
    /** Deletes a Course. */
    deleteCourse?: Maybe<DeleteCoursePayload>
    /** Updates a Course. */
    updateCourse?: Maybe<UpdateCoursePayload>
    /** Creates a Course. */
    createCourse?: Maybe<CreateCoursePayload>
    /** Deletes a EducationEvent. */
    deleteEducationEvent?: Maybe<DeleteEducationEventPayload>
    /** Updates a EducationEvent. */
    updateEducationEvent?: Maybe<UpdateEducationEventPayload>
    /** Creates a EducationEvent. */
    createEducationEvent?: Maybe<CreateEducationEventPayload>
    /** Deletes a Participant. */
    deleteParticipant?: Maybe<DeleteParticipantPayload>
    /** Updates a Participant. */
    updateParticipant?: Maybe<UpdateParticipantPayload>
    /** Creates a Participant. */
    createParticipant?: Maybe<CreateParticipantPayload>
    /** Deletes a Review. */
    deleteReview?: Maybe<DeleteReviewPayload>
    /** Updates a Review. */
    updateReview?: Maybe<UpdateReviewPayload>
    /** Creates a Review. */
    createReview?: Maybe<CreateReviewPayload>
    /** Deletes a Program. */
    deleteProgram?: Maybe<DeleteProgramPayload>
    /** Updates a Program. */
    updateProgram?: Maybe<UpdateProgramPayload>
    /** Creates a Program. */
    createProgram?: Maybe<CreateProgramPayload>
    /** Deletes a Stage. */
    deleteStage?: Maybe<DeleteStagePayload>
    /** Updates a Stage. */
    updateStage?: Maybe<UpdateStagePayload>
    /** Creates a Stage. */
    createStage?: Maybe<CreateStagePayload>
    /** Deletes a Question. */
    deleteQuestion?: Maybe<DeleteQuestionPayload>
    /** Updates a Question. */
    updateQuestion?: Maybe<UpdateQuestionPayload>
    /** Creates a Question. */
    createQuestion?: Maybe<CreateQuestionPayload>
    /** Deletes a AuditTrail. */
    deleteAuditTrail?: Maybe<DeleteAuditTrailPayload>
    /** Updates a AuditTrail. */
    updateAuditTrail?: Maybe<UpdateAuditTrailPayload>
    /** Creates a AuditTrail. */
    createAuditTrail?: Maybe<CreateAuditTrailPayload>
    /** Deletes a ChangeLog. */
    deleteChangeLog?: Maybe<DeleteChangeLogPayload>
    /** Updates a ChangeLog. */
    updateChangeLog?: Maybe<UpdateChangeLogPayload>
    /** Creates a ChangeLog. */
    createChangeLog?: Maybe<CreateChangeLogPayload>
}

export type MutationDeleteResultArgs = {
    input: DeleteResultInput
}

export type MutationUpdateResultArgs = {
    input: UpdateResultInput
}

export type MutationCreateResultArgs = {
    input: CreateResultInput
}

export type MutationDeleteTestArgs = {
    input: DeleteTestInput
}

export type MutationUpdateTestArgs = {
    input: UpdateTestInput
}

export type MutationCreateTestArgs = {
    input: CreateTestInput
}

export type MutationDeleteGroupArgs = {
    input: DeleteGroupInput
}

export type MutationUpdateGroupArgs = {
    input: UpdateGroupInput
}

export type MutationCreateGroupArgs = {
    input: CreateGroupInput
}

export type MutationDeleteActivityArgs = {
    input: DeleteActivityInput
}

export type MutationUpdateActivityArgs = {
    input: UpdateActivityInput
}

export type MutationCreateActivityArgs = {
    input: CreateActivityInput
}

export type MutationDeleteCourseArgs = {
    input: DeleteCourseInput
}

export type MutationUpdateCourseArgs = {
    input: UpdateCourseInput
}

export type MutationCreateCourseArgs = {
    input: CreateCourseInput
}

export type MutationDeleteEducationEventArgs = {
    input: DeleteEducationEventInput
}

export type MutationUpdateEducationEventArgs = {
    input: UpdateEducationEventInput
}

export type MutationCreateEducationEventArgs = {
    input: CreateEducationEventInput
}

export type MutationDeleteParticipantArgs = {
    input: DeleteParticipantInput
}

export type MutationUpdateParticipantArgs = {
    input: UpdateParticipantInput
}

export type MutationCreateParticipantArgs = {
    input: CreateParticipantInput
}

export type MutationDeleteReviewArgs = {
    input: DeleteReviewInput
}

export type MutationUpdateReviewArgs = {
    input: UpdateReviewInput
}

export type MutationCreateReviewArgs = {
    input: CreateReviewInput
}

export type MutationDeleteProgramArgs = {
    input: DeleteProgramInput
}

export type MutationUpdateProgramArgs = {
    input: UpdateProgramInput
}

export type MutationCreateProgramArgs = {
    input: CreateProgramInput
}

export type MutationDeleteStageArgs = {
    input: DeleteStageInput
}

export type MutationUpdateStageArgs = {
    input: UpdateStageInput
}

export type MutationCreateStageArgs = {
    input: CreateStageInput
}

export type MutationDeleteQuestionArgs = {
    input: DeleteQuestionInput
}

export type MutationUpdateQuestionArgs = {
    input: UpdateQuestionInput
}

export type MutationCreateQuestionArgs = {
    input: CreateQuestionInput
}

export type MutationDeleteAuditTrailArgs = {
    input: DeleteAuditTrailInput
}

export type MutationUpdateAuditTrailArgs = {
    input: UpdateAuditTrailInput
}

export type MutationCreateAuditTrailArgs = {
    input: CreateAuditTrailInput
}

export type MutationDeleteChangeLogArgs = {
    input: DeleteChangeLogInput
}

export type MutationUpdateChangeLogArgs = {
    input: UpdateChangeLogInput
}

export type MutationCreateChangeLogArgs = {
    input: CreateChangeLogInput
}

export type DeleteResultInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteResultPayload = {
    __typename?: 'deleteResultPayload'
    result?: Maybe<Result>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateResultInput = {
    id: Scalars['ID']
    /** The name of this Result. */
    name?: Maybe<Scalars['String']>
    /** The description of this Result. */
    description?: Maybe<Scalars['String']>
    /** The moment this Result had status: completed. */
    completionDate?: Maybe<Scalars['String']>
    participant?: Maybe<Scalars['String']>
    activity?: Maybe<Scalars['String']>
    test?: Maybe<Scalars['String']>
    course?: Maybe<Scalars['String']>
    program?: Maybe<Scalars['String']>
    reviews?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateResultPayload = {
    __typename?: 'updateResultPayload'
    result?: Maybe<Result>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateResultInput = {
    /** The name of this Result. */
    name: Scalars['String']
    /** The description of this Result. */
    description?: Maybe<Scalars['String']>
    /** The moment this Result had status: completed. */
    completionDate?: Maybe<Scalars['String']>
    participant?: Maybe<Scalars['String']>
    activity?: Maybe<Scalars['String']>
    test?: Maybe<Scalars['String']>
    course?: Maybe<Scalars['String']>
    program?: Maybe<Scalars['String']>
    reviews?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateResultPayload = {
    __typename?: 'createResultPayload'
    result?: Maybe<Result>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteTestInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteTestPayload = {
    __typename?: 'deleteTestPayload'
    test?: Maybe<Test>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateTestInput = {
    id: Scalars['ID']
    /** The name of this Test. */
    name?: Maybe<Scalars['String']>
    /** The description of this Test. */
    description?: Maybe<Scalars['String']>
    /** Denotes if this test needs a review with a rating before it can be completed. */
    needsReview?: Maybe<Scalars['Boolean']>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The activity that this test belongs to */
    activity?: Maybe<Scalars['String']>
    /** The stages of this test */
    stages?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateTestPayload = {
    __typename?: 'updateTestPayload'
    test?: Maybe<Test>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateTestInput = {
    /** The name of this Test. */
    name: Scalars['String']
    /** The description of this Test. */
    description?: Maybe<Scalars['String']>
    /** Denotes if this test needs a review with a rating before it can be completed. */
    needsReview: Scalars['Boolean']
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The activity that this test belongs to */
    activity: Scalars['String']
    /** The stages of this test */
    stages?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateTestPayload = {
    __typename?: 'createTestPayload'
    test?: Maybe<Test>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type DeleteGroupInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type DeleteGroupPayload = {
    __typename?: 'deleteGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type UpdateGroupInput = {
    id: Scalars['ID']
    /** The name of this Group. */
    name?: Maybe<Scalars['String']>
    /** The description of this Group. */
    description?: Maybe<Scalars['String']>
    participants?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type UpdateGroupPayload = {
    __typename?: 'updateGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type CreateGroupInput = {
    /** The name of this Group. */
    name: Scalars['String']
    /** The description of this Group. */
    description?: Maybe<Scalars['String']>
    participants?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type CreateGroupPayload = {
    __typename?: 'createGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type DeleteActivityInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type DeleteActivityPayload = {
    __typename?: 'deleteActivityPayload'
    activity?: Maybe<Activity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type UpdateActivityInput = {
    id: Scalars['ID']
    /** The name of this Activity. */
    name?: Maybe<Scalars['String']>
    /** The description of this Activity. */
    description?: Maybe<Scalars['String']>
    /** Denotes if this activity needs a review with a rating before it can be completed. */
    needsReview?: Maybe<Scalars['Boolean']>
    course?: Maybe<Scalars['String']>
    /** Could be 'assignment', 'group work' or 'test'. */
    educationalUse?: Maybe<Scalars['String']>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    tests?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type UpdateActivityPayload = {
    __typename?: 'updateActivityPayload'
    activity?: Maybe<Activity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type CreateActivityInput = {
    /** The name of this Activity. */
    name: Scalars['String']
    /** The description of this Activity. */
    description?: Maybe<Scalars['String']>
    /** Denotes if this activity needs a review with a rating before it can be completed. */
    needsReview: Scalars['Boolean']
    course: Scalars['String']
    /** Could be 'assignment', 'group work' or 'test'. */
    educationalUse: Scalars['String']
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    tests?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An activity like a class on a cource. */
export type CreateActivityPayload = {
    __typename?: 'createActivityPayload'
    activity?: Maybe<Activity>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type DeleteCourseInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type DeleteCoursePayload = {
    __typename?: 'deleteCoursePayload'
    course?: Maybe<Course>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type UpdateCourseInput = {
    id: Scalars['ID']
    /** The name of this Course. */
    name?: Maybe<Scalars['String']>
    /** The uri of the submitter (organization) */
    organization?: Maybe<Scalars['String']>
    /** The description of this Course. */
    description?: Maybe<Scalars['String']>
    /** The actual content of this Course. */
    text?: Maybe<Scalars['String']>
    /** The courseCode of this Course. */
    courseCode?: Maybe<Scalars['String']>
    /** The coursePrerequisites of this Course. */
    coursePrerequisites?: Maybe<Scalars['Iterable']>
    /** An instance of a Course which is distinct from other instances because it is offered at a different time or location or through different media or modes of study or to a specific section of students. */
    hasCourseInstance?: Maybe<Scalars['String']>
    /** The numberOfCredits of this Course. */
    numberOfCredits?: Maybe<Scalars['Int']>
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    occupationalCredentialAwarded?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    educationalCredentialAwarded?: Maybe<Scalars['String']>
    /** An array of URLs pointing to skills related to this course */
    skills?: Maybe<Scalars['Iterable']>
    /** An array of URLs pointing to competences this course teaches the participant */
    competences?: Maybe<Scalars['Iterable']>
    /** An array of URLs pointing to products from the pdc related to this course */
    products?: Maybe<Scalars['Iterable']>
    /** The Type of this course. */
    additionalType?: Maybe<Scalars['String']>
    /** The url linking to a video which belongs to this course */
    video?: Maybe<Scalars['String']>
    /** The time Required to complete this Course. */
    timeRequired?: Maybe<Scalars['String']>
    programs?: Maybe<Array<Maybe<Scalars['String']>>>
    educationEvents?: Maybe<Array<Maybe<Scalars['String']>>>
    activities?: Maybe<Array<Maybe<Scalars['String']>>>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type UpdateCoursePayload = {
    __typename?: 'updateCoursePayload'
    course?: Maybe<Course>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type CreateCourseInput = {
    /** The name of this Course. */
    name: Scalars['String']
    /** The uri of the submitter (organization) */
    organization: Scalars['String']
    /** The description of this Course. */
    description?: Maybe<Scalars['String']>
    /** The actual content of this Course. */
    text?: Maybe<Scalars['String']>
    /** The courseCode of this Course. */
    courseCode?: Maybe<Scalars['String']>
    /** The coursePrerequisites of this Course. */
    coursePrerequisites?: Maybe<Scalars['Iterable']>
    /** An instance of a Course which is distinct from other instances because it is offered at a different time or location or through different media or modes of study or to a specific section of students. */
    hasCourseInstance?: Maybe<Scalars['String']>
    /** The numberOfCredits of this Course. */
    numberOfCredits?: Maybe<Scalars['Int']>
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    occupationalCredentialAwarded?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    educationalCredentialAwarded?: Maybe<Scalars['String']>
    /** An array of URLs pointing to skills related to this course */
    skills?: Maybe<Scalars['Iterable']>
    /** An array of URLs pointing to competences this course teaches the participant */
    competences?: Maybe<Scalars['Iterable']>
    /** An array of URLs pointing to products from the pdc related to this course */
    products?: Maybe<Scalars['Iterable']>
    /** The Type of this course. */
    additionalType?: Maybe<Scalars['String']>
    /** The url linking to a video which belongs to this course */
    video?: Maybe<Scalars['String']>
    /** The time Required to complete this Course. */
    timeRequired?: Maybe<Scalars['String']>
    programs?: Maybe<Array<Maybe<Scalars['String']>>>
    educationEvents?: Maybe<Array<Maybe<Scalars['String']>>>
    activities?: Maybe<Array<Maybe<Scalars['String']>>>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Course is a course within a program in which participants can participate. Based on https://schema.org/Course. */
export type CreateCoursePayload = {
    __typename?: 'createCoursePayload'
    course?: Maybe<Course>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type DeleteEducationEventInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type DeleteEducationEventPayload = {
    __typename?: 'deleteEducationEventPayload'
    educationEvent?: Maybe<EducationEvent>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type UpdateEducationEventInput = {
    id: Scalars['ID']
    /** The name of this EducationEvent. */
    name?: Maybe<Scalars['String']>
    /** The description of this EducationEvent. */
    description?: Maybe<Scalars['String']>
    /** The assesses of this EducationEvent. */
    assesses?: Maybe<Scalars['String']>
    /** The educationalLevel of this EducationEvent. */
    educationalLevel?: Maybe<Scalars['String']>
    /** The teaches of this EducationEvent. */
    teaches?: Maybe<Scalars['String']>
    /** The moment this EducationEvent starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this EducationEvent ends. */
    endDate?: Maybe<Scalars['String']>
    course?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type UpdateEducationEventPayload = {
    __typename?: 'updateEducationEventPayload'
    educationEvent?: Maybe<EducationEvent>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type CreateEducationEventInput = {
    /** The name of this EducationEvent. */
    name: Scalars['String']
    /** The description of this EducationEvent. */
    description?: Maybe<Scalars['String']>
    /** The assesses of this EducationEvent. */
    assesses?: Maybe<Scalars['String']>
    /** The educationalLevel of this EducationEvent. */
    educationalLevel?: Maybe<Scalars['String']>
    /** The teaches of this EducationEvent. */
    teaches?: Maybe<Scalars['String']>
    /** The moment this EducationEvent starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this EducationEvent ends. */
    endDate?: Maybe<Scalars['String']>
    course: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An EducationEvent is a (online) meeting, college etc. of a course. */
export type CreateEducationEventPayload = {
    __typename?: 'createEducationEventPayload'
    educationEvent?: Maybe<EducationEvent>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type DeleteParticipantInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type DeleteParticipantPayload = {
    __typename?: 'deleteParticipantPayload'
    participant?: Maybe<Participant>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type UpdateParticipantInput = {
    id: Scalars['ID']
    /** The contact of this Participant. */
    person?: Maybe<Scalars['String']>
    program?: Maybe<Scalars['String']>
    course?: Maybe<Scalars['String']>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    groups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type UpdateParticipantPayload = {
    __typename?: 'updateParticipantPayload'
    participant?: Maybe<Participant>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type CreateParticipantInput = {
    /** The contact of this Participant. */
    person: Scalars['String']
    program?: Maybe<Scalars['String']>
    course?: Maybe<Scalars['String']>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    groups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Participant is a person who participates in a Course or an Program. */
export type CreateParticipantPayload = {
    __typename?: 'createParticipantPayload'
    participant?: Maybe<Participant>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteReviewInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteReviewPayload = {
    __typename?: 'deleteReviewPayload'
    review?: Maybe<Review>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateReviewInput = {
    id: Scalars['ID']
    /** The name of this Review. */
    name?: Maybe<Scalars['String']>
    /** The description of this Review. */
    description?: Maybe<Scalars['String']>
    result?: Maybe<Scalars['String']>
    body?: Maybe<Scalars['String']>
    rating?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateReviewPayload = {
    __typename?: 'updateReviewPayload'
    review?: Maybe<Review>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateReviewInput = {
    /** The name of this Review. */
    name: Scalars['String']
    /** The description of this Review. */
    description?: Maybe<Scalars['String']>
    result: Scalars['String']
    body?: Maybe<Scalars['String']>
    rating?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateReviewPayload = {
    __typename?: 'createReviewPayload'
    review?: Maybe<Review>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type DeleteProgramInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type DeleteProgramPayload = {
    __typename?: 'deleteProgramPayload'
    program?: Maybe<Program>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type UpdateProgramInput = {
    id: Scalars['ID']
    /** The name of this Program. */
    name?: Maybe<Scalars['String']>
    /** The description of this Program. */
    description?: Maybe<Scalars['String']>
    /** The day that people can start to apply for this Program. */
    applicationStartDate?: Maybe<Scalars['String']>
    /** The day that people can no longer apply for this Program. */
    applicationDeadline?: Maybe<Scalars['String']>
    /** The moment this Program starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this Program ends. */
    endDate?: Maybe<Scalars['String']>
    /** The financialAidEligible of this Program. */
    financialAidEligible?: Maybe<Scalars['String']>
    /** The maximum number of students who may be enrolled in the program.. */
    maximumEnrollment?: Maybe<Scalars['Int']>
    /** The numberOfCredits of this Program. */
    numberOfCredits?: Maybe<Scalars['Int']>
    /** A category describing the job, preferably using a term from a taxonomy such as BLS O*NET-SOC, ISCO-08 or similar. */
    occupationalCategory?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    occupationalCredentialAwarded?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    educationalCredentialAwarded?: Maybe<Scalars['String']>
    /** The educationalProgramMode of this Program. */
    educationalProgramMode?: Maybe<Scalars['String']>
    /** The offers of this Program. */
    offers?: Maybe<Scalars['String']>
    /** The programPrerequisites of this Program. */
    programPrerequisites?: Maybe<Scalars['Iterable']>
    /** The programType of this Program. */
    programType?: Maybe<Scalars['String']>
    /** The provider of this Program. */
    provider?: Maybe<Scalars['String']>
    /** The salaryUponCompletion of this Program. */
    salaryUponCompletion?: Maybe<Scalars['String']>
    /** The termDuration of this Program. */
    termDuration?: Maybe<Scalars['String']>
    /** The termsPerYear of this Program. */
    termsPerYear?: Maybe<Scalars['Int']>
    /** The dayOfWeek of this Program. */
    dayOfWeek?: Maybe<Scalars['String']>
    /** The timeOfDay of this Program. */
    timeOfDay?: Maybe<Scalars['String']>
    /** The timeToComplete of this Program. */
    timeToComplete?: Maybe<Scalars['String']>
    /** The trainingSalary of this Program. */
    trainingSalary?: Maybe<Scalars['String']>
    /** The typicalCreditsPerTerm of this Program. */
    typicalCreditsPerTerm?: Maybe<Scalars['Int']>
    participants?: Maybe<Array<Maybe<Scalars['String']>>>
    courses?: Maybe<Array<Maybe<Scalars['String']>>>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type UpdateProgramPayload = {
    __typename?: 'updateProgramPayload'
    program?: Maybe<Program>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type CreateProgramInput = {
    /** The name of this Program. */
    name: Scalars['String']
    /** The description of this Program. */
    description?: Maybe<Scalars['String']>
    /** The day that people can start to apply for this Program. */
    applicationStartDate?: Maybe<Scalars['String']>
    /** The day that people can no longer apply for this Program. */
    applicationDeadline?: Maybe<Scalars['String']>
    /** The moment this Program starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this Program ends. */
    endDate?: Maybe<Scalars['String']>
    /** The financialAidEligible of this Program. */
    financialAidEligible?: Maybe<Scalars['String']>
    /** The maximum number of students who may be enrolled in the program.. */
    maximumEnrollment?: Maybe<Scalars['Int']>
    /** The numberOfCredits of this Program. */
    numberOfCredits?: Maybe<Scalars['Int']>
    /** A category describing the job, preferably using a term from a taxonomy such as BLS O*NET-SOC, ISCO-08 or similar. */
    occupationalCategory?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other occupational credential awarded as a consequence of successful completion of this course or program. */
    occupationalCredentialAwarded?: Maybe<Scalars['String']>
    /** A description of the qualification, award, certificate, diploma or other educational credential awarded as a consequence of successful completion of this course or program. */
    educationalCredentialAwarded?: Maybe<Scalars['String']>
    /** The educationalProgramMode of this Program. */
    educationalProgramMode?: Maybe<Scalars['String']>
    /** The offers of this Program. */
    offers?: Maybe<Scalars['String']>
    /** The programPrerequisites of this Program. */
    programPrerequisites?: Maybe<Scalars['Iterable']>
    /** The programType of this Program. */
    programType?: Maybe<Scalars['String']>
    /** The provider of this Program. */
    provider?: Maybe<Scalars['String']>
    /** The salaryUponCompletion of this Program. */
    salaryUponCompletion?: Maybe<Scalars['String']>
    /** The termDuration of this Program. */
    termDuration?: Maybe<Scalars['String']>
    /** The termsPerYear of this Program. */
    termsPerYear?: Maybe<Scalars['Int']>
    /** The dayOfWeek of this Program. */
    dayOfWeek?: Maybe<Scalars['String']>
    /** The timeOfDay of this Program. */
    timeOfDay?: Maybe<Scalars['String']>
    /** The timeToComplete of this Program. */
    timeToComplete?: Maybe<Scalars['String']>
    /** The trainingSalary of this Program. */
    trainingSalary?: Maybe<Scalars['String']>
    /** The typicalCreditsPerTerm of this Program. */
    typicalCreditsPerTerm?: Maybe<Scalars['Int']>
    participants?: Maybe<Array<Maybe<Scalars['String']>>>
    courses?: Maybe<Array<Maybe<Scalars['String']>>>
    results?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Program is a EducationalOccupationalProgram offered by an institution which determines the learning progress to achieve an outcome, usually a credential like a degree or certificate. Based on https://schema.org/EducationalOccupationalProgram. */
export type CreateProgramPayload = {
    __typename?: 'createProgramPayload'
    program?: Maybe<Program>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A stage within a test. */
export type DeleteStageInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A stage within a test. */
export type DeleteStagePayload = {
    __typename?: 'deleteStagePayload'
    stage?: Maybe<Stage>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A stage within a test. */
export type UpdateStageInput = {
    id: Scalars['ID']
    /** The name of this Stage. */
    name?: Maybe<Scalars['String']>
    /** The description of this Stage. */
    description?: Maybe<Scalars['String']>
    /** The test that this stage belongs to */
    test?: Maybe<Scalars['String']>
    /** the questions of this stage */
    questions?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The place in the order where the stage should be rendered */
    orderNumber?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A stage within a test. */
export type UpdateStagePayload = {
    __typename?: 'updateStagePayload'
    stage?: Maybe<Stage>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A stage within a test. */
export type CreateStageInput = {
    /** The name of this Stage. */
    name: Scalars['String']
    /** The description of this Stage. */
    description?: Maybe<Scalars['String']>
    /** The test that this stage belongs to */
    test: Scalars['String']
    /** the questions of this stage */
    questions?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The place in the order where the stage should be rendered */
    orderNumber: Scalars['Int']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A stage within a test. */
export type CreateStagePayload = {
    __typename?: 'createStagePayload'
    stage?: Maybe<Stage>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteQuestionInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteQuestionPayload = {
    __typename?: 'deleteQuestionPayload'
    question?: Maybe<Question>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateQuestionInput = {
    id: Scalars['ID']
    /** The name of this Question. */
    name?: Maybe<Scalars['String']>
    /** The Question. */
    description?: Maybe<Scalars['String']>
    /** The Answer to this Question. */
    answer?: Maybe<Scalars['String']>
    /** The answerOptions of this Question. */
    answerOptions?: Maybe<Scalars['Iterable']>
    /** the stage this stage belongs to */
    stage?: Maybe<Scalars['String']>
    /** The place in the order where the question should be rendered */
    orderNumber?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateQuestionPayload = {
    __typename?: 'updateQuestionPayload'
    question?: Maybe<Question>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateQuestionInput = {
    /** The name of this Question. */
    name: Scalars['String']
    /** The Question. */
    description: Scalars['String']
    /** The Answer to this Question. */
    answer: Scalars['String']
    /** The answerOptions of this Question. */
    answerOptions?: Maybe<Scalars['Iterable']>
    /** the stage this stage belongs to */
    stage: Scalars['String']
    /** The place in the order where the question should be rendered */
    orderNumber: Scalars['Int']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateQuestionPayload = {
    __typename?: 'createQuestionPayload'
    question?: Maybe<Question>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteAuditTrailInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteAuditTrailPayload = {
    __typename?: 'deleteAuditTrailPayload'
    auditTrail?: Maybe<AuditTrail>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateAuditTrailInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateAuditTrailPayload = {
    __typename?: 'updateAuditTrailPayload'
    auditTrail?: Maybe<AuditTrail>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateAuditTrailInput = {
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateAuditTrailPayload = {
    __typename?: 'createAuditTrailPayload'
    auditTrail?: Maybe<AuditTrail>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteChangeLogInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type DeleteChangeLogPayload = {
    __typename?: 'deleteChangeLogPayload'
    changeLog?: Maybe<ChangeLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateChangeLogInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type UpdateChangeLogPayload = {
    __typename?: 'updateChangeLogPayload'
    changeLog?: Maybe<ChangeLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateChangeLogInput = {
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource representing a log line. */
export type CreateChangeLogPayload = {
    __typename?: 'createChangeLogPayload'
    changeLog?: Maybe<ChangeLog>
    clientMutationId?: Maybe<Scalars['String']>
}
