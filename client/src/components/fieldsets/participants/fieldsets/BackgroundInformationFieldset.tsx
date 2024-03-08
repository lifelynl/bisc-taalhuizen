import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import { YearInput } from 'components/Core/DataEntry/YearInput'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    studentFoundViaEnumTranslations,
    studentNetworkEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Select } from 'components/Core/DataEntry/Select'
import { IntakeFoundVia, IntakeNetwork, IntakeParticipationLadder, Maybe } from 'graphql/v2/generated/graphql'
import { participationLadderTranslations } from '../translations/participantsTranslations'
import { BooleanCheckboxValue } from 'utils/forms'

interface Props {
    prefillData?: BackgroundInformationPrefillData
    readOnly?: boolean
}

export interface BackgroundInformationFieldsetModel {
    'registration.foundVia'?: IntakeFoundVia
    'registration.foundViaOther'?: string
    'registration.wentToLanguageHouseBefore'?: BooleanCheckboxValue
    'registration.wentToLanguageHouseBeforeReason'?: string
    'registration.wentToLanguageHouseBeforeYear'?: string
    'registration.network'?: IntakeNetwork[]
    'registration.participationLadder'?: IntakeParticipationLadder
}

interface BackgroundInformationPrefillData {
    'registration.foundVia'?: Maybe<IntakeFoundVia>
    'registration.foundViaOther'?: Maybe<string>
    'registration.wentToLanguageHouseBefore'?: Maybe<boolean>
    'registration.wentToLanguageHouseBeforeReason'?: Maybe<string>
    'registration.wentToLanguageHouseBeforeYear'?: Maybe<number>
    'registration.network'?: Maybe<IntakeNetwork[]>
    'registration.participationLadder'?: Maybe<IntakeParticipationLadder>
}

export const BackgroundInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [wentToLanguageHouseBefore, setWentToLanguageHouseBefore] = useState<boolean | undefined>(
        prefillData?.['registration.wentToLanguageHouseBefore'] === true
    )

    const onChangeWentToLanguageHouseBefore: ChangeEventHandler<HTMLInputElement> = event => {
        setWentToLanguageHouseBefore(event.currentTarget.value === 'YES')
    }

    const [foundVia, setFoundVia] = useState<IntakeFoundVia | undefined>(
        prefillData?.['registration.foundVia'] ?? undefined
    )
    const networkOptions = getStudentNetworkOptions()
    const foundViaOptions = getFoundViaOptions()

    useEffect(() => {
        setFoundVia(prefillData?.['registration.foundVia'] ?? undefined)
    }, [prefillData])

    if (readOnly) {
        return (
            <Section title={i18n._(t`Achtergrond`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {prefillData?.['registration.foundVia'] &&
                                    studentFoundViaEnumTranslations[prefillData?.['registration.foundVia']]}
                            </Paragraph>
                            {prefillData?.['registration.foundVia'] === IntakeFoundVia.Other && (
                                <ConditionalCard>
                                    <Column spacing={5}>
                                        <Field label={i18n._(t`Gevonden via`)}>
                                            <Paragraph>{prefillData?.['registration.foundViaOther']}</Paragraph>
                                        </Field>
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Ben je eerder bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {prefillData?.['registration.wentToLanguageHouseBefore'] === true &&
                                    i18n._(t`Ja, namelijk...`)}
                                {prefillData?.['registration.wentToLanguageHouseBefore'] === false && i18n._(t`Nee`)}
                            </Paragraph>
                            {wentToLanguageHouseBefore && (
                                <ConditionalCard>
                                    <Column spacing={5}>
                                        <Field label={i18n._(t`Reden`)}>
                                            <Paragraph>
                                                {prefillData?.['registration.wentToLanguageHouseBeforeReason']}
                                            </Paragraph>
                                        </Field>

                                        <Field label={i18n._(t`Jaar`)}>
                                            <Paragraph>
                                                {prefillData?.['registration.wentToLanguageHouseBeforeYear']}
                                            </Paragraph>
                                        </Field>
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>

                    <Field
                        label={i18n._(t`Netwerk:  met wie heb je contact, met wie praat je zoal?`)}
                        horizontal={true}
                    >
                        {renderIntakeNetworkCheckboxes()}
                    </Field>

                    <Field
                        label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)}
                        horizontal={true}
                    >
                        <p>
                            {prefillData?.['registration.participationLadder'] &&
                                participationLadderTranslations[prefillData?.['registration.participationLadder']]}
                        </p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Achtergrond`)}>
            <Column spacing={10}>
                <Field label={i18n._(t`Hoe ben je bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                    <Column spacing={4}>
                        <Select
                            list="registration.foundVia"
                            name="registration.foundVia"
                            placeholder={i18n._(t`Selecteer reden`)}
                            options={foundViaOptions}
                            onChangeValue={option => setFoundVia(option ? (option.value as IntakeFoundVia) : undefined)}
                            defaultValue={
                                prefillData?.['registration.foundVia']
                                    ? {
                                          value: prefillData['registration.foundVia'],
                                          label: studentFoundViaEnumTranslations[prefillData['registration.foundVia']],
                                      }
                                    : undefined
                            }
                        />
                        {foundVia === IntakeFoundVia.Other && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Gevonden via`)}>
                                        <Input
                                            name="registration.foundViaOther"
                                            placeholder={i18n._(t`Reden`)}
                                            defaultValue={prefillData?.['registration.foundViaOther'] ?? undefined}
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>

                <Field label={i18n._(t`Ben je eerder bij het (digi)taalhuis terecht gekomen?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'registration.wentToLanguageHouseBefore'}
                            value={BooleanCheckboxValue.yes}
                            label={i18n._(t`Ja, namelijk...`)}
                            onChange={onChangeWentToLanguageHouseBefore}
                            defaultChecked={prefillData?.['registration.wentToLanguageHouseBefore'] === true}
                        />
                        {wentToLanguageHouseBefore && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Reden`)}>
                                        <Input
                                            name="registration.wentToLanguageHouseBeforeReason"
                                            placeholder={i18n._(t`Reden`)}
                                            defaultValue={
                                                prefillData?.['registration.wentToLanguageHouseBeforeReason'] ??
                                                undefined
                                            }
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Jaar`)}>
                                        <YearInput
                                            name="registration.wentToLanguageHouseBeforeYear"
                                            placeholder={i18n._(t`Jaar, bijvoorbeeld: 2021`)}
                                            defaultValue={
                                                prefillData?.['registration.wentToLanguageHouseBeforeYear'] ?? undefined
                                            }
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            name={'registration.wentToLanguageHouseBefore'}
                            value={BooleanCheckboxValue.no}
                            label={i18n._(t`Nee`)}
                            onChange={onChangeWentToLanguageHouseBefore}
                            defaultChecked={prefillData?.['registration.wentToLanguageHouseBefore'] === false}
                        />
                    </Column>
                </Field>

                <Field label={i18n._(t`Netwerk: met wie heb je contact, met wie praat je zoal?`)} horizontal={true}>
                    <Column spacing={4}>{renderIntakeNetworkCheckboxes()}</Column>
                </Field>

                <Field label={i18n._(t`Waar bevindt de taalleerder zich op de participatieladder`)} horizontal={true}>
                    <Column spacing={4}>
                        {[
                            IntakeParticipationLadder.Isolated,
                            IntakeParticipationLadder.SocialContactsOutside,
                            IntakeParticipationLadder.OrganizedActivityParticipation,
                            IntakeParticipationLadder.VolunteerWork,
                            IntakeParticipationLadder.PaidWithSupport,
                            IntakeParticipationLadder.Paid,
                        ].map((participationLadderValue, index) => (
                            <RadioButton
                                key={index}
                                name={'registration.participationLadder'}
                                value={participationLadderValue}
                                label={participationLadderTranslations[participationLadderValue]}
                                defaultChecked={
                                    prefillData?.['registration.participationLadder'] === participationLadderValue
                                }
                            />
                        ))}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderIntakeNetworkCheckboxes() {
        if (readOnly) {
            const selectedIntakeNetworks = prefillData?.['registration.network'] || []

            return selectedIntakeNetworks.map((network, index) => {
                return (
                    <Row key={index}>
                        <p>{networkOptions.find(networkOption => networkOption.value === network)?.label}</p>
                    </Row>
                )
            })
        }

        return networkOptions.map((network, index) => {
            return (
                <React.Fragment key={index}>
                    <Checkbox
                        label={network.label}
                        name={`registration.network[]`}
                        value={network.value}
                        defaultChecked={prefillData?.['registration.network']?.includes(network.value)}
                    />
                </React.Fragment>
            )
        })
    }

    function getFoundViaOptions() {
        return Object.values(IntakeFoundVia).map(value => ({
            label: studentFoundViaEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }

    function getStudentNetworkOptions() {
        return Object.values(IntakeNetwork).map(value => ({
            label: studentNetworkEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
