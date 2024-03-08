import classNames from 'classnames'
import { OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import React, { useEffect } from 'react'
import Icon from '../../Icon/Icon'
import { IconType } from '../../Icon/IconType'
import styles from './MainNavigationEnvironmentCard.module.scss'

interface Props {
    className?: string
    name: string
    environment: string
    organizationType: OrganizationTypeEnum
}

const MainNavigationEnvironmentCard: React.FunctionComponent<Props> = props => {
    const { className, name, environment, organizationType } = props
    const container = classNames(styles.container, className, {
        [styles['is-bisc']]: organizationType === OrganizationTypeEnum.Bisc,
        [styles['is-languageHouse']]: organizationType === OrganizationTypeEnum.LanguageHouse,
        [styles['is-provider']]: organizationType === OrganizationTypeEnum.Provider,
    })

    useEffect(() => {
        document.title = `TOP - ${environment}`

        return function cleanup() {
            document.title = `TOP - Inloggen`
        }
    }, [environment])

    return (
        <div className={container}>
            <div className={styles.left}>
                <Icon type={IconType.logoShape} className={styles.logo} />
            </div>
            <div className={styles.right}>
                <p className={styles.name}>{name}</p>
                <p className={styles.environment}>{environment}</p>
            </div>
        </div>
    )
}

export default MainNavigationEnvironmentCard
