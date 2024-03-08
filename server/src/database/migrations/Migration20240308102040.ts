import { Migration } from '@mikro-orm/migrations'

export class Migration20240308102040 extends Migration {
    public async up(): Promise<void> {
        this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        this.addSql(
            'create table "Address" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "name" varchar(255) null, "street" varchar(255) null, "houseNumber" varchar(255) null, "houseNumberSuffix" varchar(255) null, "postalCode" varchar(255) null, "locality" varchar(255) null, "country" varchar(255) null, constraint "Address_pkey" primary key ("id"));'
        )

        this.addSql(
            "create table \"LearningNeedOutcome\" (\"id\" uuid not null default uuid_generate_v4(), \"createdAt\" timestamptz(0) not null, \"updatedAt\" timestamptz(0) not null, \"subject\" text check (\"subject\" in ('dutchRead', 'dutchWrite', 'dutchSpeaking', 'math', 'digitalSkills', 'knowledge', 'skills', 'attitude', 'behaviour', 'other')) null, \"application\" text check (\"application\" in ('familyAndUpbringing', 'laborMarketAndWork', 'healthAndWellbeing', 'livingAndNeighborhood', 'selfSustainability', 'other')) null, \"level\" text check (\"level\" in ('influx', 'nlqf1', 'nlqf2', 'nlqf3', 'nlqf4', 'other')) null, \"subjectOther\" varchar(255) null, \"applicationOther\" varchar(255) null, \"levelOther\" varchar(255) null, constraint \"LearningNeedOutcome_pkey\" primary key (\"id\"));"
        )

        this.addSql(
            'create table "Organization" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "name" varchar(255) not null, "description" varchar(255) null, "slug" varchar(255) not null, "type" text check ("type" in (\'bisc\', \'languageHouse\', \'provider\')) not null, "address" uuid null, "email" varchar(255) null, "telephone" varchar(255) null, "disabledIntakeFields" text[] null, "hasLimitedEditRights" boolean null, constraint "Organization_pkey" primary key ("id"));'
        )
        this.addSql(
            'comment on column "Organization"."hasLimitedEditRights" is \'Used only to limit provider editing rights at the moment\';'
        )
        this.addSql('alter table "Organization" add constraint "Organization_slug_unique" unique ("slug");')
        this.addSql('alter table "Organization" add constraint "Organization_address_unique" unique ("address");')

        this.addSql(
            "create table \"EducationGroup\" (\"id\" uuid not null default uuid_generate_v4(), \"createdAt\" timestamptz(0) not null, \"updatedAt\" timestamptz(0) not null, \"name\" varchar(255) not null, \"lessonHours\" int null, \"location\" varchar(255) not null, \"type\" text check (\"type\" in ('language', 'math', 'digital', 'other')) not null, \"organization\" uuid not null, \"desiredLearningNeedOutcome\" uuid not null, \"degree\" boolean null, \"start\" timestamptz(0) null, \"end\" timestamptz(0) null, \"availabilityNotes\" varchar(255) null, \"minimumParticipants\" int null, \"maximumParticipants\" int null, \"evaluation\" varchar(255) null, \"formality\" text check (\"formality\" in ('formal', 'nonFormal')) null, \"availability\" text[] null, constraint \"EducationGroup_pkey\" primary key (\"id\"), constraint EducationGroup_availability_check check (\"availability\" <@ ARRAY['mondayMorning','mondayAfternoon','mondayEvening','tuesdayMorning','tuesdayAfternoon','tuesdayEvening','wednesdayMorning','wednesdayAfternoon','wednesdayEvening','thursdayMorning','thursdayAfternoon','thursdayEvening','fridayMorning','fridayAfternoon','fridayEvening','saturdayMorning','saturdayAfternoon','saturdayEvening','sundayMorning','sundayAfternoon','sundayEvening']));"
        )
        this.addSql(
            'alter table "EducationGroup" add constraint "EducationGroup_desiredLearningNeedOutcome_unique" unique ("desiredLearningNeedOutcome");'
        )

        this.addSql(
            'create table "Organization_providers" ("languageHouse" uuid not null, "provider" uuid not null, constraint "Organization_providers_pkey" primary key ("languageHouse", "provider"));'
        )

        this.addSql(
            'create table "Team" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "deletedAt" timestamptz(0) null, "name" varchar(255) not null, "parentOrganization" uuid not null, "hiddenFromPublic" boolean null, constraint "Team_pkey" primary key ("id"));'
        )

        this.addSql(
            'create table "Student" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "intakeDate" timestamptz(0) not null, "organization" uuid not null, "team" uuid null, "registration" uuid null, "mentor" uuid null, constraint "Student_pkey" primary key ("id"));'
        )
        this.addSql('alter table "Student" add constraint "Student_registration_unique" unique ("registration");')

        this.addSql(
            'create table "Person" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "address" uuid null, "email" varchar(255) null, "secondaryEmail" varchar(255) null, "givenName" varchar(255) null, "additionalName" varchar(255) null, "familyName" varchar(255) null, "gender" text check ("gender" in (\'male\', \'female\', \'x\')) null, "birthplace" varchar(255) null, "birthday" timestamptz(0) null, "telephone" varchar(255) null, "emergencyTelephone" varchar(255) null, "contactPreference" varchar(255) null, "contactPreferenceOther" varchar(255) null, "maritalStatus" text check ("maritalStatus" in (\'marriedPartner\', \'single\', \'divorced\', \'widow\')) null, "spokenLanguages" varchar(255) null, "primaryLanguage" varchar(255) null, "children" int null, "availability" text[] null, "availabilityNotes" text null, "student" uuid null, "didSignPermissionForm" boolean not null default false, "hasPermissionToSendInformationAboutLibraries" boolean not null default false, "hasPermissionToShareDataWithLibraries" boolean not null default false, "hasPermissionToShareDataWithProviders" boolean not null default false, "providerTargetGroupPreference" text[] null, "providerVolunteeringPreference" varchar(255) null, "providerLanguageHouseVolunteeringReference" varchar(255) null, "providerTargetGroupIsExperienced" boolean null, "providerTargetGroupExperience" varchar(255) null, constraint "Person_pkey" primary key ("id"), constraint Person_availability_check check ("availability" <@ ARRAY[\'mondayMorning\',\'mondayAfternoon\',\'mondayEvening\',\'tuesdayMorning\',\'tuesdayAfternoon\',\'tuesdayEvening\',\'wednesdayMorning\',\'wednesdayAfternoon\',\'wednesdayEvening\',\'thursdayMorning\',\'thursdayAfternoon\',\'thursdayEvening\',\'fridayMorning\',\'fridayAfternoon\',\'fridayEvening\',\'saturdayMorning\',\'saturdayAfternoon\',\'saturdayEvening\',\'sundayMorning\',\'sundayAfternoon\',\'sundayEvening\']), constraint Person_providerTargetGroupPreference_check check ("providerTargetGroupPreference" <@ ARRAY[\'NT1\',\'NT2\']));'
        )
        this.addSql('comment on column "Person"."secondaryEmail" is \'non unique email\';')
        this.addSql('alter table "Person" add constraint "Person_address_unique" unique ("address");')
        this.addSql('alter table "Person" add constraint "Person_student_unique" unique ("student");')

        this.addSql(
            "create table \"Registration\" (\"id\" uuid not null default uuid_generate_v4(), \"createdAt\" timestamptz(0) not null, \"updatedAt\" timestamptz(0) not null, \"selfRegistered\" boolean null, \"referringOrganization\" varchar(255) null, \"referringOrganizationOther\" varchar(255) null, \"referringTeam\" varchar(255) null, \"referringPerson\" uuid null, \"remarks\" text null, \"status\" text check (\"status\" in ('pending', 'accepted', 'rejected')) not null default 'pending', \"registeredPublicly\" boolean not null default false, \"foundVia\" text check (\"foundVia\" in ('volunteerCenter', 'libraryWebsite', 'socialMedia', 'newspaper', 'viaVia', 'other')) null, \"foundViaOther\" varchar(255) null, \"wentToLanguageHouseBefore\" boolean null, \"wentToLanguageHouseBeforeReason\" varchar(255) null, \"wentToLanguageHouseBeforeYear\" int null, \"network\" text[] null, \"participationLadder\" text check (\"participationLadder\" in ('isolated', 'socialContactsOutside', 'organizedActivityParticipation', 'volunteerWork', 'paidWithSupport', 'paid')) null, \"dutchNTLevel\" text check (\"dutchNTLevel\" in ('nt1', 'nt2')) null, \"inNetherlandsSinceYear\" int null, \"languageInDailyLife\" varchar(255) null, \"knowsLatinAlphabet\" boolean null, \"lastKnownLevel\" text check (\"lastKnownLevel\" in ('a0', 'a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'unknown')) null, \"speakingLevel\" text check (\"speakingLevel\" in ('beginner', 'reasonable', 'advanced')) null, \"trainedForJob\" varchar(255) null, \"lastJob\" varchar(255) null, \"desiredLearningNeedOutcome\" uuid null, \"hasTriedThisBefore\" boolean null, \"hasTriedThisBeforeExplanation\" varchar(255) null, \"whyWantTheseskills\" varchar(255) null, \"whyWantThisNow\" varchar(255) null, \"desiredLearningMethod\" text[] null, \"dayTimeActivities\" text[] null, \"dayTimeActivitiesOther\" varchar(255) null, \"readingTestResult\" text check (\"readingTestResult\" in ('canNotRead', 'a0', 'a1', 'a2', 'b1', 'b2', 'c1', 'c2')) null, \"writingTestResult\" text check (\"writingTestResult\" in ('canNotWrite', 'writeNawDetails', 'writeSimpleTexts', 'writeSimpleLetters')) null, constraint \"Registration_pkey\" primary key (\"id\"), constraint Registration_network_check check (\"network\" <@ ARRAY['householdMembers','neighbors','familyMembers','aidWorkers','friendsAcquaintances','peopleAtMosqueChurch','acquaintancesSpeakingOwnLanguage','acquaintancesSpeakingDutch','colleagues']), constraint Registration_desiredLearningMethod_check check (\"desiredLearningMethod\" <@ ARRAY['inAGroup','oneOnOne','homeEnvironment','inLibraryOrOther','online']), constraint Registration_dayTimeActivities_check check (\"dayTimeActivities\" <@ ARRAY['searchingForJob','reIntegration','school','volunteerJob','job','other']));"
        )
        this.addSql(
            'alter table "Registration" add constraint "Registration_desiredLearningNeedOutcome_unique" unique ("desiredLearningNeedOutcome");'
        )

        this.addSql(
            'create table "Employee" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "organization" uuid not null, "role" text check ("role" in (\'employee\', \'coordinator\', \'mentor\', \'coordinatorMentor\', \'volunteer\')) null, "person" uuid not null, constraint "Employee_pkey" primary key ("id"));'
        )
        this.addSql(
            'alter table "Employee" add constraint "Employee_organization_person_unique" unique ("organization", "person");'
        )

        this.addSql(
            'create table "StudentContactMoment" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "date" timestamptz(0) not null, "createdByOrganization" uuid null, "createdByEmployee" uuid null, "explanation" text not null, "student" uuid not null, "type" text check ("type" in (\'remark\', \'storyTelling\', \'intake\', \'followUp\', \'finalTalk\')) not null, constraint "StudentContactMoment_pkey" primary key ("id"));'
        )

        this.addSql(
            'create table "EducationGroup_employees" ("educationGroup" uuid not null, "employee" uuid not null, constraint "EducationGroup_employees_pkey" primary key ("educationGroup", "employee"));'
        )

        this.addSql(
            'create table "Education" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "person" uuid not null, "name" text check ("name" in (\'lastFollowedEducation\', \'currentEducation\', \'course\')) not null, "type" text check ("type" in (\'course\', \'education\')) not null, "level" text check ("level" in (\'primary\', \'specialEd\', \'domesticSchool\', \'biologicSchool\', \'lts\', \'mavo\', \'vmbo\', \'havo\', \'vwo\', \'mbo\', \'hbo\', \'wo\', \'other\')) null, "levelOther" varchar(255) null, "degree" boolean null, "degreeGranted" boolean null, "other" varchar(255) null, "currentlyFollowingStatus" text check ("currentlyFollowingStatus" in (\'yes\', \'no\', \'noUntilDate\')) null, "startDate" varchar(255) null, "endDate" varchar(255) null, "yearsFollowed" int null, "institution" varchar(255) null, "group" text check ("group" in (\'individual\', \'group\')) null, "courseTeacherType" text check ("courseTeacherType" in (\'professional\', \'volunteer\', \'both\')) null, "hours" int null, constraint "Education_pkey" primary key ("id"));'
        )

        this.addSql(
            'create table "LearningNeed" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "student" uuid not null, "motivation" text not null, "description" varchar(255) not null, "offerDifference" text check ("offerDifference" in (\'no\', \'yesNotOfferedInTravelRange\', \'yesQueue\', \'yesOther\')) null, "advisedOffer" varchar(255) null, "desiredOffer" varchar(255) null, "offerDifferenceOther" varchar(255) null, "agreements" text null, "desiredLearningNeedOutcome" uuid null, "createdByProvider" uuid null, constraint "LearningNeed_pkey" primary key ("id"));'
        )
        this.addSql(
            'alter table "LearningNeed" add constraint "LearningNeed_desiredLearningNeedOutcome_unique" unique ("desiredLearningNeedOutcome");'
        )

        this.addSql(
            'create table "Participation" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "provider" uuid null, "learningNeed" uuid not null, "cascadeOnLearningNeedDelete" boolean null, "mentor" uuid null, "providerOption" text check ("providerOption" in (\'provider\', \'other\')) null, "providerOther" varchar(255) null, "providerExplanation" varchar(255) null, "startParticipation" timestamptz(0) null, "endParticipation" timestamptz(0) null, "start" timestamptz(0) null, "end" timestamptz(0) null, "reasonEndParticipation" text check ("reasonEndParticipation" in (\'moved\', \'work\', \'health\', \'deceased\', \'completedSuccessfully\', \'family\', \'doesNotMeetExpectations\', \'other\')) null, "outFlowParticipation" text check ("outFlowParticipation" in (\'study\', \'work\', \'volunteerWork\', \'formalFollowUp\', \'nonFormalFollowUp\', \'unknown\', \'other\')) null, "outFlowReasonOther" text null, "offerName" varchar(255) null, "offerType" text check ("offerType" in (\'language\', \'math\', \'digital\', \'other\')) null, "formality" text check ("formality" in (\'formal\', \'nonFormal\')) null, "groupFormation" text check ("groupFormation" in (\'individually\', \'group\')) null, "degree" boolean null, "agreement" text null, "educationGroup" uuid null, "offerLearningNeedOutcome" uuid null, constraint "Participation_pkey" primary key ("id"));'
        )
        this.addSql(
            'alter table "Participation" add constraint "Participation_offerLearningNeedOutcome_unique" unique ("offerLearningNeedOutcome");'
        )

        this.addSql(
            'create table "CivicIntegration" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "student" uuid not null, "reason" text check ("reason" in (\'finished\', \'fromEuCountry\', \'exemptedOrZRoute\')) null, "requirement" text check ("requirement" in (\'yes\', \'no\', \'inProgress\')) null, "finishDate" timestamptz(0) null, constraint "CivicIntegration_pkey" primary key ("id"));'
        )
        this.addSql(
            'alter table "CivicIntegration" add constraint "CivicIntegration_student_unique" unique ("student");'
        )

        this.addSql(
            'create table "PostalCodeArea" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "organization" uuid null, "team" uuid null, "code" int not null, constraint "PostalCodeArea_pkey" primary key ("id"));'
        )
        this.addSql('alter table "PostalCodeArea" add constraint "PostalCodeArea_code_unique" unique ("code");')

        this.addSql(
            'create table "Team_members" ("team" uuid not null, "employee" uuid not null, constraint "Team_members_pkey" primary key ("team", "employee"));'
        )

        this.addSql(
            'create table "TestResult" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "examDate" timestamptz(0) null, "memo" varchar(255) null, "usedExam" varchar(255) null, "learningNeedOutcome" uuid not null, "participation" uuid not null, "didAchieveResultResponse" text check ("didAchieveResultResponse" in (\'yes\', \'no\', \'partly\')) null, "unsuccessfulResultReasonResponse" text check ("unsuccessfulResultReasonResponse" in (\'quit\', \'tooDifficult\', \'notNeeded\')) null, "achievedResultResponse" text check ("achievedResultResponse" in (\'satisfactory\', \'newLearningNeedAdded\', \'other\')) null, "achievedResultResponseOther" varchar(255) null, constraint "TestResult_pkey" primary key ("id"));'
        )
        this.addSql(
            'alter table "TestResult" add constraint "TestResult_learningNeedOutcome_unique" unique ("learningNeedOutcome");'
        )
        this.addSql(
            'alter table "TestResult" add constraint "TestResult_participation_unique" unique ("participation");'
        )

        this.addSql(
            'create table "User" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) null, "passwordResetToken" varchar(255) null, "refreshToken" varchar(255) null, "passwordResetRequestedAt" timestamptz(0) null, "locale" text check ("locale" in (\'en\', \'nl\')) not null default \'nl\', "person" uuid null, constraint "User_pkey" primary key ("id"));'
        )
        this.addSql('alter table "User" add constraint "User_username_unique" unique ("username");')
        this.addSql('alter table "User" add constraint "User_person_unique" unique ("person");')

        this.addSql(
            'create table "UploadedDocument" ("id" uuid not null default uuid_generate_v4(), "createdAt" timestamptz(0) not null, "updatedAt" timestamptz(0) not null, "person" uuid not null, "createdByUser" uuid not null, "name" varchar(255) not null, "extension" varchar(255) not null, "mimeType" varchar(255) not null, "size" int not null, "path" varchar(255) not null, constraint "UploadedDocument_pkey" primary key ("id"));'
        )

        this.addSql(
            'alter table "Organization" add constraint "Organization_address_foreign" foreign key ("address") references "Address" ("id") on update cascade on delete set null;'
        )

        this.addSql(
            'alter table "EducationGroup" add constraint "EducationGroup_organization_foreign" foreign key ("organization") references "Organization" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "EducationGroup" add constraint "EducationGroup_desiredLearningNeedOutcome_foreign" foreign key ("desiredLearningNeedOutcome") references "LearningNeedOutcome" ("id") on update cascade;'
        )

        this.addSql(
            'alter table "Organization_providers" add constraint "Organization_providers_languageHouse_foreign" foreign key ("languageHouse") references "Organization" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "Organization_providers" add constraint "Organization_providers_provider_foreign" foreign key ("provider") references "Organization" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "Team" add constraint "Team_parentOrganization_foreign" foreign key ("parentOrganization") references "Organization" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "Student" add constraint "Student_organization_foreign" foreign key ("organization") references "Organization" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "Student" add constraint "Student_team_foreign" foreign key ("team") references "Team" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "Student" add constraint "Student_registration_foreign" foreign key ("registration") references "Registration" ("id") on delete cascade;'
        )
        this.addSql(
            'alter table "Student" add constraint "Student_mentor_foreign" foreign key ("mentor") references "Employee" ("id") on update cascade on delete set null;'
        )

        this.addSql(
            'alter table "Person" add constraint "Person_address_foreign" foreign key ("address") references "Address" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "Person" add constraint "Person_student_foreign" foreign key ("student") references "Student" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "Registration" add constraint "Registration_referringPerson_foreign" foreign key ("referringPerson") references "Person" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "Registration" add constraint "Registration_desiredLearningNeedOutcome_foreign" foreign key ("desiredLearningNeedOutcome") references "LearningNeedOutcome" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "Employee" add constraint "Employee_organization_foreign" foreign key ("organization") references "Organization" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "Employee" add constraint "Employee_person_foreign" foreign key ("person") references "Person" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "StudentContactMoment" add constraint "StudentContactMoment_createdByOrganization_foreign" foreign key ("createdByOrganization") references "Organization" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "StudentContactMoment" add constraint "StudentContactMoment_createdByEmployee_foreign" foreign key ("createdByEmployee") references "Employee" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "StudentContactMoment" add constraint "StudentContactMoment_student_foreign" foreign key ("student") references "Student" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "EducationGroup_employees" add constraint "EducationGroup_employees_educationGroup_foreign" foreign key ("educationGroup") references "EducationGroup" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "EducationGroup_employees" add constraint "EducationGroup_employees_employee_foreign" foreign key ("employee") references "Employee" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "Education" add constraint "Education_person_foreign" foreign key ("person") references "Person" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "LearningNeed" add constraint "LearningNeed_student_foreign" foreign key ("student") references "Student" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "LearningNeed" add constraint "LearningNeed_desiredLearningNeedOutcome_foreign" foreign key ("desiredLearningNeedOutcome") references "LearningNeedOutcome" ("id") on delete cascade;'
        )
        this.addSql(
            'alter table "LearningNeed" add constraint "LearningNeed_createdByProvider_foreign" foreign key ("createdByProvider") references "Organization" ("id") on update cascade on delete set null;'
        )

        this.addSql(
            'alter table "Participation" add constraint "Participation_provider_foreign" foreign key ("provider") references "Organization" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "Participation" add constraint "Participation_learningNeed_foreign" foreign key ("learningNeed") references "LearningNeed" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "Participation" add constraint "Participation_mentor_foreign" foreign key ("mentor") references "Employee" ("id") on update cascade on delete SET NULL;'
        )
        this.addSql(
            'alter table "Participation" add constraint "Participation_educationGroup_foreign" foreign key ("educationGroup") references "EducationGroup" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "Participation" add constraint "Participation_offerLearningNeedOutcome_foreign" foreign key ("offerLearningNeedOutcome") references "LearningNeedOutcome" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "CivicIntegration" add constraint "CivicIntegration_student_foreign" foreign key ("student") references "Student" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "PostalCodeArea" add constraint "PostalCodeArea_organization_foreign" foreign key ("organization") references "Organization" ("id") on update cascade on delete set null;'
        )
        this.addSql(
            'alter table "PostalCodeArea" add constraint "PostalCodeArea_team_foreign" foreign key ("team") references "Team" ("id") on update cascade on delete set null;'
        )

        this.addSql(
            'alter table "Team_members" add constraint "Team_members_team_foreign" foreign key ("team") references "Team" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "Team_members" add constraint "Team_members_employee_foreign" foreign key ("employee") references "Employee" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "TestResult" add constraint "TestResult_learningNeedOutcome_foreign" foreign key ("learningNeedOutcome") references "LearningNeedOutcome" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "TestResult" add constraint "TestResult_participation_foreign" foreign key ("participation") references "Participation" ("id") on update cascade on delete cascade;'
        )

        this.addSql(
            'alter table "User" add constraint "User_person_foreign" foreign key ("person") references "Person" ("id") on update cascade on delete CASCADE;'
        )

        this.addSql(
            'alter table "UploadedDocument" add constraint "UploadedDocument_person_foreign" foreign key ("person") references "Person" ("id") on update cascade on delete cascade;'
        )
        this.addSql(
            'alter table "UploadedDocument" add constraint "UploadedDocument_createdByUser_foreign" foreign key ("createdByUser") references "User" ("id") on update cascade on delete cascade;'
        )
    }

    public async down(): Promise<void> {
        this.addSql('alter table "Organization" drop constraint "Organization_address_foreign";')

        this.addSql('alter table "Person" drop constraint "Person_address_foreign";')

        this.addSql('alter table "EducationGroup" drop constraint "EducationGroup_desiredLearningNeedOutcome_foreign";')

        this.addSql('alter table "Registration" drop constraint "Registration_desiredLearningNeedOutcome_foreign";')

        this.addSql('alter table "LearningNeed" drop constraint "LearningNeed_desiredLearningNeedOutcome_foreign";')

        this.addSql('alter table "Participation" drop constraint "Participation_offerLearningNeedOutcome_foreign";')

        this.addSql('alter table "TestResult" drop constraint "TestResult_learningNeedOutcome_foreign";')

        this.addSql('alter table "EducationGroup" drop constraint "EducationGroup_organization_foreign";')

        this.addSql(
            'alter table "Organization_providers" drop constraint "Organization_providers_languageHouse_foreign";'
        )

        this.addSql('alter table "Organization_providers" drop constraint "Organization_providers_provider_foreign";')

        this.addSql('alter table "Team" drop constraint "Team_parentOrganization_foreign";')

        this.addSql('alter table "Student" drop constraint "Student_organization_foreign";')

        this.addSql('alter table "Employee" drop constraint "Employee_organization_foreign";')

        this.addSql(
            'alter table "StudentContactMoment" drop constraint "StudentContactMoment_createdByOrganization_foreign";'
        )

        this.addSql('alter table "LearningNeed" drop constraint "LearningNeed_createdByProvider_foreign";')

        this.addSql('alter table "Participation" drop constraint "Participation_provider_foreign";')

        this.addSql('alter table "PostalCodeArea" drop constraint "PostalCodeArea_organization_foreign";')

        this.addSql(
            'alter table "EducationGroup_employees" drop constraint "EducationGroup_employees_educationGroup_foreign";'
        )

        this.addSql('alter table "Participation" drop constraint "Participation_educationGroup_foreign";')

        this.addSql('alter table "Student" drop constraint "Student_team_foreign";')

        this.addSql('alter table "PostalCodeArea" drop constraint "PostalCodeArea_team_foreign";')

        this.addSql('alter table "Team_members" drop constraint "Team_members_team_foreign";')

        this.addSql('alter table "Person" drop constraint "Person_student_foreign";')

        this.addSql('alter table "StudentContactMoment" drop constraint "StudentContactMoment_student_foreign";')

        this.addSql('alter table "LearningNeed" drop constraint "LearningNeed_student_foreign";')

        this.addSql('alter table "CivicIntegration" drop constraint "CivicIntegration_student_foreign";')

        this.addSql('alter table "Registration" drop constraint "Registration_referringPerson_foreign";')

        this.addSql('alter table "Employee" drop constraint "Employee_person_foreign";')

        this.addSql('alter table "Education" drop constraint "Education_person_foreign";')

        this.addSql('alter table "User" drop constraint "User_person_foreign";')

        this.addSql('alter table "UploadedDocument" drop constraint "UploadedDocument_person_foreign";')

        this.addSql('alter table "Student" drop constraint "Student_registration_foreign";')

        this.addSql('alter table "Student" drop constraint "Student_mentor_foreign";')

        this.addSql(
            'alter table "StudentContactMoment" drop constraint "StudentContactMoment_createdByEmployee_foreign";'
        )

        this.addSql(
            'alter table "EducationGroup_employees" drop constraint "EducationGroup_employees_employee_foreign";'
        )

        this.addSql('alter table "Participation" drop constraint "Participation_mentor_foreign";')

        this.addSql('alter table "Team_members" drop constraint "Team_members_employee_foreign";')

        this.addSql('alter table "Participation" drop constraint "Participation_learningNeed_foreign";')

        this.addSql('alter table "TestResult" drop constraint "TestResult_participation_foreign";')

        this.addSql('alter table "UploadedDocument" drop constraint "UploadedDocument_createdByUser_foreign";')

        this.addSql('drop table if exists "Address" cascade;')

        this.addSql('drop table if exists "LearningNeedOutcome" cascade;')

        this.addSql('drop table if exists "Organization" cascade;')

        this.addSql('drop table if exists "EducationGroup" cascade;')

        this.addSql('drop table if exists "Organization_providers" cascade;')

        this.addSql('drop table if exists "Team" cascade;')

        this.addSql('drop table if exists "Student" cascade;')

        this.addSql('drop table if exists "Person" cascade;')

        this.addSql('drop table if exists "Registration" cascade;')

        this.addSql('drop table if exists "Employee" cascade;')

        this.addSql('drop table if exists "StudentContactMoment" cascade;')

        this.addSql('drop table if exists "EducationGroup_employees" cascade;')

        this.addSql('drop table if exists "Education" cascade;')

        this.addSql('drop table if exists "LearningNeed" cascade;')

        this.addSql('drop table if exists "Participation" cascade;')

        this.addSql('drop table if exists "CivicIntegration" cascade;')

        this.addSql('drop table if exists "PostalCodeArea" cascade;')

        this.addSql('drop table if exists "Team_members" cascade;')

        this.addSql('drop table if exists "TestResult" cascade;')

        this.addSql('drop table if exists "User" cascade;')

        this.addSql('drop table if exists "UploadedDocument" cascade;')
    }
}
