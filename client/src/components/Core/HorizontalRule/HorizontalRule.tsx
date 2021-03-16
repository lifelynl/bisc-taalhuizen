import classNames from 'classnames'
import React from 'react'
import styles from './HorizontalRule.module.scss'

interface Props {
    className?: string
    spacingDisabled?: boolean
}

const HorizontalRule: React.FunctionComponent<Props> = props => {
    const { className, spacingDisabled } = props
    const hrClassName = classNames(styles.hr, className, {
        [styles['is-spacing-disabled']]: spacingDisabled,
    })

    return <hr className={hrClassName} />
}

export default HorizontalRule
