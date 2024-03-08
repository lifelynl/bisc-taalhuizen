import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Paragraph from 'components/Core/Typography/Paragraph'
import { StudentContactMomentContactType, StudentContactMomentType } from 'graphql/v2/generated/graphql'
import React from 'react'
import styles from './ContactMomentsListItem.module.scss'

interface Props {
    data?: StudentContactMomentType
    isActive?: boolean
    onClick?: () => void
}

export const ContactMomentsListItem: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { data, onClick, isActive } = props

    const containerClassNames = classNames(
        styles.container,
        {
            [styles.finalInterview]: data?.type === StudentContactMomentContactType.FinalTalk,
            [styles.comment]: data?.type === StudentContactMomentContactType.Remark,
            [styles.followUp]: data?.type === StudentContactMomentContactType.FollowUp,
            [styles.storytelling]: data?.type === StudentContactMomentContactType.StoryTelling,
            [styles.intake]: data?.type === StudentContactMomentContactType.Intake,
            [styles.default]: !data,
        },
        {
            [styles.isActive]: isActive,
        }
    )

    const ContactMomentDetailTypesTranslations = {
        [StudentContactMomentContactType.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentContactMomentContactType.Remark]: i18n._(t`Opmerking`),
        [StudentContactMomentContactType.FollowUp]: i18n._(t`Vervolggesprek`),
        [StudentContactMomentContactType.StoryTelling]: i18n._(t`Informatie voor storytelling`),
        [StudentContactMomentContactType.Intake]: i18n._(t`Intake`),
    }

    if (data) {
        return (
            <div className={containerClassNames} onClick={onClick}>
                <div className={styles.border} />
                <div className={styles.contentContainer}>
                    <div className={styles.titleContainer}>
                        <Paragraph className={styles.title}>
                            {ContactMomentDetailTypesTranslations[data.type]}
                        </Paragraph>
                        {data.createdByEmployee && (
                            <Paragraph className={styles.subtitle}>
                                {data.createdByEmployee.person?.givenName}
                            </Paragraph>
                        )}
                    </div>
                    <div className={styles.descriptionContainer}>
                        <Paragraph className={styles.description}>{data.explanation}</Paragraph>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={containerClassNames} onClick={onClick}>
            <div className={styles.border} />
            <div className={styles.contentContainer}>
                <div className={styles.titleContainer}>
                    <Paragraph className={styles.title}>{i18n._(t`Nieuwe gebeurtenis`)}</Paragraph>
                </div>
                <div className={styles.descriptionContainer}>
                    <Paragraph className={styles.description}>{i18n._(t`Hier komt de omschrijving…`)}</Paragraph>
                </div>
            </div>
        </div>
    )
}
