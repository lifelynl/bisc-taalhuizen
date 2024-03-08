import React from 'react'
import classNames from 'classnames'
import styles from './CourseCard.module.scss'
import Row from '../Layout/Row/Row'
import Paragraph from '../Typography/Paragraph'

interface Props {
    className?: string
    course: string
    chapter: string
}

export const CourseCard: React.FunctionComponent<Props> = props => {
    const { className, course, chapter } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <Row>
                <Paragraph bold={true} className={styles.offerName}>
                    {course}
                </Paragraph>
                <Paragraph bold={true} className={styles.providerName}>
                    {chapter}
                </Paragraph>
            </Row>
        </div>
    )
}
