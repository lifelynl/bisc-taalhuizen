import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import React from 'react'
import Field from '../Field/Field'
import Paragraph from '../Typography/Paragraph'
import { Availability } from './Availability'
import styles from './AvailabilityComparison.module.scss'
import nl2br from 'react-nl2br'
import { Availability as AvailabilityEnum } from 'graphql/v2/generated/graphql'

export interface ComparisonInformation {
    role: string
    title: string
    availability: AvailabilityEnum[]
    availabilityNotes: string
}

interface Props {
    className?: string
    leftHandComparisonInformation: ComparisonInformation
    rightHandComparisonInformation: ComparisonInformation
}

export const AvailabilityComparison: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    return (
        <div className={classNames(styles.container, props.className)}>
            <div className={styles.side}>
                {renderSide({
                    ...props.leftHandComparisonInformation,
                    highlightMatchingAvailability: props.rightHandComparisonInformation.availability,
                })}
            </div>
            <div className={styles.side}>
                {renderSide({
                    ...props.rightHandComparisonInformation,
                    highlightMatchingAvailability: props.leftHandComparisonInformation.availability,
                })}
            </div>
        </div>
    )

    function renderSide(options: {
        availability: AvailabilityEnum[]
        availabilityNotes: string
        role: string
        title: string
        highlightMatchingAvailability: AvailabilityEnum[]
    }) {
        return (
            <div className={styles.section}>
                <p className={styles.roleLabel}>{options.role}</p>
                <p className={styles.title}>{options.title}</p>
                <Availability
                    readOnly={true}
                    defaultValue={options.availability}
                    highlightMatchingAvailability={options.highlightMatchingAvailability}
                />
                <Field className={styles.notes} label={i18n._(t`Notities`)} horizontal={true} hasSmallerLabel={true}>
                    <Paragraph>{nl2br(options.availabilityNotes)}</Paragraph>
                </Field>
            </div>
        )
    }
}
