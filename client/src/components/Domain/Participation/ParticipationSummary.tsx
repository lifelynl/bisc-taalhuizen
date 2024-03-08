import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import ReferenceStatusLabel from 'components/Participants/components/ReferenceStatusLabel'
import { OrganizationType, ParticipationType } from 'graphql/v2/generated/graphql'
import React from 'react'
import styles from './ParticipationSummary.module.scss'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Space from 'components/Core/Layout/Space/Space'

interface Props {
    languageHouse: string
    participation: Pick<ParticipationType, 'offerName' | 'providerOther' | 'status' | 'providerExplanation'> & {
        provider?: Pick<OrganizationType, 'name'> | null
    }
}

export const ParticipationSummary: React.FunctionComponent<Props> = props => {
    const { participation, languageHouse } = props

    return (
        <Row className={styles.container}>
            <ReferenceStatusLabel status={participation.status} />
            <Row spacing={1}>
                <LabelTag label={languageHouse} color={LabelColor.white} />
                <Icon type={IconType.arrowRight} />
                <LabelTag
                    label={participation.provider?.name || participation.providerOther || ''}
                    color={LabelColor.white}
                />
            </Row>
            <Space />
            <Row spacing={1}>
                <Icon type={IconType.note} />
                <Paragraph smaller={true}>{participation.providerExplanation}</Paragraph>
            </Row>
        </Row>
    )
}
