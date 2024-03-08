import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from '../../SharedContactMomentDetailFieldset.module.scss'
import { ContactMomentsDetailContainer } from '../../../ContactMomentsDetailContainer/ContactMomentsDetailContainer'
import { ContactMomentsDetailReadHeader } from './ContactMomentsDetailReadHeader/ContactMomentsDetailReadHeader'
import { DateFormatters } from 'utils/formatters/Date/Date'
import nl2br from 'react-nl2br'
import { StudentContactMomentType } from 'graphql/v2/generated/graphql'

interface Props {
    data: StudentContactMomentType
    isEditable?: boolean
    onClickEdit?: () => void
}

export const ContactMomentsDetailReadFields: React.FC<Props> = props => {
    const { data, isEditable, onClickEdit } = props
    const { i18n } = useLingui()

    return (
        <ContactMomentsDetailContainer type={data.type}>
            <div className={styles.contentContainer}>
                <ContactMomentsDetailReadHeader
                    type={data.type}
                    metaData={{
                        date: DateFormatters.formattedDate(data.date) || '',
                        name: data.createdByEmployee?.person?.givenName,
                    }}
                    isEditable={isEditable}
                    onClickEdit={onClickEdit}
                />
                <div className={styles.descriptionContainer}>
                    <Column spacing={4}>
                        <Paragraph bold={true} className={styles.sectionTitle}>
                            {i18n._(t`Omschrijving`)}
                        </Paragraph>
                        <Paragraph>{nl2br(data.explanation)}</Paragraph>
                    </Column>
                </div>
            </div>
        </ContactMomentsDetailContainer>
    )
}
