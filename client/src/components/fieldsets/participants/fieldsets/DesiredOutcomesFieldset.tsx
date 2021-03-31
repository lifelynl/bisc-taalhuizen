import React, { useState } from 'react'

import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { DesiredOutcomeMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import Input from 'components/Core/DataEntry/Input'
import { GenericValidators } from 'utils/validators/GenericValidators'
import Select from 'components/Core/DataEntry/Select'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'

interface Props {
    defaultValues?: DesiredOutcomeMetadata
    readOnly?: boolean
}

export interface DesiredOutcomesFieldsetModel {
    goal: string
    topic: string
    application: string
    level: string
}

export const DesiredOutcomesFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [applicationValue, setApplicationValue] = useState<string>()
    const [levelValue, setLevelValue] = useState<string>()

    return (
        <Section title={i18n._(t`Gewenste leeruitkomst`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        const { readOnly, defaultValues } = props

        if (readOnly && defaultValues) {
            return (
                <>
                    <Field label={i18n._(t`Werkwoord`)} horizontal={true}>
                        <Paragraph>{defaultValues.goal}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Onderwerp`)} horizontal={true}>
                        <Paragraph>{defaultValues.topic}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Toepassingen`)} horizontal={true}>
                        <Paragraph>{defaultValues.application.join(', ')}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Niveau`)} horizontal={true}>
                        <Paragraph>{defaultValues.level}</Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Werkwoord`)} horizontal={true} required={true}>
                    <Input
                        name="goal"
                        required={true}
                        placeholder={i18n._(t`Werkwoord`)}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Onderwerp`)} horizontal={true} required={true}>
                    <Select
                        name="topic"
                        placeholder={i18n._(t`Selecteer onderwerp`)}
                        required={true}
                        options={[
                            'Nederlands: Lezen',
                            'Nederlands: Schrijven',
                            'Rekenen: Getallen',
                            'Rekenen: Verhoudingen',
                            'Rekenen: Meten en meetkunde',
                            'Rekenen: Verbanden',
                            'Digitale vaardigheden: ICT-systemen gebruiken',
                            'Digitale vaardigheden: Informatie zoeken',
                            'Digitale vaardigheden: Informatie verwerken en presenteren',
                            'Digitale vaardigheden: Communicatie',
                            'Kennis',
                            'Vaardigheden',
                            'Houding',
                            'Gedrag',
                        ]}
                        defaultValue={defaultValues?.topic}
                    />
                </Field>
                <Field label={i18n._(t`Toepassing`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            name="application"
                            placeholder={i18n._(t`Anders, namelijk:`)}
                            required={true}
                            onChangeValue={value => setApplicationValue(value)}
                            options={[
                                'Gezin en opvoeden',
                                'Arbeidsmarkt en werk',
                                'Gezondheid en welzijn',
                                'Administratie en financiën',
                                'Wonen en buurt',
                                'Zelfredzaamheid',
                                'Anders, namelijk:',
                            ]}
                            defaultValue={defaultValues?.topic}
                        />
                        {applicationValue === 'Anders, namelijk:' && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Toepassing`)}>
                                    <Input
                                        name="application"
                                        required={true}
                                        placeholder={i18n._(t`Werkwoord`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Niveau`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            name="level"
                            placeholder={i18n._(t`Selecteer niveau`)}
                            required={true}
                            onChangeValue={value => setLevelValue(value)}
                            options={['Instroom', 'NLQF 1', 'NLQF 2', 'NLQF 3', 'NLQF 4', 'Anders, namelijk:']}
                            defaultValue={defaultValues?.level}
                        />
                        {levelValue === 'Anders, namelijk:' && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Niveau`)}>
                                    <Input
                                        name="level"
                                        required={true}
                                        placeholder={i18n._(t`Werkwoord`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </>
        )
    }
}
