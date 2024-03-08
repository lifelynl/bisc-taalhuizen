import {
    CourseTeacherTypeEnum,
    EducationCurrentlyFollowingStatusEnum,
    EducationGroupTypeEnum,
    EducationLevelEnum,
    EducationNameEnum,
    EducationTypeEnum,
} from './education.entity'
import { CreateEducationInputType, EditNestedEducationInputType } from './education.type'

export function getMockCreateEducationInput(): CreateEducationInputType {
    return {
        name: EducationNameEnum.course,
        type: EducationTypeEnum.course,
        level: EducationLevelEnum.bachelors,
        degree: false,
        degreeGranted: false,
        currentlyFollowingStatus: EducationCurrentlyFollowingStatusEnum.noUntilDate,
        startDate: 'next year',
        yearsFollowed: 123,
        institution: 'asdf',
        group: EducationGroupTypeEnum.group,
        courseTeacherType: CourseTeacherTypeEnum.both,
        hours: 123,
    }
}

export function getMockEditEducationInput(): EditNestedEducationInputType {
    return {
        yearsFollowed: 123,
        institution: 'asdf',
        group: EducationGroupTypeEnum.group,
        courseTeacherType: CourseTeacherTypeEnum.both,
        hours: 123,
    }
}
