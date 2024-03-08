import styles from './SharedContactMomentDetailFieldset.module.scss'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DateInput from 'components/Core/DataEntry/DateInput'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Column from 'components/Core/Layout/Column/Column'
import { Select } from 'components/Core/DataEntry/Select'
import {
    EditStudentContactMomentInputType,
    StudentContactMomentContactType,
    StudentContactMomentType,
} from 'graphql/v2/generated/graphql'

interface Props {
    defaultValues?: StudentContactMomentType
}

export type StudentContactMomentFormData = Pick<EditStudentContactMomentInputType, 'type' | 'date' | 'explanation'>

export const ContactMomentFormFields = (props: Props) => {
    const { i18n } = useLingui()
    const eventDetailTypesTranslations = {
        [StudentContactMomentContactType.FinalTalk]: i18n._(t`Eindgesprek`),
        [StudentContactMomentContactType.Remark]: i18n._(t`Opmerking`),
        [StudentContactMomentContactType.FollowUp]: i18n._(t`Vervolggesprek`),
        [StudentContactMomentContactType.StoryTelling]: i18n._(t`Informatie voor storytelling`),
        [StudentContactMomentContactType.Intake]: i18n._(t`Intake`),
    }

    const { defaultValues } = props
    const typeOptions = Object.values(StudentContactMomentContactType).map(value => ({
        value,
        label: eventDetailTypesTranslations[value],
    }))

    return (
        <div className={styles.contentContainer}>
            <Column spacing={8}>
                <Field label={i18n._(t`Gebeurtenis`)} required={true}>
                    <Select
                        list="type"
                        name="type"
                        placeholder={i18n._(t`Selecteer type`)}
                        options={typeOptions}
                        defaultValue={
                            defaultValues?.type
                                ? {
                                      value: defaultValues.type,
                                      label: eventDetailTypesTranslations[defaultValues.type],
                                  }
                                : undefined
                        }
                    />
                </Field>
                <Field label={i18n._(t`Datum`)} required={true}>
                    <DateInput
                        name="date"
                        placeholder={i18n._(t`01/01/2020`)}
                        defaultValue={defaultValues?.date.toString()}
                    />
                </Field>
                <Field label={i18n._(t`Omschrijving`)} required={true}>
                    <TextArea
                        name="explanation"
                        growHeight={true}
                        placeholder={i18n._(t`Omschrijving van de gebeurtenis…`)}
                        defaultValue={defaultValues?.explanation}
                    />
                </Field>
            </Column>
        </div>
    )
}
