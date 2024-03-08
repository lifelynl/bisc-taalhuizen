import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import { Select } from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { participationGroupFormationTypeTranslations } from 'components/Domain/Groups/Translations/groupTranslations'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import {
    Maybe,
    ParticipationFormality,
    ParticipationGroupType,
    ParticipationsQuery,
} from 'graphql/v2/generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props extends ConnectedFieldsetProps<Fields> {
    hideSectionTitle?: boolean
    defaultValues?: Partial<ParticipationsQuery['participations']['nodes'][0]>
    readOnly?: boolean
}

interface DetailsInformationFieldsetDefaultValues {
    formality?: Maybe<ParticipationFormality>
    groupFormation?: Maybe<ParticipationGroupType>
    start?: Maybe<Date>
    end?: Maybe<Date>
    agreement?: Maybe<string>
    degree?: Maybe<boolean>
}

type Fields = keyof DetailsInformationFieldsetDefaultValues

const DetailsInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, fieldNaming, fieldControls, hideSectionTitle } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Details`),
            formality: {
                label: i18n._(t`Formaliteit`),
            },
            groupFormation: {
                label: i18n._(t`Groepsvorming`),
                placeholder: i18n._(t`Selecteer groepsvorming`),
            },
            degree: {
                label: i18n._(t`Uitreiking certificaat`),
            },
            start: {
                label: i18n._(t`Startdatum`),
                placeholder: 'DD/MM/YYYY',
            },
            end: {
                label: i18n._(t`Einddatum`),
                placeholder: 'DD/MM/YYYY',
            },
            agreement: {
                label: i18n._(t`Afspraken over deelname`),
                placeholder: i18n._(t`Afspraken`),
            },
        },
        fieldNaming
    )
    const controls = useFieldsetControl<Fields>({}, fieldControls)

    if (hideSectionTitle) {
        return <Column spacing={4}>{renderFieldsets()}</Column>
    }

    return (
        <Section title={i18n._(t`Details`)}>
            <Column spacing={4}>{renderFieldsets()}</Column>
        </Section>
    )

    function renderFieldsets() {
        if (readOnly) {
            return (
                <>
                    <ControlField
                        readOnly={true}
                        control={controls.formality}
                        label={content.formality?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.formality ? i18n._(t`Formeel`) : i18n._(t`Non-formeel`)}</Paragraph>
                    </ControlField>
                    <ControlField
                        readOnly={true}
                        control={controls.groupFormation}
                        label={content.groupFormation?.label}
                        horizontal={true}
                    >
                        {defaultValues?.groupFormation && (
                            <Paragraph>
                                {participationGroupFormationTypeTranslations[defaultValues.groupFormation]}
                            </Paragraph>
                        )}
                    </ControlField>
                    <ControlField
                        readOnly={true}
                        control={controls.degree}
                        label={content.degree?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.degree ? i18n._(t`Ja`) : i18n._(t`Nee`)}</Paragraph>
                    </ControlField>
                    <ControlField
                        readOnly={true}
                        control={controls.start}
                        label={content.start?.label}
                        horizontal={true}
                    >
                        <Paragraph>{DateFormatters.formattedDate(defaultValues?.start)}</Paragraph>
                    </ControlField>
                    <ControlField readOnly={true} control={controls.end} label={content.end?.label} horizontal={true}>
                        <Paragraph>{DateFormatters.formattedDate(defaultValues?.end)}</Paragraph>
                    </ControlField>
                    <ControlField
                        readOnly={true}
                        control={controls.agreement}
                        label={content.agreement?.label}
                        horizontal={true}
                    >
                        <Paragraph>{defaultValues?.agreement}</Paragraph>
                    </ControlField>
                </>
            )
        }

        return (
            <>
                <ControlField
                    errorPath="formality"
                    control={controls.formality}
                    label={content.formality?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <RadioButton
                            name={'formality'}
                            value={ParticipationFormality.Formal}
                            defaultChecked={defaultValues?.formality === ParticipationFormality.Formal}
                            label={i18n._(t`Formeel`)}
                        />
                        <RadioButton
                            name={'formality'}
                            value={ParticipationFormality.NonFormal}
                            defaultChecked={defaultValues?.formality === ParticipationFormality.NonFormal}
                            label={i18n._(t`Non-formeel`)}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.groupFormation} label={content.groupFormation?.label} horizontal={true}>
                    <Column spacing={4}>
                        <Select
                            list="groupFormation"
                            name="groupFormation"
                            placeholder={content?.groupFormation?.placeholder}
                            options={getGroupFormationOptions()}
                            defaultValue={
                                defaultValues?.groupFormation
                                    ? {
                                          value: defaultValues?.groupFormation,
                                          label: participationGroupFormationTypeTranslations[
                                              defaultValues?.groupFormation
                                          ],
                                      }
                                    : undefined
                            }
                        />
                    </Column>
                </ControlField>
                <ControlField
                    errorPath="degree"
                    control={controls.degree}
                    label={content.degree?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <RadioButton
                            name={'degree'}
                            value="true"
                            defaultChecked={defaultValues?.degree ?? undefined}
                            label={i18n._(t`Ja`)}
                        />
                        <RadioButton
                            name={'degree'}
                            value="false"
                            label={i18n._(t`Nee`)}
                            defaultChecked={defaultValues?.degree === false}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.start} label={content.start?.label} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="start"
                            placeholder={content?.start?.placeholder}
                            defaultValue={DateFormatters.toString(defaultValues?.start)}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.end} label={content.end?.label} horizontal={true}>
                    <Column spacing={4}>
                        <DateInput
                            name="end"
                            placeholder={content?.end?.placeholder}
                            defaultValue={DateFormatters.toString(defaultValues?.end ?? undefined)}
                        />
                    </Column>
                </ControlField>
                <ControlField control={controls.agreement} label={content.agreement?.label} horizontal={true}>
                    <TextArea
                        name="agreement"
                        placeholder={content?.agreement?.placeholder}
                        defaultValue={defaultValues?.agreement ?? undefined}
                    />
                </ControlField>
            </>
        )
    }

    function getGroupFormationOptions() {
        return Object.values(ParticipationGroupType).map(groupFormatiom => ({
            value: groupFormatiom,
            label: participationGroupFormationTypeTranslations[groupFormatiom] ?? 'NOT SUPPORTED',
        }))
    }
}

export default DetailsInformationFieldset
