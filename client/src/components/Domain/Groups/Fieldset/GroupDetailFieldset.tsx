import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { EducationGroupType, GroupFormality } from 'graphql/v2/generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { BooleanCheckboxValue } from 'utils/forms'
import { RecursivePartialMaybe } from 'utils/objects/objects'
import { groupFormalityTranslations } from '../Translations/groupTranslations'

interface Props {
    readOnly?: boolean
    prefillData?: Data
}

export type GroupDetailFieldsetModel = RecursivePartialMaybe<Omit<Data, 'degree' | 'lessonHours'>> & {
    degree?: BooleanCheckboxValue
    lessonHours?: string | null
}

type Data = Pick<EducationGroupType, 'formality' | 'lessonHours' | 'degree' | 'start' | 'end'>

export const GroupDetailFieldset: React.FunctionComponent<Props> = ({ readOnly, prefillData }) => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Details`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        if (readOnly) {
            return (
                <>
                    <Field readOnly={true} label={i18n._(t`Formaliteit`)} horizontal={true}>
                        <Paragraph>
                            {prefillData?.formality &&
                                (groupFormalityTranslations[prefillData.formality] || prefillData.formality)}
                        </Paragraph>
                    </Field>
                    <Field readOnly={true} label={i18n._(t`Totaal aantal lesuren per deelname`)} horizontal={true}>
                        <Paragraph>{prefillData?.lessonHours}</Paragraph>
                    </Field>
                    <Field readOnly={true} label={i18n._(t`Uitreiking certificaat`)} horizontal={true}>
                        <Paragraph>{prefillData?.degree ? i18n._(t`Ja`) : i18n._(t`Nee`)}</Paragraph>
                    </Field>
                    <Field readOnly={true} label={i18n._(t`Startdatum`)} horizontal={true}>
                        <Paragraph>{DateFormatters.formattedDate(prefillData?.start)}</Paragraph>
                    </Field>
                    <Field readOnly={true} label={i18n._(t`Einddatum`)} horizontal={true}>
                        <Paragraph>{DateFormatters.formattedDate(prefillData?.end)}</Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field required={true} label={i18n._(t`Formaliteit`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name="formality"
                            value={GroupFormality.Formal}
                            defaultChecked={prefillData?.formality === GroupFormality.Formal}
                            label={groupFormalityTranslations[GroupFormality.Formal]}
                        />
                        <RadioButton
                            name="formality"
                            value={GroupFormality.NonFormal}
                            defaultChecked={prefillData?.formality === GroupFormality.NonFormal}
                            label={groupFormalityTranslations[GroupFormality.NonFormal]}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Totaal aantal lesuren per deelname`)} horizontal={true}>
                    <Input
                        name="lessonHours"
                        defaultValue={prefillData?.lessonHours ?? undefined}
                        type="number"
                        placeholder="16"
                    />
                </Field>
                <Field required={true} label={i18n._(t`Uitreiking certificaat`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name="degree"
                            value={BooleanCheckboxValue.yes}
                            defaultChecked={!!prefillData?.degree}
                            label={i18n._(t`Ja`)}
                        />
                        <RadioButton
                            name="degree"
                            value={BooleanCheckboxValue.no}
                            label={i18n._(t`Nee`)}
                            defaultChecked={!prefillData?.degree}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Startdatum`)} horizontal={true}>
                    <DateInput name="start" defaultValue={DateFormatters.toString(prefillData?.start)} />
                </Field>
                <Field label={i18n._(t`Einddatum`)} horizontal={true}>
                    <DateInput name="end" defaultValue={DateFormatters.toString(prefillData?.end)} />
                </Field>
            </>
        )
    }
}
