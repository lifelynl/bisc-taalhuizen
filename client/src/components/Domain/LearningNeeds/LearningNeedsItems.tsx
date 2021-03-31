import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './LearningNeedsItems.module.scss'
import { Location } from 'history'
interface Props {
    leftComponent: JSX.Element
    rightComponent: (JSX.Element | null)[][]
    onClick?: () => void
    to: string | Location
}

export const LearningNeedsItems: React.FunctionComponent<Props> = ({ leftComponent, rightComponent, onClick, to }) => {
    return renderLearningNeedsItem()

    function renderLearningNeedsItem() {
        return (
            <RouterLink to={to} className={styles.container}>
                <div className={styles.contentContainer} onClick={onClick}>
                    <div className={styles.leftComponentContainer}>{leftComponent}</div>
                    <div className={styles.statusContainer}>{renderLearningNeedsItemRow()}</div>
                </div>
            </RouterLink>
        )
    }

    function renderLearningNeedsItemRow() {
        return rightComponent.map((row, index) => {
            const isLast = index + 1 !== rightComponent.length
            return (
                <>
                    <div className={styles.row} key={index}>
                        {renderLearningNeedsItemSeperator(row)}
                    </div>
                    {isLast ? <HorizontalRule className={styles.hr} /> : null}
                </>
            )
        })
    }

    function renderLearningNeedsItemSeperator(row: (JSX.Element | null)[]) {
        return row.map((item, index) => {
            if (!item) {
                return null
            }
            return (
                <div key={index} className={styles.itemContainer}>
                    {item}
                </div>
            )
        })
    }
}
