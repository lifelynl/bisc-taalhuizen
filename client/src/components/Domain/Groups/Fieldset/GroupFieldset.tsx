import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { groupCourseTypeTranslations } from '../Translations/groupTranslations'
import { Select } from '../../../Core/DataEntry/Select'
import { EducationGroupType, GroupOfferType } from 'graphql/v2/generated/graphql'
import Field from 'components/Core/Field/Field'
import { RecursivePartialMaybe } from 'utils/objects/objects'

interface Props {
    prefillData?: Data
    readOnly?: boolean
    onInputName?: (newName: string) => unknown
}

export type GroupFieldsetFormModel = RecursivePartialMaybe<Data>
type Data = Pick<EducationGroupType, 'name' | 'type'>

export const GroupFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    if (props.readOnly) {
        return (
            <Section title={i18n._(t`Groep`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam groep`)} horizontal={true}>
                        <Paragraph>{props.prefillData?.name}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Type cursus`)} horizontal={true}>
                        <Paragraph>
                            {props.prefillData?.type &&
                                (groupCourseTypeTranslations[props.prefillData?.type] || props.prefillData?.type)}
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    const typeOptions = Object.values(GroupOfferType).map(typeCourse => ({
        label: groupCourseTypeTranslations[typeCourse] || typeCourse,
        value: typeCourse,
    }))
    const defaultType = typeOptions.find(t => t.value === props.prefillData?.type)

    return (
        <Section title={i18n._(t`Groep`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Naam groep`)} horizontal={true} required={true}>
                    <Input
                        name="name"
                        placeholder={i18n._(t`Naam`)}
                        defaultValue={props.prefillData?.name}
                        onInput={i => {
                            if (props.onInputName) {
                                props.onInputName(i.currentTarget.value)
                            }
                        }}
                    />
                </Field>
                <Field label={i18n._(t`Type cursus`)} horizontal={true} required={true}>
                    <Select
                        defaultValue={defaultType}
                        name={'type'}
                        options={typeOptions}
                        placeholder={i18n._(t`Selecteer type...`)}
                    />
                </Field>
            </Column>
        </Section>
    )
}
