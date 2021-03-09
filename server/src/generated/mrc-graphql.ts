import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
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
    application?: Maybe<Application>
    applications?: Maybe<ApplicationConnection>
    competence?: Maybe<Competence>
    competences?: Maybe<CompetenceConnection>
    contract?: Maybe<Contract>
    contracts?: Maybe<ContractConnection>
    education?: Maybe<Education>
    employee?: Maybe<Employee>
    employees?: Maybe<EmployeeConnection>
    goal?: Maybe<Goal>
    goals?: Maybe<GoalConnection>
    interest?: Maybe<Interest>
    interests?: Maybe<InterestConnection>
    jobFunction?: Maybe<JobFunction>
    jobFunctions?: Maybe<JobFunctionConnection>
    jobPosting?: Maybe<JobPosting>
    jobPostings?: Maybe<JobPostingConnection>
    skill?: Maybe<Skill>
    skills?: Maybe<SkillConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryApplicationArgs = {
    id: Scalars['ID']
}

export type QueryApplicationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ApplicationFilter_Order>
    dateCreated?: Maybe<ApplicationFilter_DateCreated>
    dateModified?: Maybe<ApplicationFilter_DateModified>
    employee_id?: Maybe<Scalars['String']>
    employee_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    jobPosting_id?: Maybe<Scalars['String']>
    jobPosting_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryCompetenceArgs = {
    id: Scalars['ID']
}

export type QueryCompetencesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<CompetenceFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    grade?: Maybe<Scalars['String']>
    grade_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryContractArgs = {
    id: Scalars['ID']
}

export type QueryContractsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ContractFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    employer?: Maybe<Scalars['String']>
    employer_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    standardHours?: Maybe<Scalars['Int']>
    standardHours_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    agreement?: Maybe<Scalars['String']>
    agreement_list?: Maybe<Array<Maybe<Scalars['String']>>>
    jobFunction?: Maybe<Scalars['String']>
    jobFunction_list?: Maybe<Array<Maybe<Scalars['String']>>>
    duration?: Maybe<Scalars['Int']>
    duration_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    salary?: Maybe<Scalars['Int']>
    salary_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryEducationArgs = {
    id: Scalars['ID']
}

export type QueryEmployeeArgs = {
    id: Scalars['ID']
}

export type QueryEmployeesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EmployeeFilter_Order>
    dateCreated?: Maybe<EmployeeFilter_DateCreated>
    dateModified?: Maybe<EmployeeFilter_DateModified>
    person?: Maybe<Scalars['String']>
    person_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryGoalArgs = {
    id: Scalars['ID']
}

export type QueryGoalsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<GoalFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    priority?: Maybe<Scalars['String']>
    priority_list?: Maybe<Array<Maybe<Scalars['String']>>>
    status?: Maybe<Scalars['String']>
    status_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryInterestArgs = {
    id: Scalars['ID']
}

export type QueryInterestsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<InterestFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryJobFunctionArgs = {
    id: Scalars['ID']
}

export type QueryJobFunctionsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<JobFunctionFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
    esco?: Maybe<Scalars['String']>
    esco_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryJobPostingArgs = {
    id: Scalars['ID']
}

export type QueryJobPostingsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<JobPostingFilter_Order>
    jobStartDate?: Maybe<JobPostingFilter_JobStartDate>
    validThrough?: Maybe<JobPostingFilter_ValidThrough>
    dateCreated?: Maybe<JobPostingFilter_DateCreated>
    dateModified?: Maybe<JobPostingFilter_DateModified>
    hiringOrganization?: Maybe<Scalars['String']>
    hiringOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    employmentType?: Maybe<Scalars['String']>
}

export type QuerySkillArgs = {
    id: Scalars['ID']
}

export type QuerySkillsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SkillFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    level?: Maybe<Scalars['String']>
    level_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
    esco?: Maybe<Scalars['String']>
    esco_list?: Maybe<Array<Maybe<Scalars['String']>>>
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

export type Application = Node & {
    __typename?: 'Application'
    id: Scalars['ID']
    /** the JobPosting associated to this application */
    jobPosting?: Maybe<JobPosting>
    /** Status of the application */
    status: Scalars['String']
    /** Motivation for the application */
    motivation: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    employee: Employee
}

export type JobPosting = Node & {
    __typename?: 'JobPosting'
    id: Scalars['ID']
    /** The name of this Job Posting */
    name: Scalars['String']
    /** The description of this JobPosting */
    description?: Maybe<Scalars['String']>
    /** The title of this Job Posting */
    title: Scalars['String']
    /** The type of employment **full-time**, **part-time**, **temporary**, **seasonal**, **internship** */
    employmentType: Scalars['String']
    /** The education requirements of this JobPosting */
    educationRequirements?: Maybe<Scalars['Iterable']>
    /** The summary requirements of this JobPosting */
    summary?: Maybe<Scalars['String']>
    /** Salary of the jobposting. */
    baseSalary?: Maybe<Scalars['Int']>
    /** The salary currency(coded using ISO 4217 ) of this jobPosting */
    salaryCurrency?: Maybe<Scalars['String']>
    /** A description of the job location (e.g TELECOMMUTE for telecommute jobs). */
    jobLocationType: Scalars['String']
    /** The organization that hires the person */
    hiringOrganization?: Maybe<Scalars['String']>
    /** The start date of the contract */
    jobStartDate: Scalars['String']
    /** The end date of the application procces */
    validThrough?: Maybe<Scalars['String']>
    /** The standard amount of hours per week for this JobPosting */
    standardHours: Scalars['Int']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type Employee = Node & {
    __typename?: 'Employee'
    id: Scalars['ID']
    /** The person that is employed */
    person: Scalars['String']
    /** The organisation where this person is employed */
    organization?: Maybe<Scalars['String']>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    goals?: Maybe<GoalConnection>
    interests?: Maybe<InterestConnection>
    competencies?: Maybe<CompetenceConnection>
    skills?: Maybe<SkillConnection>
    jobFunctions?: Maybe<JobFunctionConnection>
    contracts?: Maybe<ContractConnection>
    applications?: Maybe<ApplicationConnection>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeGoalsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<GoalFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    priority?: Maybe<Scalars['String']>
    priority_list?: Maybe<Array<Maybe<Scalars['String']>>>
    status?: Maybe<Scalars['String']>
    status_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeInterestsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<InterestFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeCompetenciesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<CompetenceFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    grade?: Maybe<Scalars['String']>
    grade_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeSkillsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SkillFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    level?: Maybe<Scalars['String']>
    level_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
    esco?: Maybe<Scalars['String']>
    esco_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeJobFunctionsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<JobFunctionFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
    esco?: Maybe<Scalars['String']>
    esco_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeContractsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ContractFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    employer?: Maybe<Scalars['String']>
    employer_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    standardHours?: Maybe<Scalars['Int']>
    standardHours_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    agreement?: Maybe<Scalars['String']>
    agreement_list?: Maybe<Array<Maybe<Scalars['String']>>>
    jobFunction?: Maybe<Scalars['String']>
    jobFunction_list?: Maybe<Array<Maybe<Scalars['String']>>>
    duration?: Maybe<Scalars['Int']>
    duration_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    salary?: Maybe<Scalars['Int']>
    salary_list?: Maybe<Array<Maybe<Scalars['Int']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type EmployeeApplicationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ApplicationFilter_Order>
    dateCreated?: Maybe<ApplicationFilter_DateCreated>
    dateModified?: Maybe<ApplicationFilter_DateModified>
    employee_id?: Maybe<Scalars['String']>
    employee_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    jobPosting_id?: Maybe<Scalars['String']>
    jobPosting_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type GoalFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Goal. */
export type GoalConnection = {
    __typename?: 'GoalConnection'
    edges?: Maybe<Array<Maybe<GoalEdge>>>
    pageInfo: GoalPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Goal. */
export type GoalEdge = {
    __typename?: 'GoalEdge'
    node?: Maybe<Goal>
    cursor: Scalars['String']
}

export type Goal = Node & {
    __typename?: 'Goal'
    id: Scalars['ID']
    /** name of the goal */
    name: Scalars['String']
    /** Description of the goal */
    description: Scalars['String']
    /** Priority of the goal **short-term**, **med-term**, **long-term** */
    priority: Scalars['String']
    /** Status of the goal */
    status: Scalars['String']
    /** The Employee to which this Goal belongs to */
    employee: Employee
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type GoalPageInfo = {
    __typename?: 'GoalPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type InterestFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Interest. */
export type InterestConnection = {
    __typename?: 'InterestConnection'
    edges?: Maybe<Array<Maybe<InterestEdge>>>
    pageInfo: InterestPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Interest. */
export type InterestEdge = {
    __typename?: 'InterestEdge'
    node?: Maybe<Interest>
    cursor: Scalars['String']
}

export type Interest = Node & {
    __typename?: 'Interest'
    id: Scalars['ID']
    /** Name of the interest */
    name: Scalars['String']
    /** Description of the interest */
    description: Scalars['String']
    /** The Employee to which this Interest belongs to */
    employee: Employee
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type InterestPageInfo = {
    __typename?: 'InterestPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type CompetenceFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    grade?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Competence. */
export type CompetenceConnection = {
    __typename?: 'CompetenceConnection'
    edges?: Maybe<Array<Maybe<CompetenceEdge>>>
    pageInfo: CompetencePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Competence. */
export type CompetenceEdge = {
    __typename?: 'CompetenceEdge'
    node?: Maybe<Competence>
    cursor: Scalars['String']
}

export type Competence = Node & {
    __typename?: 'Competence'
    id: Scalars['ID']
    /** name of the competence */
    name: Scalars['String']
    /** Description of the competence */
    description: Scalars['String']
    /** Grade of the competence */
    grade: Scalars['String']
    /** The Employee to which this Competence belongs to */
    employee?: Maybe<Employee>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type CompetencePageInfo = {
    __typename?: 'CompetencePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type SkillFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    level?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    esco?: Maybe<Scalars['String']>
}

/** Connection for Skill. */
export type SkillConnection = {
    __typename?: 'SkillConnection'
    edges?: Maybe<Array<Maybe<SkillEdge>>>
    pageInfo: SkillPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Skill. */
export type SkillEdge = {
    __typename?: 'SkillEdge'
    node?: Maybe<Skill>
    cursor: Scalars['String']
}

export type Skill = Node & {
    __typename?: 'Skill'
    id: Scalars['ID']
    /** Name of the Skill */
    name: Scalars['String']
    /** Description of the skill */
    description: Scalars['String']
    /** Level of the skill **beginner**, **intermediate**, **advanced** */
    level: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** The ESCO where this Skill is related too */
    esco?: Maybe<Scalars['String']>
    /** The Employee to which this skill belongs to */
    employee?: Maybe<Employee>
}

/** Information about the current page. */
export type SkillPageInfo = {
    __typename?: 'SkillPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type JobFunctionFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    esco?: Maybe<Scalars['String']>
}

/** Connection for JobFunction. */
export type JobFunctionConnection = {
    __typename?: 'JobFunctionConnection'
    edges?: Maybe<Array<Maybe<JobFunctionEdge>>>
    pageInfo: JobFunctionPageInfo
    totalCount: Scalars['Int']
}

/** Edge of JobFunction. */
export type JobFunctionEdge = {
    __typename?: 'JobFunctionEdge'
    node?: Maybe<JobFunction>
    cursor: Scalars['String']
}

export type JobFunction = Node & {
    __typename?: 'JobFunction'
    id: Scalars['ID']
    /** Name of the Job Function */
    name: Scalars['String']
    /** Description of the Job Function */
    description: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** The ESCO where this Jobfunction is related too */
    esco?: Maybe<Scalars['String']>
    /** The Employee to which this jobFunction belongs to */
    employee: Employee
}

/** Information about the current page. */
export type JobFunctionPageInfo = {
    __typename?: 'JobFunctionPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ContractFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    employer?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    standardHours?: Maybe<Scalars['String']>
    agreement?: Maybe<Scalars['String']>
    jobFunction?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    salary?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Contract. */
export type ContractConnection = {
    __typename?: 'ContractConnection'
    edges?: Maybe<Array<Maybe<ContractEdge>>>
    pageInfo: ContractPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Contract. */
export type ContractEdge = {
    __typename?: 'ContractEdge'
    node?: Maybe<Contract>
    cursor: Scalars['String']
}

export type Contract = Node & {
    __typename?: 'Contract'
    id: Scalars['ID']
    /** Name of the contract */
    name: Scalars['String']
    /** Description of the contract */
    description: Scalars['String']
    /** name of the employer */
    employer: Scalars['String']
    /** The organisation where this contract belongs to */
    organization: Scalars['String']
    /** The standard amount of hours per week for this contract */
    standardHours: Scalars['Int']
    /** agreement of the contract */
    agreement: Scalars['String']
    /** function of the contract */
    jobFunction: Scalars['String']
    /** how many months the contract is set to. */
    duration: Scalars['Int']
    /** Salary of the function. */
    salary: Scalars['Int']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** The Employee to which this contract belongs to */
    employee: Employee
}

/** Information about the current page. */
export type ContractPageInfo = {
    __typename?: 'ContractPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ApplicationFilter_Order = {
    id?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    motivation?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ApplicationFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ApplicationFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Application. */
export type ApplicationConnection = {
    __typename?: 'ApplicationConnection'
    edges?: Maybe<Array<Maybe<ApplicationEdge>>>
    pageInfo: ApplicationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Application. */
export type ApplicationEdge = {
    __typename?: 'ApplicationEdge'
    node?: Maybe<Application>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ApplicationPageInfo = {
    __typename?: 'ApplicationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Education = Node & {
    __typename?: 'Education'
    id: Scalars['ID']
    /** The moment this education starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this education ends. */
    endDate?: Maybe<Scalars['String']>
    /** The institution of this Education. */
    institution?: Maybe<Scalars['String']>
    /** The degree granted status of this education. **Granted**, **notGranted** */
    degreeGrantedStatus?: Maybe<Scalars['String']>
    /** The Isced Education Level Code of this Education. */
    iscedEducationLevelCode?: Maybe<Scalars['String']>
}

export type EmployeeFilter_Order = {
    id?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type EmployeeFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type EmployeeFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Employee. */
export type EmployeeConnection = {
    __typename?: 'EmployeeConnection'
    edges?: Maybe<Array<Maybe<EmployeeEdge>>>
    pageInfo: EmployeePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Employee. */
export type EmployeeEdge = {
    __typename?: 'EmployeeEdge'
    node?: Maybe<Employee>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type EmployeePageInfo = {
    __typename?: 'EmployeePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type JobPostingFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    title?: Maybe<Scalars['String']>
    employmentType?: Maybe<Scalars['String']>
    educationRequirements?: Maybe<Scalars['String']>
    summary?: Maybe<Scalars['String']>
    baseSalary?: Maybe<Scalars['String']>
    salaryCurrency?: Maybe<Scalars['String']>
    jobLocationType?: Maybe<Scalars['String']>
    hiringOrganization?: Maybe<Scalars['String']>
    jobStartDate?: Maybe<Scalars['String']>
    validThrough?: Maybe<Scalars['String']>
    standardHours?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type JobPostingFilter_JobStartDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type JobPostingFilter_ValidThrough = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type JobPostingFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type JobPostingFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for JobPosting. */
export type JobPostingConnection = {
    __typename?: 'JobPostingConnection'
    edges?: Maybe<Array<Maybe<JobPostingEdge>>>
    pageInfo: JobPostingPageInfo
    totalCount: Scalars['Int']
}

/** Edge of JobPosting. */
export type JobPostingEdge = {
    __typename?: 'JobPostingEdge'
    node?: Maybe<JobPosting>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type JobPostingPageInfo = {
    __typename?: 'JobPostingPageInfo'
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
    /** Deletes a Application. */
    deleteApplication?: Maybe<DeleteApplicationPayload>
    /** Updates a Application. */
    updateApplication?: Maybe<UpdateApplicationPayload>
    /** Creates a Application. */
    createApplication?: Maybe<CreateApplicationPayload>
    /** Deletes a Competence. */
    deleteCompetence?: Maybe<DeleteCompetencePayload>
    /** Updates a Competence. */
    updateCompetence?: Maybe<UpdateCompetencePayload>
    /** Creates a Competence. */
    createCompetence?: Maybe<CreateCompetencePayload>
    /** Deletes a Contract. */
    deleteContract?: Maybe<DeleteContractPayload>
    /** Updates a Contract. */
    updateContract?: Maybe<UpdateContractPayload>
    /** Creates a Contract. */
    createContract?: Maybe<CreateContractPayload>
    /** Deletes a Education. */
    deleteEducation?: Maybe<DeleteEducationPayload>
    /** Updates a Education. */
    updateEducation?: Maybe<UpdateEducationPayload>
    /** Creates a Education. */
    createEducation?: Maybe<CreateEducationPayload>
    /** Deletes a Employee. */
    deleteEmployee?: Maybe<DeleteEmployeePayload>
    /** Updates a Employee. */
    updateEmployee?: Maybe<UpdateEmployeePayload>
    /** Creates a Employee. */
    createEmployee?: Maybe<CreateEmployeePayload>
    /** Deletes a Goal. */
    deleteGoal?: Maybe<DeleteGoalPayload>
    /** Updates a Goal. */
    updateGoal?: Maybe<UpdateGoalPayload>
    /** Creates a Goal. */
    createGoal?: Maybe<CreateGoalPayload>
    /** Deletes a Interest. */
    deleteInterest?: Maybe<DeleteInterestPayload>
    /** Updates a Interest. */
    updateInterest?: Maybe<UpdateInterestPayload>
    /** Creates a Interest. */
    createInterest?: Maybe<CreateInterestPayload>
    /** Deletes a JobFunction. */
    deleteJobFunction?: Maybe<DeleteJobFunctionPayload>
    /** Updates a JobFunction. */
    updateJobFunction?: Maybe<UpdateJobFunctionPayload>
    /** Creates a JobFunction. */
    createJobFunction?: Maybe<CreateJobFunctionPayload>
    /** Deletes a JobPosting. */
    deleteJobPosting?: Maybe<DeleteJobPostingPayload>
    /** Updates a JobPosting. */
    updateJobPosting?: Maybe<UpdateJobPostingPayload>
    /** Creates a JobPosting. */
    createJobPosting?: Maybe<CreateJobPostingPayload>
    /** Deletes a Skill. */
    deleteSkill?: Maybe<DeleteSkillPayload>
    /** Updates a Skill. */
    updateSkill?: Maybe<UpdateSkillPayload>
    /** Creates a Skill. */
    createSkill?: Maybe<CreateSkillPayload>
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

export type MutationDeleteApplicationArgs = {
    input: DeleteApplicationInput
}

export type MutationUpdateApplicationArgs = {
    input: UpdateApplicationInput
}

export type MutationCreateApplicationArgs = {
    input: CreateApplicationInput
}

export type MutationDeleteCompetenceArgs = {
    input: DeleteCompetenceInput
}

export type MutationUpdateCompetenceArgs = {
    input: UpdateCompetenceInput
}

export type MutationCreateCompetenceArgs = {
    input: CreateCompetenceInput
}

export type MutationDeleteContractArgs = {
    input: DeleteContractInput
}

export type MutationUpdateContractArgs = {
    input: UpdateContractInput
}

export type MutationCreateContractArgs = {
    input: CreateContractInput
}

export type MutationDeleteEducationArgs = {
    input: DeleteEducationInput
}

export type MutationUpdateEducationArgs = {
    input: UpdateEducationInput
}

export type MutationCreateEducationArgs = {
    input: CreateEducationInput
}

export type MutationDeleteEmployeeArgs = {
    input: DeleteEmployeeInput
}

export type MutationUpdateEmployeeArgs = {
    input: UpdateEmployeeInput
}

export type MutationCreateEmployeeArgs = {
    input: CreateEmployeeInput
}

export type MutationDeleteGoalArgs = {
    input: DeleteGoalInput
}

export type MutationUpdateGoalArgs = {
    input: UpdateGoalInput
}

export type MutationCreateGoalArgs = {
    input: CreateGoalInput
}

export type MutationDeleteInterestArgs = {
    input: DeleteInterestInput
}

export type MutationUpdateInterestArgs = {
    input: UpdateInterestInput
}

export type MutationCreateInterestArgs = {
    input: CreateInterestInput
}

export type MutationDeleteJobFunctionArgs = {
    input: DeleteJobFunctionInput
}

export type MutationUpdateJobFunctionArgs = {
    input: UpdateJobFunctionInput
}

export type MutationCreateJobFunctionArgs = {
    input: CreateJobFunctionInput
}

export type MutationDeleteJobPostingArgs = {
    input: DeleteJobPostingInput
}

export type MutationUpdateJobPostingArgs = {
    input: UpdateJobPostingInput
}

export type MutationCreateJobPostingArgs = {
    input: CreateJobPostingInput
}

export type MutationDeleteSkillArgs = {
    input: DeleteSkillInput
}

export type MutationUpdateSkillArgs = {
    input: UpdateSkillInput
}

export type MutationCreateSkillArgs = {
    input: CreateSkillInput
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

export type DeleteApplicationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteApplicationPayload = {
    __typename?: 'deleteApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateApplicationInput = {
    id: Scalars['ID']
    /** the JobPosting associated to this application */
    jobPosting?: Maybe<Scalars['String']>
    /** Status of the application */
    status?: Maybe<Scalars['String']>
    /** Motivation for the application */
    motivation?: Maybe<Scalars['String']>
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateApplicationPayload = {
    __typename?: 'updateApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateApplicationInput = {
    /** the JobPosting associated to this application */
    jobPosting?: Maybe<Scalars['String']>
    /** Status of the application */
    status: Scalars['String']
    /** Motivation for the application */
    motivation: Scalars['String']
    employee: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateApplicationPayload = {
    __typename?: 'createApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteCompetenceInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteCompetencePayload = {
    __typename?: 'deleteCompetencePayload'
    competence?: Maybe<Competence>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateCompetenceInput = {
    id: Scalars['ID']
    /** name of the competence */
    name?: Maybe<Scalars['String']>
    /** Description of the competence */
    description?: Maybe<Scalars['String']>
    /** Grade of the competence */
    grade?: Maybe<Scalars['String']>
    /** The Employee to which this Competence belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateCompetencePayload = {
    __typename?: 'updateCompetencePayload'
    competence?: Maybe<Competence>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateCompetenceInput = {
    /** name of the competence */
    name: Scalars['String']
    /** Description of the competence */
    description: Scalars['String']
    /** Grade of the competence */
    grade: Scalars['String']
    /** The Employee to which this Competence belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateCompetencePayload = {
    __typename?: 'createCompetencePayload'
    competence?: Maybe<Competence>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteContractInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteContractPayload = {
    __typename?: 'deleteContractPayload'
    contract?: Maybe<Contract>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateContractInput = {
    id: Scalars['ID']
    /** Name of the contract */
    name?: Maybe<Scalars['String']>
    /** Description of the contract */
    description?: Maybe<Scalars['String']>
    /** name of the employer */
    employer?: Maybe<Scalars['String']>
    /** The organisation where this contract belongs to */
    organization?: Maybe<Scalars['String']>
    /** The standard amount of hours per week for this contract */
    standardHours?: Maybe<Scalars['Int']>
    /** agreement of the contract */
    agreement?: Maybe<Scalars['String']>
    /** function of the contract */
    jobFunction?: Maybe<Scalars['String']>
    /** how many months the contract is set to. */
    duration?: Maybe<Scalars['Int']>
    /** Salary of the function. */
    salary?: Maybe<Scalars['Int']>
    /** The Employee to which this contract belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateContractPayload = {
    __typename?: 'updateContractPayload'
    contract?: Maybe<Contract>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateContractInput = {
    /** Name of the contract */
    name: Scalars['String']
    /** Description of the contract */
    description: Scalars['String']
    /** name of the employer */
    employer: Scalars['String']
    /** The organisation where this contract belongs to */
    organization: Scalars['String']
    /** The standard amount of hours per week for this contract */
    standardHours: Scalars['Int']
    /** agreement of the contract */
    agreement: Scalars['String']
    /** function of the contract */
    jobFunction: Scalars['String']
    /** how many months the contract is set to. */
    duration: Scalars['Int']
    /** Salary of the function. */
    salary: Scalars['Int']
    /** The Employee to which this contract belongs to */
    employee: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateContractPayload = {
    __typename?: 'createContractPayload'
    contract?: Maybe<Contract>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteEducationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteEducationPayload = {
    __typename?: 'deleteEducationPayload'
    education?: Maybe<Education>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateEducationInput = {
    id: Scalars['ID']
    /** The moment this education starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this education ends. */
    endDate?: Maybe<Scalars['String']>
    /** The institution of this Education. */
    institution?: Maybe<Scalars['String']>
    /** The degree granted status of this education. **Granted**, **notGranted** */
    degreeGrantedStatus?: Maybe<Scalars['String']>
    /** The Isced Education Level Code of this Education. */
    iscedEducationLevelCode?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateEducationPayload = {
    __typename?: 'updateEducationPayload'
    education?: Maybe<Education>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateEducationInput = {
    /** The moment this education starts. */
    startDate?: Maybe<Scalars['String']>
    /** The moment this education ends. */
    endDate?: Maybe<Scalars['String']>
    /** The institution of this Education. */
    institution?: Maybe<Scalars['String']>
    /** The degree granted status of this education. **Granted**, **notGranted** */
    degreeGrantedStatus?: Maybe<Scalars['String']>
    /** The Isced Education Level Code of this Education. */
    iscedEducationLevelCode?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateEducationPayload = {
    __typename?: 'createEducationPayload'
    education?: Maybe<Education>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type DeleteEmployeeInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type DeleteEmployeePayload = {
    __typename?: 'deleteEmployeePayload'
    employee?: Maybe<Employee>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type UpdateEmployeeInput = {
    id: Scalars['ID']
    /** The person that is employed */
    person?: Maybe<Scalars['String']>
    /** The organisation where this person is employed */
    organization?: Maybe<Scalars['String']>
    goals?: Maybe<Array<Maybe<Scalars['String']>>>
    interests?: Maybe<Array<Maybe<Scalars['String']>>>
    skills?: Maybe<Array<Maybe<Scalars['String']>>>
    jobFunctions?: Maybe<Array<Maybe<Scalars['String']>>>
    contracts?: Maybe<Array<Maybe<Scalars['String']>>>
    applications?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type UpdateEmployeePayload = {
    __typename?: 'updateEmployeePayload'
    employee?: Maybe<Employee>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type CreateEmployeeInput = {
    /** The person that is employed */
    person: Scalars['String']
    /** The organisation where this person is employed */
    organization?: Maybe<Scalars['String']>
    goals?: Maybe<Array<Maybe<Scalars['String']>>>
    interests?: Maybe<Array<Maybe<Scalars['String']>>>
    skills?: Maybe<Array<Maybe<Scalars['String']>>>
    jobFunctions?: Maybe<Array<Maybe<Scalars['String']>>>
    contracts?: Maybe<Array<Maybe<Scalars['String']>>>
    applications?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Employee holds. An Employee is a human with goals, skills and/or interests. */
export type CreateEmployeePayload = {
    __typename?: 'createEmployeePayload'
    employee?: Maybe<Employee>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteGoalInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteGoalPayload = {
    __typename?: 'deleteGoalPayload'
    goal?: Maybe<Goal>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateGoalInput = {
    id: Scalars['ID']
    /** name of the goal */
    name?: Maybe<Scalars['String']>
    /** Description of the goal */
    description?: Maybe<Scalars['String']>
    /** Priority of the goal **short-term**, **med-term**, **long-term** */
    priority?: Maybe<Scalars['String']>
    /** Status of the goal */
    status?: Maybe<Scalars['String']>
    /** The Employee to which this Goal belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateGoalPayload = {
    __typename?: 'updateGoalPayload'
    goal?: Maybe<Goal>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateGoalInput = {
    /** name of the goal */
    name: Scalars['String']
    /** Description of the goal */
    description: Scalars['String']
    /** Priority of the goal **short-term**, **med-term**, **long-term** */
    priority: Scalars['String']
    /** Status of the goal */
    status: Scalars['String']
    /** The Employee to which this Goal belongs to */
    employee: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateGoalPayload = {
    __typename?: 'createGoalPayload'
    goal?: Maybe<Goal>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteInterestInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteInterestPayload = {
    __typename?: 'deleteInterestPayload'
    interest?: Maybe<Interest>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateInterestInput = {
    id: Scalars['ID']
    /** Name of the interest */
    name?: Maybe<Scalars['String']>
    /** Description of the interest */
    description?: Maybe<Scalars['String']>
    /** The Employee to which this Interest belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateInterestPayload = {
    __typename?: 'updateInterestPayload'
    interest?: Maybe<Interest>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateInterestInput = {
    /** Name of the interest */
    name: Scalars['String']
    /** Description of the interest */
    description: Scalars['String']
    /** The Employee to which this Interest belongs to */
    employee: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateInterestPayload = {
    __typename?: 'createInterestPayload'
    interest?: Maybe<Interest>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteJobFunctionInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteJobFunctionPayload = {
    __typename?: 'deleteJobFunctionPayload'
    jobFunction?: Maybe<JobFunction>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateJobFunctionInput = {
    id: Scalars['ID']
    /** Name of the Job Function */
    name?: Maybe<Scalars['String']>
    /** Description of the Job Function */
    description?: Maybe<Scalars['String']>
    /** The ESCO where this Jobfunction is related too */
    esco?: Maybe<Scalars['String']>
    /** The Employee to which this jobFunction belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateJobFunctionPayload = {
    __typename?: 'updateJobFunctionPayload'
    jobFunction?: Maybe<JobFunction>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateJobFunctionInput = {
    /** Name of the Job Function */
    name: Scalars['String']
    /** Description of the Job Function */
    description: Scalars['String']
    /** The ESCO where this Jobfunction is related too */
    esco?: Maybe<Scalars['String']>
    /** The Employee to which this jobFunction belongs to */
    employee: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateJobFunctionPayload = {
    __typename?: 'createJobFunctionPayload'
    jobFunction?: Maybe<JobFunction>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteJobPostingInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteJobPostingPayload = {
    __typename?: 'deleteJobPostingPayload'
    jobPosting?: Maybe<JobPosting>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateJobPostingInput = {
    id: Scalars['ID']
    /** The name of this Job Posting */
    name?: Maybe<Scalars['String']>
    /** The description of this JobPosting */
    description?: Maybe<Scalars['String']>
    /** The title of this Job Posting */
    title?: Maybe<Scalars['String']>
    /** The type of employment **full-time**, **part-time**, **temporary**, **seasonal**, **internship** */
    employmentType?: Maybe<Scalars['String']>
    /** The education requirements of this JobPosting */
    educationRequirements?: Maybe<Scalars['Iterable']>
    /** The summary requirements of this JobPosting */
    summary?: Maybe<Scalars['String']>
    /** Salary of the jobposting. */
    baseSalary?: Maybe<Scalars['Int']>
    /** The salary currency(coded using ISO 4217 ) of this jobPosting */
    salaryCurrency?: Maybe<Scalars['String']>
    /** A description of the job location (e.g TELECOMMUTE for telecommute jobs). */
    jobLocationType?: Maybe<Scalars['String']>
    /** The organization that hires the person */
    hiringOrganization?: Maybe<Scalars['String']>
    /** The start date of the contract */
    jobStartDate?: Maybe<Scalars['String']>
    /** The end date of the application procces */
    validThrough?: Maybe<Scalars['String']>
    /** The standard amount of hours per week for this JobPosting */
    standardHours?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateJobPostingPayload = {
    __typename?: 'updateJobPostingPayload'
    jobPosting?: Maybe<JobPosting>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateJobPostingInput = {
    /** The name of this Job Posting */
    name: Scalars['String']
    /** The description of this JobPosting */
    description?: Maybe<Scalars['String']>
    /** The title of this Job Posting */
    title: Scalars['String']
    /** The type of employment **full-time**, **part-time**, **temporary**, **seasonal**, **internship** */
    employmentType: Scalars['String']
    /** The education requirements of this JobPosting */
    educationRequirements?: Maybe<Scalars['Iterable']>
    /** The summary requirements of this JobPosting */
    summary?: Maybe<Scalars['String']>
    /** Salary of the jobposting. */
    baseSalary?: Maybe<Scalars['Int']>
    /** The salary currency(coded using ISO 4217 ) of this jobPosting */
    salaryCurrency?: Maybe<Scalars['String']>
    /** A description of the job location (e.g TELECOMMUTE for telecommute jobs). */
    jobLocationType: Scalars['String']
    /** The organization that hires the person */
    hiringOrganization?: Maybe<Scalars['String']>
    /** The start date of the contract */
    jobStartDate: Scalars['String']
    /** The end date of the application procces */
    validThrough?: Maybe<Scalars['String']>
    /** The standard amount of hours per week for this JobPosting */
    standardHours: Scalars['Int']
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateJobPostingPayload = {
    __typename?: 'createJobPostingPayload'
    jobPosting?: Maybe<JobPosting>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteSkillInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteSkillPayload = {
    __typename?: 'deleteSkillPayload'
    skill?: Maybe<Skill>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateSkillInput = {
    id: Scalars['ID']
    /** Name of the Skill */
    name?: Maybe<Scalars['String']>
    /** Description of the skill */
    description?: Maybe<Scalars['String']>
    /** Level of the skill **beginner**, **intermediate**, **advanced** */
    level?: Maybe<Scalars['String']>
    /** The ESCO where this Skill is related too */
    esco?: Maybe<Scalars['String']>
    /** The Employee to which this skill belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateSkillPayload = {
    __typename?: 'updateSkillPayload'
    skill?: Maybe<Skill>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateSkillInput = {
    /** Name of the Skill */
    name: Scalars['String']
    /** Description of the skill */
    description: Scalars['String']
    /** Level of the skill **beginner**, **intermediate**, **advanced** */
    level: Scalars['String']
    /** The ESCO where this Skill is related too */
    esco?: Maybe<Scalars['String']>
    /** The Employee to which this skill belongs to */
    employee?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateSkillPayload = {
    __typename?: 'createSkillPayload'
    skill?: Maybe<Skill>
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

export type CreateEmployeeMutationVariables = Exact<{
    input: CreateEmployeeInput
}>

export type CreateEmployeeMutation = { __typename?: 'Mutation' } & {
    createEmployee?: Maybe<
        { __typename?: 'createEmployeePayload' } & {
            employee?: Maybe<{ __typename?: 'Employee' } & Pick<Employee, 'id'>>
        }
    >
}

export type DeleteEmployeeMutationVariables = Exact<{
    input: DeleteEmployeeInput
}>

export type DeleteEmployeeMutation = { __typename?: 'Mutation' } & {
    deleteEmployee?: Maybe<
        { __typename?: 'deleteEmployeePayload' } & {
            employee?: Maybe<{ __typename?: 'Employee' } & Pick<Employee, 'id'>>
        }
    >
}

export type EmployeeQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type EmployeeQuery = { __typename?: 'Query' } & {
    employee?: Maybe<{ __typename?: 'Employee' } & Pick<Employee, 'id' | 'person' | 'organization'>>
}

export type EmployeesQueryVariables = Exact<{
    organizationId?: Maybe<Scalars['String']>
}>

export type EmployeesQuery = { __typename?: 'Query' } & {
    employees?: Maybe<
        { __typename?: 'EmployeeConnection' } & Pick<EmployeeConnection, 'totalCount'> & {
                edges?: Maybe<
                    Array<
                        Maybe<
                            { __typename?: 'EmployeeEdge' } & {
                                node?: Maybe<
                                    { __typename?: 'Employee' } & Pick<Employee, 'id' | 'person' | 'organization'>
                                >
                            }
                        >
                    >
                >
            }
    >
}

export const CreateEmployeeDocument = gql`
    mutation createEmployee($input: createEmployeeInput!) {
        createEmployee(input: $input) {
            employee {
                id
            }
        }
    }
`
export const DeleteEmployeeDocument = gql`
    mutation deleteEmployee($input: deleteEmployeeInput!) {
        deleteEmployee(input: $input) {
            employee {
                id
            }
        }
    }
`
export const EmployeeDocument = gql`
    query employee($id: ID!) {
        employee(id: $id) {
            id
            person
            organization
        }
    }
`
export const EmployeesDocument = gql`
    query employees($organizationId: String) {
        employees(organization: $organizationId) {
            totalCount
            edges {
                node {
                    id
                    person
                    organization
                }
            }
        }
    }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction()
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        createEmployee(
            variables: CreateEmployeeMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateEmployeeMutation> {
            return withWrapper(() =>
                client.request<CreateEmployeeMutation>(print(CreateEmployeeDocument), variables, requestHeaders)
            )
        },
        deleteEmployee(
            variables: DeleteEmployeeMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteEmployeeMutation> {
            return withWrapper(() =>
                client.request<DeleteEmployeeMutation>(print(DeleteEmployeeDocument), variables, requestHeaders)
            )
        },
        employee(
            variables: EmployeeQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<EmployeeQuery> {
            return withWrapper(() => client.request<EmployeeQuery>(print(EmployeeDocument), variables, requestHeaders))
        },
        employees(
            variables?: EmployeesQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<EmployeesQuery> {
            return withWrapper(() =>
                client.request<EmployeesQuery>(print(EmployeesDocument), variables, requestHeaders)
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
