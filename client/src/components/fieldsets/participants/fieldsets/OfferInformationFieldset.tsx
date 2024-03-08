import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import { Select } from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { learningNeedOfferDifferencesTranslations } from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'
import { Maybe, OfferDifference } from 'graphql/v2/generated/graphql'
import { useState } from 'react'
import nl2br from 'react-nl2br'

interface Props {
    readOnly?: boolean
    defaultValues?: OfferInfortmationDefaultValues
}

export interface OfferInformationFieldsetModel {
    advisedOffer?: Maybe<string>
    desiredOffer?: Maybe<string>
    offerDifference?: Maybe<OfferDifference>
    offerDifferenceOther?: Maybe<string>
    agreements?: Maybe<string>
}

interface OfferInfortmationDefaultValues {
    advisedOffer?: Maybe<string>
    desiredOffer?: Maybe<string>
    offerDifference?: Maybe<OfferDifference>
    offerDifferenceOther?: Maybe<string>
    agreements?: Maybe<string>
}

const OfferInformationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()
    const [offerDifferenceValue, setOfferDifferenceValue] = useState<OfferDifference | undefined>(
        defaultValues?.offerDifference ?? undefined
    )

    return (
        <Section title={i18n._(t`Aanbod`)}>
            <Column spacing={4}>{renderFields()}</Column>
        </Section>
    )

    function renderFields() {
        if (readOnly) {
            return (
                <>
                    <Field label={i18n._(t`Gewenst aanbod`)} horizontal={true}>
                        <Paragraph>{nl2br(defaultValues?.desiredOffer)}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true}>
                        <Paragraph>{nl2br(defaultValues?.advisedOffer)}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Verschil tussen wens en advies`)} horizontal={true}>
                        <Paragraph>
                            {defaultValues?.offerDifference &&
                                learningNeedOfferDifferencesTranslations[defaultValues?.offerDifference]}
                        </Paragraph>
                        {defaultValues?.offerDifference === OfferDifference.YesOther && (
                            <Paragraph italic={true}>{defaultValues?.offerDifferenceOther}</Paragraph>
                        )}
                    </Field>
                    <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                        <Paragraph>{nl2br(defaultValues?.agreements)}</Paragraph>
                    </Field>
                </>
            )
        }

        return (
            <>
                <Field label={i18n._(t`Gewenst aanbod`)} horizontal={true}>
                    <TextArea
                        name="desiredOffer"
                        placeholder={i18n._(t`Bijvoorbeeld een cursus`)}
                        defaultValue={defaultValues?.desiredOffer ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true}>
                    <TextArea
                        name="advisedOffer"
                        placeholder={i18n._(t`Bijvoorbeeld een cursus`)}
                        defaultValue={defaultValues?.advisedOffer ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Is er een verschil tussen wens en advies?`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            name="offerDifference"
                            placeholder={i18n._(t`Selecteer`)}
                            onChangeValue={option =>
                                setOfferDifferenceValue(option ? (option.value as OfferDifference) : undefined)
                            }
                            defaultValue={
                                defaultValues?.offerDifference
                                    ? {
                                          value: defaultValues.offerDifference,
                                          label: learningNeedOfferDifferencesTranslations[
                                              defaultValues.offerDifference
                                          ],
                                      }
                                    : undefined
                            }
                            options={getOfferDifferenceOptions()}
                        />
                        {offerDifferenceValue === OfferDifference.YesOther && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Ja anders:`)}>
                                    <Input
                                        name="offerDifferenceOther"
                                        placeholder={i18n._(t`Anders`)}
                                        defaultValue={defaultValues?.offerDifferenceOther ?? undefined}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                    <TextArea
                        name="agreements"
                        placeholder={i18n._(t`Afspraken met de deelnemer...`)}
                        defaultValue={defaultValues?.agreements ?? undefined}
                    />
                </Field>
            </>
        )
    }

    function getOfferDifferenceOptions() {
        return Object.values(OfferDifference).map(value => ({
            value,
            label: learningNeedOfferDifferencesTranslations[value] ?? value,
        }))
    }
}

export default OfferInformationInformationFieldset
