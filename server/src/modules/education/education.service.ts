import { Injectable } from '@nestjs/common'
import { Education, EducationLevelEnum } from './education.entity'
import { EducationRepository } from './education.repository'
import { CreateEducationInputType, EditNestedEducationInputType } from './education.type'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class EducationService {
    public constructor(private readonly educationRepository: EducationRepository) {}

    public getNewEducationToSave(input: CreateEducationInputType) {
        const education = new Education()

        education.name = input.name
        education.type = input.type
        education.level = input.level

        if (input.levelOther !== undefined) {
            if (education.level !== EducationLevelEnum.other && input.levelOther) {
                throw new DomainError('LevelOther cannot be set when level is not other')
            }

            education.levelOther = input.levelOther
        }

        education.degree = input.degree
        education.degreeGranted = input.degreeGranted
        education.currentlyFollowingStatus = input.currentlyFollowingStatus
        education.startDate = input.startDate
        education.endDate = input.endDate
        education.yearsFollowed = input.yearsFollowed
        education.institution = input.institution
        education.group = input.group
        education.courseTeacherType = input.courseTeacherType
        education.hours = input.hours
        education.other = input.other

        return education
    }

    public async getNewOrEditedEducationsToSave(personId: string, inputs: EditNestedEducationInputType[]) {
        const educations = await this.educationRepository.find({ person: personId })

        return inputs.map(input => {
            const education = educations.find(e => e.id === input.id)
            if (!education) {
                return this.getNewEducationToSave(input as CreateEducationInputType)
            }

            this.editEducationFields(education, input)

            return education
        })
    }

    private editEducationFields(education: Education, input: EditNestedEducationInputType) {
        if (input.name !== undefined) {
            education.name = input.name
        }

        if (input.type !== undefined) {
            education.type = input.type
        }

        if (input.level !== undefined) {
            education.level = input.level

            if (education.level !== EducationLevelEnum.other) {
                education.levelOther = ''
            }
        }

        if (input.levelOther !== undefined) {
            if (education.level !== EducationLevelEnum.other && input.levelOther) {
                throw new DomainError('LevelOther cannot be set when level is not other')
            }

            education.levelOther = input.levelOther
        }

        if (input.degree !== undefined) {
            education.degree = input.degree
        }

        if (input.other !== undefined) {
            education.other = input.other
        }

        if (input.degreeGranted !== undefined) {
            education.degreeGranted = input.degreeGranted
        }

        if (input.currentlyFollowingStatus !== undefined) {
            education.currentlyFollowingStatus = input.currentlyFollowingStatus
        }

        if (input.startDate !== undefined) {
            education.startDate = input.startDate
        }

        if (input.endDate !== undefined) {
            education.endDate = input.endDate
        }

        if (input.yearsFollowed !== undefined) {
            education.yearsFollowed = input.yearsFollowed
        }

        if (input.institution !== undefined) {
            education.institution = input.institution
        }

        if (input.group !== undefined) {
            education.group = input.group
        }

        if (input.courseTeacherType !== undefined) {
            education.courseTeacherType = input.courseTeacherType
        }

        if (input.hours !== undefined) {
            education.hours = input.hours
        }
    }
}
