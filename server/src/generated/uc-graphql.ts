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
    alert?: Maybe<Alert>
    alerts?: Maybe<AlertConnection>
    application?: Maybe<Application>
    applications?: Maybe<ApplicationConnection>
    group?: Maybe<Group>
    groups?: Maybe<GroupConnection>
    loginLog?: Maybe<LoginLog>
    loginLogs?: Maybe<LoginLogConnection>
    provider?: Maybe<Provider>
    providers?: Maybe<ProviderConnection>
    scope?: Maybe<Scope>
    scopes?: Maybe<ScopeConnection>
    token?: Maybe<Token>
    tokens?: Maybe<TokenConnection>
    user?: Maybe<User>
    users?: Maybe<UserConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryAlertArgs = {
    id: Scalars['ID']
}

export type QueryAlertsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AlertFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    dateRead?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
    icon?: Maybe<Scalars['String']>
    icon_list?: Maybe<Array<Maybe<Scalars['String']>>>
    link?: Maybe<Scalars['String']>
    link_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateRead_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryGroupArgs = {
    id: Scalars['ID']
}

export type QueryGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    order?: Maybe<GroupFilter_Order>
    dateCreated?: Maybe<GroupFilter_DateCreated>
    dateModified?: Maybe<GroupFilter_DateModified>
    organization?: Maybe<Scalars['String']>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryLoginLogArgs = {
    id: Scalars['ID']
}

export type QueryLoginLogsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<LoginLogFilter_Order>
    dateCreated?: Maybe<LoginLogFilter_DateCreated>
    dateModified?: Maybe<LoginLogFilter_DateModified>
    address?: Maybe<Scalars['String']>
    address_list?: Maybe<Array<Maybe<Scalars['String']>>>
    method?: Maybe<Scalars['String']>
    method_list?: Maybe<Array<Maybe<Scalars['String']>>>
    status?: Maybe<Scalars['String']>
    status_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryProviderArgs = {
    id: Scalars['ID']
}

export type QueryProvidersArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ProviderFilter_Order>
    dateCreated?: Maybe<ProviderFilter_DateCreated>
    dateModified?: Maybe<ProviderFilter_DateModified>
    name?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    application?: Maybe<Scalars['String']>
}

export type QueryScopeArgs = {
    id: Scalars['ID']
}

export type QueryScopesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ScopeFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryTokenArgs = {
    id: Scalars['ID']
}

export type QueryTokensArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TokenFilter_Order>
    validTill?: Maybe<TokenFilter_ValidTill>
    dateAccepted?: Maybe<TokenFilter_DateAccepted>
    dateCreated?: Maybe<TokenFilter_DateCreated>
    dateModified?: Maybe<TokenFilter_DateModified>
    provider_name?: Maybe<Scalars['String']>
    provider_name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    provider_type?: Maybe<Scalars['String']>
    provider_type_list?: Maybe<Array<Maybe<Scalars['String']>>>
    provider_application?: Maybe<Scalars['String']>
    token?: Maybe<Scalars['String']>
    token_list?: Maybe<Array<Maybe<Scalars['String']>>>
    user_username?: Maybe<Scalars['String']>
    user_username_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryUserArgs = {
    id: Scalars['ID']
}

export type QueryUsersArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<UserFilter_Order>
    dateCreated?: Maybe<UserFilter_DateCreated>
    dateModified?: Maybe<UserFilter_DateModified>
    username?: Maybe<Scalars['String']>
    username_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
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

/** All properties that the entity Alert holds. */
export type Alert = Node & {
    __typename?: 'Alert'
    id: Scalars['ID']
    /** The name of this Alert */
    name: Scalars['String']
    /** The description of this Alert. */
    description?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** The type of this Alert. */
    type?: Maybe<Scalars['String']>
    /** The flaticon of this Alert, in the form of Font Awesome. https://fontawesome.com/ */
    icon?: Maybe<Scalars['String']>
    /** An URL/link pointing to configuration which this alert relates to */
    link?: Maybe<Scalars['String']>
    /** The moment this Alert has been read */
    dateRead?: Maybe<Scalars['String']>
}

export type AlertFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    icon?: Maybe<Scalars['String']>
    link?: Maybe<Scalars['String']>
    dateRead?: Maybe<Scalars['String']>
}

/** Connection for Alert. */
export type AlertConnection = {
    __typename?: 'AlertConnection'
    edges?: Maybe<Array<Maybe<AlertEdge>>>
    pageInfo: AlertPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Alert. */
export type AlertEdge = {
    __typename?: 'AlertEdge'
    node?: Maybe<Alert>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AlertPageInfo = {
    __typename?: 'AlertPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** All properties that the entity Application holds. */
export type Application = Node & {
    __typename?: 'Application'
    id: Scalars['ID']
    /** The RSIN of the organization that owns this application */
    organization: Scalars['String']
    /** The name of this application */
    name: Scalars['String']
    /** The description of this application. */
    description: Scalars['String']
    /** A list of scopes that are posible on this application. */
    scopes?: Maybe<ScopeConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type ApplicationScopesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ScopeFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ScopeFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    code?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Scope. */
export type ScopeConnection = {
    __typename?: 'ScopeConnection'
    edges?: Maybe<Array<Maybe<ScopeEdge>>>
    pageInfo: ScopePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Scope. */
export type ScopeEdge = {
    __typename?: 'ScopeEdge'
    node?: Maybe<Scope>
    cursor: Scalars['String']
}

/** All properties that the entity User holds. */
export type Scope = Node & {
    __typename?: 'Scope'
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this scope */
    name: Scalars['String']
    /** The description of this scope. */
    description?: Maybe<Scalars['String']>
    /** The code of this scope */
    code: Scalars['String']
    /** application this scope belongs to. */
    application?: Maybe<Application>
    /** User groups that give this scope. */
    userGroups?: Maybe<GroupConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type ScopeUserGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    order?: Maybe<GroupFilter_Order>
    dateCreated?: Maybe<GroupFilter_DateCreated>
    dateModified?: Maybe<GroupFilter_DateModified>
    organization?: Maybe<Scalars['String']>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type GroupFilter_Order = {
    id?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    title?: Maybe<Scalars['String']>
    code?: Maybe<Scalars['String']>
    canBeRegisteredFor?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type GroupFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type GroupFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
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

/** A user Group. */
export type Group = Node & {
    __typename?: 'Group'
    id: Scalars['ID']
    /** A specific commonground organization */
    organization: Scalars['String']
    /** The name of this group */
    name: Scalars['String']
    /** The description of this group. */
    description: Scalars['String']
    /** The title of this group */
    title?: Maybe<Scalars['String']>
    /** The code of this scope */
    code: Scalars['String']
    /** Whether or not new users can be registered for this group */
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    /** Groups that are a part of this group */
    children?: Maybe<GroupConnection>
    /** The scopes that members of this group have */
    scopes?: Maybe<ScopeConnection>
    /** The users that belong to this group */
    users?: Maybe<UserConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** A user Group. */
export type GroupChildrenArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    order?: Maybe<GroupFilter_Order>
    dateCreated?: Maybe<GroupFilter_DateCreated>
    dateModified?: Maybe<GroupFilter_DateModified>
    organization?: Maybe<Scalars['String']>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A user Group. */
export type GroupScopesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ScopeFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A user Group. */
export type GroupUsersArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<UserFilter_Order>
    dateCreated?: Maybe<UserFilter_DateCreated>
    dateModified?: Maybe<UserFilter_DateModified>
    username?: Maybe<Scalars['String']>
    username_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
}

export type UserFilter_Order = {
    id?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    username?: Maybe<Scalars['String']>
    locale?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
    password?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type UserFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type UserFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for User. */
export type UserConnection = {
    __typename?: 'UserConnection'
    edges?: Maybe<Array<Maybe<UserEdge>>>
    pageInfo: UserPageInfo
    totalCount: Scalars['Int']
}

/** Edge of User. */
export type UserEdge = {
    __typename?: 'UserEdge'
    node?: Maybe<User>
    cursor: Scalars['String']
}

/** All properties that the entity User holds. */
export type User = Node & {
    __typename?: 'User'
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** A contact component person */
    person?: Maybe<Scalars['String']>
    /** A unique visual identifier that represents this user. */
    username: Scalars['String']
    /** A iso code reprecenting theusers language */
    locale: Scalars['String']
    roles: Scalars['Iterable']
    /** A list of groups to wichs this user belongs */
    userGroups?: Maybe<GroupConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type UserUserGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    order?: Maybe<GroupFilter_Order>
    dateCreated?: Maybe<GroupFilter_DateCreated>
    dateModified?: Maybe<GroupFilter_DateModified>
    organization?: Maybe<Scalars['String']>
    code?: Maybe<Scalars['String']>
    code_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Information about the current page. */
export type UserPageInfo = {
    __typename?: 'UserPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type GroupPageInfo = {
    __typename?: 'GroupPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type ScopePageInfo = {
    __typename?: 'ScopePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ApplicationFilter_Order = {
    id?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
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

/** An entity representing an login log. */
export type LoginLog = Node & {
    __typename?: 'LoginLog'
    id: Scalars['ID']
    /** The ip address of the login */
    address: Scalars['String']
    /** The method of the login */
    method: Scalars['String']
    /** The application uri used for this login */
    application: Scalars['String']
    /** the status code of the login */
    status: Scalars['String']
    /** The moment this login was updated */
    dateModified?: Maybe<Scalars['String']>
}

export type LoginLogFilter_Order = {
    id?: Maybe<Scalars['String']>
    address?: Maybe<Scalars['String']>
    method?: Maybe<Scalars['String']>
    application?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type LoginLogFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type LoginLogFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for LoginLog. */
export type LoginLogConnection = {
    __typename?: 'LoginLogConnection'
    edges?: Maybe<Array<Maybe<LoginLogEdge>>>
    pageInfo: LoginLogPageInfo
    totalCount: Scalars['Int']
}

/** Edge of LoginLog. */
export type LoginLogEdge = {
    __typename?: 'LoginLogEdge'
    node?: Maybe<LoginLog>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type LoginLogPageInfo = {
    __typename?: 'LoginLogPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** An external identity provider (like facebook). */
export type Provider = Node & {
    __typename?: 'Provider'
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this Provider */
    name: Scalars['String']
    /** The description of this provider. */
    description: Scalars['String']
    /** The type of this Provider */
    type: Scalars['String']
    /** The Uri of the application this provider supports */
    application: Scalars['String']
    /** A list of configurations that apply to this provider */
    configuration: Scalars['Iterable']
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type ProviderFilter_Order = {
    id?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    application?: Maybe<Scalars['String']>
    configuration?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ProviderFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ProviderFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Provider. */
export type ProviderConnection = {
    __typename?: 'ProviderConnection'
    edges?: Maybe<Array<Maybe<ProviderEdge>>>
    pageInfo: ProviderPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Provider. */
export type ProviderEdge = {
    __typename?: 'ProviderEdge'
    node?: Maybe<Provider>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ProviderPageInfo = {
    __typename?: 'ProviderPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** A token from an external identity profider (like facebook). */
export type Token = Node & {
    __typename?: 'Token'
    id: Scalars['ID']
    /** The moment this token expires */
    validTill?: Maybe<Scalars['String']>
    /** The user that this token belongs to. */
    user: User
    /** The provider that this scope belongs to. */
    provider: Provider
    /** The actual token. */
    token: Scalars['String']
    /** Duration the token is active for in minutes */
    duration: Scalars['String']
    /** The moment the invite was accepted by the user */
    dateAccepted?: Maybe<Scalars['String']>
    /** The moment this request was created by the submitter */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request was created by the submitter */
    dateModified?: Maybe<Scalars['String']>
}

export type TokenFilter_Order = {
    id?: Maybe<Scalars['String']>
    token?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    validTill?: Maybe<Scalars['String']>
    dateAccepted?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type TokenFilter_ValidTill = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TokenFilter_DateAccepted = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TokenFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TokenFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Token. */
export type TokenConnection = {
    __typename?: 'TokenConnection'
    edges?: Maybe<Array<Maybe<TokenEdge>>>
    pageInfo: TokenPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Token. */
export type TokenEdge = {
    __typename?: 'TokenEdge'
    node?: Maybe<Token>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type TokenPageInfo = {
    __typename?: 'TokenPageInfo'
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
    /** Deletes a Alert. */
    deleteAlert?: Maybe<DeleteAlertPayload>
    /** Updates a Alert. */
    updateAlert?: Maybe<UpdateAlertPayload>
    /** Creates a Alert. */
    createAlert?: Maybe<CreateAlertPayload>
    /** Deletes a Application. */
    deleteApplication?: Maybe<DeleteApplicationPayload>
    /** Updates a Application. */
    updateApplication?: Maybe<UpdateApplicationPayload>
    /** Creates a Application. */
    createApplication?: Maybe<CreateApplicationPayload>
    /** Deletes a Group. */
    deleteGroup?: Maybe<DeleteGroupPayload>
    /** Updates a Group. */
    updateGroup?: Maybe<UpdateGroupPayload>
    /** Creates a Group. */
    createGroup?: Maybe<CreateGroupPayload>
    /** Deletes a LoginLog. */
    deleteLoginLog?: Maybe<DeleteLoginLogPayload>
    /** Updates a LoginLog. */
    updateLoginLog?: Maybe<UpdateLoginLogPayload>
    /** Creates a LoginLog. */
    createLoginLog?: Maybe<CreateLoginLogPayload>
    /** Deletes a Provider. */
    deleteProvider?: Maybe<DeleteProviderPayload>
    /** Updates a Provider. */
    updateProvider?: Maybe<UpdateProviderPayload>
    /** Creates a Provider. */
    createProvider?: Maybe<CreateProviderPayload>
    /** Deletes a Scope. */
    deleteScope?: Maybe<DeleteScopePayload>
    /** Updates a Scope. */
    updateScope?: Maybe<UpdateScopePayload>
    /** Creates a Scope. */
    createScope?: Maybe<CreateScopePayload>
    /** Deletes a Token. */
    deleteToken?: Maybe<DeleteTokenPayload>
    /** Updates a Token. */
    updateToken?: Maybe<UpdateTokenPayload>
    /** Creates a Token. */
    createToken?: Maybe<CreateTokenPayload>
    /** Deletes a User. */
    deleteUser?: Maybe<DeleteUserPayload>
    /** Updates a User. */
    updateUser?: Maybe<UpdateUserPayload>
    /** Creates a User. */
    createUser?: Maybe<CreateUserPayload>
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

export type MutationDeleteAlertArgs = {
    input: DeleteAlertInput
}

export type MutationUpdateAlertArgs = {
    input: UpdateAlertInput
}

export type MutationCreateAlertArgs = {
    input: CreateAlertInput
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

export type MutationDeleteGroupArgs = {
    input: DeleteGroupInput
}

export type MutationUpdateGroupArgs = {
    input: UpdateGroupInput
}

export type MutationCreateGroupArgs = {
    input: CreateGroupInput
}

export type MutationDeleteLoginLogArgs = {
    input: DeleteLoginLogInput
}

export type MutationUpdateLoginLogArgs = {
    input: UpdateLoginLogInput
}

export type MutationCreateLoginLogArgs = {
    input: CreateLoginLogInput
}

export type MutationDeleteProviderArgs = {
    input: DeleteProviderInput
}

export type MutationUpdateProviderArgs = {
    input: UpdateProviderInput
}

export type MutationCreateProviderArgs = {
    input: CreateProviderInput
}

export type MutationDeleteScopeArgs = {
    input: DeleteScopeInput
}

export type MutationUpdateScopeArgs = {
    input: UpdateScopeInput
}

export type MutationCreateScopeArgs = {
    input: CreateScopeInput
}

export type MutationDeleteTokenArgs = {
    input: DeleteTokenInput
}

export type MutationUpdateTokenArgs = {
    input: UpdateTokenInput
}

export type MutationCreateTokenArgs = {
    input: CreateTokenInput
}

export type MutationDeleteUserArgs = {
    input: DeleteUserInput
}

export type MutationUpdateUserArgs = {
    input: UpdateUserInput
}

export type MutationCreateUserArgs = {
    input: CreateUserInput
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

/** All properties that the entity Alert holds. */
export type DeleteAlertInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Alert holds. */
export type DeleteAlertPayload = {
    __typename?: 'deleteAlertPayload'
    alert?: Maybe<Alert>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Alert holds. */
export type UpdateAlertInput = {
    id: Scalars['ID']
    /** The name of this Alert */
    name?: Maybe<Scalars['String']>
    /** The description of this Alert. */
    description?: Maybe<Scalars['String']>
    /** The type of this Alert. */
    type?: Maybe<Scalars['String']>
    /** The flaticon of this Alert, in the form of Font Awesome. https://fontawesome.com/ */
    icon?: Maybe<Scalars['String']>
    /** An URL/link pointing to configuration which this alert relates to */
    link?: Maybe<Scalars['String']>
    /** The moment this Alert has been read */
    dateRead?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Alert holds. */
export type UpdateAlertPayload = {
    __typename?: 'updateAlertPayload'
    alert?: Maybe<Alert>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Alert holds. */
export type CreateAlertInput = {
    /** The name of this Alert */
    name: Scalars['String']
    /** The description of this Alert. */
    description?: Maybe<Scalars['String']>
    /** The type of this Alert. */
    type?: Maybe<Scalars['String']>
    /** The flaticon of this Alert, in the form of Font Awesome. https://fontawesome.com/ */
    icon?: Maybe<Scalars['String']>
    /** An URL/link pointing to configuration which this alert relates to */
    link?: Maybe<Scalars['String']>
    /** The moment this Alert has been read */
    dateRead?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Alert holds. */
export type CreateAlertPayload = {
    __typename?: 'createAlertPayload'
    alert?: Maybe<Alert>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type DeleteApplicationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type DeleteApplicationPayload = {
    __typename?: 'deleteApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type UpdateApplicationInput = {
    id: Scalars['ID']
    /** The RSIN of the organization that owns this application */
    organization?: Maybe<Scalars['String']>
    /** The name of this application */
    name?: Maybe<Scalars['String']>
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    /** A list of scopes that are posible on this application. */
    scopes?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type UpdateApplicationPayload = {
    __typename?: 'updateApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type CreateApplicationInput = {
    /** The RSIN of the organization that owns this application */
    organization: Scalars['String']
    /** The name of this application */
    name: Scalars['String']
    /** The description of this application. */
    description: Scalars['String']
    /** A list of scopes that are posible on this application. */
    scopes?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Application holds. */
export type CreateApplicationPayload = {
    __typename?: 'createApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A user Group. */
export type DeleteGroupInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A user Group. */
export type DeleteGroupPayload = {
    __typename?: 'deleteGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A user Group. */
export type UpdateGroupInput = {
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this group */
    name?: Maybe<Scalars['String']>
    /** The description of this group. */
    description?: Maybe<Scalars['String']>
    /** The title of this group */
    title?: Maybe<Scalars['String']>
    /** Whether or not new users can be registered for this group */
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    /** The group that this group is part of */
    parent?: Maybe<Scalars['String']>
    /** The scopes that members of this group have */
    scopes?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The users that belong to this group */
    users?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A user Group. */
export type UpdateGroupPayload = {
    __typename?: 'updateGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A user Group. */
export type CreateGroupInput = {
    /** A specific commonground organization */
    organization: Scalars['String']
    /** The name of this group */
    name: Scalars['String']
    /** The description of this group. */
    description: Scalars['String']
    /** The title of this group */
    title?: Maybe<Scalars['String']>
    /** Whether or not new users can be registered for this group */
    canBeRegisteredFor?: Maybe<Scalars['Boolean']>
    /** The group that this group is part of */
    parent?: Maybe<Scalars['String']>
    /** The scopes that members of this group have */
    scopes?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The users that belong to this group */
    users?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A user Group. */
export type CreateGroupPayload = {
    __typename?: 'createGroupPayload'
    group?: Maybe<Group>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An entity representing an login log. */
export type DeleteLoginLogInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An entity representing an login log. */
export type DeleteLoginLogPayload = {
    __typename?: 'deleteLoginLogPayload'
    loginLog?: Maybe<LoginLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An entity representing an login log. */
export type UpdateLoginLogInput = {
    id: Scalars['ID']
    /** The ip address of the login */
    address?: Maybe<Scalars['String']>
    /** The method of the login */
    method?: Maybe<Scalars['String']>
    /** The application uri used for this login */
    application?: Maybe<Scalars['String']>
    /** the status code of the login */
    status?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An entity representing an login log. */
export type UpdateLoginLogPayload = {
    __typename?: 'updateLoginLogPayload'
    loginLog?: Maybe<LoginLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An entity representing an login log. */
export type CreateLoginLogInput = {
    /** The ip address of the login */
    address: Scalars['String']
    /** The method of the login */
    method: Scalars['String']
    /** The application uri used for this login */
    application: Scalars['String']
    /** the status code of the login */
    status: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An entity representing an login log. */
export type CreateLoginLogPayload = {
    __typename?: 'createLoginLogPayload'
    loginLog?: Maybe<LoginLog>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An external identity provider (like facebook). */
export type DeleteProviderInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An external identity provider (like facebook). */
export type DeleteProviderPayload = {
    __typename?: 'deleteProviderPayload'
    provider?: Maybe<Provider>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An external identity provider (like facebook). */
export type UpdateProviderInput = {
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this Provider */
    name?: Maybe<Scalars['String']>
    /** The description of this provider. */
    description?: Maybe<Scalars['String']>
    /** The type of this Provider */
    type?: Maybe<Scalars['String']>
    /** The Uri of the application this provider supports */
    application?: Maybe<Scalars['String']>
    /** A list of configurations that apply to this provider */
    configuration?: Maybe<Scalars['Iterable']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An external identity provider (like facebook). */
export type UpdateProviderPayload = {
    __typename?: 'updateProviderPayload'
    provider?: Maybe<Provider>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An external identity provider (like facebook). */
export type CreateProviderInput = {
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this Provider */
    name: Scalars['String']
    /** The description of this provider. */
    description: Scalars['String']
    /** The type of this Provider */
    type: Scalars['String']
    /** The Uri of the application this provider supports */
    application: Scalars['String']
    /** A list of configurations that apply to this provider */
    configuration: Scalars['Iterable']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An external identity provider (like facebook). */
export type CreateProviderPayload = {
    __typename?: 'createProviderPayload'
    provider?: Maybe<Provider>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type DeleteScopeInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type DeleteScopePayload = {
    __typename?: 'deleteScopePayload'
    scope?: Maybe<Scope>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type UpdateScopeInput = {
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this scope */
    name?: Maybe<Scalars['String']>
    /** The description of this scope. */
    description?: Maybe<Scalars['String']>
    /** The code of this scope */
    code?: Maybe<Scalars['String']>
    /** application this scope belongs to. */
    application?: Maybe<Scalars['String']>
    /** User groups that give this scope. */
    userGroups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type UpdateScopePayload = {
    __typename?: 'updateScopePayload'
    scope?: Maybe<Scope>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type CreateScopeInput = {
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** The name of this scope */
    name: Scalars['String']
    /** The description of this scope. */
    description?: Maybe<Scalars['String']>
    /** The code of this scope */
    code: Scalars['String']
    /** application this scope belongs to. */
    application?: Maybe<Scalars['String']>
    /** User groups that give this scope. */
    userGroups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type CreateScopePayload = {
    __typename?: 'createScopePayload'
    scope?: Maybe<Scope>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A token from an external identity profider (like facebook). */
export type DeleteTokenInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A token from an external identity profider (like facebook). */
export type DeleteTokenPayload = {
    __typename?: 'deleteTokenPayload'
    token?: Maybe<Token>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A token from an external identity profider (like facebook). */
export type UpdateTokenInput = {
    id: Scalars['ID']
    /** The user that this token belongs to. */
    user?: Maybe<Scalars['String']>
    /** The provider that this scope belongs to. */
    provider?: Maybe<Scalars['String']>
    /** The actual token. */
    token?: Maybe<Scalars['String']>
    /** Duration the token is active for in minutes */
    duration?: Maybe<Scalars['String']>
    /** The moment the invite was accepted by the user */
    dateAccepted?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A token from an external identity profider (like facebook). */
export type UpdateTokenPayload = {
    __typename?: 'updateTokenPayload'
    token?: Maybe<Token>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A token from an external identity profider (like facebook). */
export type CreateTokenInput = {
    /** The user that this token belongs to. */
    user: Scalars['String']
    /** The provider that this scope belongs to. */
    provider: Scalars['String']
    /** The actual token. */
    token: Scalars['String']
    /** Duration the token is active for in minutes */
    duration: Scalars['String']
    /** The moment the invite was accepted by the user */
    dateAccepted?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A token from an external identity profider (like facebook). */
export type CreateTokenPayload = {
    __typename?: 'createTokenPayload'
    token?: Maybe<Token>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type DeleteUserInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type DeleteUserPayload = {
    __typename?: 'deleteUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type UpdateUserInput = {
    id: Scalars['ID']
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** A contact component person */
    person?: Maybe<Scalars['String']>
    /** A unique visual identifier that represents this user. */
    username?: Maybe<Scalars['String']>
    /** A iso code reprecenting theusers language */
    locale?: Maybe<Scalars['String']>
    /** The hashed password */
    password?: Maybe<Scalars['String']>
    /** A list of groups to wichs this user belongs */
    userGroups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type UpdateUserPayload = {
    __typename?: 'updateUserPayload'
    user?: Maybe<User>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type CreateUserInput = {
    /** A specific commonground organization */
    organization?: Maybe<Scalars['String']>
    /** A contact component person */
    person?: Maybe<Scalars['String']>
    /** A unique visual identifier that represents this user. */
    username: Scalars['String']
    /** A iso code reprecenting theusers language */
    locale: Scalars['String']
    /** The hashed password */
    password: Scalars['String']
    /** A list of groups to wichs this user belongs */
    userGroups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity User holds. */
export type CreateUserPayload = {
    __typename?: 'createUserPayload'
    user?: Maybe<User>
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

export type CreateGroupMutationVariables = Exact<{
    input: CreateGroupInput
}>

export type CreateGroupMutation = { __typename?: 'Mutation' } & {
    createGroup?: Maybe<
        { __typename?: 'createGroupPayload' } & { group?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'id' | 'name'>> }
    >
}

export type CreateUserMutationVariables = Exact<{
    input: CreateUserInput
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & {
    createUser?: Maybe<
        { __typename?: 'createUserPayload' } & {
            user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username' | 'dateCreated' | 'dateModified'>>
        }
    >
}

export type DeleteUserMutationVariables = Exact<{
    input: DeleteUserInput
}>

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
    deleteUser?: Maybe<
        { __typename?: 'deleteUserPayload' } & {
            user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username' | 'dateCreated'>>
        }
    >
}

export type FindUsersByPersonIdQueryVariables = Exact<{
    personId: Scalars['String']
}>

export type FindUsersByPersonIdQuery = { __typename?: 'Query' } & {
    users?: Maybe<
        { __typename?: 'UserConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'UserEdge' } & {
                            node?: Maybe<
                                { __typename?: 'User' } & Pick<
                                    User,
                                    'id' | 'username' | 'dateCreated' | 'dateModified'
                                > & {
                                        userGroups?: Maybe<
                                            { __typename?: 'GroupConnection' } & {
                                                edges?: Maybe<
                                                    Array<
                                                        Maybe<
                                                            { __typename?: 'GroupEdge' } & {
                                                                node?: Maybe<
                                                                    { __typename?: 'Group' } & Pick<
                                                                        Group,
                                                                        'id' | 'name'
                                                                    >
                                                                >
                                                            }
                                                        >
                                                    >
                                                >
                                            }
                                        >
                                    }
                            >
                        }
                    >
                >
            >
        }
    >
}

export type FindUsersByUsernameQueryVariables = Exact<{
    username: Scalars['String']
}>

export type FindUsersByUsernameQuery = { __typename?: 'Query' } & {
    users?: Maybe<
        { __typename?: 'UserConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'UserEdge' } & {
                            node?: Maybe<
                                { __typename?: 'User' } & Pick<User, 'id' | 'username' | 'dateCreated' | 'dateModified'>
                            >
                        }
                    >
                >
            >
        }
    >
}

export type GroupsByOrganizationIdQueryVariables = Exact<{
    organizationId: Scalars['String']
}>

export type GroupsByOrganizationIdQuery = { __typename?: 'Query' } & {
    groups?: Maybe<
        { __typename?: 'GroupConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'GroupEdge' } & {
                            node?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'id' | 'name' | 'organization'>>
                        }
                    >
                >
            >
        }
    >
}

export const CreateGroupDocument = gql`
    mutation createGroup($input: createGroupInput!) {
        createGroup(input: $input) {
            group {
                id
                name
            }
        }
    }
`
export const CreateUserDocument = gql`
    mutation createUser($input: createUserInput!) {
        createUser(input: $input) {
            user {
                id
                username
                dateCreated
                dateModified
            }
        }
    }
`
export const DeleteUserDocument = gql`
    mutation deleteUser($input: deleteUserInput!) {
        deleteUser(input: $input) {
            user {
                id
                username
                dateCreated
            }
        }
    }
`
export const FindUsersByPersonIdDocument = gql`
    query findUsersByPersonId($personId: String!) {
        users(person: $personId) {
            edges {
                node {
                    id
                    username
                    dateCreated
                    dateModified
                    userGroups {
                        edges {
                            node {
                                id
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`
export const FindUsersByUsernameDocument = gql`
    query findUsersByUsername($username: String!) {
        users(username: $username) {
            edges {
                node {
                    id
                    username
                    dateCreated
                    dateModified
                }
            }
        }
    }
`
export const GroupsByOrganizationIdDocument = gql`
    query groupsByOrganizationId($organizationId: String!) {
        groups(organization: $organizationId) {
            edges {
                node {
                    id
                    name
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
        createGroup(
            variables: CreateGroupMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateGroupMutation> {
            return withWrapper(() =>
                client.request<CreateGroupMutation>(print(CreateGroupDocument), variables, requestHeaders)
            )
        },
        createUser(
            variables: CreateUserMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateUserMutation> {
            return withWrapper(() =>
                client.request<CreateUserMutation>(print(CreateUserDocument), variables, requestHeaders)
            )
        },
        deleteUser(
            variables: DeleteUserMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteUserMutation> {
            return withWrapper(() =>
                client.request<DeleteUserMutation>(print(DeleteUserDocument), variables, requestHeaders)
            )
        },
        findUsersByPersonId(
            variables: FindUsersByPersonIdQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<FindUsersByPersonIdQuery> {
            return withWrapper(() =>
                client.request<FindUsersByPersonIdQuery>(print(FindUsersByPersonIdDocument), variables, requestHeaders)
            )
        },
        findUsersByUsername(
            variables: FindUsersByUsernameQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<FindUsersByUsernameQuery> {
            return withWrapper(() =>
                client.request<FindUsersByUsernameQuery>(print(FindUsersByUsernameDocument), variables, requestHeaders)
            )
        },
        groupsByOrganizationId(
            variables: GroupsByOrganizationIdQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<GroupsByOrganizationIdQuery> {
            return withWrapper(() =>
                client.request<GroupsByOrganizationIdQuery>(
                    print(GroupsByOrganizationIdDocument),
                    variables,
                    requestHeaders
                )
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
