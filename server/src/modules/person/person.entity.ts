import { Cascade, Collection, Entity, EntityRepositoryType, Enum, OneToMany, OneToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Address } from '../address/address.entity'
import { Education } from '../education/education.entity'
import { Employee } from '../employee/employee.entity'
import { Student } from '../student/student.entity'
import { User } from '../user/user.entity'
import { PersonRepository } from './person.repository'
import { DomainError } from '../../errors/DomainError'

export enum Gender {
    male = 'male',
    female = 'female',
    x = 'x',
}
registerEnumType(Gender, { name: 'Gender' })

export enum ContactPreference {
    phonecall = 'phonecall',
    whatsapp = 'whatsapp',
    email = 'email',
    other = 'other',
}
registerEnumType(ContactPreference, { name: 'ContactPreference' })

export enum MaritalStatus {
    marriedPartner = 'marriedPartner',
    single = 'single',
    divorced = 'divorced',
    widow = 'widow',
}
registerEnumType(MaritalStatus, { name: 'MaritalStatus' })

export enum ProviderTargetGroupPreference {
    NT1 = 'NT1',
    NT2 = 'NT2',
}
registerEnumType(ProviderTargetGroupPreference, { name: 'ProviderTargetGroupPreference' })

export enum Availability {
    mondayMorning = 'mondayMorning',
    mondayAfternoon = 'mondayAfternoon',
    mondayEvening = 'mondayEvening',
    tuesdayMorning = 'tuesdayMorning',
    tuesdayAfternoon = 'tuesdayAfternoon',
    tuesdayEvening = 'tuesdayEvening',
    wednesdayMorning = 'wednesdayMorning',
    wednesdayAfternoon = 'wednesdayAfternoon',
    wednesdayEvening = 'wednesdayEvening',
    thursdayMorning = 'thursdayMorning',
    thursdayAfternoon = 'thursdayAfternoon',
    thursdayEvening = 'thursdayEvening',
    fridayMorning = 'fridayMorning',
    fridayAfternoon = 'fridayAfternoon',
    fridayEvening = 'fridayEvening',
    saturdayMorning = 'saturdayMorning',
    saturdayAfternoon = 'saturdayAfternoon',
    saturdayEvening = 'saturdayEvening',
    sundayMorning = 'sundayMorning',
    sundayAfternoon = 'sundayAfternoon',
    sundayEvening = 'sundayEvening',
}
registerEnumType(Availability, { name: 'Availability' })

@Entity({ customRepository: () => PersonRepository })
export class Person extends CustomBaseEntity {
    public [EntityRepositoryType]?: PersonRepository

    @OneToOne({ nullable: true, cascade: [Cascade.PERSIST] })
    public address: Address | null

    @Property({ persist: false })
    public get addressId() {
        return this.address?.id
    }

    @Property()
    public email?: string

    @Property({ comment: 'non unique email' })
    public secondaryEmail?: string

    @Property({ nullable: true })
    public givenName?: string

    @Property()
    public additionalName?: string | null

    // this is nullable because of public registration
    @Property({ nullable: true })
    public familyName?: string

    @Enum(() => Gender)
    @Property()
    public gender?: Gender

    @Property()
    public birthplace?: string | null

    @Property()
    public birthday?: Date

    @Property()
    public telephone?: string | null

    @Property()
    public emergencyTelephone?: string | null

    @Property()
    public contactPreference?: ContactPreference

    @Property()
    public contactPreferenceOther?: string | null

    @Enum(() => MaritalStatus)
    @Property()
    public maritalStatus?: MaritalStatus

    @Property()
    public spokenLanguages?: string | null

    @Property()
    public primaryLanguage?: string | null

    @Property()
    public children?: number

    @Property({ type: 'array', check: CustomBaseEntity.getArrayEnumCheck(Availability, 'availability') })
    public availability?: Availability[]

    @Property({ type: 'text' })
    public availabilityNotes?: string | null

    @OneToMany(() => Employee, employee => employee.person)
    public employees = new Collection<Employee>(this)

    @OneToOne({ onDelete: 'cascade' })
    public student?: Student

    @Property({ persist: false })
    public get studentId() {
        return this.student?.id
    }

    @OneToOne(() => User, user => user.person, { orphanRemoval: true })
    public user?: User

    @Property({ persist: false })
    public get userId() {
        return this.user?.id
    }

    @Property({ default: false })
    public didSignPermissionForm: boolean

    @Property({ default: false })
    public hasPermissionToSendInformationAboutLibraries: boolean

    @Property({ default: false })
    public hasPermissionToShareDataWithLibraries: boolean

    @Property({ default: false })
    public hasPermissionToShareDataWithProviders: boolean

    @Property({
        nullable: true,
        type: 'array',
        check: CustomBaseEntity.getArrayEnumCheck(ProviderTargetGroupPreference, 'providerTargetGroupPreference'),
    })
    public providerTargetGroupPreference?: ProviderTargetGroupPreference[] | null

    @Property({ nullable: true })
    public providerVolunteeringPreference?: string | null

    @Property({ nullable: true })
    public providerLanguageHouseVolunteeringReference?: string | null

    @Property({ nullable: true })
    public providerTargetGroupIsExperienced?: boolean | null

    @Property({ nullable: true })
    public providerTargetGroupExperience?: string | null

    @OneToMany(() => Education, education => education.person, { orphanRemoval: true })
    public educations = new Collection<Education>(this)

    public get translated_gender() {
        if (!this.gender) {
            return ''
        }

        switch (this.gender) {
            case Gender.male:
                return 'Man'
            case Gender.female:
                return 'Vrouw'
            case Gender.x:
                return 'X'
            default:
                throw new DomainError(`Gender ${this.gender} is not yet translated`)
        }
    }

    public get formatted_name() {
        return [this.givenName, this.additionalName, this.familyName].filter(Boolean).join(' ')
    }
}
