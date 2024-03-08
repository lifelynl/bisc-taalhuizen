import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import styles from './ContactMomentsDetailReadHeader.module.scss'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import { Maybe, StudentContactMomentContactType } from 'graphql/v2/generated/graphql'

interface Props {
    type: StudentContactMomentContactType
    metaData: MetaData
    isEditable?: boolean
    onClickEdit?: () => void
}

interface MetaData {
    date: string
    name?: Maybe<string>
}

export const ContactMomentsDetailReadHeader: React.FC<Props> = props => {
    const { type, metaData, isEditable, onClickEdit } = props
    const { i18n } = useLingui()

    const containerClassNames = classNames(styles.headerContainer, {
        [styles.finalInterview]: type === StudentContactMomentContactType.FinalTalk,
        [styles.comment]: type === StudentContactMomentContactType.Remark,
        [styles.followUp]: type === StudentContactMomentContactType.FollowUp,
        [styles.storytelling]: type === StudentContactMomentContactType.StoryTelling,
        [styles.intake]: type === StudentContactMomentContactType.Intake,
        [styles.default]: !type,
    })

    const ContactMomentDetailTypesTranslations = {
        [StudentContactMomentContactType.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentContactMomentContactType.Remark]: i18n._(t`Opmerking`),
        [StudentContactMomentContactType.FollowUp]: i18n._(t`Vervolggesprek`),
        [StudentContactMomentContactType.StoryTelling]: i18n._(t`Informatie voor storytelling`),
        [StudentContactMomentContactType.Intake]: i18n._(t`Intake`),
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title={ContactMomentDetailTypesTranslations[type as StudentContactMomentContactType]} />
                <Paragraph subtle={true} className={styles.subtitle}>{`${metaData.date} • ${
                    metaData.name || ''
                }`}</Paragraph>
            </div>
            {renderEditButton()}
        </div>
    )

    function renderEditButton() {
        if (!isEditable) {
            return null
        }

        return (
            <Button
                className={styles.editIcon}
                round={true}
                type={ButtonType.tertiary}
                icon={IconType.edit}
                onClick={() => {
                    if (onClickEdit) {
                        onClickEdit()
                    }
                }}
            />
        )
    }
}
