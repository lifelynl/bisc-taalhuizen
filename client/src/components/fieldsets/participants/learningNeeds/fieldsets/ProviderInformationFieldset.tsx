import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    ParticipationProviderOption,
    ParticipationQuery,
    useParticipationProviderOrganizationsLazyQuery,
} from 'graphql/v2/generated/graphql'
import React, { useEffect, useState } from 'react'

interface Props {
    participation?: ParticipationQuery['participation']
    readOnly?: boolean
    onProviderChange?: (selectedOther: boolean, value?: string | number) => void
}

// TECHNICAL-DEBT: select component should allow pagination
const ProviderInformationFieldset: React.FunctionComponent<Props> = props => {
    const { participation, readOnly, onProviderChange } = props
    const { i18n } = useLingui()
    const [hasSelectedOther, setHasSelectedOther] = useState(
        participation?.providerOption === ParticipationProviderOption.Other
    )

    const [getOrganizations, organizationsQuery] = useParticipationProviderOrganizationsLazyQuery()

    useEffect(() => {
        if (!readOnly) {
            getOrganizations()
        }
    }, [readOnly, getOrganizations])

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>
                            {participation?.providerOption === ParticipationProviderOption.Provider
                                ? participation?.provider?.name
                                : participation?.providerOther}
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    const providerOtherOption: DefaultSelectOption = {
        value: ParticipationProviderOption.Other,
        label: i18n._('Anders, namelijk:'),
    }

    return (
        <Section title={i18n._(t`Aanbieder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanbieder`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        {renderSelect()}
                        <ConditionalCard>{hasSelectedOther ? renderNameField() : renderNoteField()}</ConditionalCard>
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderSelect() {
        if (organizationsQuery.error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`De lijst met Aanbieders kon niet worden opgehaald`)}
                />
            )
        }

        if (organizationsQuery.loading || !organizationsQuery.data) {
            return <Spinner small={true} />
        }

        const providers = organizationsQuery.data?.participationProviderOrganizations || []
        const providerOptions = providers.map(r => ({ value: r.id, label: r.name }))
        const options = [...providerOptions, providerOtherOption]
        const defaultOption = getDefaultValue(providerOptions)

        return (
            <Select
                list="provider"
                name="provider"
                placeholder={i18n._(t`Selecteer aanbieder`)}
                options={options}
                defaultValue={defaultOption}
                onChangeValue={option => {
                    setHasSelectedOther(option ? option.value === providerOtherOption.value : false)
                    onProviderChange?.(
                        option ? option.value === providerOtherOption.value : false,
                        option ? option.value : undefined
                    )
                }}
            />
        )
    }

    function renderNoteField() {
        return (
            <Field label={i18n._(t`Toelichting op verwijzing`)}>
                <TextArea
                    name="providerExplanation"
                    placeholder={i18n._(t`Toelichting`)}
                    defaultValue={participation?.providerExplanation ?? undefined}
                />
            </Field>
        )
    }

    function renderNameField() {
        return (
            <Field label={i18n._(t`Aanbieder`)} required={true}>
                <Input
                    name="providerOther"
                    placeholder={i18n._(t`Naam aanbieder`)}
                    defaultValue={participation?.providerOther || ''}
                />
            </Field>
        )
    }

    function getDefaultValue(options: DefaultSelectOption[]): DefaultSelectOption | undefined {
        if (participation?.providerOption === ParticipationProviderOption.Provider) {
            const option = options.find(p => p.value === participation.provider?.id)
            return option ? option : undefined
        }

        if (participation?.providerOption === ParticipationProviderOption.Other) {
            return providerOtherOption
        }
    }
}

export default ProviderInformationFieldset
