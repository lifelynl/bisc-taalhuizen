import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentNetworkEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { IntakeNetwork, IntakeParticipationLadder, Maybe } from 'graphql/v2/generated/graphql'
import { participationLadderTranslations } from '../translations/participantsTranslations'

interface Props {
    prefillData?: ProviderBackgroundInformationPrefillData
    readOnly?: boolean
}

export interface ProviderBackgroundInformationFieldsetModel {
    'registration.network'?: IntakeNetwork[]
    'registration.participationLadder'?: IntakeParticipationLadder
}

interface ProviderBackgroundInformationPrefillData {
    'registration.network'?: Maybe<IntakeNetwork[]>
    'registration.participationLadder'?: Maybe<IntakeParticipationLadder>
}

export const ProviderBackgroundInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const networkOptions = getStudentNetworkOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Achtergrond`)}>
                <Column spacing={4}>
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

    function getStudentNetworkOptions() {
        return Object.values(IntakeNetwork).map(value => ({
            label: studentNetworkEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
