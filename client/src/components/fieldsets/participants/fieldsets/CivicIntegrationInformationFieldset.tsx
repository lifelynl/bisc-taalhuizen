import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { ChangeEventHandler, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import DateInput from 'components/Core/DataEntry/DateInput'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    civicIntegrationRequirementReasonTranslations,
    civicIntegrationRequirementTranslations,
} from '../translations/participantsTranslations'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { Select } from 'components/Core/DataEntry/Select'
import { CivicIntegrationReason, CivicIntegrationRequirement, Maybe } from 'graphql/v2/generated/graphql'

interface Props {
    prefillData?: CivicIntegrationFieldsetModel
    readOnly?: boolean
}

export interface CivicIntegrationFieldsetModel {
    'civicIntegration.requirement'?: Maybe<CivicIntegrationRequirement>
    'civicIntegration.reason'?: Maybe<CivicIntegrationReason>
    'civicIntegration.finishDate'?: Maybe<string>
}

export const CivicIntegrationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props

    const { i18n } = useLingui()
    const [civicIntegrationRequirement, setCivicIntegrationRequirement] = useState<
        CivicIntegrationRequirement | null | undefined
    >(prefillData?.['civicIntegration.requirement'])

    const onChangeCivicIntegrationRequirement: ChangeEventHandler<HTMLInputElement> = event => {
        setCivicIntegrationRequirement(event.currentTarget.value as CivicIntegrationRequirement)
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Inburgeringsplichtig`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Inburgeringsplichtig`)} horizontal={true}>
                        <p>
                            {prefillData?.['civicIntegration.requirement'] &&
                                civicIntegrationRequirementTranslations[prefillData?.['civicIntegration.requirement']]}
                        </p>
                    </Field>
                    {prefillData?.['civicIntegration.requirement'] === CivicIntegrationRequirement.No && (
                        <Field label={i18n._(t`Reden`)} horizontal={true}>
                            <p>
                                {prefillData?.['civicIntegration.reason'] &&
                                    civicIntegrationRequirementReasonTranslations[
                                        prefillData?.['civicIntegration.reason']
                                    ]}
                            </p>
                        </Field>
                    )}
                    {prefillData?.['civicIntegration.requirement'] === CivicIntegrationRequirement.InProgress && (
                        <Field label={i18n._(t`Datum van afronding`)} horizontal={true}>
                            <Paragraph>
                                {prefillData?.['civicIntegration.finishDate'] &&
                                    DateFormatters.formattedDate(prefillData?.['civicIntegration.finishDate'])}
                            </Paragraph>
                        </Field>
                    )}
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Inburgeringsplichtig`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Inburgeringsplichtig`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'civicIntegration.requirement'}
                            value={CivicIntegrationRequirement.No}
                            defaultChecked={civicIntegrationRequirement === CivicIntegrationRequirement.No}
                            onChange={onChangeCivicIntegrationRequirement}
                            label={i18n._(t`Nee`)}
                        />
                        {civicIntegrationRequirement === CivicIntegrationRequirement.No && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Selecteer de reden`)}>
                                    <Select
                                        list="civicIntegration.reason"
                                        name="civicIntegration.reason"
                                        placeholder={i18n._(t`Selecteer reden`)}
                                        options={Object.values(CivicIntegrationReason).map(value => ({
                                            value,
                                            label: civicIntegrationRequirementReasonTranslations[value] || value,
                                        }))}
                                        defaultValue={
                                            prefillData?.['civicIntegration.reason']
                                                ? {
                                                      value: prefillData['civicIntegration.reason'],
                                                      label: civicIntegrationRequirementReasonTranslations[
                                                          prefillData['civicIntegration.reason']
                                                      ],
                                                  }
                                                : undefined
                                        }
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'civicIntegration.requirement'}
                            value={CivicIntegrationRequirement.Yes}
                            defaultChecked={civicIntegrationRequirement === CivicIntegrationRequirement.Yes}
                            onChange={onChangeCivicIntegrationRequirement}
                            label={i18n._(t`Ja`)}
                        />
                        {civicIntegrationRequirement === CivicIntegrationRequirement.Yes && (
                            <ConditionalCard warning={true}>
                                <Paragraph>
                                    {i18n._(
                                        t`De inburgering moet eerst worden afgerond voor aan activiteiten van het Taalhuis kan worden deelgenomen.`
                                    )}
                                </Paragraph>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'civicIntegration.requirement'}
                            value={CivicIntegrationRequirement.InProgress}
                            defaultChecked={civicIntegrationRequirement === CivicIntegrationRequirement.InProgress}
                            onChange={onChangeCivicIntegrationRequirement}
                            label={i18n._(t`Volgt momenteel inburgering`)}
                        />
                        {civicIntegrationRequirement === CivicIntegrationRequirement.InProgress && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Datum van afronding?`)}>
                                    <DateInput
                                        name={'civicIntegration.finishDate'}
                                        placeholder={i18n._(t`DD / MM / JJJJ`)}
                                        defaultValue={prefillData?.['civicIntegration.finishDate'] ?? ''}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}
