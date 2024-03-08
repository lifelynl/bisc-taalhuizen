import React from 'react'
import SectionTitle from '../Text/SectionTitle'
import Paragraph from '../Typography/Paragraph'
import styles from './SectionTitleWithBorder.module.scss'

export interface SectionTitleWithBorderProps {
    description?: string
    title: string
}

export const SectionTitleWithBorder: React.FC<SectionTitleWithBorderProps> = ({ description, title }) => {
    return (
        <div className={styles.titleContainer}>
            <SectionTitle title={title} heading="H4" />
            {description && <Paragraph className={styles.description}>{description}</Paragraph>}
        </div>
    )
}
