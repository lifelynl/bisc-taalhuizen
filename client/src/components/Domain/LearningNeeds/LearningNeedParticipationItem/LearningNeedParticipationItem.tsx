import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import { RefererContainer } from '../Containers/LearningNeedsRefererContainer'
import styles from './LearningNeedParticipationItem.module.scss'
import { OrganizationType, ParticipationProviderOption, ParticipationType } from 'graphql/v2/generated/graphql'
import ReferenceStatusLabel from 'components/Participants/components/ReferenceStatusLabel'
import Tooltip from 'components/Core/Feedback/Tooltip/Tooltip'

interface Props {
    studentLanguageHouse: OrganizationType
    participation: ParticipationType
}

export const LearningNeedParticipationItem: React.FC<Props> = props => {
    const { participation, studentLanguageHouse } = props

    return (
        <div className={styles.container}>
            {renderStatus()}
            {renderReference()}
            {renderNote()}
        </div>
    )

    function renderStatus() {
        return <ReferenceStatusLabel status={participation.status} />
    }

    function renderReference() {
        if (participation.providerOption === ParticipationProviderOption.Provider) {
            // BP-169 Should this always show the language house name? Even when the referral comes from the provider?
            // if the student was referred to the provider it will show the language house
            // but if the student was created by the provider is will show the provider
            // 'GEWENST AANBOD' -> 'DESIRED OFFER' doesn't really give me any clues
            const labels = [studentLanguageHouse.name || undefined, participation.provider?.name || 'Aanbieder'].filter(
                v => !!v
            )

            return <RefererContainer labels={labels as string[]} />
        }

        return <LabelTag label={participation.offerName || ''} color={LabelColor.white} icon={IconType.offer} />
    }

    function renderNote() {
        if (participation.providerOption === ParticipationProviderOption.Provider) {
            return (
                <Tooltip
                    message={participation.providerExplanation || ''}
                    disabled={!participation.providerExplanation}
                    anchorClassName={styles.tooltip}
                >
                    <LabelTag
                        truncate={true}
                        label={participation.providerExplanation || ''}
                        color={LabelColor.white}
                        icon={IconType.note}
                    />
                </Tooltip>
            )
        }

        return <LabelTag label={participation.providerOther || ''} color={LabelColor.white} icon={IconType.providers} />
    }
}
