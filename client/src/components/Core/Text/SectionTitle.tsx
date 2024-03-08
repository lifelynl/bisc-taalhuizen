import React from 'react'
import classNames from 'classnames'

import styles from './SectionTitle.module.scss'

interface Props {
    title: string
    className?: string
    heading?: 'H3' | 'H4' | 'H5' | 'H6' | 'H7' | 'H8'
}

const SectionTitle: React.FunctionComponent<Props> = props => {
    const { title } = props
    const titleClassName = getTitleClassName()

    return <h2 className={titleClassName}>{title}</h2>

    function getTitleClassName() {
        const { className, heading } = props

        return classNames(styles.title, className, {
            [styles.h3]: heading === 'H3',
            [styles.h4]: heading === 'H4',
            [styles.h5]: heading === 'H5',
            [styles.h6]: heading === 'H6',
            [styles.h7]: heading === 'H7',
            [styles.h8]: heading === 'H8',
        })
    }
}

export default SectionTitle
