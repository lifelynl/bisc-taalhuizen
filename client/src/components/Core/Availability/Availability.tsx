import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import { Availability as AvailabilityEnum } from 'graphql/v2/generated/graphql'
import times from 'lodash/times'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import Checkbox from '../DataEntry/Checkbox'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Availability.module.scss'

interface Props {
    className?: string
    defaultValue?: AvailabilityEnum[]
    readOnly?: boolean
    name?: string
    highlightMatchingAvailability?: AvailabilityEnum[]
    onInput?: (availability: AvailabilityEnum[]) => unknown
}

enum TimeOfDay {
    Morning = 'MORNING',
    Afternoon = 'AFTERNOON',
    Evening = 'EVENING',
}

const DAYS = [
    {
        label: i18n._(`Ma`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.MondayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.MondayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.MondayEvening,
        },
    },
    {
        label: i18n._(`Di`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.TuesdayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.TuesdayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.TuesdayEvening,
        },
    },
    {
        label: i18n._(`Wo`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.WednesdayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.WednesdayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.WednesdayEvening,
        },
    },
    {
        label: i18n._(`Do`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.ThursdayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.ThursdayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.ThursdayEvening,
        },
    },
    {
        label: i18n._(`Vr`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.FridayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.FridayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.FridayEvening,
        },
    },
    {
        label: i18n._(`Za`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.SaturdayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.SaturdayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.SaturdayEvening,
        },
    },
    {
        label: i18n._(`Zo`),
        values: {
            [TimeOfDay.Morning]: AvailabilityEnum.SundayMorning,
            [TimeOfDay.Afternoon]: AvailabilityEnum.SundayAfternoon,
            [TimeOfDay.Evening]: AvailabilityEnum.SundayEvening,
        },
    },
]

export const Availability: React.FunctionComponent<Props> = props => {
    const { className, defaultValue, readOnly, name, onInput } = props
    const { i18n } = useLingui()
    const [availability, setAvailability] = useState<AvailabilityEnum[]>(defaultValue || [])

    const onChangeAvailabilityCheckbox: ChangeEventHandler<HTMLInputElement> = event => {
        const changedValue = event.currentTarget.value as AvailabilityEnum
        const checked = event.currentTarget.checked

        setAvailability(prevAvailability => {
            if (checked) {
                // add to array
                if (!prevAvailability.includes(changedValue)) {
                    return [...prevAvailability, changedValue]
                }
            } else {
                // remove from array
                if (prevAvailability.includes(changedValue)) {
                    return prevAvailability.filter(a => a !== changedValue)
                }
            }

            return prevAvailability
        })
    }

    useEffect(() => {
        if (onInput) {
            onInput(availability)
        }
    }, [availability, onInput])

    return (
        <>
            <table className={classNames(styles.container, className)}>
                <thead className={styles.thead}>
                    <tr>
                        <th className={styles.headerBlank} />

                        {DAYS.map((day, i) => (
                            <th key={i}>
                                <p className={styles.headerName}>{day.label}</p>
                            </th>
                        ))}
                        <th className={styles.headerpaddingRight} />
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    <tr>
                        <td className={styles.sectionOfDayWrapper}>
                            <p className={styles.sectionOfDay}>{i18n._(t`Ochtend`)}</p>
                            <p className={styles.timeOfDay}>{i18n._(t`06:00 - 12:00`)}</p>
                        </td>
                        {renderCheckboxes(TimeOfDay.Morning)}
                        <td />
                    </tr>
                    <tr>
                        <td className={styles.sectionOfDayWrapper}>
                            <p className={styles.sectionOfDay}>{i18n._(t`Middag`)}</p>
                            <p className={styles.timeOfDay}>{i18n._(t`12:00 - 18:00`)}</p>
                        </td>
                        {renderCheckboxes(TimeOfDay.Afternoon)}
                        <td />
                    </tr>
                    <tr>
                        <td className={styles.sectionOfDayWrapper}>
                            <p className={styles.sectionOfDay}>{i18n._(t`Avond`)}</p>
                            <p className={styles.timeOfDay}>{i18n._(t`18:00 - 00:00`)}</p>
                        </td>
                        {renderCheckboxes(TimeOfDay.Evening)}
                        <td />
                    </tr>
                </tbody>
            </table>
        </>
    )

    function renderCheckboxes(timeOfDay: TimeOfDay) {
        return times(7, n => {
            const value = DAYS[n].values[timeOfDay]

            return (
                <td key={n} className={styles.checkBoxTd}>
                    {renderCheckbox(value)}
                </td>
            )
        })
    }

    function renderCheckbox(value: AvailabilityEnum) {
        const checked = availability.includes(value)

        if (readOnly) {
            if (checked) {
                const hasHighlight = props.highlightMatchingAvailability
                    ? availability.includes(value) && props.highlightMatchingAvailability.includes(value)
                    : false

                return (
                    <span
                        className={classNames({
                            [styles.checkmarkHighlight]: hasHighlight,
                        })}
                    >
                        <Icon type={IconType.checkmark} className={classNames(styles.readOnlyAvailable)} />
                    </span>
                )
            }

            return <Icon type={IconType.close} className={styles.readOnlyUnavailable} />
        }

        return (
            <Checkbox
                inline={true}
                value={value}
                onChange={onChangeAvailabilityCheckbox}
                defaultChecked={checked}
                name={name}
            />
        )
    }
}
