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
    alarm?: Maybe<Alarm>
    alarms?: Maybe<AlarmConnection>
    availability?: Maybe<Availability>
    availabilities?: Maybe<AvailabilityConnection>
    calendar?: Maybe<Calendar>
    calendars?: Maybe<CalendarConnection>
    event?: Maybe<Event>
    events?: Maybe<EventConnection>
    freebusy?: Maybe<Freebusy>
    freebusies?: Maybe<FreebusyConnection>
    journal?: Maybe<Journal>
    journals?: Maybe<JournalConnection>
    reservation?: Maybe<Reservation>
    reservations?: Maybe<ReservationConnection>
    resource?: Maybe<Resource>
    resources?: Maybe<ResourceConnection>
    schedule?: Maybe<Schedule>
    schedules?: Maybe<ScheduleConnection>
    todo?: Maybe<Todo>
    todos?: Maybe<TodoConnection>
    auditTrail?: Maybe<AuditTrail>
    auditTrails?: Maybe<AuditTrailConnection>
    changeLog?: Maybe<ChangeLog>
    changeLogs?: Maybe<ChangeLogConnection>
}

export type QueryNodeArgs = {
    id: Scalars['ID']
}

export type QueryAlarmArgs = {
    id: Scalars['ID']
}

export type QueryAlarmsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<AlarmFilter_Order>
    dateCreated?: Maybe<AlarmFilter_DateCreated>
    dateModified?: Maybe<AlarmFilter_DateModified>
    event_id?: Maybe<Scalars['String']>
    event_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    todo_id?: Maybe<Scalars['String']>
    todo_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    event_calendar_id?: Maybe<Scalars['String']>
    event_calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    todo_calendar_id?: Maybe<Scalars['String']>
    todo_calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryAvailabilityArgs = {
    id: Scalars['ID']
}

export type QueryAvailabilitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryCalendarArgs = {
    id: Scalars['ID']
}

export type QueryCalendarsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<CalendarFilter_Order>
    dateCreated?: Maybe<CalendarFilter_DateCreated>
    dateModified?: Maybe<CalendarFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    person?: Maybe<Scalars['String']>
    person_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryEventArgs = {
    id: Scalars['ID']
}

export type QueryEventsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EventFilter_Order>
    startDate?: Maybe<EventFilter_StartDate>
    endDate?: Maybe<EventFilter_EndDate>
    dateCreated?: Maybe<EventFilter_DateCreated>
    dateModified?: Maybe<EventFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_organization?: Maybe<Scalars['String']>
    calendar_organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    location?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    status_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryFreebusyArgs = {
    id: Scalars['ID']
}

export type QueryFreebusiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<FreebusyFilter_Order>
    startDate?: Maybe<FreebusyFilter_StartDate>
    endDate?: Maybe<FreebusyFilter_EndDate>
    dateCreated?: Maybe<FreebusyFilter_DateCreated>
    dateModified?: Maybe<FreebusyFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryJournalArgs = {
    id: Scalars['ID']
}

export type QueryJournalsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<JournalFilter_Order>
    startDate?: Maybe<JournalFilter_StartDate>
    endDate?: Maybe<JournalFilter_EndDate>
    dateCreated?: Maybe<JournalFilter_DateCreated>
    dateModified?: Maybe<JournalFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryReservationArgs = {
    id: Scalars['ID']
}

export type QueryReservationsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ReservationFilter_Order>
    dateCreated?: Maybe<ReservationFilter_DateCreated>
    dateModified?: Maybe<ReservationFilter_DateModified>
    underName?: Maybe<Scalars['String']>
    underName_list?: Maybe<Array<Maybe<Scalars['String']>>>
    provider?: Maybe<Scalars['String']>
    provider_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryResourceArgs = {
    id: Scalars['ID']
}

export type QueryResourcesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ResourceFilter_Order>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    name_list?: Maybe<Array<Maybe<Scalars['String']>>>
    description?: Maybe<Scalars['String']>
    description_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateCreated_list?: Maybe<Array<Maybe<Scalars['String']>>>
    dateModified_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryScheduleArgs = {
    id: Scalars['ID']
}

export type QuerySchedulesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ScheduleFilter_Order>
    repeatTill?: Maybe<ScheduleFilter_RepeatTill>
    dateCreated?: Maybe<ScheduleFilter_DateCreated>
    dateModified?: Maybe<ScheduleFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type QueryTodoArgs = {
    id: Scalars['ID']
}

export type QueryTodosArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TodoFilter_Order>
    startDate?: Maybe<TodoFilter_StartDate>
    endDate?: Maybe<TodoFilter_EndDate>
    completed?: Maybe<TodoFilter_Completed>
    dateCreated?: Maybe<TodoFilter_DateCreated>
    dateModified?: Maybe<TodoFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
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

/** Used to describe alarms for Events and Todos. */
export type Alarm = Node & {
    __typename?: 'Alarm'
    id: Scalars['ID']
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The action of the alarm. **AUDIO**, **DISPLAY**, **EMAIL**, **PROCEDURE** */
    action: Scalars['String']
    /** The number of times the alarm repeats. */
    repeat: Scalars['Int']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type AlarmFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    summary?: Maybe<Scalars['String']>
    action?: Maybe<Scalars['String']>
    trigger?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    repeat?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type AlarmFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type AlarmFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Alarm. */
export type AlarmConnection = {
    __typename?: 'AlarmConnection'
    edges?: Maybe<Array<Maybe<AlarmEdge>>>
    pageInfo: AlarmPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Alarm. */
export type AlarmEdge = {
    __typename?: 'AlarmEdge'
    node?: Maybe<Alarm>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AlarmPageInfo = {
    __typename?: 'AlarmPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type Availability = Node & {
    __typename?: 'Availability'
    id: Scalars['ID']
    /** The start of the availability block */
    startDate?: Maybe<Scalars['String']>
    /** The end of the availability block */
    endDate?: Maybe<Scalars['String']>
    /** Whether the block is available or not */
    available: Scalars['Boolean']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    calendar?: Maybe<Calendar>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type Calendar = Node & {
    __typename?: 'Calendar'
    id: Scalars['ID']
    /** The name of this Calendar */
    name: Scalars['String']
    /** An short description of this Calendar */
    description?: Maybe<Scalars['String']>
    /** A specific commonground organisation */
    organization?: Maybe<Scalars['String']>
    /** A specific commonground person from the contactcatalogus */
    person?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** Events that belong to this Calendar */
    events?: Maybe<EventConnection>
    /** Availability that belong to this Calendar */
    availabilities?: Maybe<AvailabilityConnection>
    /** Schedules that belong to this Calendar */
    schedules?: Maybe<ScheduleConnection>
    /** The time zone of this calendar */
    timeZone: Scalars['String']
    /** that belong to this Calendar */
    freebusies?: Maybe<FreebusyConnection>
    /** journals that belong to this Calendar */
    journals?: Maybe<JournalConnection>
    /** todos that belong to this Calendar */
    todos?: Maybe<TodoConnection>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CalendarEventsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EventFilter_Order>
    startDate?: Maybe<EventFilter_StartDate>
    endDate?: Maybe<EventFilter_EndDate>
    dateCreated?: Maybe<EventFilter_DateCreated>
    dateModified?: Maybe<EventFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_organization?: Maybe<Scalars['String']>
    calendar_organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    location?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    status_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CalendarAvailabilitiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CalendarSchedulesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<ScheduleFilter_Order>
    repeatTill?: Maybe<ScheduleFilter_RepeatTill>
    dateCreated?: Maybe<ScheduleFilter_DateCreated>
    dateModified?: Maybe<ScheduleFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CalendarFreebusiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<FreebusyFilter_Order>
    startDate?: Maybe<FreebusyFilter_StartDate>
    endDate?: Maybe<FreebusyFilter_EndDate>
    dateCreated?: Maybe<FreebusyFilter_DateCreated>
    dateModified?: Maybe<FreebusyFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CalendarJournalsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<JournalFilter_Order>
    startDate?: Maybe<JournalFilter_StartDate>
    endDate?: Maybe<JournalFilter_EndDate>
    dateCreated?: Maybe<JournalFilter_DateCreated>
    dateModified?: Maybe<JournalFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CalendarTodosArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TodoFilter_Order>
    startDate?: Maybe<TodoFilter_StartDate>
    endDate?: Maybe<TodoFilter_EndDate>
    completed?: Maybe<TodoFilter_Completed>
    dateCreated?: Maybe<TodoFilter_DateCreated>
    dateModified?: Maybe<TodoFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type EventFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    startDate?: Maybe<Scalars['String']>
    endDate?: Maybe<Scalars['String']>
    location?: Maybe<Scalars['String']>
    class?: Maybe<Scalars['String']>
    geo?: Maybe<Scalars['String']>
    organizer?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    summary?: Maybe<Scalars['String']>
    transp?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    contact?: Maybe<Scalars['String']>
    seq?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['String']>
    attendees?: Maybe<Scalars['String']>
    attachments?: Maybe<Scalars['String']>
    categories?: Maybe<Scalars['String']>
    comments?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type EventFilter_StartDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type EventFilter_EndDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type EventFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type EventFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Event. */
export type EventConnection = {
    __typename?: 'EventConnection'
    edges?: Maybe<Array<Maybe<EventEdge>>>
    pageInfo: EventPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Event. */
export type EventEdge = {
    __typename?: 'EventEdge'
    node?: Maybe<Event>
    cursor: Scalars['String']
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type Event = Node & {
    __typename?: 'Event'
    id: Scalars['ID']
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** A specific commonground organisation */
    organization?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate: Scalars['String']
    /** The moment this event ends */
    endDate: Scalars['String']
    /** The location of this event */
    location?: Maybe<Scalars['String']>
    /** An optional Schedule to which this event belongs */
    schedule?: Maybe<Schedule>
    /** The Calendar to wich this event belongs */
    calendar?: Maybe<Calendar>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The coordinates of this event. */
    geo?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organizer?: Maybe<Scalars['String']>
    /** The status of this event. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The determination if the event should block the duration of the event for participants. */
    transp?: Maybe<Scalars['String']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq: Scalars['Int']
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority: Scalars['Int']
    /** The urls of the attendees of this event. */
    attendees: Scalars['Iterable']
    /** The urls of the attachments of this event. */
    attachments: Scalars['Iterable']
    /** The urls of the catergories this event belongs to. */
    categories: Scalars['Iterable']
    /** The urls of the comments that belong to this event. */
    comments: Scalars['Iterable']
    /** Freebusies that are for this Event */
    freebusies?: Maybe<FreebusyConnection>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type EventFreebusiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<FreebusyFilter_Order>
    startDate?: Maybe<FreebusyFilter_StartDate>
    endDate?: Maybe<FreebusyFilter_EndDate>
    dateCreated?: Maybe<FreebusyFilter_DateCreated>
    dateModified?: Maybe<FreebusyFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type Schedule = Node & {
    __typename?: 'Schedule'
    id: Scalars['ID']
    /** The name of this Schedule */
    name: Scalars['String']
    /** An short description of this Schedule */
    description?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The events that belong to or are caused by this Schedule */
    events?: Maybe<EventConnection>
    /** Defines the day(s) of the month on which a recurring Event takes place. Specified as an Integer between 1-31. */
    exceptDates?: Maybe<Scalars['Iterable']>
    /** Defines the number of times a recurring Event will take place */
    repeatCount?: Maybe<Scalars['Int']>
    /** Defines the frequency at which Events will occur according to a schedule Schedule. The intervals between events should be defined as a [Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) of time. */
    repeatFrequency?: Maybe<Scalars['String']>
    /** The freebusies that belong to or are caused by this Schedule */
    freebusies?: Maybe<FreebusyConnection>
    /** The todos that belong to or are caused by this Schedule */
    todos?: Maybe<TodoConnection>
    /** The moment this recurrence can be recurred to */
    repeatTill: Scalars['String']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** Defines the day(s) a week this recurrence occurs where monday is 1 and sunday is 7 */
    daysPerWeek?: Maybe<Scalars['Iterable']>
    /** Defines the day(s) a month this recurrence occurs */
    daysPerMonth?: Maybe<Scalars['Iterable']>
    /** Defines the week(s) a year this recurrence occurs */
    weeksPerYear?: Maybe<Scalars['Iterable']>
    /** Defines the month(s) a year this recurrence occurs */
    monthsPerYear?: Maybe<Scalars['Iterable']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type ScheduleEventsArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<EventFilter_Order>
    startDate?: Maybe<EventFilter_StartDate>
    endDate?: Maybe<EventFilter_EndDate>
    dateCreated?: Maybe<EventFilter_DateCreated>
    dateModified?: Maybe<EventFilter_DateModified>
    id?: Maybe<Scalars['String']>
    id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_organization?: Maybe<Scalars['String']>
    calendar_organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    organization_list?: Maybe<Array<Maybe<Scalars['String']>>>
    resource?: Maybe<Scalars['String']>
    resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
    location?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    status_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type ScheduleFreebusiesArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<FreebusyFilter_Order>
    startDate?: Maybe<FreebusyFilter_StartDate>
    endDate?: Maybe<FreebusyFilter_EndDate>
    dateCreated?: Maybe<FreebusyFilter_DateCreated>
    dateModified?: Maybe<FreebusyFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type ScheduleTodosArgs = {
    first?: Maybe<Scalars['Int']>
    last?: Maybe<Scalars['Int']>
    before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    order?: Maybe<TodoFilter_Order>
    startDate?: Maybe<TodoFilter_StartDate>
    endDate?: Maybe<TodoFilter_EndDate>
    completed?: Maybe<TodoFilter_Completed>
    dateCreated?: Maybe<TodoFilter_DateCreated>
    dateModified?: Maybe<TodoFilter_DateModified>
    calendar_id?: Maybe<Scalars['String']>
    calendar_id_list?: Maybe<Array<Maybe<Scalars['String']>>>
    calendar_resource?: Maybe<Scalars['String']>
    calendar_resource_list?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type FreebusyFilter_Order = {
    id?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    attendee?: Maybe<Scalars['String']>
    comments?: Maybe<Scalars['String']>
    contact?: Maybe<Scalars['String']>
    startDate?: Maybe<Scalars['String']>
    endDate?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    organiser?: Maybe<Scalars['String']>
    freebusy?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type FreebusyFilter_StartDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type FreebusyFilter_EndDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type FreebusyFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type FreebusyFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Freebusy. */
export type FreebusyConnection = {
    __typename?: 'FreebusyConnection'
    edges?: Maybe<Array<Maybe<FreebusyEdge>>>
    pageInfo: FreebusyPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Freebusy. */
export type FreebusyEdge = {
    __typename?: 'FreebusyEdge'
    node?: Maybe<Freebusy>
    cursor: Scalars['String']
}

/** This entity checks if a person is free or busy for a event. */
export type Freebusy = Node & {
    __typename?: 'Freebusy'
    id: Scalars['ID']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The urls of the attendees of this event. */
    attendee?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate?: Maybe<Scalars['String']>
    /** The moment this event ends */
    endDate?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The determination of the type freebusy. **FREE**, **BUSY** */
    freebusy?: Maybe<Scalars['String']>
    calendar?: Maybe<Calendar>
    event?: Maybe<Event>
    /** Schedule that belongs to this freebusy */
    schedule?: Maybe<Schedule>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type FreebusyPageInfo = {
    __typename?: 'FreebusyPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type TodoFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    startDate?: Maybe<Scalars['String']>
    endDate?: Maybe<Scalars['String']>
    location?: Maybe<Scalars['String']>
    class?: Maybe<Scalars['String']>
    geo?: Maybe<Scalars['String']>
    organiser?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    summary?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    contact?: Maybe<Scalars['String']>
    seq?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['String']>
    attendees?: Maybe<Scalars['String']>
    attachments?: Maybe<Scalars['String']>
    categories?: Maybe<Scalars['String']>
    comments?: Maybe<Scalars['String']>
    completed?: Maybe<Scalars['String']>
    percentageDone?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type TodoFilter_StartDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TodoFilter_EndDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TodoFilter_Completed = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TodoFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type TodoFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Todo. */
export type TodoConnection = {
    __typename?: 'TodoConnection'
    edges?: Maybe<Array<Maybe<TodoEdge>>>
    pageInfo: TodoPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Todo. */
export type TodoEdge = {
    __typename?: 'TodoEdge'
    node?: Maybe<Todo>
    cursor: Scalars['String']
}

/** A to-do from an event. */
export type Todo = Node & {
    __typename?: 'Todo'
    id: Scalars['ID']
    /** The name of this RequestType */
    name: Scalars['String']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate: Scalars['String']
    /** The moment this event ends */
    endDate: Scalars['String']
    /** The location of this event */
    location?: Maybe<Scalars['String']>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The coordinates of this event. */
    geo?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The status of this evemt. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq: Scalars['Int']
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority: Scalars['Int']
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the attachments of this event. */
    attachments?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** The date and time a to-do is completed. */
    completed?: Maybe<Scalars['String']>
    /** The percentage of a to-do that has been comepleted. */
    percentageDone: Scalars['Int']
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type TodoPageInfo = {
    __typename?: 'TodoPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Information about the current page. */
export type EventPageInfo = {
    __typename?: 'EventPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Connection for Availability. */
export type AvailabilityConnection = {
    __typename?: 'AvailabilityConnection'
    edges?: Maybe<Array<Maybe<AvailabilityEdge>>>
    pageInfo: AvailabilityPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Availability. */
export type AvailabilityEdge = {
    __typename?: 'AvailabilityEdge'
    node?: Maybe<Availability>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type AvailabilityPageInfo = {
    __typename?: 'AvailabilityPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type ScheduleFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    daysPerWeek?: Maybe<Scalars['String']>
    daysPerMonth?: Maybe<Scalars['String']>
    weeksPerYear?: Maybe<Scalars['String']>
    monthsPerYear?: Maybe<Scalars['String']>
    exceptDates?: Maybe<Scalars['String']>
    repeatTill?: Maybe<Scalars['String']>
    repeatCount?: Maybe<Scalars['String']>
    repeatFrequency?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type ScheduleFilter_RepeatTill = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ScheduleFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ScheduleFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Schedule. */
export type ScheduleConnection = {
    __typename?: 'ScheduleConnection'
    edges?: Maybe<Array<Maybe<ScheduleEdge>>>
    pageInfo: SchedulePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Schedule. */
export type ScheduleEdge = {
    __typename?: 'ScheduleEdge'
    node?: Maybe<Schedule>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type SchedulePageInfo = {
    __typename?: 'SchedulePageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type JournalFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    startDate?: Maybe<Scalars['String']>
    endDate?: Maybe<Scalars['String']>
    class?: Maybe<Scalars['String']>
    organiser?: Maybe<Scalars['String']>
    status?: Maybe<Scalars['String']>
    summary?: Maybe<Scalars['String']>
    transp?: Maybe<Scalars['String']>
    duration?: Maybe<Scalars['String']>
    seq?: Maybe<Scalars['String']>
    priority?: Maybe<Scalars['String']>
    attendees?: Maybe<Scalars['String']>
    attachments?: Maybe<Scalars['String']>
    categories?: Maybe<Scalars['String']>
    comments?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type JournalFilter_StartDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type JournalFilter_EndDate = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type JournalFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type JournalFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Journal. */
export type JournalConnection = {
    __typename?: 'JournalConnection'
    edges?: Maybe<Array<Maybe<JournalEdge>>>
    pageInfo: JournalPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Journal. */
export type JournalEdge = {
    __typename?: 'JournalEdge'
    node?: Maybe<Journal>
    cursor: Scalars['String']
}

/** A journal from an event. */
export type Journal = Node & {
    __typename?: 'Journal'
    id: Scalars['ID']
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate: Scalars['String']
    /** The moment this event ends */
    endDate: Scalars['String']
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The status of this event. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The determination if the event should block the duration of the event for participants. */
    transp?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq: Scalars['Int']
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority: Scalars['Int']
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the attachments of this event. */
    attachments?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments: Scalars['Iterable']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

/** Information about the current page. */
export type JournalPageInfo = {
    __typename?: 'JournalPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

export type CalendarFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    organization?: Maybe<Scalars['String']>
    person?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    timeZone?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

export type CalendarFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type CalendarFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Calendar. */
export type CalendarConnection = {
    __typename?: 'CalendarConnection'
    edges?: Maybe<Array<Maybe<CalendarEdge>>>
    pageInfo: CalendarPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Calendar. */
export type CalendarEdge = {
    __typename?: 'CalendarEdge'
    node?: Maybe<Calendar>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type CalendarPageInfo = {
    __typename?: 'CalendarPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type Reservation = Node & {
    __typename?: 'Reservation'
    id: Scalars['ID']
    /** The name of this Reservation */
    name: Scalars['String']
    /** An short description of this Reservation */
    description?: Maybe<Scalars['String']>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
    /** The url of a person who is under name(the requester) of this reservation */
    underName: Scalars['String']
    /** The number of participants for this reservation */
    numberOfParticipants: Scalars['Int']
    /** Event that is booked in this reservation */
    event: Event
    /** The url of a person or organization who is the provider of this reservation */
    provider: Scalars['String']
    /** The url of a person or organization who is the broker of this reservation */
    broker?: Maybe<Scalars['String']>
    /** The thing -- flight, event, restaurant,etc. being reserved */
    reservationFor?: Maybe<Scalars['String']>
    /** The current status of the reservation. */
    reservationStatus?: Maybe<Scalars['String']>
    /** A ticket associated with the reservation. */
    reservedTicket?: Maybe<Scalars['String']>
    /** Any membership in a frequent flyer, hotel loyalty program, etc. being applied to the reservation. */
    programMembershipUsed?: Maybe<Scalars['String']>
    /** The currency of this product in an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format */
    priceCurrency?: Maybe<Scalars['String']>
    /** The total price of this reservation */
    totalPrice?: Maybe<Scalars['String']>
    /** comment for this reservation */
    comment?: Maybe<Scalars['String']>
}

export type ReservationFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
    underName?: Maybe<Scalars['String']>
    numberOfParticipants?: Maybe<Scalars['String']>
    provider?: Maybe<Scalars['String']>
    broker?: Maybe<Scalars['String']>
    reservationFor?: Maybe<Scalars['String']>
    reservationStatus?: Maybe<Scalars['String']>
    reservedTicket?: Maybe<Scalars['String']>
    programMembershipUsed?: Maybe<Scalars['String']>
    priceCurrency?: Maybe<Scalars['String']>
    totalPrice?: Maybe<Scalars['String']>
    comment?: Maybe<Scalars['String']>
}

export type ReservationFilter_DateCreated = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

export type ReservationFilter_DateModified = {
    before?: Maybe<Scalars['String']>
    strictly_before?: Maybe<Scalars['String']>
    after?: Maybe<Scalars['String']>
    strictly_after?: Maybe<Scalars['String']>
}

/** Connection for Reservation. */
export type ReservationConnection = {
    __typename?: 'ReservationConnection'
    edges?: Maybe<Array<Maybe<ReservationEdge>>>
    pageInfo: ReservationPageInfo
    totalCount: Scalars['Int']
}

/** Edge of Reservation. */
export type ReservationEdge = {
    __typename?: 'ReservationEdge'
    node?: Maybe<Reservation>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ReservationPageInfo = {
    __typename?: 'ReservationPageInfo'
    endCursor?: Maybe<Scalars['String']>
    startCursor?: Maybe<Scalars['String']>
    hasNextPage: Scalars['Boolean']
    hasPreviousPage: Scalars['Boolean']
}

/** Describes resources that can be needed for an event. */
export type Resource = Node & {
    __typename?: 'Resource'
    id: Scalars['ID']
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** the uri of this resource */
    resource?: Maybe<Scalars['String']>
    /** The moment this resource was created */
    dateCreated?: Maybe<Scalars['String']>
    /** The moment this resource last Modified */
    dateModified?: Maybe<Scalars['String']>
}

export type ResourceFilter_Order = {
    id?: Maybe<Scalars['String']>
    name?: Maybe<Scalars['String']>
    description?: Maybe<Scalars['String']>
    resource?: Maybe<Scalars['String']>
    dateCreated?: Maybe<Scalars['String']>
    dateModified?: Maybe<Scalars['String']>
}

/** Connection for Resource. */
export type ResourceConnection = {
    __typename?: 'ResourceConnection'
    edges?: Maybe<Array<Maybe<ResourceEdge>>>
    pageInfo: ResourcePageInfo
    totalCount: Scalars['Int']
}

/** Edge of Resource. */
export type ResourceEdge = {
    __typename?: 'ResourceEdge'
    node?: Maybe<Resource>
    cursor: Scalars['String']
}

/** Information about the current page. */
export type ResourcePageInfo = {
    __typename?: 'ResourcePageInfo'
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
    /** Deletes a Alarm. */
    deleteAlarm?: Maybe<DeleteAlarmPayload>
    /** Updates a Alarm. */
    updateAlarm?: Maybe<UpdateAlarmPayload>
    /** Creates a Alarm. */
    createAlarm?: Maybe<CreateAlarmPayload>
    /** Deletes a Availability. */
    deleteAvailability?: Maybe<DeleteAvailabilityPayload>
    /** Updates a Availability. */
    updateAvailability?: Maybe<UpdateAvailabilityPayload>
    /** Creates a Availability. */
    createAvailability?: Maybe<CreateAvailabilityPayload>
    /** Deletes a Calendar. */
    deleteCalendar?: Maybe<DeleteCalendarPayload>
    /** Updates a Calendar. */
    updateCalendar?: Maybe<UpdateCalendarPayload>
    /** Creates a Calendar. */
    createCalendar?: Maybe<CreateCalendarPayload>
    /** Deletes a Event. */
    deleteEvent?: Maybe<DeleteEventPayload>
    /** Updates a Event. */
    updateEvent?: Maybe<UpdateEventPayload>
    /** Creates a Event. */
    createEvent?: Maybe<CreateEventPayload>
    /** Deletes a Freebusy. */
    deleteFreebusy?: Maybe<DeleteFreebusyPayload>
    /** Updates a Freebusy. */
    updateFreebusy?: Maybe<UpdateFreebusyPayload>
    /** Creates a Freebusy. */
    createFreebusy?: Maybe<CreateFreebusyPayload>
    /** Deletes a Journal. */
    deleteJournal?: Maybe<DeleteJournalPayload>
    /** Updates a Journal. */
    updateJournal?: Maybe<UpdateJournalPayload>
    /** Creates a Journal. */
    createJournal?: Maybe<CreateJournalPayload>
    /** Deletes a Reservation. */
    deleteReservation?: Maybe<DeleteReservationPayload>
    /** Updates a Reservation. */
    updateReservation?: Maybe<UpdateReservationPayload>
    /** Creates a Reservation. */
    createReservation?: Maybe<CreateReservationPayload>
    /** Deletes a Resource. */
    deleteResource?: Maybe<DeleteResourcePayload>
    /** Updates a Resource. */
    updateResource?: Maybe<UpdateResourcePayload>
    /** Creates a Resource. */
    createResource?: Maybe<CreateResourcePayload>
    /** Deletes a Schedule. */
    deleteSchedule?: Maybe<DeleteSchedulePayload>
    /** Updates a Schedule. */
    updateSchedule?: Maybe<UpdateSchedulePayload>
    /** Creates a Schedule. */
    createSchedule?: Maybe<CreateSchedulePayload>
    /** Deletes a Todo. */
    deleteTodo?: Maybe<DeleteTodoPayload>
    /** Updates a Todo. */
    updateTodo?: Maybe<UpdateTodoPayload>
    /** Creates a Todo. */
    createTodo?: Maybe<CreateTodoPayload>
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

export type MutationDeleteAlarmArgs = {
    input: DeleteAlarmInput
}

export type MutationUpdateAlarmArgs = {
    input: UpdateAlarmInput
}

export type MutationCreateAlarmArgs = {
    input: CreateAlarmInput
}

export type MutationDeleteAvailabilityArgs = {
    input: DeleteAvailabilityInput
}

export type MutationUpdateAvailabilityArgs = {
    input: UpdateAvailabilityInput
}

export type MutationCreateAvailabilityArgs = {
    input: CreateAvailabilityInput
}

export type MutationDeleteCalendarArgs = {
    input: DeleteCalendarInput
}

export type MutationUpdateCalendarArgs = {
    input: UpdateCalendarInput
}

export type MutationCreateCalendarArgs = {
    input: CreateCalendarInput
}

export type MutationDeleteEventArgs = {
    input: DeleteEventInput
}

export type MutationUpdateEventArgs = {
    input: UpdateEventInput
}

export type MutationCreateEventArgs = {
    input: CreateEventInput
}

export type MutationDeleteFreebusyArgs = {
    input: DeleteFreebusyInput
}

export type MutationUpdateFreebusyArgs = {
    input: UpdateFreebusyInput
}

export type MutationCreateFreebusyArgs = {
    input: CreateFreebusyInput
}

export type MutationDeleteJournalArgs = {
    input: DeleteJournalInput
}

export type MutationUpdateJournalArgs = {
    input: UpdateJournalInput
}

export type MutationCreateJournalArgs = {
    input: CreateJournalInput
}

export type MutationDeleteReservationArgs = {
    input: DeleteReservationInput
}

export type MutationUpdateReservationArgs = {
    input: UpdateReservationInput
}

export type MutationCreateReservationArgs = {
    input: CreateReservationInput
}

export type MutationDeleteResourceArgs = {
    input: DeleteResourceInput
}

export type MutationUpdateResourceArgs = {
    input: UpdateResourceInput
}

export type MutationCreateResourceArgs = {
    input: CreateResourceInput
}

export type MutationDeleteScheduleArgs = {
    input: DeleteScheduleInput
}

export type MutationUpdateScheduleArgs = {
    input: UpdateScheduleInput
}

export type MutationCreateScheduleArgs = {
    input: CreateScheduleInput
}

export type MutationDeleteTodoArgs = {
    input: DeleteTodoInput
}

export type MutationUpdateTodoArgs = {
    input: UpdateTodoInput
}

export type MutationCreateTodoArgs = {
    input: CreateTodoInput
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

/** Used to describe alarms for Events and Todos. */
export type DeleteAlarmInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Used to describe alarms for Events and Todos. */
export type DeleteAlarmPayload = {
    __typename?: 'deleteAlarmPayload'
    alarm?: Maybe<Alarm>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Used to describe alarms for Events and Todos. */
export type UpdateAlarmInput = {
    id: Scalars['ID']
    /** The name of this RequestType */
    name?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The action of the alarm. **AUDIO**, **DISPLAY**, **EMAIL**, **PROCEDURE** */
    action?: Maybe<Scalars['String']>
    /** The time the alarm should trigger relative to the start time of the related event. */
    trigger?: Maybe<Scalars['String']>
    /** The time until the alarm repeats. */
    duration?: Maybe<Scalars['String']>
    /** The number of times the alarm repeats. */
    repeat?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Used to describe alarms for Events and Todos. */
export type UpdateAlarmPayload = {
    __typename?: 'updateAlarmPayload'
    alarm?: Maybe<Alarm>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Used to describe alarms for Events and Todos. */
export type CreateAlarmInput = {
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The action of the alarm. **AUDIO**, **DISPLAY**, **EMAIL**, **PROCEDURE** */
    action: Scalars['String']
    /** The time the alarm should trigger relative to the start time of the related event. */
    trigger: Scalars['String']
    /** The time until the alarm repeats. */
    duration: Scalars['String']
    /** The number of times the alarm repeats. */
    repeat: Scalars['Int']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Used to describe alarms for Events and Todos. */
export type CreateAlarmPayload = {
    __typename?: 'createAlarmPayload'
    alarm?: Maybe<Alarm>
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAvailabilityInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

export type DeleteAvailabilityPayload = {
    __typename?: 'deleteAvailabilityPayload'
    availability?: Maybe<Availability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAvailabilityInput = {
    id: Scalars['ID']
    /** The start of the availability block */
    startDate?: Maybe<Scalars['String']>
    /** The end of the availability block */
    endDate?: Maybe<Scalars['String']>
    /** Whether the block is available or not */
    available?: Maybe<Scalars['Boolean']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    calendar?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type UpdateAvailabilityPayload = {
    __typename?: 'updateAvailabilityPayload'
    availability?: Maybe<Availability>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAvailabilityInput = {
    /** The start of the availability block */
    startDate?: Maybe<Scalars['String']>
    /** The end of the availability block */
    endDate?: Maybe<Scalars['String']>
    /** Whether the block is available or not */
    available: Scalars['Boolean']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    calendar?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

export type CreateAvailabilityPayload = {
    __typename?: 'createAvailabilityPayload'
    availability?: Maybe<Availability>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type DeleteCalendarInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type DeleteCalendarPayload = {
    __typename?: 'deleteCalendarPayload'
    calendar?: Maybe<Calendar>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type UpdateCalendarInput = {
    id: Scalars['ID']
    /** The name of this Calendar */
    name?: Maybe<Scalars['String']>
    /** An short description of this Calendar */
    description?: Maybe<Scalars['String']>
    /** A specific commonground organisation */
    organization?: Maybe<Scalars['String']>
    /** A specific commonground person from the contactcatalogus */
    person?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** Events that belong to this Calendar */
    events?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Availability that belong to this Calendar */
    availabilities?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Schedules that belong to this Calendar */
    schedules?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The time zone of this calendar */
    timeZone?: Maybe<Scalars['String']>
    /** that belong to this Calendar */
    freebusies?: Maybe<Array<Maybe<Scalars['String']>>>
    /** journals that belong to this Calendar */
    journals?: Maybe<Array<Maybe<Scalars['String']>>>
    /** todos that belong to this Calendar */
    todos?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type UpdateCalendarPayload = {
    __typename?: 'updateCalendarPayload'
    calendar?: Maybe<Calendar>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CreateCalendarInput = {
    /** The name of this Calendar */
    name: Scalars['String']
    /** An short description of this Calendar */
    description?: Maybe<Scalars['String']>
    /** A specific commonground organisation */
    organization?: Maybe<Scalars['String']>
    /** A specific commonground person from the contactcatalogus */
    person?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** Events that belong to this Calendar */
    events?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Availability that belong to this Calendar */
    availabilities?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Schedules that belong to this Calendar */
    schedules?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The time zone of this calendar */
    timeZone: Scalars['String']
    /** that belong to this Calendar */
    freebusies?: Maybe<Array<Maybe<Scalars['String']>>>
    /** journals that belong to this Calendar */
    journals?: Maybe<Array<Maybe<Scalars['String']>>>
    /** todos that belong to this Calendar */
    todos?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Calendar is a collection of events tied to an unque person or resource. */
export type CreateCalendarPayload = {
    __typename?: 'createCalendarPayload'
    calendar?: Maybe<Calendar>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type DeleteEventInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type DeleteEventPayload = {
    __typename?: 'deleteEventPayload'
    event?: Maybe<Event>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type UpdateEventInput = {
    id: Scalars['ID']
    /** The name of this RequestType */
    name?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** A specific commonground organisation */
    organization?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate?: Maybe<Scalars['String']>
    /** The moment this event ends */
    endDate?: Maybe<Scalars['String']>
    /** The location of this event */
    location?: Maybe<Scalars['String']>
    /** An optional Schedule to which this event belongs */
    schedule?: Maybe<Scalars['String']>
    /** The Calendar to wich this event belongs */
    calendar?: Maybe<Scalars['String']>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The coordinates of this event. */
    geo?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organizer?: Maybe<Scalars['String']>
    /** The status of this event. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The determination if the event should block the duration of the event for participants. */
    transp?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq?: Maybe<Scalars['Int']>
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority?: Maybe<Scalars['Int']>
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** Freebusies that are for this Event */
    freebusies?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type UpdateEventPayload = {
    __typename?: 'updateEventPayload'
    event?: Maybe<Event>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type CreateEventInput = {
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** A specific commonground organisation */
    organization?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate: Scalars['String']
    /** The moment this event ends */
    endDate: Scalars['String']
    /** The location of this event */
    location?: Maybe<Scalars['String']>
    /** An optional Schedule to which this event belongs */
    schedule?: Maybe<Scalars['String']>
    /** The Calendar to wich this event belongs */
    calendar?: Maybe<Scalars['String']>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The coordinates of this event. */
    geo?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organizer?: Maybe<Scalars['String']>
    /** The status of this event. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The determination if the event should block the duration of the event for participants. */
    transp?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq: Scalars['Int']
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority: Scalars['Int']
    /** The urls of the attendees of this event. */
    attendees: Scalars['Iterable']
    /** The urls of the catergories this event belongs to. */
    categories: Scalars['Iterable']
    /** The urls of the comments that belong to this event. */
    comments: Scalars['Iterable']
    /** Freebusies that are for this Event */
    freebusies?: Maybe<Array<Maybe<Scalars['String']>>>
    clientMutationId?: Maybe<Scalars['String']>
}

/** An event happening at a certain time and location, such as a concert, lecture, meeting or festival. */
export type CreateEventPayload = {
    __typename?: 'createEventPayload'
    event?: Maybe<Event>
    clientMutationId?: Maybe<Scalars['String']>
}

/** This entity checks if a person is free or busy for a event. */
export type DeleteFreebusyInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** This entity checks if a person is free or busy for a event. */
export type DeleteFreebusyPayload = {
    __typename?: 'deleteFreebusyPayload'
    freebusy?: Maybe<Freebusy>
    clientMutationId?: Maybe<Scalars['String']>
}

/** This entity checks if a person is free or busy for a event. */
export type UpdateFreebusyInput = {
    id: Scalars['ID']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The urls of the attendees of this event. */
    attendee?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate?: Maybe<Scalars['String']>
    /** The moment this event ends */
    endDate?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The determination of the type freebusy. **FREE**, **BUSY** */
    freebusy?: Maybe<Scalars['String']>
    calendar?: Maybe<Scalars['String']>
    event?: Maybe<Scalars['String']>
    /** Schedule that belongs to this freebusy */
    schedule?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** This entity checks if a person is free or busy for a event. */
export type UpdateFreebusyPayload = {
    __typename?: 'updateFreebusyPayload'
    freebusy?: Maybe<Freebusy>
    clientMutationId?: Maybe<Scalars['String']>
}

/** This entity checks if a person is free or busy for a event. */
export type CreateFreebusyInput = {
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The urls of the attendees of this event. */
    attendee?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate?: Maybe<Scalars['String']>
    /** The moment this event ends */
    endDate?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The determination of the type freebusy. **FREE**, **BUSY** */
    freebusy?: Maybe<Scalars['String']>
    calendar?: Maybe<Scalars['String']>
    event?: Maybe<Scalars['String']>
    /** Schedule that belongs to this freebusy */
    schedule?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** This entity checks if a person is free or busy for a event. */
export type CreateFreebusyPayload = {
    __typename?: 'createFreebusyPayload'
    freebusy?: Maybe<Freebusy>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A journal from an event. */
export type DeleteJournalInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A journal from an event. */
export type DeleteJournalPayload = {
    __typename?: 'deleteJournalPayload'
    journal?: Maybe<Journal>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A journal from an event. */
export type UpdateJournalInput = {
    id: Scalars['ID']
    /** The name of this RequestType */
    name?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate?: Maybe<Scalars['String']>
    /** The moment this event ends */
    endDate?: Maybe<Scalars['String']>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The status of this event. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The determination if the event should block the duration of the event for participants. */
    transp?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq?: Maybe<Scalars['Int']>
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority?: Maybe<Scalars['Int']>
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A journal from an event. */
export type UpdateJournalPayload = {
    __typename?: 'updateJournalPayload'
    journal?: Maybe<Journal>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A journal from an event. */
export type CreateJournalInput = {
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate: Scalars['String']
    /** The moment this event ends */
    endDate: Scalars['String']
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The status of this event. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The determination if the event should block the duration of the event for participants. */
    transp?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq: Scalars['Int']
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority: Scalars['Int']
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments: Scalars['Iterable']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A journal from an event. */
export type CreateJournalPayload = {
    __typename?: 'createJournalPayload'
    journal?: Maybe<Journal>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type DeleteReservationInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type DeleteReservationPayload = {
    __typename?: 'deleteReservationPayload'
    reservation?: Maybe<Reservation>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type UpdateReservationInput = {
    id: Scalars['ID']
    /** The name of this Reservation */
    name?: Maybe<Scalars['String']>
    /** An short description of this Reservation */
    description?: Maybe<Scalars['String']>
    /** The url of a person who is under name(the requester) of this reservation */
    underName?: Maybe<Scalars['String']>
    /** The number of participants for this reservation */
    numberOfParticipants?: Maybe<Scalars['Int']>
    /** Event that is booked in this reservation */
    event?: Maybe<Scalars['String']>
    /** The url of a person or organization who is the provider of this reservation */
    provider?: Maybe<Scalars['String']>
    /** The url of a person or organization who is the broker of this reservation */
    broker?: Maybe<Scalars['String']>
    /** The thing -- flight, event, restaurant,etc. being reserved */
    reservationFor?: Maybe<Scalars['String']>
    /** The current status of the reservation. */
    reservationStatus?: Maybe<Scalars['String']>
    /** A ticket associated with the reservation. */
    reservedTicket?: Maybe<Scalars['String']>
    /** Any membership in a frequent flyer, hotel loyalty program, etc. being applied to the reservation. */
    programMembershipUsed?: Maybe<Scalars['String']>
    /** The currency of this product in an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format */
    priceCurrency?: Maybe<Scalars['String']>
    /** The total price of this reservation */
    totalPrice?: Maybe<Scalars['String']>
    /** comment for this reservation */
    comment?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type UpdateReservationPayload = {
    __typename?: 'updateReservationPayload'
    reservation?: Maybe<Reservation>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type CreateReservationInput = {
    /** The name of this Reservation */
    name: Scalars['String']
    /** An short description of this Reservation */
    description?: Maybe<Scalars['String']>
    /** The url of a person who is under name(the requester) of this reservation */
    underName: Scalars['String']
    /** The number of participants for this reservation */
    numberOfParticipants: Scalars['Int']
    /** Event that is booked in this reservation */
    event: Scalars['String']
    /** The url of a person or organization who is the provider of this reservation */
    provider: Scalars['String']
    /** The url of a person or organization who is the broker of this reservation */
    broker?: Maybe<Scalars['String']>
    /** The thing -- flight, event, restaurant,etc. being reserved */
    reservationFor?: Maybe<Scalars['String']>
    /** The current status of the reservation. */
    reservationStatus?: Maybe<Scalars['String']>
    /** A ticket associated with the reservation. */
    reservedTicket?: Maybe<Scalars['String']>
    /** Any membership in a frequent flyer, hotel loyalty program, etc. being applied to the reservation. */
    programMembershipUsed?: Maybe<Scalars['String']>
    /** The currency of this product in an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format */
    priceCurrency?: Maybe<Scalars['String']>
    /** The total price of this reservation */
    totalPrice?: Maybe<Scalars['String']>
    /** comment for this reservation */
    comment?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A Reservation is a event that is tied to an unique person or resource. */
export type CreateReservationPayload = {
    __typename?: 'createReservationPayload'
    reservation?: Maybe<Reservation>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Describes resources that can be needed for an event. */
export type DeleteResourceInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** Describes resources that can be needed for an event. */
export type DeleteResourcePayload = {
    __typename?: 'deleteResourcePayload'
    resource?: Maybe<Resource>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Describes resources that can be needed for an event. */
export type UpdateResourceInput = {
    id: Scalars['ID']
    /** The name of this RequestType */
    name?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** the uri of this resource */
    resource?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Describes resources that can be needed for an event. */
export type UpdateResourcePayload = {
    __typename?: 'updateResourcePayload'
    resource?: Maybe<Resource>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Describes resources that can be needed for an event. */
export type CreateResourceInput = {
    /** The name of this RequestType */
    name: Scalars['String']
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** the uri of this resource */
    resource?: Maybe<Scalars['String']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** Describes resources that can be needed for an event. */
export type CreateResourcePayload = {
    __typename?: 'createResourcePayload'
    resource?: Maybe<Resource>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type DeleteScheduleInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type DeleteSchedulePayload = {
    __typename?: 'deleteSchedulePayload'
    schedule?: Maybe<Schedule>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type UpdateScheduleInput = {
    id: Scalars['ID']
    /** The name of this Schedule */
    name?: Maybe<Scalars['String']>
    /** An short description of this Schedule */
    description?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The events that belong to or are caused by this Schedule */
    events?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Defines the day(s) of the month on which a recurring Event takes place. Specified as an Integer between 1-31. */
    exceptDates?: Maybe<Scalars['Iterable']>
    /** Defines the number of times a recurring Event will take place */
    repeatCount?: Maybe<Scalars['Int']>
    /** Defines the frequency at which Events will occur according to a schedule Schedule. The intervals between events should be defined as a [Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) of time. */
    repeatFrequency?: Maybe<Scalars['String']>
    /** The freebusies that belong to or are caused by this Schedule */
    freebusies?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The todos that belong to or are caused by this Schedule */
    todos?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The moment this recurrence can be recurred to */
    repeatTill?: Maybe<Scalars['String']>
    /** Defines the day(s) a week this recurrence occurs where monday is 1 and sunday is 7 */
    daysPerWeek?: Maybe<Scalars['Iterable']>
    /** Defines the day(s) a month this recurrence occurs */
    daysPerMonth?: Maybe<Scalars['Iterable']>
    /** Defines the week(s) a year this recurrence occurs */
    weeksPerYear?: Maybe<Scalars['Iterable']>
    /** Defines the month(s) a year this recurrence occurs */
    monthsPerYear?: Maybe<Scalars['Iterable']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type UpdateSchedulePayload = {
    __typename?: 'updateSchedulePayload'
    schedule?: Maybe<Schedule>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type CreateScheduleInput = {
    /** The name of this Schedule */
    name: Scalars['String']
    /** An short description of this Schedule */
    description?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** The events that belong to or are caused by this Schedule */
    events?: Maybe<Array<Maybe<Scalars['String']>>>
    /** Defines the day(s) of the month on which a recurring Event takes place. Specified as an Integer between 1-31. */
    exceptDates?: Maybe<Scalars['Iterable']>
    /** Defines the number of times a recurring Event will take place */
    repeatCount?: Maybe<Scalars['Int']>
    /** Defines the frequency at which Events will occur according to a schedule Schedule. The intervals between events should be defined as a [Duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) of time. */
    repeatFrequency?: Maybe<Scalars['String']>
    /** The freebusies that belong to or are caused by this Schedule */
    freebusies?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The todos that belong to or are caused by this Schedule */
    todos?: Maybe<Array<Maybe<Scalars['String']>>>
    /** The moment this recurrence can be recurred to */
    repeatTill: Scalars['String']
    /** Defines the day(s) a week this recurrence occurs where monday is 1 and sunday is 7 */
    daysPerWeek?: Maybe<Scalars['Iterable']>
    /** Defines the day(s) a month this recurrence occurs */
    daysPerMonth?: Maybe<Scalars['Iterable']>
    /** Defines the week(s) a year this recurrence occurs */
    weeksPerYear?: Maybe<Scalars['Iterable']>
    /** Defines the month(s) a year this recurrence occurs */
    monthsPerYear?: Maybe<Scalars['Iterable']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A schedule defines a repeating time period used to describe a regularly occurring Event. At a minimum a schedule will specify repeatFrequency which describes the interval between occurences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the day(s) of the week or month when the recurring event will take place, in addition to its start and end time. Schedules may also have start and end dates to indicate when they are active, e.g. to define a limited calendar of events. */
export type CreateSchedulePayload = {
    __typename?: 'createSchedulePayload'
    schedule?: Maybe<Schedule>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A to-do from an event. */
export type DeleteTodoInput = {
    id: Scalars['ID']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A to-do from an event. */
export type DeleteTodoPayload = {
    __typename?: 'deleteTodoPayload'
    todo?: Maybe<Todo>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A to-do from an event. */
export type UpdateTodoInput = {
    id: Scalars['ID']
    /** The name of this RequestType */
    name?: Maybe<Scalars['String']>
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate?: Maybe<Scalars['String']>
    /** The moment this event ends */
    endDate?: Maybe<Scalars['String']>
    /** The location of this event */
    location?: Maybe<Scalars['String']>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The coordinates of this event. */
    geo?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The status of this evemt. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq?: Maybe<Scalars['Int']>
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority?: Maybe<Scalars['Int']>
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** The date and time a to-do is completed. */
    completed?: Maybe<Scalars['String']>
    /** The percentage of a to-do that has been comepleted. */
    percentageDone?: Maybe<Scalars['Int']>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A to-do from an event. */
export type UpdateTodoPayload = {
    __typename?: 'updateTodoPayload'
    todo?: Maybe<Todo>
    clientMutationId?: Maybe<Scalars['String']>
}

/** A to-do from an event. */
export type CreateTodoInput = {
    /** The name of this RequestType */
    name: Scalars['String']
    /** A specific commonground resource */
    resource?: Maybe<Scalars['String']>
    /** An short description of this Event */
    description?: Maybe<Scalars['String']>
    /** The moment this event starts */
    startDate: Scalars['String']
    /** The moment this event ends */
    endDate: Scalars['String']
    /** The location of this event */
    location?: Maybe<Scalars['String']>
    /** The security class of this event. */
    class?: Maybe<Scalars['String']>
    /** The coordinates of this event. */
    geo?: Maybe<Scalars['String']>
    /** The organiser of this event linked to with an url. */
    organiser?: Maybe<Scalars['String']>
    /** The status of this evemt. */
    status?: Maybe<Scalars['String']>
    /** The summary of this event. */
    summary?: Maybe<Scalars['String']>
    /** The duration of this event. */
    duration?: Maybe<Scalars['String']>
    /** Url of this person */
    contact?: Maybe<Scalars['String']>
    /** The version number of this event. */
    seq: Scalars['Int']
    /** The priority of this event ranging from 1 (high) to 9 (low). */
    priority: Scalars['Int']
    /** The urls of the attendees of this event. */
    attendees?: Maybe<Scalars['Iterable']>
    /** The urls of the catergories this event belongs to. */
    categories?: Maybe<Scalars['Iterable']>
    /** The urls of the comments that belong to this event. */
    comments?: Maybe<Scalars['Iterable']>
    /** The date and time a to-do is completed. */
    completed?: Maybe<Scalars['String']>
    /** The percentage of a to-do that has been comepleted. */
    percentageDone: Scalars['Int']
    clientMutationId?: Maybe<Scalars['String']>
}

/** A to-do from an event. */
export type CreateTodoPayload = {
    __typename?: 'createTodoPayload'
    todo?: Maybe<Todo>
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

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction()
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {}
}
export type Sdk = ReturnType<typeof getSdk>
