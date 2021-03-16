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
    address?: Maybe<Address>
    addresses?: Maybe<AddressConnection>
    contactList?: Maybe<ContactList>
    contactLists?: Maybe<ContactListConnection>
    email?: Maybe<Email>
    emails?: Maybe<EmailConnection>
    organization?: Maybe<Organization>
    organizations?: Maybe<OrganizationConnection>
    person?: Maybe<Person>
    people?: Maybe<PersonConnection>
    social?: Maybe<Social>
    socials?: Maybe<SocialConnection>
    telephone?: Maybe<Telephone>
    telephones?: Maybe<TelephoneConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
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
    sourceOrganization?: Maybe<Scalars['String']>
    sourceOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
    birthday?: Maybe<PersonFilter_Birthday>
    dateCreated?: Maybe<PersonFilter_DateCreated>
    dateModified?: Maybe<PersonFilter_DateModified>
    sourceOrganization?: Maybe<Scalars['String']>
    sourceOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
    dateCreated?: Maybe<SocialFilter_DateCreated>
    dateModified?: Maybe<SocialFilter_DateModified>
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

/** Information about the current page. */
export type AddressPageInfo = {
    __typename?: 'AddressPageInfo'
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
    /** The owner of this ContactList */
    owner?: Maybe<Person>
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
    birthday?: Maybe<PersonFilter_Birthday>
    dateCreated?: Maybe<PersonFilter_DateCreated>
    dateModified?: Maybe<PersonFilter_DateModified>
    sourceOrganization?: Maybe<Scalars['String']>
    sourceOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
    sourceOrganization?: Maybe<Scalars['String']>
    sourceOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
    /** TIN, CIF, NIF or BSN */
    taxID?: Maybe<Scalars['String']>
    /** Information about this person */
    aboutMe?: Maybe<Scalars['String']>
    /** Telephone of this person */
    telephones?: Maybe<TelephoneConnection>
    /** Addresses of this person */
    addresses?: Maybe<AddressConnection>
    /** Socials of this person */
    socials?: Maybe<SocialConnection>
    /** Emails of this person */
    emails?: Maybe<EmailConnection>
    /** Contact lists this person owns */
    ownedContactLists?: Maybe<ContactListConnection>
    /** Contact lists this person is on */
    contactLists?: Maybe<ContactListConnection>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** Base64 of the image */
    personalPhoto?: Maybe<Scalars['String']>
    /** The WRC url of the organization that owns this group */
    sourceOrganization?: Maybe<Scalars['String']>
    /** The gender of the person. **Male**, **Female** */
    gender?: Maybe<Scalars['String']>
    /** Birthplace of this person */
    birthplace?: Maybe<Address>
    /** The marital status of the person. **Married**, **Single**, **Divorced**, **Widow/Widower** */
    maritalStatus?: Maybe<Scalars['String']>
    /** The primary language of the person. */
    primaryLanguage?: Maybe<Scalars['String']>
    /** The speaking languages of the person. */
    speakingLanguages?: Maybe<Scalars['Iterable']>
    /** The contact preference of the person. */
    contactPreference?: Maybe<Scalars['String']>
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
export type PersonAddressesArgs = {
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
export type PersonSocialsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SocialFilter_Order>
    dateCreated?: Maybe<SocialFilter_DateCreated>
    dateModified?: Maybe<SocialFilter_DateModified>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
export type PersonOwnedContactListsArgs = {
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

/** All properties that the entity Person holds. */
export type PersonContactListsArgs = {
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

export type SocialFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    url?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type SocialFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type SocialFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
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
    description?: Maybe<Scalars['String']>
    /** The type of this social. Options: (website, twitter, facebook, linkedin, instagram, github, other) */
    type: Scalars['String']
    /** Url of this social */
    url: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type SocialPageInfo = {
    __typename?: 'SocialPageInfo'
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

export type PersonFilter_Order = {
    id?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    givenName?: Maybe<Scalars['String']>
    additionalName?: Maybe<Scalars['String']>
    familyName?: Maybe<Scalars['String']>
    birthday?: Maybe<Scalars['String']>
    taxID?: Maybe<Scalars['String']>
    aboutMe?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    personalPhoto?: Maybe<Scalars['String']>
    sourceOrganization?: Maybe<Scalars['String']>
    gender?: Maybe<Scalars['String']>
    maritalStatus?: Maybe<Scalars['String']>
    primaryLanguage?: Maybe<Scalars['String']>
    speakingLanguages?: Maybe<Scalars['String']>
    contactPreference?: Maybe<Scalars['String']>
}

export type PersonFilter_Birthday = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type PersonFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type PersonFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
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

/** Information about the current page. */
export type PersonPageInfo = {
    __typename?: 'PersonPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
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
    sourceOrganization?: Maybe<Scalars['String']>
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
    addresses?: Maybe<AddressConnection>
    /** Socials of this organisation */
    socials?: Maybe<SocialConnection>
    /** Email of this organisation */
    emails?: Maybe<EmailConnection>
    /** Person of this organisation */
    persons?: Maybe<PersonConnection>
    /** The WRC url of the organization that owns this group */
    sourceOrganization?: Maybe<Scalars['String']>
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
    sourceOrganization?: Maybe<Scalars['String']>
    sourceOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
export type OrganizationAddressesArgs = {
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
export type OrganizationSocialsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SocialFilter_Order>
    dateCreated?: Maybe<SocialFilter_DateCreated>
    dateModified?: Maybe<SocialFilter_DateModified>
    type?: Maybe<Scalars['String']>
    type_list?: Maybe<Array<Maybe<Scalars['String']>>>
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
    birthday?: Maybe<PersonFilter_Birthday>
    dateCreated?: Maybe<PersonFilter_DateCreated>
    dateModified?: Maybe<PersonFilter_DateModified>
    sourceOrganization?: Maybe<Scalars['String']>
    sourceOrganization_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Information about the current page. */
export type OrganizationPageInfo = {
    __typename?: 'OrganizationPageInfo'
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
    /** Deletes a Email. */
    deleteEmail?: Maybe<DeleteEmailPayload>
    /** Updates a Email. */
    updateEmail?: Maybe<UpdateEmailPayload>
    /** Creates a Email. */
    createEmail?: Maybe<CreateEmailPayload>
    /** Deletes a Organization. */
    deleteOrganization?: Maybe<DeleteOrganizationPayload>
    /** Updates a Organization. */
    updateOrganization?: Maybe<UpdateOrganizationPayload>
    /** Creates a Organization. */
    createOrganization?: Maybe<CreateOrganizationPayload>
    /** Deletes a Person. */
    deletePerson?: Maybe<DeletePersonPayload>
    /** Updates a Person. */
    updatePerson?: Maybe<UpdatePersonPayload>
    /** Creates a Person. */
    createPerson?: Maybe<CreatePersonPayload>
    /** Deletes a Social. */
    deleteSocial?: Maybe<DeleteSocialPayload>
    /** Updates a Social. */
    updateSocial?: Maybe<UpdateSocialPayload>
    /** Creates a Social. */
    createSocial?: Maybe<CreateSocialPayload>
    /** Deletes a Telephone. */
    deleteTelephone?: Maybe<DeleteTelephonePayload>
    /** Updates a Telephone. */
    updateTelephone?: Maybe<UpdateTelephonePayload>
    /** Creates a Telephone. */
    createTelephone?: Maybe<CreateTelephonePayload>
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

export type MutationDeleteEmailArgs = {
    input: DeleteEmailInput
}

export type MutationUpdateEmailArgs = {
    input: UpdateEmailInput
}

export type MutationCreateEmailArgs = {
    input: CreateEmailInput
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

export type MutationDeletePersonArgs = {
    input: DeletePersonInput
}

export type MutationUpdatePersonArgs = {
    input: UpdatePersonInput
}

export type MutationCreatePersonArgs = {
    input: CreatePersonInput
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

export type MutationDeleteTelephoneArgs = {
    input: DeleteTelephoneInput
}

export type MutationUpdateTelephoneArgs = {
    input: UpdateTelephoneInput
}

export type MutationCreateTelephoneArgs = {
    input: CreateTelephoneInput
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
    /** The owner of this ContactList */
    owner?: Maybe<Scalars['String']>
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
    /** The owner of this ContactList */
    owner?: Maybe<Scalars['String']>
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
    addresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Socials of this organisation */
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Email of this organisation */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Person of this organisation */
    persons?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The WRC url of the organization that owns this group */
    sourceOrganization?: Maybe<Scalars['String']>
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
    addresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Socials of this organisation */
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Email of this organisation */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Person of this organisation */
    persons?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The WRC url of the organization that owns this group */
    sourceOrganization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Organisation holds. */
export type CreateOrganizationPayload = {
    __typename?: 'createOrganizationPayload'
    organization?: Maybe<Organization>
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
    /** TIN, CIF, NIF or BSN */
    taxID?: Maybe<Scalars['String']>
    /** Information about this person */
    aboutMe?: Maybe<Scalars['String']>
    /** Telephone of this person */
    telephones?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Addresses of this person */
    addresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Socials of this person */
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Emails of this person */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Contact lists this person owns */
    ownedContactLists?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Contact lists this person is on */
    contactLists?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Base64 of the image */
    personalPhoto?: Maybe<Scalars['String']>
    /** The WRC url of the organization that owns this group */
    sourceOrganization?: Maybe<Scalars['String']>
    /** The gender of the person. **Male**, **Female** */
    gender?: Maybe<Scalars['String']>
    /** Birthplace of this person */
    birthplace?: Maybe<Scalars['String']>
    /** The marital status of the person. **Married**, **Single**, **Divorced**, **Widow/Widower** */
    maritalStatus?: Maybe<Scalars['String']>
    /** The primary language of the person. */
    primaryLanguage?: Maybe<Scalars['String']>
    /** The speaking languages of the person. */
    speakingLanguages?: Maybe<Scalars['Iterable']>
    /** The contact preference of the person. */
    contactPreference?: Maybe<Scalars['String']>
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
    /** TIN, CIF, NIF or BSN */
    taxID?: Maybe<Scalars['String']>
    /** Information about this person */
    aboutMe?: Maybe<Scalars['String']>
    /** Telephone of this person */
    telephones?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Addresses of this person */
    addresses?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Socials of this person */
    socials?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Emails of this person */
    emails?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Contact lists this person owns */
    ownedContactLists?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Contact lists this person is on */
    contactLists?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Base64 of the image */
    personalPhoto?: Maybe<Scalars['String']>
    /** The WRC url of the organization that owns this group */
    sourceOrganization?: Maybe<Scalars['String']>
    /** The gender of the person. **Male**, **Female** */
    gender?: Maybe<Scalars['String']>
    /** Birthplace of this person */
    birthplace?: Maybe<Scalars['String']>
    /** The marital status of the person. **Married**, **Single**, **Divorced**, **Widow/Widower** */
    maritalStatus?: Maybe<Scalars['String']>
    /** The primary language of the person. */
    primaryLanguage?: Maybe<Scalars['String']>
    /** The speaking languages of the person. */
    speakingLanguages?: Maybe<Scalars['Iterable']>
    /** The contact preference of the person. */
    contactPreference?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Person holds. */
export type CreatePersonPayload = {
    __typename?: 'createPersonPayload'
    person?: Maybe<Person>
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
    /** The type of this social. Options: (website, twitter, facebook, linkedin, instagram, github, other) */
    type?: Maybe<Scalars['String']>
    /** Url of this social */
    url?: Maybe<Scalars['String']>
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
    description?: Maybe<Scalars['String']>
    /** The type of this social. Options: (website, twitter, facebook, linkedin, instagram, github, other) */
    type: Scalars['String']
    /** Url of this social */
    url: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** All properties that the entity Social holds. */
export type CreateSocialPayload = {
    __typename?: 'createSocialPayload'
    social?: Maybe<Social>
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

export type AddressesQueryVariables = Exact<{
    id_list?: Maybe<Array<Scalars['String']> | Scalars['String']>
}>

export type AddressesQuery = { __typename?: 'Query' } & {
    addresses?: Maybe<
        { __typename?: 'AddressConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'AddressEdge' } & {
                            node?: Maybe<
                                { __typename?: 'Address' } & Pick<
                                    Address,
                                    'id' | 'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                                >
                            >
                        }
                    >
                >
            >
        }
    >
}

export type CreateAddressMutationVariables = Exact<{
    input: CreateAddressInput
}>

export type CreateAddressMutation = { __typename?: 'Mutation' } & {
    createAddress?: Maybe<
        { __typename?: 'createAddressPayload' } & {
            address?: Maybe<
                { __typename?: 'Address' } & Pick<
                    Address,
                    | 'id'
                    | 'name'
                    | 'street'
                    | 'postalCode'
                    | 'houseNumber'
                    | 'houseNumberSuffix'
                    | 'country'
                    | 'locality'
                >
            >
        }
    >
}

export type CreateEmailMutationVariables = Exact<{
    input: CreateEmailInput
}>

export type CreateEmailMutation = { __typename?: 'Mutation' } & {
    createEmail?: Maybe<
        { __typename?: 'createEmailPayload' } & {
            email?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id' | 'email'>>
        }
    >
}

export type CreateOrganizationMutationVariables = Exact<{
    input: CreateOrganizationInput
}>

export type CreateOrganizationMutation = { __typename?: 'Mutation' } & {
    createOrganization?: Maybe<
        { __typename?: 'createOrganizationPayload' } & {
            organization?: Maybe<
                { __typename?: 'Organization' } & Pick<Organization, 'id' | 'name'> & {
                        emails?: Maybe<
                            { __typename?: 'EmailConnection' } & Pick<EmailConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'EmailEdge' } & {
                                                    node?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id' | 'email'>>
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                        telephones?: Maybe<
                            { __typename?: 'TelephoneConnection' } & Pick<TelephoneConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'TelephoneEdge' } & {
                                                    node?: Maybe<
                                                        { __typename?: 'Telephone' } & Pick<
                                                            Telephone,
                                                            'id' | 'telephone'
                                                        >
                                                    >
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                        addresses?: Maybe<
                            { __typename?: 'AddressConnection' } & {
                                edges?: Maybe<
                                    Array<
                                        Maybe<
                                            { __typename?: 'AddressEdge' } & {
                                                node?: Maybe<
                                                    { __typename?: 'Address' } & Pick<
                                                        Address,
                                                        | 'id'
                                                        | 'street'
                                                        | 'locality'
                                                        | 'houseNumberSuffix'
                                                        | 'houseNumber'
                                                        | 'postalCode'
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
}

export type CreatePersonMutationVariables = Exact<{
    input: CreatePersonInput
}>

export type CreatePersonMutation = { __typename?: 'Mutation' } & {
    createPerson?: Maybe<
        { __typename?: 'createPersonPayload' } & {
            person?: Maybe<
                { __typename?: 'Person' } & Pick<Person, 'id' | 'givenName' | 'additionalName' | 'familyName'>
            >
        }
    >
}

export type CreateTelephoneMutationVariables = Exact<{
    input: CreateTelephoneInput
}>

export type CreateTelephoneMutation = { __typename?: 'Mutation' } & {
    createTelephone?: Maybe<
        { __typename?: 'createTelephonePayload' } & {
            telephone?: Maybe<{ __typename?: 'Telephone' } & Pick<Telephone, 'id' | 'telephone'>>
        }
    >
}

export type DeleteAddressMutationVariables = Exact<{
    input: DeleteAddressInput
}>

export type DeleteAddressMutation = { __typename?: 'Mutation' } & {
    deleteAddress?: Maybe<
        { __typename?: 'deleteAddressPayload' } & { address?: Maybe<{ __typename?: 'Address' } & Pick<Address, 'id'>> }
    >
}

export type DeleteEmailMutationVariables = Exact<{
    input: DeleteEmailInput
}>

export type DeleteEmailMutation = { __typename?: 'Mutation' } & {
    deleteEmail?: Maybe<
        { __typename?: 'deleteEmailPayload' } & { email?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id'>> }
    >
}

export type DeleteOrganizationMutationVariables = Exact<{
    input: DeleteOrganizationInput
}>

export type DeleteOrganizationMutation = { __typename?: 'Mutation' } & {
    deleteOrganization?: Maybe<
        { __typename?: 'deleteOrganizationPayload' } & {
            organization?: Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id'>>
        }
    >
}

export type DeletePersonMutationVariables = Exact<{
    input: DeletePersonInput
}>

export type DeletePersonMutation = { __typename?: 'Mutation' } & {
    deletePerson?: Maybe<
        { __typename?: 'deletePersonPayload' } & { person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'id'>> }
    >
}

export type DeleteTelephoneMutationVariables = Exact<{
    input: DeleteTelephoneInput
}>

export type DeleteTelephoneMutation = { __typename?: 'Mutation' } & {
    deleteTelephone?: Maybe<
        { __typename?: 'deleteTelephonePayload' } & {
            telephone?: Maybe<{ __typename?: 'Telephone' } & Pick<Telephone, 'id'>>
        }
    >
}

export type FindPersonByIdQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type FindPersonByIdQuery = { __typename?: 'Query' } & {
    person?: Maybe<
        { __typename?: 'Person' } & Pick<Person, 'id' | 'givenName' | 'additionalName' | 'familyName'> & {
                emails?: Maybe<
                    { __typename?: 'EmailConnection' } & {
                        edges?: Maybe<
                            Array<
                                Maybe<
                                    { __typename?: 'EmailEdge' } & {
                                        node?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id' | 'email'>>
                                    }
                                >
                            >
                        >
                    }
                >
                telephones?: Maybe<
                    { __typename?: 'TelephoneConnection' } & {
                        edges?: Maybe<
                            Array<
                                Maybe<
                                    { __typename?: 'TelephoneEdge' } & {
                                        node?: Maybe<{ __typename?: 'Telephone' } & Pick<Telephone, 'id' | 'telephone'>>
                                    }
                                >
                            >
                        >
                    }
                >
                addresses?: Maybe<
                    { __typename?: 'AddressConnection' } & {
                        edges?: Maybe<
                            Array<
                                Maybe<
                                    { __typename?: 'AddressEdge' } & {
                                        node?: Maybe<
                                            { __typename?: 'Address' } & Pick<
                                                Address,
                                                'id' | 'name' | 'street' | 'houseNumber'
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

export type OrganizationQueryVariables = Exact<{
    id: Scalars['ID']
}>

export type OrganizationQuery = { __typename?: 'Query' } & {
    organization?: Maybe<
        { __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'type' | 'sourceOrganization'> & {
                emails?: Maybe<
                    { __typename?: 'EmailConnection' } & Pick<EmailConnection, 'totalCount'> & {
                            edges?: Maybe<
                                Array<
                                    Maybe<
                                        { __typename?: 'EmailEdge' } & {
                                            node?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id' | 'email'>>
                                        }
                                    >
                                >
                            >
                        }
                >
                telephones?: Maybe<
                    { __typename?: 'TelephoneConnection' } & Pick<TelephoneConnection, 'totalCount'> & {
                            edges?: Maybe<
                                Array<
                                    Maybe<
                                        { __typename?: 'TelephoneEdge' } & {
                                            node?: Maybe<
                                                { __typename?: 'Telephone' } & Pick<Telephone, 'id' | 'telephone'>
                                            >
                                        }
                                    >
                                >
                            >
                        }
                >
                addresses?: Maybe<
                    { __typename?: 'AddressConnection' } & {
                        edges?: Maybe<
                            Array<
                                Maybe<
                                    { __typename?: 'AddressEdge' } & {
                                        node?: Maybe<
                                            { __typename?: 'Address' } & Pick<
                                                Address,
                                                | 'id'
                                                | 'houseNumber'
                                                | 'postalCode'
                                                | 'street'
                                                | 'houseNumberSuffix'
                                                | 'locality'
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

export type OrganizationsQueryVariables = Exact<{
    type: Scalars['String']
}>

export type OrganizationsQuery = { __typename?: 'Query' } & {
    organizations?: Maybe<
        { __typename?: 'OrganizationConnection' } & {
            edges?: Maybe<
                Array<
                    Maybe<
                        { __typename?: 'OrganizationEdge' } & {
                            node?: Maybe<
                                { __typename?: 'Organization' } & Pick<
                                    Organization,
                                    'id' | 'name' | 'type' | 'sourceOrganization'
                                > & {
                                        emails?: Maybe<
                                            { __typename?: 'EmailConnection' } & Pick<EmailConnection, 'totalCount'> & {
                                                    edges?: Maybe<
                                                        Array<
                                                            Maybe<
                                                                { __typename?: 'EmailEdge' } & {
                                                                    node?: Maybe<
                                                                        { __typename?: 'Email' } & Pick<
                                                                            Email,
                                                                            'id' | 'email'
                                                                        >
                                                                    >
                                                                }
                                                            >
                                                        >
                                                    >
                                                }
                                        >
                                        telephones?: Maybe<
                                            { __typename?: 'TelephoneConnection' } & Pick<
                                                TelephoneConnection,
                                                'totalCount'
                                            > & {
                                                    edges?: Maybe<
                                                        Array<
                                                            Maybe<
                                                                { __typename?: 'TelephoneEdge' } & {
                                                                    node?: Maybe<
                                                                        { __typename?: 'Telephone' } & Pick<
                                                                            Telephone,
                                                                            'id' | 'telephone'
                                                                        >
                                                                    >
                                                                }
                                                            >
                                                        >
                                                    >
                                                }
                                        >
                                        addresses?: Maybe<
                                            { __typename?: 'AddressConnection' } & {
                                                edges?: Maybe<
                                                    Array<
                                                        Maybe<
                                                            { __typename?: 'AddressEdge' } & {
                                                                node?: Maybe<
                                                                    { __typename?: 'Address' } & Pick<
                                                                        Address,
                                                                        | 'id'
                                                                        | 'street'
                                                                        | 'houseNumber'
                                                                        | 'houseNumberSuffix'
                                                                        | 'postalCode'
                                                                        | 'locality'
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

export type PersonsQueryVariables = Exact<{ [key: string]: never }>

export type PersonsQuery = { __typename?: 'Query' } & {
    people?: Maybe<
        { __typename?: 'PersonConnection' } & Pick<PersonConnection, 'totalCount'> & {
                pageInfo: { __typename?: 'PersonPageInfo' } & Pick<PersonPageInfo, 'hasNextPage'>
                edges?: Maybe<
                    Array<
                        Maybe<
                            { __typename?: 'PersonEdge' } & Pick<PersonEdge, 'cursor'> & {
                                    node?: Maybe<
                                        { __typename?: 'Person' } & Pick<
                                            Person,
                                            'id' | 'name' | 'givenName' | 'additionalName' | 'familyName'
                                        > & {
                                                addresses?: Maybe<
                                                    { __typename?: 'AddressConnection' } & {
                                                        edges?: Maybe<
                                                            Array<
                                                                Maybe<
                                                                    { __typename?: 'AddressEdge' } & {
                                                                        node?: Maybe<
                                                                            { __typename?: 'Address' } & Pick<
                                                                                Address,
                                                                                'id' | 'name' | 'street' | 'houseNumber'
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

export type UpdateAddressMutationVariables = Exact<{
    input: UpdateAddressInput
}>

export type UpdateAddressMutation = { __typename?: 'Mutation' } & {
    updateAddress?: Maybe<
        { __typename?: 'updateAddressPayload' } & {
            address?: Maybe<
                { __typename?: 'Address' } & Pick<
                    Address,
                    'id' | 'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'
                >
            >
        }
    >
}

export type UpdateEmailMutationVariables = Exact<{
    input: UpdateEmailInput
}>

export type UpdateEmailMutation = { __typename?: 'Mutation' } & {
    updateEmail?: Maybe<
        { __typename?: 'updateEmailPayload' } & {
            email?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id' | 'email'>>
        }
    >
}

export type UpdateOrganizationMutationVariables = Exact<{
    input: UpdateOrganizationInput
}>

export type UpdateOrganizationMutation = { __typename?: 'Mutation' } & {
    updateOrganization?: Maybe<
        { __typename?: 'updateOrganizationPayload' } & {
            organization?: Maybe<
                { __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'sourceOrganization'> & {
                        emails?: Maybe<
                            { __typename?: 'EmailConnection' } & Pick<EmailConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'EmailEdge' } & {
                                                    node?: Maybe<{ __typename?: 'Email' } & Pick<Email, 'id' | 'email'>>
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                        telephones?: Maybe<
                            { __typename?: 'TelephoneConnection' } & Pick<TelephoneConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'TelephoneEdge' } & {
                                                    node?: Maybe<
                                                        { __typename?: 'Telephone' } & Pick<
                                                            Telephone,
                                                            'id' | 'telephone'
                                                        >
                                                    >
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                        addresses?: Maybe<
                            { __typename?: 'AddressConnection' } & {
                                edges?: Maybe<
                                    Array<
                                        Maybe<
                                            { __typename?: 'AddressEdge' } & {
                                                node?: Maybe<
                                                    { __typename?: 'Address' } & Pick<
                                                        Address,
                                                        | 'id'
                                                        | 'houseNumber'
                                                        | 'postalCode'
                                                        | 'street'
                                                        | 'houseNumberSuffix'
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
}

export type UpdatePersonMutationVariables = Exact<{
    input: UpdatePersonInput
}>

export type UpdatePersonMutation = { __typename?: 'Mutation' } & {
    updatePerson?: Maybe<
        { __typename?: 'updatePersonPayload' } & {
            person?: Maybe<
                { __typename?: 'Person' } & Pick<
                    Person,
                    'id' | 'name' | 'givenName' | 'additionalName' | 'familyName'
                > & {
                        telephones?: Maybe<
                            { __typename?: 'TelephoneConnection' } & Pick<TelephoneConnection, 'totalCount'> & {
                                    edges?: Maybe<
                                        Array<
                                            Maybe<
                                                { __typename?: 'TelephoneEdge' } & {
                                                    node?: Maybe<
                                                        { __typename?: 'Telephone' } & Pick<
                                                            Telephone,
                                                            'id' | 'telephone'
                                                        >
                                                    >
                                                }
                                            >
                                        >
                                    >
                                }
                        >
                        addresses?: Maybe<
                            { __typename?: 'AddressConnection' } & {
                                edges?: Maybe<
                                    Array<
                                        Maybe<
                                            { __typename?: 'AddressEdge' } & {
                                                node?: Maybe<
                                                    { __typename?: 'Address' } & Pick<
                                                        Address,
                                                        'name' | 'street' | 'houseNumber'
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
}

export type UpdateTelephoneMutationVariables = Exact<{
    input: UpdateTelephoneInput
}>

export type UpdateTelephoneMutation = { __typename?: 'Mutation' } & {
    updateTelephone?: Maybe<
        { __typename?: 'updateTelephonePayload' } & {
            telephone?: Maybe<{ __typename?: 'Telephone' } & Pick<Telephone, 'id' | 'telephone'>>
        }
    >
}

export const AddressesDocument = gql`
    query addresses($id_list: [String!]) {
        addresses(id_list: $id_list) {
            edges {
                node {
                    id
                    street
                    houseNumber
                    houseNumberSuffix
                    postalCode
                    locality
                }
            }
        }
    }
`
export const CreateAddressDocument = gql`
    mutation createAddress($input: createAddressInput!) {
        createAddress(input: $input) {
            address {
                id
                name
                street
                postalCode
                houseNumber
                houseNumberSuffix
                country
                locality
            }
        }
    }
`
export const CreateEmailDocument = gql`
    mutation createEmail($input: createEmailInput!) {
        createEmail(input: $input) {
            email {
                id
                email
            }
        }
    }
`
export const CreateOrganizationDocument = gql`
    mutation createOrganization($input: createOrganizationInput!) {
        createOrganization(input: $input) {
            organization {
                id
                name
                emails {
                    totalCount
                    edges {
                        node {
                            id
                            email
                        }
                    }
                }
                telephones {
                    totalCount
                    edges {
                        node {
                            id
                            telephone
                        }
                    }
                }
                addresses {
                    edges {
                        node {
                            id
                            street
                            locality
                            houseNumberSuffix
                            houseNumber
                            postalCode
                        }
                    }
                }
            }
        }
    }
`
export const CreatePersonDocument = gql`
    mutation createPerson($input: createPersonInput!) {
        createPerson(input: $input) {
            person {
                id
                givenName
                additionalName
                familyName
            }
        }
    }
`
export const CreateTelephoneDocument = gql`
    mutation createTelephone($input: createTelephoneInput!) {
        createTelephone(input: $input) {
            telephone {
                id
                telephone
            }
        }
    }
`
export const DeleteAddressDocument = gql`
    mutation deleteAddress($input: deleteAddressInput!) {
        deleteAddress(input: $input) {
            address {
                id
            }
        }
    }
`
export const DeleteEmailDocument = gql`
    mutation deleteEmail($input: deleteEmailInput!) {
        deleteEmail(input: $input) {
            email {
                id
            }
        }
    }
`
export const DeleteOrganizationDocument = gql`
    mutation deleteOrganization($input: deleteOrganizationInput!) {
        deleteOrganization(input: $input) {
            organization {
                id
            }
        }
    }
`
export const DeletePersonDocument = gql`
    mutation deletePerson($input: deletePersonInput!) {
        deletePerson(input: $input) {
            person {
                id
            }
        }
    }
`
export const DeleteTelephoneDocument = gql`
    mutation deleteTelephone($input: deleteTelephoneInput!) {
        deleteTelephone(input: $input) {
            telephone {
                id
            }
        }
    }
`
export const FindPersonByIdDocument = gql`
    query findPersonById($id: ID!) {
        person(id: $id) {
            id
            givenName
            additionalName
            familyName
            emails {
                edges {
                    node {
                        id
                        email
                    }
                }
            }
            telephones {
                edges {
                    node {
                        id
                        telephone
                    }
                }
            }
            addresses {
                edges {
                    node {
                        id
                        name
                        street
                        houseNumber
                    }
                }
            }
        }
    }
`
export const OrganizationDocument = gql`
    query organization($id: ID!) {
        organization(id: $id) {
            id
            name
            type
            sourceOrganization
            emails {
                totalCount
                edges {
                    node {
                        id
                        email
                    }
                }
            }
            telephones {
                totalCount
                edges {
                    node {
                        id
                        telephone
                    }
                }
            }
            addresses {
                edges {
                    node {
                        id
                        houseNumber
                        postalCode
                        street
                        houseNumberSuffix
                        locality
                    }
                }
            }
        }
    }
`
export const OrganizationsDocument = gql`
    query organizations($type: String!) {
        organizations(type: $type) {
            edges {
                node {
                    id
                    name
                    type
                    sourceOrganization
                    emails {
                        totalCount
                        edges {
                            node {
                                id
                                email
                            }
                        }
                    }
                    telephones {
                        totalCount
                        edges {
                            node {
                                id
                                telephone
                            }
                        }
                    }
                    addresses {
                        edges {
                            node {
                                id
                                street
                                houseNumber
                                houseNumberSuffix
                                postalCode
                                locality
                            }
                        }
                    }
                }
            }
        }
    }
`
export const PersonsDocument = gql`
    query persons {
        people(first: 10000) {
            pageInfo {
                hasNextPage
            }
            totalCount
            edges {
                cursor
                node {
                    id
                    name
                    givenName
                    additionalName
                    familyName
                    addresses {
                        edges {
                            node {
                                id
                                name
                                street
                                houseNumber
                            }
                        }
                    }
                }
            }
        }
    }
`
export const UpdateAddressDocument = gql`
    mutation updateAddress($input: updateAddressInput!) {
        updateAddress(input: $input) {
            address {
                id
                street
                houseNumber
                houseNumberSuffix
                postalCode
                locality
            }
        }
    }
`
export const UpdateEmailDocument = gql`
    mutation updateEmail($input: updateEmailInput!) {
        updateEmail(input: $input) {
            email {
                id
                email
            }
        }
    }
`
export const UpdateOrganizationDocument = gql`
    mutation updateOrganization($input: updateOrganizationInput!) {
        updateOrganization(input: $input) {
            organization {
                id
                name
                sourceOrganization
                emails {
                    totalCount
                    edges {
                        node {
                            id
                            email
                        }
                    }
                }
                telephones {
                    totalCount
                    edges {
                        node {
                            id
                            telephone
                        }
                    }
                }
                addresses {
                    edges {
                        node {
                            id
                            houseNumber
                            postalCode
                            street
                            houseNumberSuffix
                        }
                    }
                }
            }
        }
    }
`
export const UpdatePersonDocument = gql`
    mutation updatePerson($input: updatePersonInput!) {
        updatePerson(input: $input) {
            person {
                id
                name
                givenName
                additionalName
                familyName
                telephones {
                    edges {
                        node {
                            id
                            telephone
                        }
                    }
                    totalCount
                }
                addresses {
                    edges {
                        node {
                            name
                            street
                            houseNumber
                        }
                    }
                }
            }
        }
    }
`
export const UpdateTelephoneDocument = gql`
    mutation updateTelephone($input: updateTelephoneInput!) {
        updateTelephone(input: $input) {
            telephone {
                id
                telephone
            }
        }
    }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction()
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        addresses(
            variables?: AddressesQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<AddressesQuery> {
            return withWrapper(() =>
                client.request<AddressesQuery>(print(AddressesDocument), variables, requestHeaders)
            )
        },
        createAddress(
            variables: CreateAddressMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateAddressMutation> {
            return withWrapper(() =>
                client.request<CreateAddressMutation>(print(CreateAddressDocument), variables, requestHeaders)
            )
        },
        createEmail(
            variables: CreateEmailMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateEmailMutation> {
            return withWrapper(() =>
                client.request<CreateEmailMutation>(print(CreateEmailDocument), variables, requestHeaders)
            )
        },
        createOrganization(
            variables: CreateOrganizationMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateOrganizationMutation> {
            return withWrapper(() =>
                client.request<CreateOrganizationMutation>(print(CreateOrganizationDocument), variables, requestHeaders)
            )
        },
        createPerson(
            variables: CreatePersonMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreatePersonMutation> {
            return withWrapper(() =>
                client.request<CreatePersonMutation>(print(CreatePersonDocument), variables, requestHeaders)
            )
        },
        createTelephone(
            variables: CreateTelephoneMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateTelephoneMutation> {
            return withWrapper(() =>
                client.request<CreateTelephoneMutation>(print(CreateTelephoneDocument), variables, requestHeaders)
            )
        },
        deleteAddress(
            variables: DeleteAddressMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteAddressMutation> {
            return withWrapper(() =>
                client.request<DeleteAddressMutation>(print(DeleteAddressDocument), variables, requestHeaders)
            )
        },
        deleteEmail(
            variables: DeleteEmailMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteEmailMutation> {
            return withWrapper(() =>
                client.request<DeleteEmailMutation>(print(DeleteEmailDocument), variables, requestHeaders)
            )
        },
        deleteOrganization(
            variables: DeleteOrganizationMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteOrganizationMutation> {
            return withWrapper(() =>
                client.request<DeleteOrganizationMutation>(print(DeleteOrganizationDocument), variables, requestHeaders)
            )
        },
        deletePerson(
            variables: DeletePersonMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeletePersonMutation> {
            return withWrapper(() =>
                client.request<DeletePersonMutation>(print(DeletePersonDocument), variables, requestHeaders)
            )
        },
        deleteTelephone(
            variables: DeleteTelephoneMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteTelephoneMutation> {
            return withWrapper(() =>
                client.request<DeleteTelephoneMutation>(print(DeleteTelephoneDocument), variables, requestHeaders)
            )
        },
        findPersonById(
            variables: FindPersonByIdQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<FindPersonByIdQuery> {
            return withWrapper(() =>
                client.request<FindPersonByIdQuery>(print(FindPersonByIdDocument), variables, requestHeaders)
            )
        },
        organization(
            variables: OrganizationQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<OrganizationQuery> {
            return withWrapper(() =>
                client.request<OrganizationQuery>(print(OrganizationDocument), variables, requestHeaders)
            )
        },
        organizations(
            variables: OrganizationsQueryVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<OrganizationsQuery> {
            return withWrapper(() =>
                client.request<OrganizationsQuery>(print(OrganizationsDocument), variables, requestHeaders)
            )
        },
        persons(variables?: PersonsQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<PersonsQuery> {
            return withWrapper(() => client.request<PersonsQuery>(print(PersonsDocument), variables, requestHeaders))
        },
        updateAddress(
            variables: UpdateAddressMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdateAddressMutation> {
            return withWrapper(() =>
                client.request<UpdateAddressMutation>(print(UpdateAddressDocument), variables, requestHeaders)
            )
        },
        updateEmail(
            variables: UpdateEmailMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdateEmailMutation> {
            return withWrapper(() =>
                client.request<UpdateEmailMutation>(print(UpdateEmailDocument), variables, requestHeaders)
            )
        },
        updateOrganization(
            variables: UpdateOrganizationMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdateOrganizationMutation> {
            return withWrapper(() =>
                client.request<UpdateOrganizationMutation>(print(UpdateOrganizationDocument), variables, requestHeaders)
            )
        },
        updatePerson(
            variables: UpdatePersonMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdatePersonMutation> {
            return withWrapper(() =>
                client.request<UpdatePersonMutation>(print(UpdatePersonDocument), variables, requestHeaders)
            )
        },
        updateTelephone(
            variables: UpdateTelephoneMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdateTelephoneMutation> {
            return withWrapper(() =>
                client.request<UpdateTelephoneMutation>(print(UpdateTelephoneDocument), variables, requestHeaders)
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
