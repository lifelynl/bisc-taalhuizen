import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import React, { useState } from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    defaultValues?: LearningQuestionMetadata
}

export interface OfferInfortmationInformationModel {
    desiredOffers: string
    advisedOffers: string
    engagements: string
    differences: string
}

const OfferInfortmationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues } = props
    const { i18n } = useLingui()
    const [differencesValue, setDifferencesValue] = useState<string>()

    return (
        <Section title={i18n._(t`Aanbod`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Gewenste aanbod`)} horizontal={true} required={true}>
                    <TextArea
                        name="desiredOffers"
                        placeholder={i18n._(t`Gewenst aanbod`)}
                        defaultValue={defaultValues?.desiredOffers}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true} required={true}>
                    <TextArea
                        name="advisedOffers"
                        placeholder={i18n._(t`Geadviseerd aanbod`)}
                        defaultValue={defaultValues?.advisedOffers}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Is er een verschil tussen wens en advies?`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            name="difference"
                            placeholder={i18n._(t`Selecteer`)}
                            required={true}
                            onChangeValue={value => setDifferencesValue(value)}
                            defaultValue={defaultValues?.differences}
                            options={[
                                'Nee, er is geen verschil',
                                'Ja, want: niet aangeboden binnen bereisbare afstand',
                                'Ja, want: wachtlijst',
                                'Ja, want: anders',
                            ]}
                        />
                        {differencesValue === 'Ja, want: anders' && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Toepassing`)}>
                                    <Input
                                        name="goal"
                                        required={true}
                                        placeholder={i18n._(t`Werkwoord`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                    <TextArea
                        name="engagements"
                        placeholder={i18n._(t`Afspraken`)}
                        defaultValue={defaultValues?.engagements}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default OfferInfortmationInformationFieldset
