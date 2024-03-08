import classNames from 'classnames'
import React from 'react'
import styles from './HorizontalRule.module.scss'

interface Props {
    className?: string
    spacingDisabled?: boolean
    dark?: boolean
    thin?: boolean
    short?: boolean
}

const HorizontalRule: React.FunctionComponent<Props> = props => {
    const { className, spacingDisabled, dark, thin, short } = props
    const hrClassName = classNames(styles.hr, className, {
        [styles['is-spacing-disabled']]: spacingDisabled,
        [styles.dark]: dark,
        [styles.thin]: thin,
        [styles.short]: short,
    })

    return <hr className={hrClassName} />
}

export default HorizontalRule
