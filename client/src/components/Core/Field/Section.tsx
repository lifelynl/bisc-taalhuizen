import classNames from 'classnames'
import React from 'react'
import SectionTitle from '../Text/SectionTitle'
import Paragraph from '../Typography/Paragraph'
import styles from './Section.module.scss'

interface Props {
    title: string
    className?: string
    description?: string
}

const Section: React.FunctionComponent<Props> = props => {
    const { children, className, title, description } = props

    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title={title} heading="H4" />
                {description && <Paragraph className={styles.description}>{description}</Paragraph>}
            </div>

            <div className={styles.formContainer}>{children}</div>
        </div>
    )
}

export default Section
