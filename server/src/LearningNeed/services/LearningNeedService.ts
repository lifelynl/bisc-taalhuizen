import request = require('request')
import { Injectable, Logger } from '@nestjs/common'
import { CommonGroundAPIs } from 'src/CommonGroundAPI/CommonGroundAPIsEnum'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
import { assertNotNil } from 'src/AssertNotNil'

export enum LearningNeedTopicEnum {
    DUTCH_READING = 'DUTCH_READING', // Nederlands: Lezen
    DUTCH_WRITING = 'DUTCH_WRITING', // Nederlands: Schrijven

    MATH_NUMBERS = 'MATH_NUMBERS', // Rekenen: Getallen
    MATH_PROPORTION = 'MATH_PROPORTION', // Rekenen: Verhoudingen
    MATH_GEOMETRY = 'MATH_GEOMETRY', // Rekenen: Meten en meetkunde
    MATH_LINKS = 'MATH_LINKS', // Rekenen: Verbanden

    DIGITAL_USING_ICT_SYSTEMS = 'DIGITAL_USING_ICT_SYSTEMS', // Digitale vaardigheden: ICT-systemen gebruiken
    DIGITAL_SEARCHING_INFORMATION = 'DIGITAL_SEARCHING_INFORMATION', // Digitale vaardigheden: Informatie zoeken
    DIGITAL_PROCESSING_INFORMATION = 'DIGITAL_PROCESSING_INFORMATION', // Digitale vaardigheden: Informatie verwerken en presenteren
    DIGITAL_COMMUNICATION = 'DIGITAL_COMMUNICATION', // Digitale vaardigheden: Communicatie

    KNOWLEDGE = 'KNOWLEDGE', // Kennis
    SKILLS = 'SKILLS', // Vaardigheden
    ATTITUDE = 'ATTITUDE', // Houding
    BEHAVIOUR = 'BEHAVIOUR', // Gedrag

    OTHER = 'OTHER',
}

export enum LearningNeedApplicationEnum {
    FAMILY_AND_PARENTING = 'FAMILY_AND_PARENTING', // gezin en opvoeden
    LABOR_MARKET_AND_WORK = 'LABOR_MARKET_AND_WORK', // arbeidsmarkt en werk
    HEALTH_AND_WELLBEING = 'HEALTH_AND_WELLBEING', // gezondheid en welzijn
    ADMINISTRATION_AND_FINANCE = 'ADMINISTRATION_AND_FINANCE', // administratie en financiën
    HOUSING_AND_NEIGHBORHOOD = 'HOUSING_AND_NEIGHBORHOOD', // wonen en buurt
    SELFRELIANCE = 'SELFRELIANCE', // zelfredzaamheid

    OTHER = 'OTHER',
}

export enum LearningNeedLevelEnum {
    INFLOW = 'INFLOW', // Instroom
    NLQF1 = 'NLQF1', // NLQF 1
    NLQF2 = 'NLQF2', // NLQF 2
    NLQF3 = 'NLQF3', // NLQF 3
    NLQF4 = 'NLQF4', // NLQF 4

    OTHER = 'OTHER',
}

export enum LearningNeedOfferDifferenceEnum {
    NO = 'NO', // Nee, er is geen verschil
    YES_DISTANCE = 'YES_DISTANCE', // Ja, want: niet aangeboden binnen bereisbare afstand
    YES_WAITINGLIST = 'YES_WAITINGLIST', // Ja, want: wachtlijst
    YES_OTHER = 'YES_OTHER', // Ja, want: anders
}

export interface LearningNeedEntity {
    id: string
    learningNeedDescription: string
    learningNeedMotivation: string
    desiredOutComesGoal: string
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther: string | null
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther: string | null
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther: string | null
    offerDesiredOffer: string
    offerAdvisedOffer: string
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther: string | null
    offerEngagements: string | null
}

interface LearningNeedResponseBody {
    '@self': string
    participant: string
    results: string[]
    groups: string[]
    verwijzingen: string[]
    leervraagomschrijving: string
    leervraagmotivatie: string
    gewensteleeruitkomstwerkwoord: string
    gewensteleeruitkomstonderwerp: string
    gewensteleeruitkomstonderwerpanders: string | null
    gewensteleeruitkomsttoepassing: string
    gewensteleeruitkomsttoepassinganders: string | null
    gewensteleeruitkomstniveau: string
    gewensteleeruitkomstniveauanders: string | null
    aanbodgewensteaanbod: string
    aanbodgeadviseerdaanbod: string
    aanbodverschilwensadvies: string
    aanbodverschilwensadviesanders: string | null
    aanbodafspraken: string | null
}

@Injectable()
export class LearningNeedService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private configService: ConfigService<Config>) {}

    public async findByParticipantId(participantId: string): Promise<LearningNeedEntity[]> {
        const eavParticipant = await this.getEavParticipant(participantId)

        if (!eavParticipant) {
            return []
        }

        const learningNeedIds = eavParticipant.leervragen

        const learningNeedEntitites: LearningNeedEntity[] = await Promise.all(
            learningNeedIds.map(async learningNeedId => {
                const eavLeervraag = await this.getEavLeervraag(learningNeedId)
                assertNotNil(
                    eavLeervraag,
                    `eav/leervraag with ID ${learningNeedId} not found for Participant ${participantId}`
                )

                return this.parseEavLeervraag(eavLeervraag)
            })
        )

        return learningNeedEntitites
    }

    public async findById(learningNeedId: string): Promise<LearningNeedEntity> {
        const eavLeervraag = await this.getEavLeervraag(learningNeedId)
        assertNotNil(eavLeervraag, `eav/leervraag with ID ${learningNeedId} not found`)

        return this.parseEavLeervraag(eavLeervraag)
    }

    private parseEavLeervraag(bodyJson: LearningNeedResponseBody) {
        // TODO: Add assertNotNit checks + properly check all the enums
        const id = bodyJson['@self']
        const learningNeedDescription = bodyJson.leervraagomschrijving
        const learningNeedMotivation = bodyJson.leervraagmotivatie
        const desiredOutComesGoal = bodyJson.gewensteleeruitkomstwerkwoord
        const desiredOutComesTopic = bodyJson.gewensteleeruitkomstonderwerp as LearningNeedTopicEnum
        const desiredOutComesTopicOther = bodyJson.gewensteleeruitkomstonderwerpanders
        const desiredOutComesApplication = bodyJson.gewensteleeruitkomsttoepassing as LearningNeedApplicationEnum
        const desiredOutComesApplicationOther = bodyJson.gewensteleeruitkomsttoepassinganders
        const desiredOutComesLevel = bodyJson.gewensteleeruitkomstniveau as LearningNeedLevelEnum
        const desiredOutComesLevelOther = bodyJson.gewensteleeruitkomstniveauanders
        const offerDesiredOffer = bodyJson.aanbodgewensteaanbod
        const offerAdvisedOffer = bodyJson.aanbodgeadviseerdaanbod
        const offerDifference = bodyJson.aanbodverschilwensadvies as LearningNeedOfferDifferenceEnum
        const offerDifferenceOther = bodyJson.aanbodverschilwensadviesanders
        const offerEngagements = bodyJson.aanbodafspraken

        return {
            id,
            learningNeedDescription,
            learningNeedMotivation,
            desiredOutComesGoal,
            desiredOutComesTopic,
            desiredOutComesTopicOther,
            desiredOutComesApplication,
            desiredOutComesApplicationOther,
            desiredOutComesLevel,
            desiredOutComesLevelOther,
            offerDesiredOffer,
            offerAdvisedOffer,
            offerDifference,
            offerDifferenceOther,
            offerEngagements,
        }
    }

    public async getEavParticipant(participantId: string): Promise<{ id: string; leervragen: string[] } | null> {
        const baseUrl = CommonGroundAPIs.EAV

        const body = JSON.stringify({
            '@self': participantId,
        })

        const responseString: string | null = await new Promise((resolve, reject) => {
            return request(
                `${baseUrl}/object_entities/edu/participants`,
                {
                    method: 'GET',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                (err, res) => {
                    this.logger.debug(body)
                    this.logger.debug(res.body)

                    if (err) {
                        reject(err)
                        return
                    }

                    // 200 = ok
                    if (res.statusCode === 200) {
                        resolve(res.body)
                        return
                    }

                    // 500 = not found
                    if (res.statusCode === 500) {
                        resolve(null)
                        return
                    }

                    // We expect only 200 or 500, reject on any other response
                    reject(res.body)
                    return
                }
            )
        })

        const responseObject = responseString ? JSON.parse(responseString) : null

        return responseObject
    }

    public async getEavLeervraag(leervraagId: string) {
        const baseUrl = CommonGroundAPIs.EAV

        const body = JSON.stringify({
            '@self': leervraagId,
        })

        const responseString: string | null = await new Promise((resolve, reject) => {
            return request(
                `${baseUrl}/object_entities/eav/leervragen`,
                {
                    method: 'GET',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                (err, res) => {
                    this.logger.debug(body)
                    this.logger.debug(res.body)

                    if (err) {
                        reject(err)
                        return
                    }

                    // 200 = ok
                    if (res.statusCode === 200) {
                        resolve(res.body)
                        return
                    }

                    // 500 = not found
                    if (res.statusCode === 500) {
                        resolve(null)
                        return
                    }

                    // We expect only 200 or 500, reject on any other response
                    reject(res.body)
                    return
                }
            )
        })

        const responseObject = responseString ? JSON.parse(responseString) : null

        return responseObject
    }
}
