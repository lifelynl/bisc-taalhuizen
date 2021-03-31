import React from 'react'

import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import Input from 'components/Core/DataEntry/Input'
import { GenericValidators } from 'utils/validators/GenericValidators'
import TextArea from 'components/Core/DataEntry/TextArea'

interface Props {
    defaultValues?: LearningQuestionMetadata
    readOnly?: boolean
}
export interface LearningQuestionsFieldsetModel {
    motivations: string
    decription: string
}

export const LearningQuestionsFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Leervraag`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        const { readOnly, defaultValues } = props

        if (readOnly && defaultValues) {
            return (
                <>
                    <Field label={i18n._(t`Motivatie`)} horizontal={true}>
                        {renderTexts(defaultValues.motivations, { withHyphen: true })}
                    </Field>
                    <Field label={i18n._(t`Gewenste aanbod`)} horizontal={true}>
                        {renderTexts(defaultValues.desiredOffers)}
                    </Field>
                    <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true}>
                        {renderTexts(defaultValues.advisedOffers)}
                    </Field>
                    <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                        {renderTexts(defaultValues.engagements, { withHyphen: true })}
                    </Field>
                </>
            )
        }

        // TODO: implement editable fields when needed
        return (
            <>
                <Field label={i18n._(t`Korte omschrijving`)} horizontal={true} required={true}>
                    <Input
                        name="decription"
                        required={true}
                        placeholder={i18n._(t`Beschrijving`)}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Motivatie`)} horizontal={true} required={true}>
                    <TextArea
                        name="motvations"
                        placeholder={i18n._(t`Motivatie`)}
                        defaultValue={defaultValues?.motivations}
                        validators={[GenericValidators.required]}
                    />
                </Field>
            </>
        )
    }

    function renderTexts(texts: string[], flag?: { withHyphen: boolean }) {
        if (flag?.withHyphen) {
            return (
                <Column spacing={1}>
                    {texts.map((t, i) => (
                        <Paragraph key={i}>- {t}</Paragraph>
                    ))}
                </Column>
            )
        }

        return (
            <Column spacing={1}>
                {texts.map((t, i) => (
                    <Paragraph key={i}>{t}</Paragraph>
                ))}
            </Column>
        )
    }
}
