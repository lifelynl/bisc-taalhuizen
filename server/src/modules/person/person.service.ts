import { Injectable } from '@nestjs/common'
import { AddressService } from '../address/address.service'
import { EducationService } from '../education/education.service'
import { Person } from './person.entity'
import { PersonRepository } from './person.repository'
import { CreatePersonInputType, EditPersonInputType } from './person.type'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class PersonService {
    public constructor(
        private readonly personRepository: PersonRepository,
        private readonly educationService: EducationService,
        private readonly addressService: AddressService
    ) {}

    public async updateFields(person: Person, input: EditPersonInputType) {
        if (!input) {
            return
        }

        if (input.email !== undefined) {
            const email = typeof input.email === 'string' ? input.email.trim() : undefined

            if (person.email !== email) {
                if (email) {
                    await this.throwIfEmailExists(email)
                }

                person.email = email
            }
        }

        if (input.address) {
            person.address = this.addressService.getNewAddressObject(input.address)
        }

        if (input.secondaryEmail !== undefined) {
            person.secondaryEmail = input.secondaryEmail
        }

        if (input.givenName !== undefined) {
            person.givenName = input.givenName
        }

        if (input.additionalName !== undefined) {
            person.additionalName = input.additionalName
        }

        if (input.familyName !== undefined) {
            person.familyName = input.familyName
        }

        if (input.gender !== undefined) {
            person.gender = input.gender
        }

        if (input.birthplace !== undefined) {
            person.birthplace = input.birthplace
        }

        if (input.birthday !== undefined) {
            person.birthday = input.birthday
        }

        if (input.telephone !== undefined) {
            person.telephone = input.telephone
        }

        if (input.emergencyTelephone !== undefined) {
            person.emergencyTelephone = input.emergencyTelephone
        }

        if (input.contactPreference !== undefined) {
            person.contactPreference = input.contactPreference
        }

        if (input.contactPreferenceOther !== undefined) {
            person.contactPreferenceOther = input.contactPreferenceOther
        }

        if (input.maritalStatus !== undefined) {
            person.maritalStatus = input.maritalStatus
        }

        if (input.spokenLanguages !== undefined) {
            person.spokenLanguages = input.spokenLanguages
        }

        if (input.primaryLanguage !== undefined) {
            person.primaryLanguage = input.primaryLanguage
        }

        if (input.children !== undefined) {
            person.children = input.children
        }

        if (input.availability !== undefined) {
            person.availability = input.availability
        }

        if (input.availabilityNotes !== undefined) {
            person.availabilityNotes = input.availabilityNotes
        }

        if (input.providerTargetGroupPreference !== undefined) {
            person.providerTargetGroupPreference = input.providerTargetGroupPreference
        }

        if (input.providerVolunteeringPreference !== undefined) {
            person.providerVolunteeringPreference = input.providerVolunteeringPreference
        }

        if (input.providerLanguageHouseVolunteeringReference !== undefined) {
            person.providerLanguageHouseVolunteeringReference = input.providerLanguageHouseVolunteeringReference
        }

        if (input.providerTargetGroupIsExperienced !== undefined) {
            person.providerTargetGroupIsExperienced = input.providerTargetGroupIsExperienced
        }

        if (input.providerTargetGroupExperience !== undefined) {
            person.providerTargetGroupExperience = input.providerTargetGroupExperience
        }

        if (input.didSignPermissionForm !== undefined) {
            person.didSignPermissionForm = input.didSignPermissionForm
        }

        if (input.hasPermissionToSendInformationAboutLibraries !== undefined) {
            person.hasPermissionToSendInformationAboutLibraries = input.hasPermissionToSendInformationAboutLibraries
        }

        if (input.hasPermissionToShareDataWithLibraries !== undefined) {
            person.hasPermissionToShareDataWithLibraries = input.hasPermissionToShareDataWithLibraries
        }

        if (input.hasPermissionToShareDataWithProviders !== undefined) {
            person.hasPermissionToShareDataWithProviders = input.hasPermissionToShareDataWithProviders
        }

        if (input.educations) {
            const educations = await this.educationService.getNewOrEditedEducationsToSave(person.id, input.educations)

            if (!person.educations.isInitialized()) {
                await person.educations.init()
            }

            person.educations.set(educations)
        }
    }

    public async getNewPersonToSaveFromInput(input: CreatePersonInputType) {
        const person = new Person()

        const email = input.email?.trim()
        if (email) {
            await this.throwIfEmailExists(email)
        }

        person.email = email
        person.secondaryEmail = input.secondaryEmail

        if (input.address) {
            person.address = this.addressService.getNewAddressObject(input.address)
        }

        if (input.educations) {
            const educations = await this.educationService.getNewOrEditedEducationsToSave(person.id, input.educations)

            if (!person.educations.isInitialized()) {
                await person.educations.init()
            }

            person.educations.set(educations)
        }

        person.givenName = input.givenName
        person.additionalName = input.additionalName
        person.familyName = input.familyName
        person.gender = input.gender
        person.birthplace = input.birthplace
        person.birthday = input.birthday
        person.telephone = input.telephone
        person.emergencyTelephone = input.emergencyTelephone
        person.contactPreference = input.contactPreference
        person.contactPreferenceOther = input.contactPreferenceOther
        person.maritalStatus = input.maritalStatus
        person.spokenLanguages = input.spokenLanguages
        person.primaryLanguage = input.primaryLanguage
        person.children = input.children
        person.availability = input.availability
        person.availabilityNotes = input.availabilityNotes

        person.providerTargetGroupPreference = input.providerTargetGroupPreference
        person.providerVolunteeringPreference = input.providerVolunteeringPreference
        person.providerLanguageHouseVolunteeringReference = input.providerLanguageHouseVolunteeringReference
        person.providerTargetGroupIsExperienced = input.providerTargetGroupIsExperienced
        person.providerTargetGroupExperience = input.providerTargetGroupExperience

        person.didSignPermissionForm = !!input.didSignPermissionForm
        person.hasPermissionToSendInformationAboutLibraries = !!input.hasPermissionToSendInformationAboutLibraries
        person.hasPermissionToShareDataWithLibraries = !!input.hasPermissionToShareDataWithLibraries
        person.hasPermissionToShareDataWithProviders = !!input.hasPermissionToShareDataWithProviders

        return person
    }

    public async throwIfEmailExists(email: string) {
        if (!(await this.personRepository.checkIfEmailExists(email))) {
            return
        }

        // TODO refactor for translations
        throw new DomainError('Dit e-mailadres is reeds bekend')
    }

    public async getEditedPersonToSave(input: EditPersonInputType) {
        const person = await this.personRepository.findOneOrFail(input.id)

        await this.updateFields(person, input)

        return person
    }
}
