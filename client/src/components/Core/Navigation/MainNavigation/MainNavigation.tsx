import React from 'react'
import classNames from 'classnames'
import styles from './MainNavigation.module.scss'
import { OrganizationTypeEnum } from 'graphql/v2/generated/graphql'

interface Props {
    className?: string
    organizationType: OrganizationTypeEnum | string
    ListComponent?: JSX.Element | null
    BottomComponent?: JSX.Element
    TopComponent?: JSX.Element
}

const MainNavigation: React.FunctionComponent<Props> = props => {
    const { className, organizationType, BottomComponent, ListComponent, TopComponent } = props

    return (
        <div
            className={classNames(styles.container, className, {
                [styles['is-bisc']]: organizationType === OrganizationTypeEnum.Bisc,
                [styles['is-languageHouse']]: organizationType === OrganizationTypeEnum.LanguageHouse,
                [styles['is-provider']]: organizationType === OrganizationTypeEnum.Provider,
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
