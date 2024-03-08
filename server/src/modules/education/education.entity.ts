import { Entity, EntityRepositoryType, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { registerEnumType } from '@nestjs/graphql'
import { CustomBaseEntity } from 'src/database/CustomBaseEntity'
import { Person } from '../person/person.entity'
import { EducationRepository } from './education.repository'

export enum EducationNameEnum {
    lastFollowedEducation = 'lastFollowedEducation',
    currentEducation = 'currentEducation',
    course = 'course',
}
registerEnumType(EducationNameEnum, { name: 'EducationNameEnum' })

export enum EducationTypeEnum {
    course = 'course',
    education = 'education',
}
registerEnumType(EducationTypeEnum, { name: 'EducationTypeEnum' })

export enum EducationLevelEnum {
    primary = 'primary',
    specialEd = 'specialEd', // Speciaal onderwijs
    domesticSchool = 'domesticSchool', // Huishoudschool,
    biologicSchool = 'biologicSchool', // Biologische school,
    lts = 'lts',
    mavo = 'mavo',
    vmbo = 'vmbo',
    havo = 'havo',
    vwo = 'vwo',
    mbo = 'mbo',
    hbo = 'hbo',
    wo = 'wo',
    other = 'other',
}
registerEnumType(EducationLevelEnum, { name: 'EducationLevelEnum' })

export enum EducationCurrentlyFollowingStatusEnum {
    yes = 'yes',
    no = 'no',
    noUntilDate = 'noUntilDate',
}
registerEnumType(EducationCurrentlyFollowingStatusEnum, { name: 'EducationCurrentlyFollowingStatusEnum' })

export enum EducationGroupTypeEnum {
    individual = 'individual',
    group = 'group',
}
registerEnumType(EducationGroupTypeEnum, { name: 'EducationGroupTypeEnum' })

export enum CourseTeacherTypeEnum {
    professional = 'professional',
    volunteer = 'volunteer',
    both = 'both',
}
registerEnumType(CourseTeacherTypeEnum, { name: 'CourseTeacherTypeEnum' })

@Entity({ customRepository: () => EducationRepository })
export class Education extends CustomBaseEntity {
    public [EntityRepositoryType]?: EducationRepository

    @ManyToOne({ onDelete: 'cascade' })
    public person: Person

    @Property({ persist: false })
    public get personId() {
        return this.person.id
    }

    @Enum(() => EducationNameEnum)
    @Property()
    public name: EducationNameEnum

    @Enum(() => EducationTypeEnum)
    @Property()
    public type: EducationTypeEnum

    @Enum(() => EducationLevelEnum)
    @Property()
    public level?: EducationLevelEnum

    @Property()
    public levelOther?: string

    @Property()
    public degree?: boolean

    @Property()
    public degreeGranted?: boolean

    @Property()
    public other?: string

    @Enum(() => EducationCurrentlyFollowingStatusEnum)
    @Property()
    public currentlyFollowingStatus?: EducationCurrentlyFollowingStatusEnum

    @Property()
    public startDate?: string

    @Property()
    public endDate?: string

    @Property()
    public yearsFollowed?: number

    @Property()
    public institution?: string

    @Enum(() => EducationGroupTypeEnum)
    @Property()
    public group?: EducationGroupTypeEnum

    @Enum(() => CourseTeacherTypeEnum)
    @Property()
    public courseTeacherType?: CourseTeacherTypeEnum

    @Property()
    public hours?: number
}
