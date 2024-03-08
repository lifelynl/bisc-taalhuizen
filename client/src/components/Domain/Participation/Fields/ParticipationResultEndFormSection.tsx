import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import { Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import {
    participationEndOptionsTranslations,
    participationOutflowTranslations,
} from 'components/Domain/Groups/Translations/groupTranslations'
import { Maybe, ParticipationEndReason, ParticipationOutFlow, ParticipationsQuery } from 'graphql/v2/generated/graphql'
import { useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import styles from './ParticipationResultEndFormSection.module.scss'

interface Props {
    readOnly?: boolean
    defaultValues?: Partial<ParticipationsQuery['participations']['nodes'][0]>
}

export interface EndParticipationFieldsetModel {
    endParticipation?: Maybe<string>
    reasonEndParticipation?: Maybe<ParticipationEndReason>
    outFlowParticipation?: Maybe<ParticipationOutFlow>
    outFlowReasonOther?: Maybe<string>
}

export const ParticipationResultEndFormSection: React.FunctionComponent<Props> = props => {
    const { readOnly, defaultValues } = props
    const { i18n } = useLingui()
    const [outFlowParticipation, setOutFlowParticipation] = useState<ParticipationOutFlow | undefined>(
        defaultValues?.outFlowParticipation || undefined
    )

    const endParticipationOptions = Object.values(ParticipationEndReason).map(v => ({
        value: v,
        label: participationEndOptionsTranslations[v],
    }))

    const outflowOptions = Object.values(ParticipationOutFlow).map(v => ({
        value: v,
        label: participationOutflowTranslations[v],
    }))

    return (
        <Section title={i18n._('Einde deelname')}>
            <Column spacing={4}>
                <Field readOnly={readOnly} label={i18n._('Einde deelname')} horizontal={true} required={true}>
                    <DateInput
                        readOnly={readOnly}
                        name="endParticipation"
                        placeholder="DD / MM / YYYY"
                        defaultValue={DateFormatters.toString(defaultValues?.endParticipation)}
                    />
                </Field>
                <Field readOnly={readOnly} label={i18n._('Reden einde deelname')} horizontal={true} required={true}>
                    {readOnly ? (
                        defaultValues?.reasonEndParticipation &&
                        participationEndOptionsTranslations[defaultValues?.reasonEndParticipation]
                    ) : (
                        <Select
                            name="reasonEndParticipation"
                            placeholder={i18n._('Selecteer reden')}
                            options={endParticipationOptions}
                            defaultValue={
                                defaultValues?.reasonEndParticipation
                                    ? {
                                          value: defaultValues?.reasonEndParticipation,
                                          label: participationEndOptionsTranslations[
                                              defaultValues?.reasonEndParticipation
                                          ],
                                      }
                                    : undefined
                            }
                        />
                    )}
                </Field>
                <Field readOnly={readOnly} label={i18n._('Uitstroom')} horizontal={true}>
                    {readOnly ? (
                        defaultValues?.outFlowParticipation &&
                        participationOutflowTranslations[defaultValues?.outFlowParticipation]
                    ) : (
                        <Select
                            name="outFlowParticipation"
                            placeholder={i18n._('Selecteer uitstroom')}
                            options={outflowOptions}
                            defaultValue={
                                defaultValues?.outFlowParticipation
                                    ? {
                                          value: defaultValues?.outFlowParticipation,
                                          label: participationOutflowTranslations[defaultValues?.outFlowParticipation],
                                      }
                                    : undefined
                            }
                            onChangeValue={e => setOutFlowParticipation(e?.value as ParticipationOutFlow)}
                        />
                    )}
                </Field>
                {outFlowParticipation === ParticipationOutFlow.Other &&
                    (readOnly ? (
                        defaultValues?.outFlowReasonOther
                    ) : (
                        <ConditionalCard className={styles.otherField}>
                            <Field horizontal={true} label={i18n._(`Anders, namelijk`)}>
                                <Input
                                    name="outFlowReasonOther"
                                    placeholder={i18n._(`Anders, namelijk`)}
                                    defaultValue={
                                        defaultValues?.outFlowReasonOther
                                            ? defaultValues?.outFlowReasonOther
                                            : undefined
                                    }
                                />
                            </Field>
                        </ConditionalCard>
                    ))}
            </Column>
        </Section>
    )
}
