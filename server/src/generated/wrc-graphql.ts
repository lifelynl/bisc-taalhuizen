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
    category?: Maybe<Category>
    categories?: Maybe<CategoryConnection>
    configuration?: Maybe<Configuration>
    configurations?: Maybe<ConfigurationConnection>
    document?: Maybe<Document>
    documents?: Maybe<DocumentConnection>
    image?: Maybe<Image>
    images?: Maybe<ImageConnection>
    menu?: Maybe<Menu>
    menus?: Maybe<MenuConnection>
    menuItem?: Maybe<MenuItem>
    menuItems?: Maybe<MenuItemConnection>
    organization?: Maybe<Organization>
    organizations?: Maybe<OrganizationConnection>
    resourceCategory?: Maybe<ResourceCategory>
    resourceCategories?: Maybe<ResourceCategoryConnection>
    slug?: Maybe<Slug>
    slugs?: Maybe<SlugConnection>
    style?: Maybe<Style>
    styles?: Maybe<StyleConnection>
    template?: Maybe<Template>
    templates?: Maybe<TemplateConnection>
    templateGroup?: Maybe<TemplateGroup>
    templateGroups?: Maybe<TemplateGroupConnection>
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
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryCategoryArgs = {
    id: Scalars['ID']
}

export type QueryCategoriesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<CategoryFilter_Order>
    dateCreated?: Maybe<CategoryFilter_DateCreated>
    dateModified?: Maybe<CategoryFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization_id?: Maybe<Scalars['String']>
    parent_id?: Maybe<Scalars['String']>
    parent_name?: Maybe<Scalars['String']>
    resources_resource?: Maybe<Scalars['String']>
}

export type QueryConfigurationArgs = {
    id: Scalars['ID']
}

export type QueryConfigurationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ConfigurationFilter_Order>
    dateCreated?: Maybe<ConfigurationFilter_DateCreated>
    dateModified?: Maybe<ConfigurationFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization_id?: Maybe<Scalars['String']>
    organization_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type QueryDocumentArgs = {
    id: Scalars['ID']
}

export type QueryDocumentsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<DocumentFilter_Order>
    dateCreated?: Maybe<DocumentFilter_DateCreated>
    dateModified?: Maybe<DocumentFilter_DateModified>
}

export type QueryImageArgs = {
    id: Scalars['ID']
}

export type QueryImagesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ImageFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    alt?: Maybe<Scalars['String']>
    alt_list?: Maybe<Array<Maybe<Scalars['String']>>>
    href?: Maybe<Scalars['String']>
    href_list?: Maybe<Array<Maybe<Scalars['String']>>>
    base64?: Maybe<Scalars['String']>
    base64_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryMenuArgs = {
    id: Scalars['ID']
}

export type QueryMenusArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<MenuFilter_Order>
    dateCreated?: Maybe<MenuFilter_DateCreated>
    dateModified?: Maybe<MenuFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type QueryMenuItemArgs = {
    id: Scalars['ID']
}

export type QueryMenuItemsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<MenuItemFilter_Order>
    dateCreated?: Maybe<MenuItemFilter_DateCreated>
    dateModified?: Maybe<MenuItemFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    menu_id?: Maybe<Scalars['String']>
    menu_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
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
    contact?: Maybe<Scalars['String']>
    contact_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type QueryResourceCategoryArgs = {
    id: Scalars['ID']
}

export type QueryResourceCategoriesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ResourceCategoryFilter_Order>
    dateCreated?: Maybe<ResourceCategoryFilter_DateCreated>
    dateModified?: Maybe<ResourceCategoryFilter_DateModified>
    resource?: Maybe<Scalars['String']>
    categories_id?: Maybe<Scalars['String']>
    categories_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    categories_name?: Maybe<Scalars['String']>
    categories_organization_id?: Maybe<Scalars['String']>
    categories_parent_id?: Maybe<Scalars['String']>
    categories_parent_name?: Maybe<Scalars['String']>
    categories_resources_resource?: Maybe<Scalars['String']>
}

export type QuerySlugArgs = {
    id: Scalars['ID']
}

export type QuerySlugsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SlugFilter_Order>
    dateCreated?: Maybe<SlugFilter_DateCreated>
    dateModified?: Maybe<SlugFilter_DateModified>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    template_id?: Maybe<Scalars['String']>
    template_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    slug?: Maybe<Scalars['String']>
    slug_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
}

export type QueryStyleArgs = {
    id: Scalars['ID']
}

export type QueryStylesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<StyleFilter_Order>
    dateCreated?: Maybe<StyleFilter_DateCreated>
    dateModified?: Maybe<StyleFilter_DateModified>
    css?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type QueryTemplateArgs = {
    id: Scalars['ID']
}

export type QueryTemplatesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TemplateFilter_Order>
    dateCreated?: Maybe<TemplateFilter_DateCreated>
    dateModified?: Maybe<TemplateFilter_DateModified>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization_id?: Maybe<Scalars['String']>
    organization_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    slugs_id?: Maybe<Scalars['String']>
    slugs_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    templateEngine?: Maybe<Scalars['String']>
    templateEngine_list?: Maybe<Array<Maybe<Scalars['String']>>>
    slugs_slug?: Maybe<Scalars['String']>
    slugs_slug_list?: Maybe<Array<Maybe<Scalars['String']>>>
    title?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    content?: Maybe<Scalars['String']>
    templateGroups_name?: Maybe<Scalars['String']>
    templateGroups_id?: Maybe<Scalars['String']>
    templateGroups_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryTemplateGroupArgs = {
    id: Scalars['ID']
}

export type QueryTemplateGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TemplateGroupFilter_Order>
    dateCreated?: Maybe<TemplateGroupFilter_DateCreated>
    dateModified?: Maybe<TemplateGroupFilter_DateModified>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization_id?: Maybe<Scalars['String']>
    organization_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
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

/** Application is the project of a website. */
export type Application = Node & {
    __typename?: 'Application'
    id: Scalars['ID']
    defaultConfiguration?: Maybe<Configuration>
    style?: Maybe<Style>
    /** The name of this application. */
    name: Scalars['String']
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    /** The domain of this application. */
    domain: Scalars['String']
    organization: Organization
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type Configuration = Node & {
    __typename?: 'Configuration'
    id: Scalars['ID']
    /** The name of this application. */
    name?: Maybe<Scalars['String']>
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    application?: Maybe<Application>
    /** array of configurations that will be provided to the application */
    configuration: Scalars['Iterable']
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type Style = Node & {
    __typename?: 'Style'
    id: Scalars['ID']
    /** The name of this style. */
    name: Scalars['String']
    /** The description of this style. */
    description: Scalars['String']
    /** the css body of this style */
    css: Scalars['String']
    favicon: Image
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
    organizations?: Maybe<OrganizationConnection>
    applications?: Maybe<ApplicationConnection>
}

/** Your style provides ccs and a favicon for an organisation. */
export type StyleOrganizationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<OrganizationFilter_Order>
    dateCreated?: Maybe<OrganizationFilter_DateCreated>
    dateModified?: Maybe<OrganizationFilter_DateModified>
    contact?: Maybe<Scalars['String']>
    contact_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type StyleApplicationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ApplicationFilter_Order>
    dateCreated?: Maybe<ApplicationFilter_DateCreated>
    dateModified?: Maybe<ApplicationFilter_DateModified>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** Image speaks for itself. */
export type Image = Node & {
    __typename?: 'Image'
    id: Scalars['ID']
    /** The name of this image */
    name: Scalars['String']
    /** The description of this organisation. */
    description: Scalars['String']
    /** The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader) */
    alt?: Maybe<Scalars['String']>
    /** The href of this image */
    href?: Maybe<Scalars['String']>
    /** the base64 version of the image */
    base64?: Maybe<Scalars['String']>
    organization?: Maybe<Organization>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type Organization = Node & {
    __typename?: 'Organization'
    id: Scalars['ID']
    /** The rsin of this organisations. */
    rsin?: Maybe<Scalars['String']>
    /** The Chamber of Comerce ID of this organisations. */
    chamberOfComerce?: Maybe<Scalars['String']>
    /** The name of this organization. */
    name: Scalars['String']
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    /** The technicalContact of this application */
    technicalContact?: Maybe<Scalars['String']>
    /** The privacyContact of this application */
    privacyContact?: Maybe<Scalars['String']>
    /** The administrationContact of this application */
    administrationContact?: Maybe<Scalars['String']>
    style?: Maybe<Style>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** The contact information for this organization */
    contact?: Maybe<Scalars['String']>
    parentOrganization?: Maybe<Organization>
    childOrganizations?: Maybe<OrganizationConnection>
    termsAndConditions?: Maybe<Template>
}

/** An organization as active on commonground. */
export type OrganizationChildOrganizationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<OrganizationFilter_Order>
    dateCreated?: Maybe<OrganizationFilter_DateCreated>
    dateModified?: Maybe<OrganizationFilter_DateModified>
    contact?: Maybe<Scalars['String']>
    contact_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type OrganizationFilter_Order = {
    id?: Maybe<Scalars['String']>
    rsin?: Maybe<Scalars['String']>
    chamberOfComerce?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    technicalContact?: Maybe<Scalars['String']>
    privacyContact?: Maybe<Scalars['String']>
    administrationContact?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    contact?: Maybe<Scalars['String']>
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

/** Templates holds information your pages or include in messages. */
export type Template = Node & {
    __typename?: 'Template'
    id: Scalars['ID']
    /** The internal name of this menu */
    name: Scalars['String']
    /** The external name of this menu */
    title?: Maybe<Scalars['String']>
    /** The description of this page. */
    description?: Maybe<Scalars['String']>
    /** The Content of this template. */
    content: Scalars['String']
    /** Optional variables ussed during rendering */
    variables: Scalars['Iterable']
    /** The template engine used to render this template. Schould be either twig (Twig), md (Markdown) or rst (reStructuredText) */
    templateEngine: Scalars['String']
    slugs?: Maybe<SlugConnection>
    organization?: Maybe<Organization>
    templateGroups?: Maybe<TemplateGroupConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type TemplateSlugsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<SlugFilter_Order>
    dateCreated?: Maybe<SlugFilter_DateCreated>
    dateModified?: Maybe<SlugFilter_DateModified>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    template_id?: Maybe<Scalars['String']>
    template_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    slug?: Maybe<Scalars['String']>
    slug_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type TemplateTemplateGroupsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TemplateGroupFilter_Order>
    dateCreated?: Maybe<TemplateGroupFilter_DateCreated>
    dateModified?: Maybe<TemplateGroupFilter_DateModified>
    application_id?: Maybe<Scalars['String']>
    application_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    organization_id?: Maybe<Scalars['String']>
    organization_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type SlugFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    slug?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type SlugFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type SlugFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Slug. */
export type SlugConnection = {
    __typename?: 'SlugConnection'
    edges?: Maybe<Array<Maybe<SlugEdge>>>
    pageInfo: SlugPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Slug. */
export type SlugEdge = {
    __typename?: 'SlugEdge'
    node?: Maybe<Slug>
    cursor: Scalars['String']
}

/** Your slug connects your application with your pages. */
export type Slug = Node & {
    __typename?: 'Slug'
    id: Scalars['ID']
    /** The internal name of this slug. */
    name: Scalars['String']
    application?: Maybe<Application>
    template?: Maybe<Template>
    /** The actual slug of this slug without a pre / e.g. about not about */
    slug: Scalars['String']
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type SlugPageInfo = {
    __typename?: 'SlugPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type TemplateGroupFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type TemplateGroupFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TemplateGroupFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for TemplateGroup. */
export type TemplateGroupConnection = {
    __typename?: 'TemplateGroupConnection'
    edges?: Maybe<Array<Maybe<TemplateGroupEdge>>>
    pageInfo: TemplateGroupPageInfo
    totalCount: Scalars['Int']
}

/** Edge of TemplateGroup. */
export type TemplateGroupEdge = {
    __typename?: 'TemplateGroupEdge'
    node?: Maybe<TemplateGroup>
    cursor: Scalars['String']
}

/** Groups are a way of orginzing templates. */
export type TemplateGroup = Node & {
    __typename?: 'TemplateGroup'
    id: Scalars['ID']
    /** The internal name of this menu */
    name: Scalars['String']
    /** The description of this page. */
    description?: Maybe<Scalars['String']>
    application?: Maybe<Application>
    organization?: Maybe<Organization>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type TemplateGroupPageInfo = {
    __typename?: 'TemplateGroupPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ApplicationFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    domain?: Maybe<Scalars['String']>
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

/** An category. */
export type Category = Node & {
    __typename?: 'Category'
    id: Scalars['ID']
    /** The name of this organization. */
    name: Scalars['String']
    /** The (e.g. font awsome) icon for this group. */
    icon?: Maybe<Scalars['String']>
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Organization>
    root?: Maybe<Category>
    parent?: Maybe<Category>
    resources?: Maybe<ResourceCategoryConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** An category. */
export type CategoryResourcesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ResourceCategoryFilter_Order>
    dateCreated?: Maybe<ResourceCategoryFilter_DateCreated>
    dateModified?: Maybe<ResourceCategoryFilter_DateModified>
    resource?: Maybe<Scalars['String']>
    categories_id?: Maybe<Scalars['String']>
    categories_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    categories_name?: Maybe<Scalars['String']>
    categories_organization_id?: Maybe<Scalars['String']>
    categories_parent_id?: Maybe<Scalars['String']>
    categories_parent_name?: Maybe<Scalars['String']>
    categories_resources_resource?: Maybe<Scalars['String']>
}

export type ResourceCategoryFilter_Order = {
    id?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ResourceCategoryFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ResourceCategoryFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for ResourceCategory. */
export type ResourceCategoryConnection = {
    __typename?: 'ResourceCategoryConnection'
    edges?: Maybe<Array<Maybe<ResourceCategoryEdge>>>
    pageInfo: ResourceCategoryPageInfo
    totalCount: Scalars['Int']
}

/** Edge of ResourceCategory. */
export type ResourceCategoryEdge = {
    __typename?: 'ResourceCategoryEdge'
    node?: Maybe<ResourceCategory>
    cursor: Scalars['String']
}

/** An resource atachhed to one or more categoires. */
export type ResourceCategory = Node & {
    __typename?: 'ResourceCategory'
    id: Scalars['ID']
    /** The common ground resource bound to groups */
    resource: Scalars['String']
    categories?: Maybe<CategoryConnection>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type ResourceCategoryCategoriesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<CategoryFilter_Order>
    dateCreated?: Maybe<CategoryFilter_DateCreated>
    dateModified?: Maybe<CategoryFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization_id?: Maybe<Scalars['String']>
    parent_id?: Maybe<Scalars['String']>
    parent_name?: Maybe<Scalars['String']>
    resources_resource?: Maybe<Scalars['String']>
}

export type CategoryFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    icon?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    lft?: Maybe<Scalars['String']>
    lvl?: Maybe<Scalars['String']>
    rgt?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type CategoryFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type CategoryFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Category. */
export type CategoryConnection = {
    __typename?: 'CategoryConnection'
    edges?: Maybe<Array<Maybe<CategoryEdge>>>
    pageInfo: CategoryPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Category. */
export type CategoryEdge = {
    __typename?: 'CategoryEdge'
    node?: Maybe<Category>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type CategoryPageInfo = {
    __typename?: 'CategoryPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type ResourceCategoryPageInfo = {
    __typename?: 'ResourceCategoryPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ConfigurationFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    configuration?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ConfigurationFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ConfigurationFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Configuration. */
export type ConfigurationConnection = {
    __typename?: 'ConfigurationConnection'
    edges?: Maybe<Array<Maybe<ConfigurationEdge>>>
    pageInfo: ConfigurationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Configuration. */
export type ConfigurationEdge = {
    __typename?: 'ConfigurationEdge'
    node?: Maybe<Configuration>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ConfigurationPageInfo = {
    __typename?: 'ConfigurationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Documents hold a document encoded in base64. */
export type Document = Node & {
    __typename?: 'Document'
    id: Scalars['ID']
    /** The internal name of this document */
    name: Scalars['String']
    /** The description of this document. */
    description?: Maybe<Scalars['String']>
    /** the base64 version of the image */
    base64: Scalars['String']
    organization?: Maybe<Organization>
    /** The contact of this document */
    contact?: Maybe<Scalars['String']>
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type DocumentFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    base64?: Maybe<Scalars['String']>
    contact?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type DocumentFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type DocumentFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Document. */
export type DocumentConnection = {
    __typename?: 'DocumentConnection'
    edges?: Maybe<Array<Maybe<DocumentEdge>>>
    pageInfo: DocumentPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Document. */
export type DocumentEdge = {
    __typename?: 'DocumentEdge'
    node?: Maybe<Document>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type DocumentPageInfo = {
    __typename?: 'DocumentPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ImageFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    alt?: Maybe<Scalars['String']>
    href?: Maybe<Scalars['String']>
    base64?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Image. */
export type ImageConnection = {
    __typename?: 'ImageConnection'
    edges?: Maybe<Array<Maybe<ImageEdge>>>
    pageInfo: ImagePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Image. */
export type ImageEdge = {
    __typename?: 'ImageEdge'
    node?: Maybe<Image>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ImagePageInfo = {
    __typename?: 'ImagePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Menu is your way of navigation inside your application. */
export type Menu = Node & {
    __typename?: 'Menu'
    id: Scalars['ID']
    /** The name of this menu */
    name: Scalars['String']
    /** The description of this menuItems */
    description?: Maybe<Scalars['String']>
    menuItems?: Maybe<MenuItemConnection>
    application: Application
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type MenuMenuItemsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<MenuItemFilter_Order>
    dateCreated?: Maybe<MenuItemFilter_DateCreated>
    dateModified?: Maybe<MenuItemFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    menu_id?: Maybe<Scalars['String']>
    menu_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
}

export type MenuItemFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    order?: Maybe<Scalars['String']>
    icon?: Maybe<Scalars['String']>
    type?: Maybe<Scalars['String']>
    href?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type MenuItemFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type MenuItemFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for MenuItem. */
export type MenuItemConnection = {
    __typename?: 'MenuItemConnection'
    edges?: Maybe<Array<Maybe<MenuItemEdge>>>
    pageInfo: MenuItemPageInfo
    totalCount: Scalars['Int']
}

/** Edge of MenuItem. */
export type MenuItemEdge = {
    __typename?: 'MenuItemEdge'
    node?: Maybe<MenuItem>
    cursor: Scalars['String']
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type MenuItem = Node & {
    __typename?: 'MenuItem'
    id: Scalars['ID']
    /** The name of this MenuItem */
    name: Scalars['String']
    /** The description of this MenuItem */
    description?: Maybe<Scalars['String']>
    /** The order in which this menu item is shown in relation to other items of the same menu */
    order?: Maybe<Scalars['Int']>
    /** the icon to display with this menu item */
    icon?: Maybe<Scalars['String']>
    /** the type of the menu item */
    type?: Maybe<Scalars['String']>
    /** The href of this MenuItem that links to another page */
    href: Scalars['String']
    /** The moment this request was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this request last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type MenuItemPageInfo = {
    __typename?: 'MenuItemPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type MenuFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type MenuFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type MenuFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Menu. */
export type MenuConnection = {
    __typename?: 'MenuConnection'
    edges?: Maybe<Array<Maybe<MenuEdge>>>
    pageInfo: MenuPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Menu. */
export type MenuEdge = {
    __typename?: 'MenuEdge'
    node?: Maybe<Menu>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type MenuPageInfo = {
    __typename?: 'MenuPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type StyleFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    css?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type StyleFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type StyleFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Style. */
export type StyleConnection = {
    __typename?: 'StyleConnection'
    edges?: Maybe<Array<Maybe<StyleEdge>>>
    pageInfo: StylePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Style. */
export type StyleEdge = {
    __typename?: 'StyleEdge'
    node?: Maybe<Style>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type StylePageInfo = {
    __typename?: 'StylePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type TemplateFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    title?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    content?: Maybe<Scalars['String']>
    templateEngine?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type TemplateFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TemplateFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Template. */
export type TemplateConnection = {
    __typename?: 'TemplateConnection'
    edges?: Maybe<Array<Maybe<TemplateEdge>>>
    pageInfo: TemplatePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Template. */
export type TemplateEdge = {
    __typename?: 'TemplateEdge'
    node?: Maybe<Template>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type TemplatePageInfo = {
    __typename?: 'TemplatePageInfo'
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
    /** Deletes a Category. */
    deleteCategory?: Maybe<DeleteCategoryPayload>
    /** Updates a Category. */
    updateCategory?: Maybe<UpdateCategoryPayload>
    /** Creates a Category. */
    createCategory?: Maybe<CreateCategoryPayload>
    /** Deletes a Configuration. */
    deleteConfiguration?: Maybe<DeleteConfigurationPayload>
    /** Updates a Configuration. */
    updateConfiguration?: Maybe<UpdateConfigurationPayload>
    /** Creates a Configuration. */
    createConfiguration?: Maybe<CreateConfigurationPayload>
    /** Deletes a Document. */
    deleteDocument?: Maybe<DeleteDocumentPayload>
    /** Updates a Document. */
    updateDocument?: Maybe<UpdateDocumentPayload>
    /** Creates a Document. */
    createDocument?: Maybe<CreateDocumentPayload>
    /** Deletes a Image. */
    deleteImage?: Maybe<DeleteImagePayload>
    /** Updates a Image. */
    updateImage?: Maybe<UpdateImagePayload>
    /** Creates a Image. */
    createImage?: Maybe<CreateImagePayload>
    /** Deletes a Menu. */
    deleteMenu?: Maybe<DeleteMenuPayload>
    /** Updates a Menu. */
    updateMenu?: Maybe<UpdateMenuPayload>
    /** Creates a Menu. */
    createMenu?: Maybe<CreateMenuPayload>
    /** Deletes a MenuItem. */
    deleteMenuItem?: Maybe<DeleteMenuItemPayload>
    /** Updates a MenuItem. */
    updateMenuItem?: Maybe<UpdateMenuItemPayload>
    /** Creates a MenuItem. */
    createMenuItem?: Maybe<CreateMenuItemPayload>
    /** Deletes a Organization. */
    deleteOrganization?: Maybe<DeleteOrganizationPayload>
    /** Updates a Organization. */
    updateOrganization?: Maybe<UpdateOrganizationPayload>
    /** Creates a Organization. */
    createOrganization?: Maybe<CreateOrganizationPayload>
    /** Deletes a ResourceCategory. */
    deleteResourceCategory?: Maybe<DeleteResourceCategoryPayload>
    /** Updates a ResourceCategory. */
    updateResourceCategory?: Maybe<UpdateResourceCategoryPayload>
    /** Creates a ResourceCategory. */
    createResourceCategory?: Maybe<CreateResourceCategoryPayload>
    /** Deletes a Slug. */
    deleteSlug?: Maybe<DeleteSlugPayload>
    /** Updates a Slug. */
    updateSlug?: Maybe<UpdateSlugPayload>
    /** Creates a Slug. */
    createSlug?: Maybe<CreateSlugPayload>
    /** Deletes a Style. */
    deleteStyle?: Maybe<DeleteStylePayload>
    /** Updates a Style. */
    updateStyle?: Maybe<UpdateStylePayload>
    /** Creates a Style. */
    createStyle?: Maybe<CreateStylePayload>
    /** Deletes a Template. */
    deleteTemplate?: Maybe<DeleteTemplatePayload>
    /** Updates a Template. */
    updateTemplate?: Maybe<UpdateTemplatePayload>
    /** Creates a Template. */
    createTemplate?: Maybe<CreateTemplatePayload>
    /** Deletes a TemplateGroup. */
    deleteTemplateGroup?: Maybe<DeleteTemplateGroupPayload>
    /** Updates a TemplateGroup. */
    updateTemplateGroup?: Maybe<UpdateTemplateGroupPayload>
    /** Creates a TemplateGroup. */
    createTemplateGroup?: Maybe<CreateTemplateGroupPayload>
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

export type MutationDeleteCategoryArgs = {
    input: DeleteCategoryInput
}

export type MutationUpdateCategoryArgs = {
    input: UpdateCategoryInput
}

export type MutationCreateCategoryArgs = {
    input: CreateCategoryInput
}

export type MutationDeleteConfigurationArgs = {
    input: DeleteConfigurationInput
}

export type MutationUpdateConfigurationArgs = {
    input: UpdateConfigurationInput
}

export type MutationCreateConfigurationArgs = {
    input: CreateConfigurationInput
}

export type MutationDeleteDocumentArgs = {
    input: DeleteDocumentInput
}

export type MutationUpdateDocumentArgs = {
    input: UpdateDocumentInput
}

export type MutationCreateDocumentArgs = {
    input: CreateDocumentInput
}

export type MutationDeleteImageArgs = {
    input: DeleteImageInput
}

export type MutationUpdateImageArgs = {
    input: UpdateImageInput
}

export type MutationCreateImageArgs = {
    input: CreateImageInput
}

export type MutationDeleteMenuArgs = {
    input: DeleteMenuInput
}

export type MutationUpdateMenuArgs = {
    input: UpdateMenuInput
}

export type MutationCreateMenuArgs = {
    input: CreateMenuInput
}

export type MutationDeleteMenuItemArgs = {
    input: DeleteMenuItemInput
}

export type MutationUpdateMenuItemArgs = {
    input: UpdateMenuItemInput
}

export type MutationCreateMenuItemArgs = {
    input: CreateMenuItemInput
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

export type MutationDeleteResourceCategoryArgs = {
    input: DeleteResourceCategoryInput
}

export type MutationUpdateResourceCategoryArgs = {
    input: UpdateResourceCategoryInput
}

export type MutationCreateResourceCategoryArgs = {
    input: CreateResourceCategoryInput
}

export type MutationDeleteSlugArgs = {
    input: DeleteSlugInput
}

export type MutationUpdateSlugArgs = {
    input: UpdateSlugInput
}

export type MutationCreateSlugArgs = {
    input: CreateSlugInput
}

export type MutationDeleteStyleArgs = {
    input: DeleteStyleInput
}

export type MutationUpdateStyleArgs = {
    input: UpdateStyleInput
}

export type MutationCreateStyleArgs = {
    input: CreateStyleInput
}

export type MutationDeleteTemplateArgs = {
    input: DeleteTemplateInput
}

export type MutationUpdateTemplateArgs = {
    input: UpdateTemplateInput
}

export type MutationCreateTemplateArgs = {
    input: CreateTemplateInput
}

export type MutationDeleteTemplateGroupArgs = {
    input: DeleteTemplateGroupInput
}

export type MutationUpdateTemplateGroupArgs = {
    input: UpdateTemplateGroupInput
}

export type MutationCreateTemplateGroupArgs = {
    input: CreateTemplateGroupInput
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

/** Application is the project of a website. */
export type DeleteApplicationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Application is the project of a website. */
export type DeleteApplicationPayload = {
    __typename?: 'deleteApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Application is the project of a website. */
export type UpdateApplicationInput = {
    id: Scalars['ID']
    defaultConfiguration?: Maybe<Scalars['String']>
    style?: Maybe<Scalars['String']>
    /** The name of this application. */
    name?: Maybe<Scalars['String']>
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    /** The domain of this application. */
    domain?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Application is the project of a website. */
export type UpdateApplicationPayload = {
    __typename?: 'updateApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Application is the project of a website. */
export type CreateApplicationInput = {
    defaultConfiguration?: Maybe<Scalars['String']>
    style?: Maybe<Scalars['String']>
    /** The name of this application. */
    name: Scalars['String']
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    /** The domain of this application. */
    domain: Scalars['String']
    organization: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Application is the project of a website. */
export type CreateApplicationPayload = {
    __typename?: 'createApplicationPayload'
    application?: Maybe<Application>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An category. */
export type DeleteCategoryInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An category. */
export type DeleteCategoryPayload = {
    __typename?: 'deleteCategoryPayload'
    category?: Maybe<Category>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An category. */
export type UpdateCategoryInput = {
    id: Scalars['ID']
    /** The name of this organization. */
    name?: Maybe<Scalars['String']>
    /** The (e.g. font awsome) icon for this group. */
    icon?: Maybe<Scalars['String']>
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    parent?: Maybe<Scalars['String']>
    resources?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An category. */
export type UpdateCategoryPayload = {
    __typename?: 'updateCategoryPayload'
    category?: Maybe<Category>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An category. */
export type CreateCategoryInput = {
    /** The name of this organization. */
    name: Scalars['String']
    /** The (e.g. font awsome) icon for this group. */
    icon?: Maybe<Scalars['String']>
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    parent?: Maybe<Scalars['String']>
    resources?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An category. */
export type CreateCategoryPayload = {
    __typename?: 'createCategoryPayload'
    category?: Maybe<Category>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type DeleteConfigurationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type DeleteConfigurationPayload = {
    __typename?: 'deleteConfigurationPayload'
    configuration?: Maybe<Configuration>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type UpdateConfigurationInput = {
    id: Scalars['ID']
    /** The name of this application. */
    name?: Maybe<Scalars['String']>
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    application?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    /** array of configurations that will be provided to the application */
    configuration?: Maybe<Scalars['Iterable']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type UpdateConfigurationPayload = {
    __typename?: 'updateConfigurationPayload'
    configuration?: Maybe<Configuration>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type CreateConfigurationInput = {
    /** The name of this application. */
    name?: Maybe<Scalars['String']>
    /** The description of this application. */
    description?: Maybe<Scalars['String']>
    application?: Maybe<Scalars['String']>
    organization: Scalars['String']
    /** array of configurations that will be provided to the application */
    configuration: Scalars['Iterable']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Configurations hold a specific organisation configruation for an application. */
export type CreateConfigurationPayload = {
    __typename?: 'createConfigurationPayload'
    configuration?: Maybe<Configuration>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Documents hold a document encoded in base64. */
export type DeleteDocumentInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Documents hold a document encoded in base64. */
export type DeleteDocumentPayload = {
    __typename?: 'deleteDocumentPayload'
    document?: Maybe<Document>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Documents hold a document encoded in base64. */
export type UpdateDocumentInput = {
    id: Scalars['ID']
    /** The internal name of this document */
    name?: Maybe<Scalars['String']>
    /** The description of this document. */
    description?: Maybe<Scalars['String']>
    /** the base64 version of the image */
    base64?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    /** The contact of this document */
    contact?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Documents hold a document encoded in base64. */
export type UpdateDocumentPayload = {
    __typename?: 'updateDocumentPayload'
    document?: Maybe<Document>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Documents hold a document encoded in base64. */
export type CreateDocumentInput = {
    /** The internal name of this document */
    name: Scalars['String']
    /** The description of this document. */
    description?: Maybe<Scalars['String']>
    /** the base64 version of the image */
    base64: Scalars['String']
    organization?: Maybe<Scalars['String']>
    /** The contact of this document */
    contact?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Documents hold a document encoded in base64. */
export type CreateDocumentPayload = {
    __typename?: 'createDocumentPayload'
    document?: Maybe<Document>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Image speaks for itself. */
export type DeleteImageInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Image speaks for itself. */
export type DeleteImagePayload = {
    __typename?: 'deleteImagePayload'
    image?: Maybe<Image>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Image speaks for itself. */
export type UpdateImageInput = {
    id: Scalars['ID']
    /** The name of this image */
    name?: Maybe<Scalars['String']>
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    /** The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader) */
    alt?: Maybe<Scalars['String']>
    /** The href of this image */
    href?: Maybe<Scalars['String']>
    /** the base64 version of the image */
    base64?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Image speaks for itself. */
export type UpdateImagePayload = {
    __typename?: 'updateImagePayload'
    image?: Maybe<Image>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Image speaks for itself. */
export type CreateImageInput = {
    /** The name of this image */
    name: Scalars['String']
    /** The description of this organisation. */
    description: Scalars['String']
    /** The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, an error in the src attribute, or if the user uses a screen reader) */
    alt?: Maybe<Scalars['String']>
    /** The href of this image */
    href?: Maybe<Scalars['String']>
    /** the base64 version of the image */
    base64?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Image speaks for itself. */
export type CreateImagePayload = {
    __typename?: 'createImagePayload'
    image?: Maybe<Image>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type DeleteMenuInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type DeleteMenuPayload = {
    __typename?: 'deleteMenuPayload'
    menu?: Maybe<Menu>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type UpdateMenuInput = {
    id: Scalars['ID']
    /** The name of this menu */
    name?: Maybe<Scalars['String']>
    /** The description of this menuItems */
    description?: Maybe<Scalars['String']>
    menuItems?: Maybe<Array<Maybe<Scalars['String']>>>
    application?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type UpdateMenuPayload = {
    __typename?: 'updateMenuPayload'
    menu?: Maybe<Menu>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type CreateMenuInput = {
    /** The name of this menu */
    name: Scalars['String']
    /** The description of this menuItems */
    description?: Maybe<Scalars['String']>
    menuItems?: Maybe<Array<Maybe<Scalars['String']>>>
    application: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Menu is your way of navigation inside your application. */
export type CreateMenuPayload = {
    __typename?: 'createMenuPayload'
    menu?: Maybe<Menu>
    clientMutationId?: Maybe<Scalars['String']>
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type DeleteMenuItemInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type DeleteMenuItemPayload = {
    __typename?: 'deleteMenuItemPayload'
    menuItem?: Maybe<MenuItem>
    clientMutationId?: Maybe<Scalars['String']>
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type UpdateMenuItemInput = {
    id: Scalars['ID']
    /** The name of this MenuItem */
    name?: Maybe<Scalars['String']>
    /** The description of this MenuItem */
    description?: Maybe<Scalars['String']>
    /** The order in which this menu item is shown in relation to other items of the same menu */
    order?: Maybe<Scalars['Int']>
    /** the icon to display with this menu item */
    icon?: Maybe<Scalars['String']>
    /** the type of the menu item */
    type?: Maybe<Scalars['String']>
    /** The href of this MenuItem that links to another page */
    href?: Maybe<Scalars['String']>
    menu?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type UpdateMenuItemPayload = {
    __typename?: 'updateMenuItemPayload'
    menuItem?: Maybe<MenuItem>
    clientMutationId?: Maybe<Scalars['String']>
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type CreateMenuItemInput = {
    /** The name of this MenuItem */
    name: Scalars['String']
    /** The description of this MenuItem */
    description?: Maybe<Scalars['String']>
    /** The order in which this menu item is shown in relation to other items of the same menu */
    order?: Maybe<Scalars['Int']>
    /** the icon to display with this menu item */
    icon?: Maybe<Scalars['String']>
    /** the type of the menu item */
    type?: Maybe<Scalars['String']>
    /** The href of this MenuItem that links to another page */
    href: Scalars['String']
    menu: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** MenuItem is a part of a menu and can be a link or submenu. */
export type CreateMenuItemPayload = {
    __typename?: 'createMenuItemPayload'
    menuItem?: Maybe<MenuItem>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type DeleteOrganizationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type DeleteOrganizationPayload = {
    __typename?: 'deleteOrganizationPayload'
    organization?: Maybe<Organization>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type UpdateOrganizationInput = {
    id: Scalars['ID']
    /** The rsin of this organisations. */
    rsin?: Maybe<Scalars['String']>
    /** The Chamber of Comerce ID of this organisations. */
    chamberOfComerce?: Maybe<Scalars['String']>
    /** The name of this organization. */
    name?: Maybe<Scalars['String']>
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    /** The technicalContact of this application */
    technicalContact?: Maybe<Scalars['String']>
    /** The privacyContact of this application */
    privacyContact?: Maybe<Scalars['String']>
    /** The administrationContact of this application */
    administrationContact?: Maybe<Scalars['String']>
    style?: Maybe<Scalars['String']>
    /** The contact information for this organization */
    contact?: Maybe<Scalars['String']>
    parentOrganization?: Maybe<Scalars['String']>
    termsAndConditions?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type UpdateOrganizationPayload = {
    __typename?: 'updateOrganizationPayload'
    organization?: Maybe<Organization>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type CreateOrganizationInput = {
    /** The rsin of this organisations. */
    rsin?: Maybe<Scalars['String']>
    /** The Chamber of Comerce ID of this organisations. */
    chamberOfComerce?: Maybe<Scalars['String']>
    /** The name of this organization. */
    name: Scalars['String']
    /** The description of this organisation. */
    description?: Maybe<Scalars['String']>
    /** The technicalContact of this application */
    technicalContact?: Maybe<Scalars['String']>
    /** The privacyContact of this application */
    privacyContact?: Maybe<Scalars['String']>
    /** The administrationContact of this application */
    administrationContact?: Maybe<Scalars['String']>
    style?: Maybe<Scalars['String']>
    /** The contact information for this organization */
    contact?: Maybe<Scalars['String']>
    parentOrganization?: Maybe<Scalars['String']>
    termsAndConditions?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An organization as active on commonground. */
export type CreateOrganizationPayload = {
    __typename?: 'createOrganizationPayload'
    organization?: Maybe<Organization>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type DeleteResourceCategoryInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type DeleteResourceCategoryPayload = {
    __typename?: 'deleteResourceCategoryPayload'
    resourceCategory?: Maybe<ResourceCategory>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type UpdateResourceCategoryInput = {
    id: Scalars['ID']
    /** The common ground resource bound to groups */
    resource?: Maybe<Scalars['String']>
    categories?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type UpdateResourceCategoryPayload = {
    __typename?: 'updateResourceCategoryPayload'
    resourceCategory?: Maybe<ResourceCategory>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type CreateResourceCategoryInput = {
    /** The common ground resource bound to groups */
    resource: Scalars['String']
    categories?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An resource atachhed to one or more categoires. */
export type CreateResourceCategoryPayload = {
    __typename?: 'createResourceCategoryPayload'
    resourceCategory?: Maybe<ResourceCategory>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your slug connects your application with your pages. */
export type DeleteSlugInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your slug connects your application with your pages. */
export type DeleteSlugPayload = {
    __typename?: 'deleteSlugPayload'
    slug?: Maybe<Slug>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your slug connects your application with your pages. */
export type UpdateSlugInput = {
    id: Scalars['ID']
    /** The internal name of this slug. */
    name?: Maybe<Scalars['String']>
    application?: Maybe<Scalars['String']>
    template?: Maybe<Scalars['String']>
    /** The actual slug of this slug without a pre / e.g. about not about */
    slug?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your slug connects your application with your pages. */
export type UpdateSlugPayload = {
    __typename?: 'updateSlugPayload'
    slug?: Maybe<Slug>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your slug connects your application with your pages. */
export type CreateSlugInput = {
    /** The internal name of this slug. */
    name: Scalars['String']
    application?: Maybe<Scalars['String']>
    template?: Maybe<Scalars['String']>
    /** The actual slug of this slug without a pre / e.g. about not about */
    slug: Scalars['String']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your slug connects your application with your pages. */
export type CreateSlugPayload = {
    __typename?: 'createSlugPayload'
    slug?: Maybe<Slug>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type DeleteStyleInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type DeleteStylePayload = {
    __typename?: 'deleteStylePayload'
    style?: Maybe<Style>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type UpdateStyleInput = {
    id: Scalars['ID']
    /** The name of this style. */
    name?: Maybe<Scalars['String']>
    /** The description of this style. */
    description?: Maybe<Scalars['String']>
    /** the css body of this style */
    css?: Maybe<Scalars['String']>
    favicon?: Maybe<Scalars['String']>
    organizations?: Maybe<Array<Maybe<Scalars['String']>>>
    applications?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type UpdateStylePayload = {
    __typename?: 'updateStylePayload'
    style?: Maybe<Style>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type CreateStyleInput = {
    /** The name of this style. */
    name: Scalars['String']
    /** The description of this style. */
    description: Scalars['String']
    /** the css body of this style */
    css: Scalars['String']
    favicon: Scalars['String']
    organizations?: Maybe<Array<Maybe<Scalars['String']>>>
    applications?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Your style provides ccs and a favicon for an organisation. */
export type CreateStylePayload = {
    __typename?: 'createStylePayload'
    style?: Maybe<Style>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type DeleteTemplateInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type DeleteTemplatePayload = {
    __typename?: 'deleteTemplatePayload'
    template?: Maybe<Template>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type UpdateTemplateInput = {
    id: Scalars['ID']
    /** The internal name of this menu */
    name?: Maybe<Scalars['String']>
    /** The external name of this menu */
    title?: Maybe<Scalars['String']>
    /** The description of this page. */
    description?: Maybe<Scalars['String']>
    /** Whether to auto create a slug on creation of this template */
    createSlug?: Maybe<Scalars['Boolean']>
    /** The Content of this template. */
    content?: Maybe<Scalars['String']>
    /** Optional variables ussed during rendering */
    variables?: Maybe<Scalars['Iterable']>
    /** The template engine used to render this template. Schould be either twig (Twig), md (Markdown) or rst (reStructuredText) */
    templateEngine?: Maybe<Scalars['String']>
    slugs?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    templateGroups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type UpdateTemplatePayload = {
    __typename?: 'updateTemplatePayload'
    template?: Maybe<Template>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type CreateTemplateInput = {
    /** The internal name of this menu */
    name: Scalars['String']
    /** The external name of this menu */
    title?: Maybe<Scalars['String']>
    /** The description of this page. */
    description?: Maybe<Scalars['String']>
    /** Whether to auto create a slug on creation of this template */
    createSlug: Scalars['Boolean']
    /** The Content of this template. */
    content: Scalars['String']
    /** Optional variables ussed during rendering */
    variables: Scalars['Iterable']
    /** The template engine used to render this template. Schould be either twig (Twig), md (Markdown) or rst (reStructuredText) */
    templateEngine: Scalars['String']
    slugs?: Maybe<Array<Maybe<Scalars['String']>>>
    organization?: Maybe<Scalars['String']>
    templateGroups?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Templates holds information your pages or include in messages. */
export type CreateTemplatePayload = {
    __typename?: 'createTemplatePayload'
    template?: Maybe<Template>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Groups are a way of orginzing templates. */
export type DeleteTemplateGroupInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Groups are a way of orginzing templates. */
export type DeleteTemplateGroupPayload = {
    __typename?: 'deleteTemplateGroupPayload'
    templateGroup?: Maybe<TemplateGroup>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Groups are a way of orginzing templates. */
export type UpdateTemplateGroupInput = {
    id: Scalars['ID']
    /** The internal name of this menu */
    name?: Maybe<Scalars['String']>
    /** The description of this page. */
    description?: Maybe<Scalars['String']>
    templates?: Maybe<Array<Maybe<Scalars['String']>>>
    application?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Groups are a way of orginzing templates. */
export type UpdateTemplateGroupPayload = {
    __typename?: 'updateTemplateGroupPayload'
    templateGroup?: Maybe<TemplateGroup>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Groups are a way of orginzing templates. */
export type CreateTemplateGroupInput = {
    /** The internal name of this menu */
    name: Scalars['String']
    /** The description of this page. */
    description?: Maybe<Scalars['String']>
    templates?: Maybe<Array<Maybe<Scalars['String']>>>
    application?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Groups are a way of orginzing templates. */
export type CreateTemplateGroupPayload = {
    __typename?: 'createTemplateGroupPayload'
    templateGroup?: Maybe<TemplateGroup>
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

export type CreateSourceOrganizationMutationVariables = Exact<{
    input: CreateOrganizationInput
}>

export type CreateSourceOrganizationMutation = { __typename?: 'Mutation' } & {
    createOrganization?: Maybe<
        { __typename?: 'createOrganizationPayload' } & {
            organization?: Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'contact'>>
        }
    >
}

export type DeleteSourceOrganizationMutationVariables = Exact<{
    input: DeleteOrganizationInput
}>

export type DeleteSourceOrganizationMutation = { __typename?: 'Mutation' } & {
    deleteOrganization?: Maybe<
        { __typename?: 'deleteOrganizationPayload' } & {
            organization?: Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id'>>
        }
    >
}

export type UpdateSourceOrganizationMutationVariables = Exact<{
    input: UpdateOrganizationInput
}>

export type UpdateSourceOrganizationMutation = { __typename?: 'Mutation' } & {
    updateOrganization?: Maybe<
        { __typename?: 'updateOrganizationPayload' } & {
            organization?: Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'contact'>>
        }
    >
}

export const CreateSourceOrganizationDocument = gql`
    mutation createSourceOrganization($input: createOrganizationInput!) {
        createOrganization(input: $input) {
            organization {
                id
                name
                contact
            }
        }
    }
`
export const DeleteSourceOrganizationDocument = gql`
    mutation deleteSourceOrganization($input: deleteOrganizationInput!) {
        deleteOrganization(input: $input) {
            organization {
                id
            }
        }
    }
`
export const UpdateSourceOrganizationDocument = gql`
    mutation updateSourceOrganization($input: updateOrganizationInput!) {
        updateOrganization(input: $input) {
            organization {
                id
                name
                contact
            }
        }
    }
`

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction()
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        createSourceOrganization(
            variables: CreateSourceOrganizationMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<CreateSourceOrganizationMutation> {
            return withWrapper(() =>
                client.request<CreateSourceOrganizationMutation>(
                    print(CreateSourceOrganizationDocument),
                    variables,
                    requestHeaders
                )
            )
        },
        deleteSourceOrganization(
            variables: DeleteSourceOrganizationMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<DeleteSourceOrganizationMutation> {
            return withWrapper(() =>
                client.request<DeleteSourceOrganizationMutation>(
                    print(DeleteSourceOrganizationDocument),
                    variables,
                    requestHeaders
                )
            )
        },
        updateSourceOrganization(
            variables: UpdateSourceOrganizationMutationVariables,
            requestHeaders?: Dom.RequestInit['headers']
        ): Promise<UpdateSourceOrganizationMutation> {
            return withWrapper(() =>
                client.request<UpdateSourceOrganizationMutation>(
                    print(UpdateSourceOrganizationDocument),
                    variables,
                    requestHeaders
                )
            )
        },
    }
}
export type Sdk = ReturnType<typeof getSdk>
