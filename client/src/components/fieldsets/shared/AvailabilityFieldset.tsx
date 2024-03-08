import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Availability } from 'components/Core/Availability/Availability'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import nl2br from 'react-nl2br'
import { Availability as AvailabilityEnum, Maybe } from 'graphql/v2/generated/graphql'

interface Props {
    prefillData?: AvailabilityFieldsetPrefillData
    hideAvailabilityFieldLabel?: boolean
    readOnly?: boolean
    onInputAvailability?: (newAvailability: AvailabilityEnum[]) => unknown
    onInputAvailabilityNotes?: (newAvailabilityNotes: string) => unknown
}

export interface AvailabilityFieldsetModel {
    availability?: AvailabilityEnum[]
    availabilityNotes?: string
}

interface AvailabilityFieldsetPrefillData {
    availability?: Maybe<AvailabilityEnum[]>
    availabilityNotes?: Maybe<string>
}

export const AvailabilityFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly, prefillData, hideAvailabilityFieldLabel } = props
    const { i18n } = useLingui()

    const availabilityFieldLabel = hideAvailabilityFieldLabel ? undefined : i18n._(t`Beschikbaarheid`)

    if (readOnly) {
        return (
            <Section title={i18n._(t`Beschikbaarheid`)}>
                <Column spacing={4}>
                    <Field label={availabilityFieldLabel} horizontal={true}>
                        <Availability defaultValue={prefillData?.availability ?? undefined} readOnly={readOnly} />
                    </Field>
                    <Field label={i18n._(t`Notities`)} horizontal={true}>
                        <Paragraph>{nl2br(prefillData?.availabilityNotes)}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Beschikbaarheid`)}>
            <Column spacing={4}>
                <Field label={availabilityFieldLabel} horizontal={true}>
                    <Availability
                        name="availability[]"
                        defaultValue={prefillData?.availability ?? undefined}
                        onInput={newAvailability => {
                            if (props.onInputAvailability) {
                                props.onInputAvailability(newAvailability)
                            }
                        }}
                    />
                </Field>
                <Field label={i18n._(t`Notities`)} horizontal={true}>
                    <TextArea
                        name="availabilityNotes"
                        placeholder={i18n._(t`Notities met betrekking tot beschikbaarheid`)}
                        defaultValue={prefillData?.availabilityNotes ?? undefined}
                        onInput={i => {
                            if (props.onInputAvailabilityNotes) {
                                props.onInputAvailabilityNotes(i.currentTarget.value)
                            }
                        }}
                    />
                </Field>
            </Column>
        </Section>
    )
}
