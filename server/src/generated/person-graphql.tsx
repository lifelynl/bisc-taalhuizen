import { gql } from '@apollo/client'
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
    organization?: Maybe<Organization>
    organizations?: Maybe<OrganizationConnection>
    telephone?: Maybe<Telephone>
    telephones?: Maybe<TelephoneConnection>
    email?: Maybe<Email>
    emails?: Maybe<EmailConnection>
    person?: Maybe<Person>
    people?: Maybe<PersonConnection>
    address?: Maybe<Address>
    addresses?: Maybe<AddressConnection>
    contactList?: Maybe<ContactList>
    contactLists?: Maybe<ContactListConnection>
    social?: Maybe<Social>
    socials?: Maybe<SocialConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryOrganizationArgs = {
    id: Scalars['ID']
}

export type QueryOrganizationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<OrganizationFilter_Order>
    dateCreated?: Maybe<OrganizationFilter_DateCreated>
    dateModified?: Maybe<OrganizationFilter_DateModified>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryTelephoneArgs = {
    id: Scalars['ID']
}

export type QueryTelephonesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TelephoneFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    telephone?: Maybe<Scalars['String']>
    telephone_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryEmailArgs = {
    id: Scalars['ID']
}

export type QueryEmailsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EmailFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    email?: Maybe<Scalars['String']>
    email_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryPersonArgs = {
    id: Scalars['ID']
}

export type QueryPeopleArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<PersonFilter_Order>
    birthday?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    givenName?: Maybe<Scalars['String']>
    givenName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    additionalName?: Maybe<Scalars['String']>
    additionalName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    familyName?: Maybe<Scalars['String']>
    familyName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    birthday_list?: Maybe<Array<Maybe<Scalars['String']>>>
    birthplace?: Maybe<Scalars['String']>
    birthplace_list?: Maybe<Array<Maybe<Scalars['String']>>>
    taxID?: Maybe<Scalars['String']>
    taxID_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryAddressArgs = {
    id: Scalars['ID']
}

export type QueryAddressesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AddressFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    bagnummeraanduiding?: Maybe<Scalars['String']>
    bagnummeraanduiding_list?: Maybe<Array<Maybe<Scalars['String']>>>
    street?: Maybe<Scalars['String']>
    street_list?: Maybe<Array<Maybe<Scalars['String']>>>
    houseNumber?: Maybe<Scalars['String']>
    houseNumber_list?: Maybe<Array<Maybe<Scalars['String']>>>
    houseNumberSuffix?: Maybe<Scalars['String']>
    houseNumberSuffix_list?: Maybe<Array<Maybe<Scalars['String']>>>
    postalCode?: Maybe<Scalars['String']>
    postalCode_list?: Maybe<Array<Maybe<Scalars['String']>>>
    region?: Maybe<Scalars['String']>
    region_list?: Maybe<Array<Maybe<Scalars['String']>>>
    locality?: Maybe<Scalars['String']>
    locality_list?: Maybe<Array<Maybe<Scalars['String']>>>
    country?: Maybe<Scalars['String']>
    country_list?: Maybe<Array<Maybe<Scalars['String']>>>
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    postOfficeBoxNumber_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryContactListArgs = {
    id: Scalars['ID']
}

export type QueryContactListsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ContactListFilter_Order>
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

export type QuerySocialArgs = {
    id: Scalars['ID']
}

export type QuerySocialsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SocialFilter_Order>
    created?: Maybe<Scalars['String']>
    modified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    website?: Maybe<Scalars['String']>
    website_list?: Maybe<Array<Maybe<Scalars['String']>>>
    twitter?: Maybe<Scalars['String']>
    twitter_list?: Maybe<Array<Maybe<Scalars['String']>>>
    facebook?: Maybe<Scalars['String']>
    facebook_list?: Maybe<Array<Maybe<Scalars['String']>>>
    linkedin?: Maybe<Scalars['String']>
    linkedin_list?: Maybe<Array<Maybe<Scalars['String']>>>
    instagram?: Maybe<Scalars['String']>
    instagram_list?: Maybe<Array<Maybe<Scalars['String']>>>
    created_list?: Maybe<Array<Maybe<Scalars['String']>>>
    modified_list?: Maybe<Array<Maybe<Scalars['String']>>>
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

/** All properties that the entity Organisation holds. */
export type Organization = Node & {
    __typename?: 'Organization'
    id: Scalars['ID']
    /** Name of this organisation */
    name: Scalars['String']
    /** Description of this organisation */
    description?: Maybe<Scalars['String']>
    /** Type of this organisation */
    type?: Maybe<Scalars['String']>
    /** Chamber Of Comerce number of this organisation */
    coc?: Maybe<Scalars['String']>
    /** Value added tax id of this organisation (btw) */
    vatID?: Maybe<Scalars['String']>
    parentOrganization?: Maybe<Organization>
    /** The sub-organizations of which this organization is the parent organization. */
    subOrganizations?: Maybe<OrganizationConnection>
    /** Telephone of this organisation */
    telephones?: Maybe<TelephoneConnection>
    /** Address of this organisation */
    adresses?: Maybe<AddressConnection>
    /** Email of this organisation */
    emails?: Maybe<EmailConnection>
    /** Person of this organisation */
    persons?: Maybe<PersonConnection>
    socials?: Maybe<SocialConnection>
}

/** All properties that the entity Organisation holds. */
export type OrganizationSubOrganizationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<OrganizationFilter_Order>
    dateCreated?: Maybe<OrganizationFilter_DateCreated>
    dateModified?: Maybe<OrganizationFilter_DateModified>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Organisation holds. */
export type OrganizationTelephonesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TelephoneFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    telephone?: Maybe<Scalars['String']>
    telephone_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Organisation holds. */
export type OrganizationAdressesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AddressFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    bagnummeraanduiding?: Maybe<Scalars['String']>
    bagnummeraanduiding_list?: Maybe<Array<Maybe<Scalars['String']>>>
    street?: Maybe<Scalars['String']>
    street_list?: Maybe<Array<Maybe<Scalars['String']>>>
    houseNumber?: Maybe<Scalars['String']>
    houseNumber_list?: Maybe<Array<Maybe<Scalars['String']>>>
    houseNumberSuffix?: Maybe<Scalars['String']>
    houseNumberSuffix_list?: Maybe<Array<Maybe<Scalars['String']>>>
    postalCode?: Maybe<Scalars['String']>
    postalCode_list?: Maybe<Array<Maybe<Scalars['String']>>>
    region?: Maybe<Scalars['String']>
    region_list?: Maybe<Array<Maybe<Scalars['String']>>>
    locality?: Maybe<Scalars['String']>
    locality_list?: Maybe<Array<Maybe<Scalars['String']>>>
    country?: Maybe<Scalars['String']>
    country_list?: Maybe<Array<Maybe<Scalars['String']>>>
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    postOfficeBoxNumber_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Organisation holds. */
export type OrganizationEmailsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EmailFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    email?: Maybe<Scalars['String']>
    email_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Organisation holds. */
export type OrganizationPersonsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<PersonFilter_Order>
    birthday?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    givenName?: Maybe<Scalars['String']>
    givenName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    additionalName?: Maybe<Scalars['String']>
    additionalName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    familyName?: Maybe<Scalars['String']>
    familyName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    birthday_list?: Maybe<Array<Maybe<Scalars['String']>>>
    birthplace?: Maybe<Scalars['String']>
    birthplace_list?: Maybe<Array<Maybe<Scalars['String']>>>
    taxID?: Maybe<Scalars['String']>
    taxID_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Organisation holds. */
export type OrganizationSocialsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SocialFilter_Order>
    created?: Maybe<Scalars['String']>
    modified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    website?: Maybe<Scalars['String']>
    website_list?: Maybe<Array<Maybe<Scalars['String']>>>
    twitter?: Maybe<Scalars['String']>
    twitter_list?: Maybe<Array<Maybe<Scalars['String']>>>
    facebook?: Maybe<Scalars['String']>
    facebook_list?: Maybe<Array<Maybe<Scalars['String']>>>
    linkedin?: Maybe<Scalars['String']>
    linkedin_list?: Maybe<Array<Maybe<Scalars['String']>>>
    instagram?: Maybe<Scalars['String']>
    instagram_list?: Maybe<Array<Maybe<Scalars['String']>>>
    created_list?: Maybe<Array<Maybe<Scalars['String']>>>
    modified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type OrganizationFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    coc?: Maybe<Scalars['String']>
    vatID?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type OrganizationFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type OrganizationFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Organization. */
export type OrganizationConnection = {
    __typename?: 'OrganizationConnection'
    edges?: Maybe<Array<Maybe<OrganizationEdge>>>
    pageInfo: OrganizationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Organization. */
export type OrganizationEdge = {
    __typename?: 'OrganizationEdge'
    node?: Maybe<Organization>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type OrganizationPageInfo = {
    __typename?: 'OrganizationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type TelephoneFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    telephone?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Telephone. */
export type TelephoneConnection = {
    __typename?: 'TelephoneConnection'
    edges?: Maybe<Array<Maybe<TelephoneEdge>>>
    pageInfo: TelephonePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Telephone. */
export type TelephoneEdge = {
    __typename?: 'TelephoneEdge'
    node?: Maybe<Telephone>
    cursor: Scalars['String']
}

/** All properties that the entity Telephone holds. */
export type Telephone = Node & {
    __typename?: 'Telephone'
    id: Scalars['ID']
    /** Name of this telephone */
    name?: Maybe<Scalars['String']>
    /** The actual phone number including any international prefixes */
    telephone: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type TelephonePageInfo = {
    __typename?: 'TelephonePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type AddressFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    bagnummeraanduiding?: Maybe<Scalars['String']>
    street?: Maybe<Scalars['String']>
    houseNumber?: Maybe<Scalars['String']>
    houseNumberSuffix?: Maybe<Scalars['String']>
    postalCode?: Maybe<Scalars['String']>
    region?: Maybe<Scalars['String']>
    locality?: Maybe<Scalars['String']>
    country?: Maybe<Scalars['String']>
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Address. */
export type AddressConnection = {
    __typename?: 'AddressConnection'
    edges?: Maybe<Array<Maybe<AddressEdge>>>
    pageInfo: AddressPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Address. */
export type AddressEdge = {
    __typename?: 'AddressEdge'
    node?: Maybe<Address>
    cursor: Scalars['String']
}

/** All properties that the entity Address holds. */
export type Address = Node & {
    __typename?: 'Address'
    id: Scalars['ID']
    /** Name of this Address */
    name?: Maybe<Scalars['String']>
    /** Bagnummeraanduiding of this Address */
    bagnummeraanduiding?: Maybe<Scalars['String']>
    /** Street of this Address */
    street?: Maybe<Scalars['String']>
    /** House number of this Address */
    houseNumber?: Maybe<Scalars['String']>
    /** House number suffix of this Address */
    houseNumberSuffix?: Maybe<Scalars['String']>
    /** Postalcode of a Address */
    postalCode?: Maybe<Scalars['String']>
    /** region Region of a Address */
    region?: Maybe<Scalars['String']>
    /** Locality of a Address */
    locality?: Maybe<Scalars['String']>
    /** Country of a Address */
    country?: Maybe<Scalars['String']>
    /** Post office box number of a Address */
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type AddressPageInfo = {
    __typename?: 'AddressPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type EmailFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    email?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Email. */
export type EmailConnection = {
    __typename?: 'EmailConnection'
    edges?: Maybe<Array<Maybe<EmailEdge>>>
    pageInfo: EmailPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Email. */
export type EmailEdge = {
    __typename?: 'EmailEdge'
    node?: Maybe<Email>
    cursor: Scalars['String']
}

/** All properties that the entity Email holds. */
export type Email = Node & {
    __typename?: 'Email'
    id: Scalars['ID']
    /** Name of this email */
    name?: Maybe<Scalars['String']>
    /** Email of this email */
    email: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type EmailPageInfo = {
    __typename?: 'EmailPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type PersonFilter_Order = {
    id?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    givenName?: Maybe<Scalars['String']>
    additionalName?: Maybe<Scalars['String']>
    familyName?: Maybe<Scalars['String']>
    birthday?: Maybe<Scalars['String']>
    birthplace?: Maybe<Scalars['String']>
    taxID?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Person. */
export type PersonConnection = {
    __typename?: 'PersonConnection'
    edges?: Maybe<Array<Maybe<PersonEdge>>>
    pageInfo: PersonPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Person. */
export type PersonEdge = {
    __typename?: 'PersonEdge'
    node?: Maybe<Person>
    cursor: Scalars['String']
}

/** All properties that the entity Person holds. */
export type Person = Node & {
    __typename?: 'Person'
    id: Scalars['ID']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The full name of a person consisting of given and fammily name */
    name: Scalars['String']
    /** The full name of a person consisting of fammily and given name */
    formalName: Scalars['String']
    /** Given name of this person */
    givenName: Scalars['String']
    /** Additional name of this person */
    additionalName?: Maybe<Scalars['String']>
    /** Family name of this person */
    familyName?: Maybe<Scalars['String']>
    /** Date of birth of this person */
    birthday?: Maybe<Scalars['String']>
    /** Birthplace of this person */
    birthplace?: Maybe<Scalars['String']>
    /** TIN, CIF, NIF or BSN */
    taxID?: Maybe<Scalars['String']>
    /** Telephone of this person */
    telephones?: Maybe<TelephoneConnection>
    /** Adresses of this person */
    adresses?: Maybe<AddressConnection>
    /** Emails of this person */
    emails?: Maybe<EmailConnection>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    socials?: Maybe<SocialConnection>
}

/** All properties that the entity Person holds. */
export type PersonTelephonesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TelephoneFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    telephone?: Maybe<Scalars['String']>
    telephone_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Person holds. */
export type PersonAdressesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AddressFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    bagnummeraanduiding?: Maybe<Scalars['String']>
    bagnummeraanduiding_list?: Maybe<Array<Maybe<Scalars['String']>>>
    street?: Maybe<Scalars['String']>
    street_list?: Maybe<Array<Maybe<Scalars['String']>>>
    houseNumber?: Maybe<Scalars['String']>
    houseNumber_list?: Maybe<Array<Maybe<Scalars['String']>>>
    houseNumberSuffix?: Maybe<Scalars['String']>
    houseNumberSuffix_list?: Maybe<Array<Maybe<Scalars['String']>>>
    postalCode?: Maybe<Scalars['String']>
    postalCode_list?: Maybe<Array<Maybe<Scalars['String']>>>
    region?: Maybe<Scalars['String']>
    region_list?: Maybe<Array<Maybe<Scalars['String']>>>
    locality?: Maybe<Scalars['String']>
    locality_list?: Maybe<Array<Maybe<Scalars['String']>>>
    country?: Maybe<Scalars['String']>
    country_list?: Maybe<Array<Maybe<Scalars['String']>>>
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    postOfficeBoxNumber_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Person holds. */
export type PersonEmailsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EmailFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    email?: Maybe<Scalars['String']>
    email_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity Person holds. */
export type PersonSocialsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SocialFilter_Order>
    created?: Maybe<Scalars['String']>
    modified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    website?: Maybe<Scalars['String']>
    website_list?: Maybe<Array<Maybe<Scalars['String']>>>
    twitter?: Maybe<Scalars['String']>
    twitter_list?: Maybe<Array<Maybe<Scalars['String']>>>
    facebook?: Maybe<Scalars['String']>
    facebook_list?: Maybe<Array<Maybe<Scalars['String']>>>
    linkedin?: Maybe<Scalars['String']>
    linkedin_list?: Maybe<Array<Maybe<Scalars['String']>>>
    instagram?: Maybe<Scalars['String']>
    instagram_list?: Maybe<Array<Maybe<Scalars['String']>>>
    created_list?: Maybe<Array<Maybe<Scalars['String']>>>
    modified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type SocialFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    website?: Maybe<Scalars['String']>
    twitter?: Maybe<Scalars['String']>
    facebook?: Maybe<Scalars['String']>
    linkedin?: Maybe<Scalars['String']>
    instagram?: Maybe<Scalars['String']>
    created?: Maybe<Scalars['String']>
    modified?: Maybe<Scalars['String']>
}

/** Connection for Social. */
export type SocialConnection = {
    __typename?: 'SocialConnection'
    edges?: Maybe<Array<Maybe<SocialEdge>>>
    pageInfo: SocialPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Social. */
export type SocialEdge = {
    __typename?: 'SocialEdge'
    node?: Maybe<Social>
    cursor: Scalars['String']
}

/** All properties that the entity Social holds. */
export type Social = Node & {
    __typename?: 'Social'
    id: Scalars['ID']
    /** Name of this social */
    name: Scalars['String']
    /** Description of this social */
    description: Scalars['String']
    /** A website */
    website?: Maybe<Scalars['String']>
    /** A link to a twitter page */
    twitter?: Maybe<Scalars['String']>
    /** A link to a facebook page */
    facebook?: Maybe<Scalars['String']>
    /** A link to a linkedin page */
    linkedin?: Maybe<Scalars['String']>
    /** A link to a instagram page */
    instagram?: Maybe<Scalars['String']>
    person?: Maybe<Person>
    organization?: Maybe<Organization>
    /** The moment this resource was created */
    created?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    modified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type SocialPageInfo = {
    __typename?: 'SocialPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type PersonPageInfo = {
    __typename?: 'PersonPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** All properties that the entity ContactList holds. */
export type ContactList = Node & {
    __typename?: 'ContactList'
    id: Scalars['ID']
    /** Name of this contact list */
    name: Scalars['String']
    /** Description of this contact list */
    description?: Maybe<Scalars['String']>
    /** Persons this contact list has */
    persons?: Maybe<PersonConnection>
    /** Organisations this contact list has */
    organizations?: Maybe<OrganizationConnection>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type ContactListPersonsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<PersonFilter_Order>
    birthday?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    givenName?: Maybe<Scalars['String']>
    givenName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    additionalName?: Maybe<Scalars['String']>
    additionalName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    familyName?: Maybe<Scalars['String']>
    familyName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    birthday_list?: Maybe<Array<Maybe<Scalars['String']>>>
    birthplace?: Maybe<Scalars['String']>
    birthplace_list?: Maybe<Array<Maybe<Scalars['String']>>>
    taxID?: Maybe<Scalars['String']>
    taxID_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** All properties that the entity ContactList holds. */
export type ContactListOrganizationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<OrganizationFilter_Order>
    dateCreated?: Maybe<OrganizationFilter_DateCreated>
    dateModified?: Maybe<OrganizationFilter_DateModified>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ContactListFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for ContactList. */
export type ContactListConnection = {
    __typename?: 'ContactListConnection'
    edges?: Maybe<Array<Maybe<ContactListEdge>>>
    pageInfo: ContactListPageInfo
    totalCount: Scalars['Int']
}

/** Edge of ContactList. */
export type ContactListEdge = {
    __typename?: 'ContactListEdge'
    node?: Maybe<ContactList>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ContactListPageInfo = {
    __typename?: 'ContactListPageInfo'
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
    /** Deletes a Organization. */
    deleteOrganization?: Maybe<DeleteOrganizationPayload>
    /** Updates a Organization. */
    updateOrganization?: Maybe<UpdateOrganizationPayload>
    /** Creates a Organization. */
    createOrganization?: Maybe<CreateOrganizationPayload>
    /** Deletes a Telephone. */
    deleteTelephone?: Maybe<DeleteTelephonePayload>
    /** Updates a Telephone. */
    updateTelephone?: Maybe<UpdateTelephonePayload>
    /** Creates a Telephone. */
    createTelephone?: Maybe<CreateTelephonePayload>
    /** Deletes a Email. */
    deleteEmail?: Maybe<DeleteEmailPayload>
    /** Updates a Email. */
    updateEmail?: Maybe<UpdateEmailPayload>
    /** Creates a Email. */
    createEmail?: Maybe<CreateEmailPayload>
    /** Deletes a Person. */
    deletePerson?: Maybe<DeletePersonPayload>
    /** Updates a Person. */
    updatePerson?: Maybe<UpdatePersonPayload>
    /** Creates a Person. */
    createPerson?: Maybe<CreatePersonPayload>
    /** Deletes a Address. */
    deleteAddress?: Maybe<DeleteAddressPayload>
    /** Updates a Address. */
    updateAddress?: Maybe<UpdateAddressPayload>
    /** Creates a Address. */
    createAddress?: Maybe<CreateAddressPayload>
    /** Deletes a ContactList. */
    deleteContactList?: Maybe<DeleteContactListPayload>
    /** Updates a ContactList. */
    updateContactList?: Maybe<UpdateContactListPayload>
    /** Creates a ContactList. */
    createContactList?: Maybe<CreateContactListPayload>
    /** Deletes a Social. */
    deleteSocial?: Maybe<DeleteSocialPayload>
    /** Updates a Social. */
    updateSocial?: Maybe<UpdateSocialPayload>
    /** Creates a Social. */
    createSocial?: Maybe<CreateSocialPayload>
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

export type MutationDeleteOrganizationArgs = {
    input: DeleteOrganizationInput
}

export type MutationUpdateOrganizationArgs = {
    input: UpdateOrganizationInput
}

export type MutationCreateOrganizationArgs = {
    input: CreateOrganizationInput
}

export type MutationDeleteTelephoneArgs = {
    input: DeleteTelephoneInput
}

export type MutationUpdateTelephoneArgs = {
    input: UpdateTelephoneInput
}

export type MutationCreateTelephoneArgs = {
    input: CreateTelephoneInput
}

export type MutationDeleteEmailArgs = {
    input: DeleteEmailInput
}

export type MutationUpdateEmailArgs = {
    input: UpdateEmailInput
}

export type MutationCreateEmailArgs = {
    input: CreateEmailInput
}

export type MutationDeletePersonArgs = {
    input: DeletePersonInput
}

export type MutationUpdatePersonArgs = {
    input: UpdatePersonInput
}

export type MutationCreatePersonArgs = {
    input: CreatePersonInput
}

export type MutationDeleteAddressArgs = {
    input: DeleteAddressInput
}

export type MutationUpdateAddressArgs = {
    input: UpdateAddressInput
}

export type MutationCreateAddressArgs = {
    input: CreateAddressInput
}

export type MutationDeleteContactListArgs = {
    input: DeleteContactListInput
}

export type MutationUpdateContactListArgs = {
    input: UpdateContactListInput
}

export type MutationCreateContactListArgs = {
    input: CreateContactListInput
}

export type MutationDeleteSocialArgs = {
    input: DeleteSocialInput
}

export type MutationUpdateSocialArgs = {
    input: UpdateSocialInput
}

export type MutationCreateSocialArgs = {
    input: CreateSocialInput
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

/** All properties that the entity Organisation holds. */
export type DeleteOrganizationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Organisation holds. */
export type DeleteOrganizationPayload = {
    __typename?: 'deleteOrganizationPayload'
    organization?: Maybe<Organization>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Organisation holds. */
export type UpdateOrganizationInput = {
    id: Scalars['ID']
    /** Name of this organisation */
    name?: Maybe<Scalars['String']>
    /** Description of this organisation */
    description?: Maybe<Scalars['String']>
    /** Type of this organisation */
    type?: Maybe<Scalars['String']>
    /** Chamber Of Comerce number of this organisation */
    coc?: Maybe<Scalars['String']>
    /** Value added tax id of this organisation (btw) */
    vatID?: Maybe<Scalars['String']>
    parentOrganization?: Maybe<Scalars['String']>
    /** The sub-organizations of which this organization is the parent organization. */
    subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Telephone of this organisation */
    telephones?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Address of this organisation */
    adresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Email of this organisation */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Person of this organisation */
    persons?: Maybe<Array<Maybe<Scalars['String']>>>
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Organisation holds. */
export type UpdateOrganizationPayload = {
    __typename?: 'updateOrganizationPayload'
    organization?: Maybe<Organization>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Organisation holds. */
export type CreateOrganizationInput = {
    /** Name of this organisation */
    name: Scalars['String']
    /** Description of this organisation */
    description?: Maybe<Scalars['String']>
    /** Type of this organisation */
    type?: Maybe<Scalars['String']>
    /** Chamber Of Comerce number of this organisation */
    coc?: Maybe<Scalars['String']>
    /** Value added tax id of this organisation (btw) */
    vatID?: Maybe<Scalars['String']>
    parentOrganization?: Maybe<Scalars['String']>
    /** The sub-organizations of which this organization is the parent organization. */
    subOrganizations?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Telephone of this organisation */
    telephones?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Address of this organisation */
    adresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Email of this organisation */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Person of this organisation */
    persons?: Maybe<Array<Maybe<Scalars['String']>>>
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Organisation holds. */
export type CreateOrganizationPayload = {
    __typename?: 'createOrganizationPayload'
    organization?: Maybe<Organization>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Telephone holds. */
export type DeleteTelephoneInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Telephone holds. */
export type DeleteTelephonePayload = {
    __typename?: 'deleteTelephonePayload'
    telephone?: Maybe<Telephone>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Telephone holds. */
export type UpdateTelephoneInput = {
    id: Scalars['ID']
    /** Name of this telephone */
    name?: Maybe<Scalars['String']>
    /** The actual phone number including any international prefixes */
    telephone?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Telephone holds. */
export type UpdateTelephonePayload = {
    __typename?: 'updateTelephonePayload'
    telephone?: Maybe<Telephone>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Telephone holds. */
export type CreateTelephoneInput = {
    /** Name of this telephone */
    name?: Maybe<Scalars['String']>
    /** The actual phone number including any international prefixes */
    telephone: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Telephone holds. */
export type CreateTelephonePayload = {
    __typename?: 'createTelephonePayload'
    telephone?: Maybe<Telephone>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Email holds. */
export type DeleteEmailInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Email holds. */
export type DeleteEmailPayload = {
    __typename?: 'deleteEmailPayload'
    email?: Maybe<Email>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Email holds. */
export type UpdateEmailInput = {
    id: Scalars['ID']
    /** Name of this email */
    name?: Maybe<Scalars['String']>
    /** Email of this email */
    email?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Email holds. */
export type UpdateEmailPayload = {
    __typename?: 'updateEmailPayload'
    email?: Maybe<Email>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Email holds. */
export type CreateEmailInput = {
    /** Name of this email */
    name?: Maybe<Scalars['String']>
    /** Email of this email */
    email: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Email holds. */
export type CreateEmailPayload = {
    __typename?: 'createEmailPayload'
    email?: Maybe<Email>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type DeletePersonInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type DeletePersonPayload = {
    __typename?: 'deletePersonPayload'
    person?: Maybe<Person>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type UpdatePersonInput = {
    id: Scalars['ID']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** Given name of this person */
    givenName?: Maybe<Scalars['String']>
    /** Additional name of this person */
    additionalName?: Maybe<Scalars['String']>
    /** Family name of this person */
    familyName?: Maybe<Scalars['String']>
    /** Date of birth of this person */
    birthday?: Maybe<Scalars['String']>
    /** Birthplace of this person */
    birthplace?: Maybe<Scalars['String']>
    /** TIN, CIF, NIF or BSN */
    taxID?: Maybe<Scalars['String']>
    /** Telephone of this person */
    telephones?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Adresses of this person */
    adresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Emails of this person */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type UpdatePersonPayload = {
    __typename?: 'updatePersonPayload'
    person?: Maybe<Person>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type CreatePersonInput = {
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** Given name of this person */
    givenName: Scalars['String']
    /** Additional name of this person */
    additionalName?: Maybe<Scalars['String']>
    /** Family name of this person */
    familyName?: Maybe<Scalars['String']>
    /** Date of birth of this person */
    birthday?: Maybe<Scalars['String']>
    /** Birthplace of this person */
    birthplace?: Maybe<Scalars['String']>
    /** TIN, CIF, NIF or BSN */
    taxID?: Maybe<Scalars['String']>
    /** Telephone of this person */
    telephones?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Adresses of this person */
    adresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Emails of this person */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type CreatePersonPayload = {
    __typename?: 'createPersonPayload'
    person?: Maybe<Person>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Address holds. */
export type DeleteAddressInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Address holds. */
export type DeleteAddressPayload = {
    __typename?: 'deleteAddressPayload'
    address?: Maybe<Address>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Address holds. */
export type UpdateAddressInput = {
    id: Scalars['ID']
    /** Name of this Address */
    name?: Maybe<Scalars['String']>
    /** Bagnummeraanduiding of this Address */
    bagnummeraanduiding?: Maybe<Scalars['String']>
    /** Street of this Address */
    street?: Maybe<Scalars['String']>
    /** House number of this Address */
    houseNumber?: Maybe<Scalars['String']>
    /** House number suffix of this Address */
    houseNumberSuffix?: Maybe<Scalars['String']>
    /** Postalcode of a Address */
    postalCode?: Maybe<Scalars['String']>
    /** region Region of a Address */
    region?: Maybe<Scalars['String']>
    /** Locality of a Address */
    locality?: Maybe<Scalars['String']>
    /** Country of a Address */
    country?: Maybe<Scalars['String']>
    /** Post office box number of a Address */
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Address holds. */
export type UpdateAddressPayload = {
    __typename?: 'updateAddressPayload'
    address?: Maybe<Address>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Address holds. */
export type CreateAddressInput = {
    /** Name of this Address */
    name?: Maybe<Scalars['String']>
    /** Bagnummeraanduiding of this Address */
    bagnummeraanduiding?: Maybe<Scalars['String']>
    /** Street of this Address */
    street?: Maybe<Scalars['String']>
    /** House number of this Address */
    houseNumber?: Maybe<Scalars['String']>
    /** House number suffix of this Address */
    houseNumberSuffix?: Maybe<Scalars['String']>
    /** Postalcode of a Address */
    postalCode?: Maybe<Scalars['String']>
    /** region Region of a Address */
    region?: Maybe<Scalars['String']>
    /** Locality of a Address */
    locality?: Maybe<Scalars['String']>
    /** Country of a Address */
    country?: Maybe<Scalars['String']>
    /** Post office box number of a Address */
    postOfficeBoxNumber?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Address holds. */
export type CreateAddressPayload = {
    __typename?: 'createAddressPayload'
    address?: Maybe<Address>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type DeleteContactListInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type DeleteContactListPayload = {
    __typename?: 'deleteContactListPayload'
    contactList?: Maybe<ContactList>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type UpdateContactListInput = {
    id: Scalars['ID']
    /** Name of this contact list */
    name?: Maybe<Scalars['String']>
    /** Description of this contact list */
    description?: Maybe<Scalars['String']>
    /** Persons this contact list has */
    persons?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Organisations this contact list has */
    organizations?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type UpdateContactListPayload = {
    __typename?: 'updateContactListPayload'
    contactList?: Maybe<ContactList>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type CreateContactListInput = {
    /** Name of this contact list */
    name: Scalars['String']
    /** Description of this contact list */
    description?: Maybe<Scalars['String']>
    /** Persons this contact list has */
    persons?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Organisations this contact list has */
    organizations?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity ContactList holds. */
export type CreateContactListPayload = {
    __typename?: 'createContactListPayload'
    contactList?: Maybe<ContactList>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type DeleteSocialInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type DeleteSocialPayload = {
    __typename?: 'deleteSocialPayload'
    social?: Maybe<Social>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type UpdateSocialInput = {
    id: Scalars['ID']
    /** Name of this social */
    name?: Maybe<Scalars['String']>
    /** Description of this social */
    description?: Maybe<Scalars['String']>
    /** A website */
    website?: Maybe<Scalars['String']>
    /** A link to a twitter page */
    twitter?: Maybe<Scalars['String']>
    /** A link to a facebook page */
    facebook?: Maybe<Scalars['String']>
    /** A link to a linkedin page */
    linkedin?: Maybe<Scalars['String']>
    /** A link to a instagram page */
    instagram?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type UpdateSocialPayload = {
    __typename?: 'updateSocialPayload'
    social?: Maybe<Social>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type CreateSocialInput = {
    /** Name of this social */
    name: Scalars['String']
    /** Description of this social */
    description: Scalars['String']
    /** A website */
    website?: Maybe<Scalars['String']>
    /** A link to a twitter page */
    twitter?: Maybe<Scalars['String']>
    /** A link to a facebook page */
    facebook?: Maybe<Scalars['String']>
    /** A link to a linkedin page */
    linkedin?: Maybe<Scalars['String']>
    /** A link to a instagram page */
    instagram?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type CreateSocialPayload = {
    __typename?: 'createSocialPayload'
    social?: Maybe<Social>
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
