import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React from 'react'
import styles from './EmptyState.module.scss'

interface Props {
    message: string
}

export const EmptyState: React.FC<Props> = props => {
    return (
        <div className={styles.container}>
            <Center grow={true} className={styles.emptyState}>
                <Icon type={IconType.emptyState} className={styles.emptyStateShape} />
                <SectionTitle title={props.message} heading={'H4'} className={styles.emptyStateMessage} />
            </Center>
        </div>
    )
}
