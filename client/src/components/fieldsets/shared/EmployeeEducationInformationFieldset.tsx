import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Select } from 'components/Core/DataEntry/Select'
import Paragraph from 'components/Core/Typography/Paragraph'
import { EducationLevelEnum, EducationNameEnum, EducationType } from 'graphql/v2/generated/graphql'
import React, { ChangeEvent, useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { BooleanCheckboxValue } from 'utils/forms'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import { educationLevelTranslations } from '../participants/translations/participantsTranslations'

interface Props {
    prefillData?: EmployeeEducationInformationFieldsetData
    readOnly?: boolean
}

// if prefillData is passed, either lastEducation or currentEducation should be passed, not both
export interface EmployeeEducationInformationFieldsetData {
    lastEducation?: LastEducationData
    currentEducation?: CurrentEducationData
}
type CurrentEducationData = Pick<EducationType, 'name' | 'startDate' | 'institution' | 'degree'>
type LastEducationData = Pick<EducationType, 'name' | 'endDate' | 'level' | 'levelOther' | 'degreeGranted'>

export interface EmployeeEducationInformationFieldsetModel {
    'employeeEducation.name'?: EducationNameEnum | BooleanCheckboxValue.no
    'currentEducation.startDate'?: string | null
    'currentEducation.institution'?: string | null
    'currentEducation.degree'?: BooleanCheckboxValue
    'lastEducation.endDate'?: string | null
    'lastEducation.level'?: EducationLevelEnum | null
    'lastEducation.levelOther'?: string | null
    'lastEducation.degreeGranted'?: BooleanCheckboxValue
}

const EmployeeEducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const defaultName = prefillData?.lastEducation?.name || prefillData?.currentEducation?.name
    const [educationName, setEducationName] = useState<EducationNameEnum | undefined>(defaultName)
    const defaultLevel = prefillData?.lastEducation?.level
    const [level, setLevel] = useState<EducationLevelEnum | undefined>(defaultLevel || undefined)

    if (readOnly) {
        const educationLabel = getEducationNameLabel()

        return (
            <Section
                title={i18n._(t`Opleiding`)}
                description={i18n._(
                    t`Volg je op dit moment een opleiding die te maken heeft met het vrijwilligerswerk?`
                )}
            >
                <Column spacing={4}>
                    <Field label={i18n._(t`Huidige opleiding`)} horizontal={true}>
                        <Paragraph>{educationLabel}</Paragraph>
                    </Field>
                    {educationName === EducationNameEnum.CurrentEducation && renderCurrentEducationFormFields(true)}
                    {educationName === EducationNameEnum.LastFollowedEducation && renderLastEducationFormFields(true)}
                </Column>
            </Section>
        )
    }

    return (
        <Section
            title={i18n._(t`Opleiding`)}
            description={i18n._(t`Volg je op dit moment een opleiding die te maken heeft met het vrijwilligerswerk?`)}
        >
            <Column spacing={4}>
                <Field label={i18n._(t`Huidige opleiding`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name="employeeEducation.name"
                            value={EducationNameEnum.CurrentEducation}
                            label={i18n._(t`Ja, sinds:`)}
                            defaultChecked={defaultName === EducationNameEnum.CurrentEducation}
                            onChange={handleEducationNameChange}
                        />
                        {educationName === EducationNameEnum.CurrentEducation && renderCurrentEducationFormFields()}
                        <RadioButton
                            name="employeeEducation.name"
                            value={BooleanCheckboxValue.yes}
                            label={i18n._(t`Nee`)}
                            defaultChecked={!defaultName}
                            onChange={handleEducationNameChange}
                        />
                        <RadioButton
                            name="employeeEducation.name"
                            value={EducationNameEnum.LastFollowedEducation}
                            label={i18n._(t`Nee, maar wel gevolgd tot:`)}
                            onChange={handleEducationNameChange}
                            defaultChecked={defaultName === EducationNameEnum.LastFollowedEducation}
                        />
                        {educationName === EducationNameEnum.LastFollowedEducation && renderLastEducationFormFields()}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function handleEducationNameChange(event: ChangeEvent<HTMLInputElement>) {
        const val = event.currentTarget.value as EducationNameEnum | BooleanCheckboxValue.no
        setEducationName(val === BooleanCheckboxValue.no ? undefined : val)
    }

    function renderCurrentEducationFormFields(readOnly?: boolean) {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Waar volg je de opleiding?`)} horizontal={true}>
                        <Paragraph>{prefillData?.currentEducation?.institution}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Biedt de opleiding een certificaat?`)} horizontal={true}>
                        <Paragraph>{i18n._(prefillData?.currentEducation?.degree ? t`Ja` : t`Nee`)}</Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <Column spacing={2}>
                <DateInput
                    name="currentEducation.startDate"
                    defaultValue={prefillData?.currentEducation?.startDate || undefined}
                />
                <ConditionalCard>
                    <Column spacing={5}>
                        <Field label={i18n._(t`Waar volg je de opleiding`)}>
                            <Input
                                name="currentEducation.institution"
                                placeholder={i18n._(t`Naam opleiding`)}
                                defaultValue={prefillData?.currentEducation?.institution || undefined}
                            />
                        </Field>
                        <Field label={'Biedt de opleiding een certificaat?'}>
                            <Column spacing={4}>
                                <RadioButton
                                    name="currentEducation.degree"
                                    value={BooleanCheckboxValue.yes}
                                    label={i18n._(t`Ja`)}
                                    defaultChecked={!!prefillData?.currentEducation?.degree}
                                />
                                <RadioButton
                                    name="currentEducation.degree"
                                    value={BooleanCheckboxValue.yes}
                                    label={i18n._(t`Nee`)}
                                    defaultChecked={!prefillData?.currentEducation?.degree}
                                />
                            </Column>
                        </Field>
                    </Column>
                </ConditionalCard>
            </Column>
        )
    }

    function renderLastEducationFormFields(readOnly?: boolean) {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>
                            {(defaultLevel && educationLevelTranslations[defaultLevel]) ||
                                prefillData?.lastEducation?.levelOther}
                        </Paragraph>
                        <Paragraph italic={true}>{prefillData?.lastEducation?.levelOther}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Diploma`)} horizontal={true}>
                        <Paragraph>{i18n._(prefillData?.lastEducation?.degreeGranted ? t`Ja` : t`Nee`)}</Paragraph>
                    </Field>
                </>
            )
        }

        const defaultLevelOption = defaultLevel
            ? { value: defaultLevel, label: educationLevelTranslations[defaultLevel] }
            : undefined

        return (
            <Column spacing={2}>
                <DateInput
                    name="lastEducation.endDate"
                    defaultValue={prefillData?.lastEducation?.endDate || undefined}
                />
                <ConditionalCard>
                    <Column spacing={5}>
                        <Field label={i18n._(t`Niveau`)}>
                            <Select
                                list={`lastEducation.level`}
                                name={`lastEducation.level`}
                                placeholder={i18n._(t`Selecteer niveau`)}
                                options={getEducationLevelOptions()}
                                defaultValue={defaultLevelOption}
                                onChange={e => setLevel(e.target.value as EducationLevelEnum)}
                            />
                        </Field>
                        {level === EducationLevelEnum.Other && (
                            <Field label={i18n._(t`Anders, namelijk`)}>
                                <Input
                                    name="lastEducation.levelOther"
                                    placeholder={i18n._(t`Anders, namelijk`)}
                                    defaultValue={prefillData?.lastEducation?.levelOther || undefined}
                                />
                            </Field>
                        )}
                        <Field label={i18n._(t`Diploma`)}>
                            <Column spacing={3}>
                                <RadioButton
                                    name="lastEducation.degreeGranted"
                                    value={BooleanCheckboxValue.yes}
                                    label={i18n._(t`Ja`)}
                                    defaultChecked={!!prefillData?.lastEducation?.degreeGranted}
                                />
                                <RadioButton
                                    name="lastEducation.degreeGranted"
                                    value={BooleanCheckboxValue.no}
                                    label={i18n._(t`Nee`)}
                                    defaultChecked={!prefillData?.lastEducation?.degreeGranted}
                                />
                            </Column>
                        </Field>
                    </Column>
                </ConditionalCard>
            </Column>
        )
    }

    function getEducationNameLabel() {
        if (educationName === EducationNameEnum.CurrentEducation) {
            const date = DateFormatters.formattedDate(prefillData?.currentEducation?.startDate)
            if (!date) {
                return i18n._(t`Ja`)
            }

            return `${i18n._(t`Ja, sinds`)} ${date}`
        }

        if (educationName === EducationNameEnum.LastFollowedEducation) {
            const date = DateFormatters.formattedDate(prefillData?.lastEducation?.endDate)
            if (!date) {
                return i18n._(t`Nee`)
            }

            return `${i18n._(t`Nee, maar wel gevolgd tot`)} ${date}`
        }

        return i18n._(t`Nee`)
    }

    function getEducationLevelOptions() {
        return Object.values(EducationLevelEnum).map(value => ({
            label: educationLevelTranslations[value],
            value,
        }))
    }
}

export default EmployeeEducationInformationFieldset
