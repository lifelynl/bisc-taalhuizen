import classNames from 'classnames'
import React from 'react'
import styles from './ContactMomentsDetailContainer.module.scss'
import { StudentContactMomentContactType } from 'graphql/v2/generated/graphql'

interface Props {
    type: ContactMomentsDetailContainerTypes
}

type ContactMomentsDetailContainerTypes = StudentContactMomentContactType | 'success' | 'default'

export const ContactMomentsDetailContainer: React.FC<Props> = ({ type, children }) => {
    const containerClassNames = classNames(styles.container, {
        [styles.finalInterview]: type === StudentContactMomentContactType.FinalTalk,
        [styles.comment]: type === StudentContactMomentContactType.Remark,
        [styles.followUp]: type === StudentContactMomentContactType.FollowUp,
        [styles.storytelling]: type === StudentContactMomentContactType.StoryTelling,
        [styles.intake]: type === StudentContactMomentContactType.Intake,
        [styles.success]: type === 'success',
        [styles.default]: type === 'default',
    })

    return (
        <div className={styles.wrapper}>
            <div className={containerClassNames}>
                <div className={styles.border} />
                {children}
            </div>
        </div>
    )
}
