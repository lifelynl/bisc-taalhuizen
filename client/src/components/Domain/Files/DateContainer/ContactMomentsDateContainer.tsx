import React from 'react'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from './ContactMomentsDateContainer.module.scss'

interface Props {
    title?: string
    subtitle?: Subtitle
}

interface Subtitle {
    month?: string
    year?: string
}
export const ContactMomentsDateContainer: React.FC<Props> = ({ title, subtitle }) => {
    return (
        <div className={styles.container}>
            <Paragraph className={styles.title}>{title}</Paragraph>
            <Paragraph className={styles.subtitle}>{subtitle ? `${subtitle.month} ${subtitle.year}` : ''}</Paragraph>
            <div className={styles.dottedLine} />
        </div>
    )
}
