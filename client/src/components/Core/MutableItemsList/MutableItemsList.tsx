import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import React from 'react'
import Button, { ButtonType } from '../Button/Button'
import { IconType } from '../Icon/IconType'
import styles from './MutableItemsList.module.scss'
interface Props {
    className?: string
    onAddItem?: () => void
}

export const MutableItemsList: React.FunctionComponent<Props> = props => {
    const { className, children, onAddItem } = props
    const containerClassNames = classNames(styles.container, className)
    const { i18n } = useLingui()

    return (
        <div className={containerClassNames}>
            <Button onClick={onAddItem} type={ButtonType.secondary} icon={IconType.add}>
                {i18n._(t`Toevoegen`)}
            </Button>
            {children}
        </div>
    )
}
