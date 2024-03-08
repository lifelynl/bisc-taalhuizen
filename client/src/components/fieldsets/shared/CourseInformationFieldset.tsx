import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { ChangeEventHandler, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import {
    educationGroupTypeEnumTranslations,
    educationTeacherTypeEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import Paragraph from 'components/Core/Typography/Paragraph'
import { CourseTeacherTypeEnum, EducationGroupTypeEnum, Maybe } from 'graphql/v2/generated/graphql'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props {
    prefillData?: CourseInformationFieldsetPrefillData
    readOnly?: boolean
    subtitle?: string
    customFieldText?: string
    showOtherCertificate?: boolean
}

export interface CourseInformationFieldsetModel {
    'courseEducation.hasCourse'?: BooleanCheckboxValue
    'courseEducation.institution'?: string
    'courseEducation.teachertype'?: CourseTeacherTypeEnum
    'courseEducation.group'?: EducationGroupTypeEnum
    'courseEducation.hours'?: number
    'courseEducation.degree'?: BooleanCheckboxValue
    'courseEducation.other'?: string
}

export interface CourseInformationFieldsetPrefillData {
    'courseEducation.institution'?: Maybe<string>
    'courseEducation.teachertype'?: Maybe<CourseTeacherTypeEnum>
    'courseEducation.group'?: Maybe<EducationGroupTypeEnum>
    'courseEducation.hours'?: Maybe<number>
    'courseEducation.degree'?: Maybe<boolean>
    'courseEducation.other'?: Maybe<string>
}

export const CourseInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, subtitle, showOtherCertificate, customFieldText } = props
    const { i18n } = useLingui()

    const defaultHasCourse =
        prefillData &&
        (prefillData['courseEducation.institution'] ||
            prefillData['courseEducation.teachertype'] ||
            prefillData['courseEducation.group'] ||
            typeof prefillData['courseEducation.hours'] === 'number' ||
            typeof prefillData['courseEducation.degree'] === 'boolean')

    const [hasCourse, setHasCourse] = useState<boolean>(!!defaultHasCourse)

    const onChangeHasCourse: ChangeEventHandler<HTMLInputElement> = event => {
        setHasCourse(event.currentTarget.value === 'YES')
    }

    const teacherTypeOptions = getTeacherTypeOptions()
    const groupTypeOptions = getGroupTypeOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Cursus`)} description={subtitle}>
                <Column spacing={4}>
                    <Field label={customFieldText || i18n._(t`Volg je op dit moment een cursus?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {hasCourse && i18n._(t`Ja`)}
                                {!hasCourse && i18n._(t`Nee`)}
                            </Paragraph>
                            {hasCourse && (
                                <ConditionalCard>
                                    <Column spacing={4}>
                                        <Field label={i18n._(t`Waar volg je de cursus/training?`)}>
                                            <Paragraph>{prefillData?.['courseEducation.institution']}</Paragraph>
                                        </Field>
                                        <Field label={i18n._(t`Type docent`)}>
                                            {prefillData?.['courseEducation.teachertype'] &&
                                                teacherTypeOptions.find(
                                                    o => o.value === prefillData['courseEducation.teachertype']
                                                )?.label}
                                        </Field>
                                        <Field label={i18n._(t`Type cursus/training`)}>
                                            {prefillData?.['courseEducation.group'] &&
                                                groupTypeOptions.find(
                                                    o => o.value === prefillData['courseEducation.group']
                                                )?.label}
                                        </Field>
                                        <Field label={i18n._(t`Aantal uren`)}>
                                            <Paragraph>{prefillData?.['courseEducation.hours']}</Paragraph>
                                        </Field>
                                        <Field label={i18n._(t`Biedt de opleiding een certificaat?`)}>
                                            <Paragraph>
                                                {prefillData?.['courseEducation.degree'] === true && i18n._(t`Ja`)}
                                                {prefillData?.['courseEducation.degree'] === false && i18n._(t`Nee`)}
                                            </Paragraph>
                                        </Field>
                                        {showOtherCertificate && (
                                            <Field label={i18n._(t`Andere relevante diploma's/certificaten`)}>
                                                <Paragraph>{prefillData?.['courseEducation.other']}</Paragraph>
                                            </Field>
                                        )}
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Cursus`)} description={subtitle}>
            <Column spacing={4}>
                <Field label={customFieldText || i18n._(t`Volg je op dit moment een cursus?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={'courseEducation.hasCourse'}
                            value={BooleanCheckboxValue.yes}
                            defaultChecked={!!hasCourse}
                            onChange={onChangeHasCourse}
                        />
                        {hasCourse && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Waar volg je de cursus/training?`)}>
                                        <Input
                                            name={`courseEducation.institution`}
                                            placeholder={i18n._(t`Instituut`)}
                                            defaultValue={prefillData?.['courseEducation.institution'] ?? undefined}
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Type docent`)}>
                                        <Column spacing={4}>
                                            {Object.values(CourseTeacherTypeEnum).map((value, key, array) => (
                                                <RadioButton
                                                    key={`${key}-${array.length}`}
                                                    name={'courseEducation.teachertype'}
                                                    value={value}
                                                    defaultChecked={
                                                        prefillData?.['courseEducation.teachertype'] === value
                                                    }
                                                    label={teacherTypeOptions.find(o => o.value === value)?.label}
                                                />
                                            ))}
                                        </Column>
                                    </Field>
                                    <Field label={i18n._(t`Type cursus/training`)}>
                                        <Column spacing={4}>
                                            {Object.values(EducationGroupTypeEnum).map((value, key, array) => (
                                                <RadioButton
                                                    key={`${key}-${array.length}`}
                                                    name={'courseEducation.group'}
                                                    value={value}
                                                    defaultChecked={prefillData?.['courseEducation.group'] === value}
                                                    label={groupTypeOptions.find(o => o.value === value)?.label}
                                                />
                                            ))}
                                        </Column>
                                    </Field>
                                    <Field label={i18n._(t`Aantal uren`)}>
                                        <Input
                                            placeholder={i18n._(t`Aantal uren`)}
                                            name={'courseEducation.hours'}
                                            type={'number'}
                                            defaultValue={prefillData?.['courseEducation.hours'] ?? undefined}
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Biedt de opleiding een certificaat?`)}>
                                        <Column spacing={4}>
                                            <RadioButton
                                                label={i18n._(t`Ja`)}
                                                name={`courseEducation.degree`}
                                                value={BooleanCheckboxValue.yes}
                                                defaultChecked={prefillData?.['courseEducation.degree'] === true}
                                            />
                                            <RadioButton
                                                label={i18n._(t`Nee`)}
                                                name={`courseEducation.degree`}
                                                value={BooleanCheckboxValue.no}
                                                defaultChecked={prefillData?.['courseEducation.degree'] === false}
                                            />
                                        </Column>
                                    </Field>
                                    {showOtherCertificate && (
                                        <Field label={i18n._(t`Andere relevante diploma's/certificaten`)}>
                                            <Input
                                                placeholder={i18n._(t`Relevante diploma's/certificaten`)}
                                                name={'courseEducation.other'}
                                                type={'text'}
                                                defaultValue={prefillData?.['courseEducation.hours'] ?? undefined}
                                            />
                                        </Field>
                                    )}
                                </Column>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={'courseEducation.hasCourse'}
                            value={BooleanCheckboxValue.no}
                            defaultChecked={!hasCourse}
                            onChange={onChangeHasCourse}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getTeacherTypeOptions() {
        return Object.values(CourseTeacherTypeEnum).map(value => ({
            label: educationTeacherTypeEnumTranslations[value],
            value,
        }))
    }

    function getGroupTypeOptions() {
        return Object.values(EducationGroupTypeEnum).map(value => ({
            label: educationGroupTypeEnumTranslations[value],
            value,
        }))
    }
}
