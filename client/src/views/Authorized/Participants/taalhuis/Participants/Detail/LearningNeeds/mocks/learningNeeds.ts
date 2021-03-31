import { StatusTypes } from 'components/Domain/LearningNeeds/StatusLabelTag'
import { ReferenceStatusLabelStatus } from 'components/Participants/components/ReferenceStatusLabel'
import { DesiredOutcomeMetadata, LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'

export const learningNeedsStatusMock: LearningNeedsMock[] = [
    {
        title: 'Met computers leren werken',
        data: [
            {
                status: StatusTypes.referred,
                offer: undefined,
                referred: ['Taalhuis Utrecht', 'Bibliotheek X'],
                provider: undefined,
                notes: 'Graag opnemen in klik & Tik',
            },
            {
                status: StatusTypes.completed,
                offer: 'Klik & Tik',
                referred: undefined,
                provider: 'Graag opnemen in klik & Tik',
                notes: undefined,
            },
        ],
    },
    {
        title: 'Beter leren schrijven',
        data: [
            {
                status: StatusTypes.completed,
                offer: 'Digivaardigheidscursus',
                referred: undefined,
                provider: 'Digitaalhuis',
                notes: undefined,
            },
        ],
    },
]

export interface LearningNeedsMock {
    title: string
    data: LearningNeedsDataType[]
}

export interface LearningNeedsDataType {
    status: StatusTypes
    offer?: string
    referred?: string[]
    provider?: string
    notes?: string
}

export interface LearningNeedsDetails {
    learningQuestion: LearningQuestionMetadata
    desiredOutcome: DesiredOutcomeMetadata
}

export const learningNeedsMockResponse: LearningNeedsDetails = {
    learningQuestion: {
        motivations: ['Administratie kunnen doen', 'Zelfstandig zijn'],
        desiredOffers: ['Digivaardigheidscurcus', 'Klik & Tik'],
        advisedOffers: ['Digivaardigheidscurcus', 'Klik & Tik'],
        engagements: ['Neemt eigen tablet mee'],
        differences: [''],
    },
    desiredOutcome: {
        goal: 'Is in staat om',
        topic: 'Digitale vaardigheden: Informatie zoeken',
        application: ['Anders, namelijk: mantelzorg verlenen'],
        level: 'NLQF 2',
    },
}

export const LearningNeedsStatusDetailResponse = {
    title: 'Klik & Tik',
    supplierName: 'Bibliotheek X',
    status: ReferenceStatusLabelStatus.Ongoing,
    startDate: 'n.v.t.',
    endDate: 'n.v.t.',
    startedAt: '-',
    stoppedAt: '-',
    reason: '-',
}
