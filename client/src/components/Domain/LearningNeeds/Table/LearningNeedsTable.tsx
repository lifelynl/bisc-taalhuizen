import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { EmptyState } from 'components/Core/EmptyState/EmptyState'
import { LearningNeedType } from 'graphql/v2/generated/graphql'
import React from 'react'
import styles from './LearningNeedsTable.module.scss'

interface Props {
    leftHeader: string
    rightHeaders: string[]
    learningNeeds: LearningNeedType[]
    renderItem: (learningNeed: LearningNeedType) => JSX.Element
    keyExtractor: (learningNeed: LearningNeedType, index: number, array: LearningNeedType[]) => string
}

export const LearningNeedsTable: React.FC<Props> = ({
    leftHeader,
    rightHeaders,
    learningNeeds,
    renderItem,
    keyExtractor,
}) => {
    const { i18n } = useLingui()

    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.leftComponentContainer}>
                    <div className={styles.titleContainer}>{leftHeader}</div>
                </div>
                <div className={styles.rightComponentContainer}>
                    {rightHeaders.map((title, index) => (
                        <div key={index} className={styles.titleContainer}>
                            {title}
                        </div>
                    ))}
                </div>
            </div>
            {learningNeeds.map((learningNeed, index, learningNeeds) => (
                <React.Fragment key={keyExtractor(learningNeed, index, learningNeeds)}>
                    {renderItem(learningNeed)}
                </React.Fragment>
            ))}
            {learningNeeds.length === 0 && <EmptyState message={i18n._(t`Er zijn nog geen verwijzingen`)} />}
        </>
    )
}
