import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import styles from './LearningNeedsRefererContainer.module.scss'

interface Props {
    labels: string[]
}

export const RefererContainer: React.FC<Props> = ({ labels }) => {
    return (
        <div className={styles.container}>
            {labels.map((label, index, labels) => {
                const isLast = index + 1 !== labels.length
                return (
                    <React.Fragment key={`${index}-${labels.length}`}>
                        <LabelTag label={label} color={LabelColor.grey} />
                        {isLast && <Icon type={IconType.arrowRight} className={styles.icon} />}
                    </React.Fragment>
                )
            })}
        </div>
    )
}
