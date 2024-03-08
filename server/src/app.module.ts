import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UtilsModule } from './modules/utils/utils.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import mailer from './config/mailer.config'
import storage from './config/storage.config'
import { commands } from './commands/commands'
import { EmployeeModule } from './modules/employee/employee.module'
import { OrganizationModule } from './modules/organization/organization.module'
import { PersonModule } from './modules/person/person.module'
import { AddressModule } from './modules/address/address.module'
import { PostalCodeAreaModule } from './modules/postalCodeArea/postalCodeArea.module'
import { StudentModule } from './modules/student/student.module'
import { LearningNeedModule } from './modules/learningneed/learningneed.module'
import { RegistrationModule } from './modules/registration/registration.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface'
import { CivicIntegrationModule } from './modules/civicIntegration/civicIntegration.module'
import { EducationModule } from './modules/education/education.module'
import { UploadedDocumentModule } from './modules/uploadedDocument/uploadedDocument.module'
import { ParticipationModule } from './modules/participation/participation.module'
import { TestResultModule } from './modules/testResult/testResult.module'
import { StudentContactMomentModule } from './modules/studentContactMoment/studentContactMoment.module'
import { TeamModule } from './modules/team/team.module'
import { EducationGroupModule } from './modules/educationGroup/educationGroup.module'
import { StorageModule } from '@codebrew/nestjs-storage'
import { StorageOptions } from './modules/utils/storage.service'
import { LearningNeedOutcomeModule } from './modules/learningNeedOutcome/learningNeedOutcome.module'
import { EemlandImportModule } from './modules/eemland-import/eemland-import.module'
import { ExportModule } from './modules/export/export.module'

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        AddressModule,
        AuthModule,
        EmployeeModule,
        OrganizationModule,
        PersonModule,
        UserModule,
        PostalCodeAreaModule,
        StudentModule,
        LearningNeedModule,
        RegistrationModule,
        EducationModule,
        CivicIntegrationModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mailer, storage],
        }),
        MailerModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('mailer') as MailerOptions,
            inject: [ConfigService],
        }),
        StorageModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('storage') as StorageOptions,
            inject: [ConfigService],
        }),
        UtilsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            debug: true,
            playground: false,
        }),
        UploadedDocumentModule,
        ParticipationModule,
        TestResultModule,
        StudentContactMomentModule,
        TeamModule,
        EducationGroupModule,
        LearningNeedOutcomeModule,
        EemlandImportModule,
        ExportModule,
    ],
    controllers: [],
    providers: [...commands],
})
export class AppModule {}
