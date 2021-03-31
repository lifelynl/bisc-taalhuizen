import React from 'react'
import styles from './LearningNeedsTable.module.scss'

interface Props {
    leftHeader: string
    rightHeaders: string[]
    rows: JSX.Element[]
}

export const LearningNeedsTable: React.FC<Props> = ({ leftHeader, rightHeaders, rows }) => {
    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.leftComponentContainer}>
                    <div className={styles.titleContainer}>{leftHeader}</div>
                </div>
                <div className={styles.rightComponentContainer}>
                    <div className={styles.row}>
                        {rightHeaders.map((title, index) => (
                            <div key={index} className={styles.titleContainer}>
                                {title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {rows.map(item => item)}
        </>
    )
}
