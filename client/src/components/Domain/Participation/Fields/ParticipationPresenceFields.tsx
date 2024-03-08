import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ParticipationsQuery } from 'graphql/v2/generated/graphql'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    readOnly?: boolean
    defaultValues?: Partial<ParticipationsQuery['participations']['nodes'][0]>
}

export const ParticipationPresenceFields: React.FunctionComponent<Props> = props => {
    const { readOnly, defaultValues } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._('Aanwezigheid')}>
            <Column spacing={4}>
                <Field readOnly={readOnly} label={i18n._('Start deelname')} horizontal={true}>
                    <DateInput
                        readOnly={readOnly}
                        name="startParticipation"
                        placeholder="DD / MM / YYYY"
                        defaultValue={DateFormatters.toString(defaultValues?.startParticipation)}
                    />
                </Field>
            </Column>
        </Section>
    )
}
