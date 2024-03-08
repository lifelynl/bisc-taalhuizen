import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { LearningNeedParticipationItem } from 'components/Domain/LearningNeeds/LearningNeedParticipationItem/LearningNeedParticipationItem'
import { LearningNeedsTable } from 'components/Domain/LearningNeeds/Table/LearningNeedsTable'
import { LearningNeedTableItem } from 'components/Domain/LearningNeeds/Table/LearningNeedTableItem'
import { LearningNeedType, ParticipationType } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props {
    onItemClick: (learningNeed: LearningNeedType) => void
    learningNeeds: LearningNeedType[]
}

export const ParticipantLearningNeedsList: React.FC<Props> = props => {
    const { learningNeeds, onItemClick } = props
    const { i18n } = useLingui()

    return (
        <LearningNeedsTable
            leftHeader={i18n._(t`Leervraag`)}
            rightHeaders={[i18n._(t`Status`), i18n._(t`Gewenst aanbod/Verwezen naar`), i18n._(t`Notitie/Aanbieder`)]}
            learningNeeds={learningNeeds}
            keyExtractor={(_, index, array) => `${index}-${array.length}`}
            renderItem={renderItem}
        />
    )

    function renderItem(learningNeed: LearningNeedType) {
        return (
            <LearningNeedTableItem
                learningNeedOnClick={onItemClick}
                LeftComponent={<SectionTitle title={learningNeed.description} heading={'H4'} />}
                renderParticipationItem={renderParticipationItem}
                learningNeed={learningNeed}
                participationKeyExtractor={(_, index, array) => `${index}-${array.length}`}
            />
        )
    }

    function renderParticipationItem(participation: ParticipationType, learningNeed: LearningNeedType) {
        return (
            <LearningNeedParticipationItem
                participation={participation}
                studentLanguageHouse={learningNeed.student.organization}
            />
        )
    }
}
