import { Loaded } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Column } from 'exceljs'
import { ExcelExport } from 'src/utils/excelExport'
import { LearningNeed } from '../learningneed/learningneed.entity'
import { LearningNeedRepository } from '../learningneed/learningneed.repository'
import { OrganizationRepository } from '../organization/organization.repository'
import { Student } from '../student/student.entity'
import { StudentRepository } from '../student/student.repository'
import { Writable } from 'stream'
import { ParticipationRepository } from '../participation/participation.repository'
import { Participation, ParticipationProviderOption } from '../participation/participation.entity'
import { PDFExport } from 'src/utils/pdfExport'
import { compileHTMLTemplate } from 'src/utils/compileHTMLTemplate'
import { readFileSync } from 'fs'
import { DutchNTType } from '../registration/registration.entity'
import { getTranslationForBooolean } from 'src/utils/translationHelpers'
import { OrganizationTypeEnum } from '../organization/organization.entity'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

interface StudentLearningNeedPDFSection {
    title: string
    rows: {
        label: string
        value: string
        className?: string
    }[]
}

@Injectable()
export class ExportService {
    public constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly learningNeedRepository: LearningNeedRepository,
        private readonly studentRepository: StudentRepository,
        private readonly participationRepository: ParticipationRepository
    ) {}

    private pdfTemplateDir = 'src/templates/pdf'

    private learningNeedColumns: Partial<Column>[] = [
        // person
        { header: 'Voornaam', key: 'givenName', width: 20 },
        { header: 'Tussenvoegsel', key: 'additionalName', width: 20 },
        { header: 'Achternaam', key: 'familyName', width: 20 },
        // registration
        { header: 'NT1 of NT2', key: 'dutchNTLevel', width: 20 },
        // learningNeed
        { header: 'Leervraag', key: 'description', width: 40, alignment: { wrapText: true } },
        { header: 'Gewenst aanbod', key: 'desiredOffer', width: 40 },
        { header: 'Geadviseerd aanbod', key: 'advisedOffer', width: 40 },
        // desiredLearningNeedOutcome
        { header: 'Gewenste leeruitkomst Onderwerp', key: 'subject', width: 40 },
        { header: 'Gewenste leeruitkomst Onderwerp anders', key: 'subjectOther', width: 40 },
        { header: 'Gewenste leeruitkomst Toepassing', key: 'application', width: 40 },
        { header: 'Gewenste leeruitkomst Toepassing anders', key: 'applicationOther', width: 40 },
        { header: 'Gewenste leeruitkomst Niveau', key: 'level', width: 40 },
        { header: 'Gewenste leeruitkomst Niveau anders', key: 'levelOther', width: 40 },
        // learningNeed
        { header: 'Verschil tussen wens en advies', key: 'offerDifference', width: 40 },
        { header: 'Aanmaakdatum', key: 'createdAt', width: 20 },
    ]

    private studentColumns: Partial<Column>[] = [
        // person
        { header: 'Voornaam', key: 'givenName', width: 20 },
        { header: 'Tussenvoegsel', key: 'additionalName', width: 20 },
        { header: 'Achternaam', key: 'familyName', width: 20 },
        { header: 'Geslacht', key: 'gender', width: 40 },
        { header: 'Leeftijdsverdeling', key: 'birthday', width: 40 },
        { header: 'Postcode', key: 'postalCode', width: 40 },
        { header: 'Plaats', key: 'locality', width: 40 },
        { header: 'Huidige werkstatus', key: 'dayTimeActivities', width: 40 },
        { header: 'Huidige werkstatus anders', key: 'dayTimeActivitiesOther', width: 40 },
        { header: 'E-mail adres', key: 'email', width: 20 },
        { header: 'Telefoon', key: 'telephone', width: 20 },
        // registration
        { header: 'Aanmeldende instantie', key: 'referringOrganization', width: 20 },
        { header: 'Hoe bij Taalhuis terecht gekomen', key: 'foundVia', width: 40 },
        { header: 'Hoe bij Taalhuis terecht gekomen anders', key: 'foundViaOther', width: 40 },
        { header: 'Status', key: 'status', width: 20 },
        { header: 'NT1 of NT2', key: 'dutchNTLevel', width: 20 },
        // team
        { header: 'Team', key: 'name', width: 20 },
        // person
        { header: 'Aanmaakdatum', key: 'intakeDate', width: 20 },
    ]

    private participationColumns: Partial<Column>[] = [
        // person
        { header: 'Voornaam', key: 'givenName', width: 20 },
        { header: 'Tussenvoegsel', key: 'additionalName', width: 20 },
        { header: 'Achternaam', key: 'familyName', width: 20 },
        { header: 'Geslacht', key: 'gender', width: 40 },
        { header: 'Leeftijdsverdeling', key: 'birthday', width: 40 },
        { header: 'Postcode', key: 'postalCode', width: 40 },
        { header: 'Plaats', key: 'locality', width: 40 },
        { header: 'Huidige werkstatus', key: 'dayTimeActivities', width: 40 },
        { header: 'Huidige werkstatus anders', key: 'dayTimeActivitiesOther', width: 40 },
        { header: 'E-mail adres', key: 'email', width: 20 },
        { header: 'Telefoon', key: 'telephone', width: 20 },
        { header: 'Aanmeldende instantie', key: 'referringOrganization', width: 20 },
        { header: 'Hoe bij Taalhuis terecht gekomen', key: 'foundVia', width: 40 },
        { header: 'Hoe bij Taalhuis terecht gekomen anders', key: 'foundViaOther', width: 40 },
        { header: 'Status (registratie)', key: 'registrationStatus', width: 20 },
        { header: 'Team', key: 'name', width: 20 },
        { header: 'Aanmaakdatum (persoon)', key: 'studentIntakeDate', width: 20 },
        { header: 'NT1 of NT2', key: 'dutchNTLevel', width: 20 },
        { header: 'Leervraag', key: 'description', width: 40, alignment: { wrapText: true } },
        { header: 'Gewenst aanbod', key: 'desiredOffer', width: 40 },
        { header: 'Geadviseerd aanbod', key: 'advisedOffer', width: 40 },
        { header: 'Gewenste leeruitkomst Onderwerp', key: 'subject', width: 40 },
        { header: 'Gewenste leeruitkomst Onderwerp anders', key: 'subjectOther', width: 40 },
        { header: 'Gewenste leeruitkomst Toepassing', key: 'application', width: 40 },
        { header: 'Gewenste leeruitkomst Toepassing anders', key: 'applicationOther', width: 40 },
        { header: 'Gewenste leeruitkomst Niveau', key: 'level', width: 40 },
        { header: 'Gewenste leeruitkomst Niveau anders', key: 'levelOther', width: 40 },
        { header: 'Verschil tussen wens en advies', key: 'offerDifference', width: 40 },
        { header: 'Aanmaakdatum (leervraag)', key: 'createdAt', width: 20 },
        { header: 'Verwezen naar', key: 'providerName', width: 40 },
        { header: 'Verwezen naar anders', key: 'providerNameOther', width: 40 },
        { header: 'Type activiteit', key: 'educationGroupOrOfferType', width: 40 },
        { header: 'Naam activiteit', key: 'educationGroupOrOfferName', width: 40 },
        { header: 'Formaliteit', key: 'formality', width: 40 },
        { header: 'Deelnemer begonnen per', key: 'startParticipation', width: 40 },
        { header: 'Einde deelname', key: 'endParticipation', width: 40 },
        { header: 'Status traject', key: 'status', width: 40 },
        { header: 'Reden einde deelname', key: 'reasonEndParticipation', width: 40 },
        { header: 'Uitstroom', key: 'outFlowParticipation', width: 40 },
        { header: 'Uitstroom Anders Reden', key: 'outFlowReasonOther', width: 40 },
    ]

    private providerParticipationColumns: Partial<Column>[] = [
        { header: 'Voornaam', key: 'givenName', width: 20 },
        { header: 'Tussenvoegsel', key: 'additionalName', width: 20 },
        { header: 'Achternaam', key: 'familyName', width: 20 },
        { header: 'Geslacht', key: 'gender', width: 40 },
        { header: 'Postcode', key: 'postalCode', width: 40 },
        { header: 'Plaats', key: 'locality', width: 40 },
        { header: 'Huidige werkstatus', key: 'dayTimeActivities', width: 40 },
        { header: 'Huidige werkstatus anders', key: 'dayTimeActivitiesOther', width: 40 },
        { header: 'NT1 of NT2', key: 'dutchNTLevel', width: 20 },
        { header: 'Leervraag', key: 'description', width: 40, alignment: { wrapText: true } },
        { header: 'Gewenst aanbod', key: 'desiredOffer', width: 40 },
        { header: 'Geadviseerd aanbod', key: 'advisedOffer', width: 40 },
        { header: 'Gewenste leeruitkomst Onderwerp', key: 'subject', width: 40 },
        { header: 'Gewenste leeruitkomst Onderwerp anders', key: 'subjectOther', width: 40 },
        { header: 'Gewenste leeruitkomst Toepassing', key: 'application', width: 40 },
        { header: 'Gewenste leeruitkomst Toepassing anders', key: 'applicationOther', width: 40 },
        { header: 'Gewenste leeruitkomst Niveau', key: 'level', width: 40 },
        { header: 'Gewenste leeruitkomst Niveau anders', key: 'levelOther', width: 40 },
        { header: 'Verschil tussen wens en advies', key: 'offerDifference', width: 40 },
        { header: 'Aanmaakdatum', key: 'createdAt', width: 20 },
        { header: 'Type activiteit', key: 'educationGroupOrOfferType', width: 40 },
        { header: 'Naam activiteit', key: 'educationGroupOrOfferName', width: 40 },
        { header: 'Formaliteit', key: 'formality', width: 40 },
        { header: 'Deelnemer begonnen per', key: 'startParticipation', width: 40 },
        { header: 'Einde deelname', key: 'endParticipation', width: 40 },
        { header: 'Reden einde deelname', key: 'reasonEndParticipation', width: 40 },
    ]

    public async exportLearningNeeds(stream: Writable, organizationId: string, start?: string, end?: string) {
        const organization = await this.organizationRepository.findOneOrFail({
            id: organizationId,
        })

        const learningNeeds = await this.learningNeedRepository.getForOrganization(organizationId, start, end)
        const populatedLearningNeeds = await this.learningNeedRepository.populate(learningNeeds, [
            'student.registration',
            'student.person',
            'desiredLearningNeedOutcome',
        ])

        const excelExport = new ExcelExport(stream)
        const sheet = excelExport.addWorksheet(organization.name, this.learningNeedColumns)

        for (const learningNeed of populatedLearningNeeds) {
            const rowData = this.getLearningNeedRowData(learningNeed)
            const row = sheet.addRow(rowData)
            row.commit()
        }

        sheet.commit()

        await excelExport.commitWorkbook()
        return excelExport
    }

    public async exportParticipations(stream: Writable, organizationId: string, start?: string, end?: string) {
        const organization = await this.organizationRepository.findOneOrFail(organizationId)
        const participations = await this.participationRepository.getAllForOrganizationStudents(organizationId, {
            start,
            end,
        })
        const populatedParticipations = await this.participationRepository.populate(participations, [
            'learningNeed',
            'learningNeed.student.person',
            'learningNeed.student.person.address',
            'learningNeed.student.registration',
            'learningNeed.desiredLearningNeedOutcome',
            'learningNeed.student.team',
            'provider',
            'educationGroup',
        ])

        const excelExport = new ExcelExport(stream)
        const sheet = excelExport.addWorksheet(organization.name, this.participationColumns)

        for (const participation of populatedParticipations) {
            const rowData = this.getParticipationRowData(participation)
            const row = sheet.addRow(rowData)
            row.commit()
        }

        sheet.commit()

        await excelExport.commitWorkbook()
        return excelExport
    }

    public async exportProviderParticipations(stream: Writable, providerId: string, start?: string, end?: string) {
        const organization = await this.organizationRepository.findOneOrFail({
            id: providerId,
            type: OrganizationTypeEnum.provider,
        })

        const participations = await this.participationRepository.getBasedOnGroupStartForProvider(providerId, {
            start,
            end,
        })
        const populatedParticipations = await this.participationRepository.populate(participations, [
            'learningNeed',
            'learningNeed.student.person',
            'learningNeed.student.registration',
            'learningNeed.desiredLearningNeedOutcome',
            'educationGroup',
        ])

        const excelExport = new ExcelExport(stream)
        const sheet = excelExport.addWorksheet(organization.name, this.providerParticipationColumns)

        for (const participation of populatedParticipations) {
            const rowData = this.getProviderParticipationRowData(participation)
            const row = sheet.addRow(rowData)
            row.commit()
        }
        sheet.commit()

        await excelExport.commitWorkbook()
        return excelExport
    }

    public async exportStudentLearningNeedsForExternalUse(studentId: string, learningNeedId: string) {
        const student = await this.studentRepository.findOneOrFail(studentId)
        const [populatedStudent] = await this.studentRepository.populate(
            [student],
            ['person', 'person.address', 'registration', 'organization']
        )

        const learningNeed = await this.learningNeedRepository.findOneOrFail(learningNeedId)
        const [populatedLearningNeed] = await this.learningNeedRepository.populate(
            [learningNeed],
            ['desiredLearningNeedOutcome']
        )

        const participations = await this.participationRepository.getAllForStudentWithLearningNeed(
            studentId,
            learningNeedId
        )
        const populatedParticipations = await this.participationRepository.populate(participations, ['provider'])

        const htmlPath = path.resolve(`${this.pdfTemplateDir}/studentLearningNeed.hbs`)
        const cssPath = path.resolve(`${this.pdfTemplateDir}/studentLearningNeed.css`)
        const template = readFileSync(htmlPath, 'utf8')
        const styles = readFileSync(cssPath, 'utf8')

        const sections = this.getStudentLearningNeedData(
            populatedStudent,
            populatedLearningNeed,
            populatedParticipations
        )
        const data = {
            organizationName: populatedStudent.organization.name,
            studentName: populatedStudent.person.formatted_name,
            sections,
        }
        const compiledTemplate = compileHTMLTemplate(template, data)

        return PDFExport.generate(compiledTemplate, styles)
    }

    public async exportStudents(
        stream: Writable,
        organizationId: string,
        start?: string,
        end?: string
    ): Promise<ExcelExport> {
        const organization = await this.organizationRepository.findOneOrFail({
            id: organizationId,
        })

        const students = await this.studentRepository.getForOrganization(organizationId, { start, end })
        const populatedStudents = await this.studentRepository.populate(students, [
            'person',
            'person.address',
            'team',
            'registration',
            'organization',
        ])

        const excelExport = new ExcelExport(stream)
        const sheet = excelExport.addWorksheet(organization.name, this.studentColumns)

        for (const student of populatedStudents) {
            const rowData = this.getStudentRowData(student)
            const row = sheet.addRow(rowData)
            row.commit()
        }

        sheet.commit()

        await excelExport.commitWorkbook()
        return excelExport
    }

    private getLearningNeedRowData(
        learningNeed: Loaded<LearningNeed, 'desiredLearningNeedOutcome' | 'student.registration' | 'student.person'>
    ) {
        return {
            givenName: learningNeed.student.person.givenName,
            additionalName: learningNeed.student.person.additionalName,
            familyName: learningNeed.student.person.familyName,
            dutchNTLevel: learningNeed.student.registration.translated_dutchNTLevel,
            description: learningNeed.description,
            desiredOffer: learningNeed.desiredOffer,
            advisedOffer: learningNeed.advisedOffer,
            subject: learningNeed.desiredLearningNeedOutcome?.translated_subject,
            subjectOther: learningNeed.desiredLearningNeedOutcome?.subjectOther,
            application: learningNeed.desiredLearningNeedOutcome?.translated_application,
            applicationOther: learningNeed.desiredLearningNeedOutcome?.applicationOther,
            level: learningNeed.desiredLearningNeedOutcome?.translated_level,
            levelOther: learningNeed.desiredLearningNeedOutcome?.levelOther,
            offerDifference: learningNeed.translated_offerDifference,
            createdAt: ExcelExport.getFormattedDate(learningNeed.createdAt),
        }
    }

    private getParticipationRowData(
        participation: Loaded<
            Participation,
            | 'learningNeed'
            | 'provider'
            | 'educationGroup'
            | 'learningNeed.student.person'
            | 'learningNeed.student.registration'
            | 'learningNeed.desiredLearningNeedOutcome'
            | 'learningNeed.student.team'
        >
    ) {
        const student = participation.learningNeed.student
        const { person, registration, team } = student

        return {
            ...this.getLearningNeedRowData(participation.learningNeed),
            providerName: participation.provider?.name,
            providerNameOther: participation.providerOther,
            educationGroupOrOfferType:
                participation.educationGroup?.translated_type || participation.translated_offerType,
            educationGroupOrOfferName: participation.educationGroup?.name || participation.offerName || 'Begeleider',
            formality: participation.educationGroup?.translated_formality || participation.translated_formality,
            startParticipation: ExcelExport.getFormattedDate(participation.startParticipation),
            endParticipation: ExcelExport.getFormattedDate(
                participation.endParticipation || participation.educationGroup?.end
            ),
            status: participation.translated_status,
            reasonEndParticipation: participation.translated_reasonEndParticipation,
            outFlowParticipation: participation.translated_outFlowParticipation,
            outFlowReasonOther: participation.outFlowReasonOther,
            gender: person.translated_gender,
            birthday: ExcelExport.getFormattedDate(person.birthday),
            postalCode: person.address?.postalCode,
            locality: person.address?.locality,
            dayTimeActivities: registration.translated_dayTimeActivities,
            dayTimeActivitiesOther: registration.dayTimeActivitiesOther,
            email: person.email,
            telephone: person.telephone,
            referringOrganization: this.getReferalOrganisation(student),
            foundVia: registration.translated_foundVia,
            foundViaOther: registration.foundViaOther,
            registrationStatus: registration.translated_status,
            name: team?.name,
            studentIntakeDate: ExcelExport.getFormattedDate(student.intakeDate),
        }
    }

    private getProviderParticipationRowData(participation: Participation) {
        const learningNeed = participation.learningNeed
        const registration = participation.learningNeed.student.registration
        const person = participation.learningNeed.student.person
        const desiredLearningNeedOutcome = learningNeed.desiredLearningNeedOutcome
        const educationGroup = participation.educationGroup

        return {
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
            gender: person.translated_gender,
            postalCode: person.address?.postalCode,
            locality: person.address?.locality,
            dayTimeActivities: registration.translated_dayTimeActivities,
            dayTimeActivitiesOther: registration.dayTimeActivitiesOther,
            dutchNTLevel: registration.translated_dutchNTLevel,
            description: learningNeed.description,
            desiredOffer: learningNeed.desiredOffer,
            advisedOffer: learningNeed.advisedOffer,
            subject: desiredLearningNeedOutcome?.translated_subject,
            subjectOther: desiredLearningNeedOutcome?.subjectOther,
            application: desiredLearningNeedOutcome?.translated_application,
            applicationOther: desiredLearningNeedOutcome?.applicationOther,
            level: desiredLearningNeedOutcome?.translated_level,
            levelOther: desiredLearningNeedOutcome?.levelOther,
            offerDifference: learningNeed.translated_offerDifference,
            createdAt: ExcelExport.getFormattedDate(learningNeed.createdAt),
            educationGroupOrOfferType: educationGroup?.translated_type || participation.translated_offerType,
            educationGroupOrOfferName: educationGroup?.name || participation.offerName || 'Begeleider',
            formality: educationGroup?.translated_formality || participation.translated_formality,
            startParticipation: ExcelExport.getFormattedDate(participation.startParticipation),
            endParticipation: ExcelExport.getFormattedDate(participation.endParticipation || educationGroup?.end),
            reasonEndParticipation: participation.translated_reasonEndParticipation,
        }
    }

    private getStudentRowData(student: Loaded<Student>) {
        return {
            givenName: student.person.givenName,
            additionalName: student.person.additionalName,
            familyName: student.person.familyName,
            gender: student.person.translated_gender,
            birthday: this.getBirthdayCategory(student.person.birthday),
            postalCode: student.person.address?.postalCode,
            locality: student.person.address?.locality,
            dayTimeActivities: student.registration.translated_dayTimeActivities,
            dayTimeActivitiesOther: student.registration.dayTimeActivitiesOther,
            email: student.person.email,
            telephone: student.person.telephone,
            referringOrganization: this.getReferalOrganisation(student),
            foundVia: student.registration.translated_foundVia,
            foundViaOther: student.registration.foundViaOther,
            status: student.registration.translated_status,
            dutchNTLevel: student.registration.translated_dutchNTLevel,
            name: student.team?.name,
            intakeDate: ExcelExport.getFormattedDate(student.intakeDate),
        }
    }

    private getStudentLearningNeedData(
        student: Student,
        learningNeed: LearningNeed,
        participations: Participation[]
    ): StudentLearningNeedPDFSection[] {
        const sections: StudentLearningNeedPDFSection[] = []

        const { givenName, additionalName, familyName, gender, birthday } = student.person
        const dateOfBirth = birthday ? ExcelExport.getFormattedDate(birthday) : '-'

        sections.push({
            title: 'Persoonsgegevens',
            rows: [
                { label: 'Roepnaam', value: givenName || '-' },
                { label: 'Tussenvoegsel', value: additionalName || '-' },
                { label: 'Achternaam', value: familyName || '-' },
                { label: 'Geslacht', value: gender || '-' },
                { label: 'Geboortedatum', value: dateOfBirth },
            ],
        })

        const { telephone, email, emergencyTelephone, contactPreference, address } = student.person
        const { postalCode, locality } = address || {}
        const { dutchNTLevel, translated_dutchNTLevel, translated_speakingLevel } = student.registration

        const contactInfoSection: StudentLearningNeedPDFSection = {
            title: 'Contactgegevens',
            rows: [
                { label: 'Straat en huisnr.', value: address?.formatted_streetAndHouseNumber || '-' },
                { label: 'Postcode', value: postalCode || '-' },
                { label: 'Plaats', value: locality || '-' },
                { label: 'Telefoonnummer', value: telephone || '-' },
                { label: 'E-mailadres', value: email || '-' },
                { label: 'Tel. nr. contactpersoon (voor noodgevallen)', value: emergencyTelephone || '-' },
                { label: 'Contact bij voorkeur', value: contactPreference?.toString() || '-' },
                { label: 'Nederlands NT', value: translated_dutchNTLevel || '-' },
            ],
        }

        if (dutchNTLevel === DutchNTType.nt2) {
            const { inNetherlandsSinceYear, languageInDailyLife, knowsLatinAlphabet, lastKnownLevel } =
                student.registration

            const registrationInfoRows: StudentLearningNeedPDFSection['rows'] = [
                { label: 'In Nederland sinds', value: inNetherlandsSinceYear?.toString() || '-', className: 'mt-2' },
                { label: 'Welke taal spreek je het meest in het dagelijks leven?', value: languageInDailyLife || '-' },
                { label: 'Ken je het latijnse alfabet?', value: getTranslationForBooolean(knowsLatinAlphabet) },
                { label: 'Laatst bekende taalniveau', value: lastKnownLevel || '-', className: 'mb-2' },
            ]

            contactInfoSection.rows.push(...registrationInfoRows)
        }

        contactInfoSection.rows.push({ label: 'Taalniveau qua spreken', value: translated_speakingLevel || '-' })
        sections.push(contactInfoSection)

        const { description, motivation } = learningNeed

        const referals = participations.flatMap(participation => {
            if (participation.provider?.name) {
                if (participation.providerExplanation) {
                    return [
                        { label: 'Verwijzing', value: participation.provider?.name },
                        { label: 'Toelichting op verwijzing', value: participation.providerExplanation },
                    ]
                }
                return [{ label: 'Verwijzing', value: participation.provider?.name }]
            } else if (
                participation.providerOption === ParticipationProviderOption.other &&
                participation.providerOther
            ) {
                return [
                    {
                        label: 'Verwijzing',
                        value: participation.providerOther,
                    },
                ]
            }
            return []
        })

        sections.push({
            title: 'Leervraag',
            rows: [
                { label: 'Korte omschrijving', value: description },
                { label: 'Motivatie', value: motivation },
                ...referals,
            ],
        })

        if (learningNeed.desiredLearningNeedOutcome) {
            const { translated_subject, translated_application, translated_level } =
                learningNeed.desiredLearningNeedOutcome

            sections.push({
                title: 'Gewenste leeruitkomst',
                rows: [
                    { label: 'Onderwerp', value: translated_subject || '-' },
                    { label: 'Toepassing', value: translated_application || '-' },
                    { label: 'Niveau', value: translated_level || '-' },
                ],
            })
        }

        const { desiredOffer, advisedOffer, translated_offerDifference, agreements } = learningNeed
        sections.push({
            title: 'Aanbod',
            rows: [
                { label: 'Gewenst aanbod', value: desiredOffer || '-' },
                { label: 'Geadviseerd aanbod', value: advisedOffer || '-' },
                { label: 'Is er een verschil tussen wens en advies?', value: translated_offerDifference || '-' },
                { label: 'Afspraken', value: agreements || '-' },
            ],
        })

        return sections
    }

    private getBirthdayCategory(birthdate?: Date) {
        // Categories (18-26 / 27-34 / 35-44 / 45-54 / 55-66 / 67+)
        if (!birthdate) {
            return ''
        }

        const year = new Date().getFullYear()
        const age = year - birthdate.getFullYear()

        if (age < 18) return '0-17'
        if (age < 27) return '18-26'
        if (age < 35) return '27-34'
        if (age < 45) return '35-44'
        if (age < 55) return '45-54'
        if (age < 67) return '55-66'
        return '67+'
    }

    private getReferalOrganisation(student: Loaded<Student>) {
        if (student.registration.selfRegistered) {
            return 'Zelfregistratie'
        } else if (student.registration.referringOrganizationOther) {
            return student.registration.referringOrganizationOther
        } else {
            return student.organization.name
        }
    }
}
