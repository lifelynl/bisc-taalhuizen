import React from 'react'
import classNames from 'classnames'
import styles from './MainNavigation.module.scss'
import { MainNavigationType } from './types'

interface Props {
    className?: string
    type: MainNavigationType | string
    ListComponent?: JSX.Element | null
    BottomComponent?: JSX.Element
    TopComponent?: JSX.Element
}

const MainNavigation: React.FunctionComponent<Props> = props => {
    const { className, type, BottomComponent, ListComponent, TopComponent } = props

    return (
        <div
            className={classNames(styles.container, className, {
                [styles['is-bisc']]: type === MainNavigationType.bisc,
                [styles['is-aanbieder']]: type === MainNavigationType.taalhuis,
                [styles['is-taalhuis']]: type === MainNavigationType.aanbieder,
            })}
        >
            <div>
                <div className={styles['top-wrapper']}>{TopComponent}</div>
                <div className={styles['list-wrapper']}>{ListComponent}</div>
            </div>
            <div className={styles['bottom-wrapper']}>{BottomComponent}</div>
        </div>
    )
}

export default MainNavigation
