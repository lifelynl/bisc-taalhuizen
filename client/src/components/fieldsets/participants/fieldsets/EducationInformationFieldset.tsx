import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { ChangeEventHandler, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { Select } from 'components/Core/DataEntry/Select'
import { EducationLevelEnum, Maybe } from 'graphql/v2/generated/graphql'
import { educationLevelTranslations } from '../translations/participantsTranslations'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props {
    prefillData?: EducationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface EducationInformationFieldsetModel {
    'lastFollowedEducation.level'?: EducationLevelEnum
    'lastFollowedEducation.levelOther'?: string
    'lastFollowedEducation.degreeGranted'?: BooleanCheckboxValue
    'lastFollowedEducation.yearsFollowed'?: number

    'currentEducation.hasCurrentEducation'?: BooleanCheckboxValue
    'currentEducation.startDate'?: string
    'currentEducation.yearsFollowed'?: number
    'currentEducation.level'?: EducationLevelEnum
    'currentEducation.levelOther'?: string
    'currentEducation.institution'?: string
    'currentEducation.degree'?: BooleanCheckboxValue
}

interface EducationInformationFieldsetPrefillData {
    'lastFollowedEducation.level'?: Maybe<EducationLevelEnum>
    'lastFollowedEducation.levelOther'?: Maybe<string>
    'lastFollowedEducation.degreeGranted'?: Maybe<boolean>
    'lastFollowedEducation.yearsFollowed'?: Maybe<number>

    'currentEducation.startDate'?: Maybe<string>
    'currentEducation.yearsFollowed'?: Maybe<number>
    'currentEducation.level'?: Maybe<EducationLevelEnum>
    'currentEducation.levelOther'?: Maybe<string>
    'currentEducation.institution'?: Maybe<string>
    'currentEducation.degree'?: Maybe<boolean>
}

export const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const educationLevelOptions = getEducationLevelOptions()

    const defaultHasCurrentEducation =
        prefillData &&
        (prefillData['currentEducation.startDate'] ||
            typeof prefillData['currentEducation.yearsFollowed'] === 'number' ||
            prefillData['currentEducation.level'] ||
            prefillData['currentEducation.institution'] ||
            typeof prefillData['currentEducation.degree'] === 'boolean')

    const defaultCurrentLevel = prefillData?.['currentEducation.level']
    const defaultLastLevel = prefillData?.['lastFollowedEducation.level']
    const defaultLastLevelOption = defaultLastLevel && educationLevelOptions.find(o => o.value === defaultLastLevel)
    const defaultCurrentLevelOption =
        defaultCurrentLevel && educationLevelOptions.find(o => o.value === defaultCurrentLevel)

    const [currentlevel, setCurrentLevel] = useState<EducationLevelEnum | undefined>(defaultCurrentLevel || undefined)
    const [lastLevel, setLastLevel] = useState<EducationLevelEnum | undefined>(defaultLastLevel || undefined)

    const [hasCurrentEducation, setHasCurrentEducation] = useState<boolean>(!!defaultHasCurrentEducation)

    const onChangeHasCurrentEducation: ChangeEventHandler<HTMLInputElement> = event => {
        setHasCurrentEducation(event.currentTarget.value === 'YES')
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Opleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Laatst gevolgde opleiding`)} horizontal={true}>
                        <Paragraph>{defaultLastLevelOption?.label}</Paragraph>
                        <Paragraph italic={true}>{prefillData?.['lastFollowedEducation.levelOther']}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Jaren gevolgd`)} horizontal={true}>
                        <Paragraph>{prefillData?.['lastFollowedEducation.yearsFollowed']}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Diploma behaald`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {prefillData?.['lastFollowedEducation.degreeGranted'] === true && i18n._(t`Ja`)}
                                {prefillData?.['lastFollowedEducation.degreeGranted'] === false && i18n._(t`Nee`)}
                            </Paragraph>
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Volg je op dit moment een opleiding?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {hasCurrentEducation && i18n._(t`Ja`)}
                                {!hasCurrentEducation && i18n._(t`Nee`)}
                            </Paragraph>
                            {hasCurrentEducation && (
                                <Column spacing={4}>
                                    <ConditionalCard>
                                        <Column spacing={4}>
                                            <Field label={i18n._(t`Begindatum`)}>
                                                <Paragraph>
                                                    {prefillData?.['currentEducation.startDate'] &&
                                                        DateFormatters.formattedDate(
                                                            prefillData?.['currentEducation.startDate']
                                                        )}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Jaren gevolgd`)}>
                                                <Paragraph>{prefillData?.['currentEducation.yearsFollowed']}</Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Opleidingsniveau`)}>
                                                <Paragraph>{defaultCurrentLevelOption?.label}</Paragraph>
                                                <Paragraph italic={true}>
                                                    {prefillData?.['currentEducation.levelOther']}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                                <Paragraph>{prefillData?.['currentEducation.institution']}</Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                                <Paragraph>
                                                    {prefillData?.['currentEducation.degree'] === true && i18n._(t`Ja`)}
                                                    {prefillData?.['currentEducation.degree'] === false &&
                                                        i18n._(t`Nee`)}
                                                </Paragraph>
                                            </Field>
                                        </Column>
                                    </ConditionalCard>
                                </Column>
                            )}
                        </Column>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Opleiding`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Laatst gevolgde opleiding`)} horizontal={true}>
                    <Select
                        list={`lastFollowedEducation.level`}
                        name={`lastFollowedEducation.level`}
                        placeholder={i18n._(t`Selecteer niveau`)}
                        options={educationLevelOptions}
                        defaultValue={defaultLastLevelOption || undefined}
                        onChangeValue={e => setLastLevel(e?.value as EducationLevelEnum)}
                    />
                </Field>
                {lastLevel === EducationLevelEnum.Other && (
                    <Field horizontal={true} label={i18n._(t`Anders, namelijk`)}>
                        <Input
                            name="lastFollowedEducation.levelOther"
                            placeholder={i18n._(t`Anders, namelijk`)}
                            defaultValue={prefillData?.['lastFollowedEducation.levelOther'] || undefined}
                        />
                    </Field>
                )}

                <Field label={i18n._(t`Jaren gevolgd`)} horizontal={true}>
                    <Input
                        type="number"
                        name={`lastFollowedEducation.yearsFollowed`}
                        defaultValue={prefillData?.['lastFollowedEducation.yearsFollowed'] ?? undefined}
                        min={0}
                    />
                </Field>

                <Field label={i18n._(t`Diploma behaald`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={`lastFollowedEducation.degreeGranted`}
                            value={BooleanCheckboxValue.yes}
                            defaultChecked={prefillData?.['lastFollowedEducation.degreeGranted'] === true}
                        />
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={`lastFollowedEducation.degreeGranted`}
                            value={BooleanCheckboxValue.no}
                            defaultChecked={prefillData?.['lastFollowedEducation.degreeGranted'] === false}
                        />
                    </Column>
                </Field>

                <Field label={i18n._(t`Volg je op dit moment een opleiding?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={'currentEducation.hasCurrentEducation'}
                            value={BooleanCheckboxValue.yes}
                            defaultChecked={!!hasCurrentEducation}
                            onChange={onChangeHasCurrentEducation}
                        />
                        {hasCurrentEducation && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Begindatum`)}>
                                        <DateInput
                                            name={`currentEducation.startDate`}
                                            placeholder={i18n._(t`01/01/2020`)}
                                            defaultValue={prefillData?.['currentEducation.startDate'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Jaren gevolgd`)}>
                                        <Input
                                            name={`currentEducation.yearsFollowed`}
                                            type="number"
                                            min={0}
                                            defaultValue={prefillData?.['currentEducation.yearsFollowed'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Opleidingsniveau`)}>
                                        <Select
                                            list={`currentEducation.level`}
                                            name={`currentEducation.level`}
                                            placeholder={i18n._(t`Selecteer niveau`)}
                                            options={educationLevelOptions}
                                            onChangeValue={e => setCurrentLevel(e?.value as EducationLevelEnum)}
                                            defaultValue={defaultCurrentLevelOption || undefined}
                                        />
                                    </Field>
                                    {currentlevel === EducationLevelEnum.Other && (
                                        <Field label={i18n._(t`Anders, namelijk`)}>
                                            <Input
                                                name="currentEducation.levelOther"
                                                placeholder={i18n._(t`Anders, namelijk`)}
                                                defaultValue={prefillData?.['currentEducation.levelOther'] || undefined}
                                            />
                                        </Field>
                                    )}

                                    <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                        <Input
                                            name={`currentEducation.institution`}
                                            placeholder={i18n._(t`Instituut`)}
                                            defaultValue={prefillData?.['currentEducation.institution'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                        <Column spacing={4}>
                                            <RadioButton
                                                label={i18n._(t`Ja`)}
                                                name={`currentEducation.degree`}
                                                value={BooleanCheckboxValue.yes}
                                                defaultChecked={prefillData?.['currentEducation.degree'] === true}
                                            />
                                            <RadioButton
                                                label={i18n._(t`Nee`)}
                                                name={`currentEducation.degree`}
                                                value={BooleanCheckboxValue.no}
                                                defaultChecked={prefillData?.['currentEducation.degree'] === false}
                                            />
                                        </Column>
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}

                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={'currentEducation.hasCurrentEducation'}
                            value={BooleanCheckboxValue.no}
                            defaultChecked={!hasCurrentEducation}
                            onChange={onChangeHasCurrentEducation}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getEducationLevelOptions() {
        return Object.values(EducationLevelEnum).map(value => ({
            label: educationLevelTranslations[value],
            value,
        }))
    }
}
