import { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { Select } from 'components/Core/DataEntry/Select'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { usePublicOrganizationsQuery, usePublicTeamsForOrganizationLazyQuery } from 'graphql/v2/generated/graphql'

export interface LanguageHouseFieldsetModel {
    languageHouse?: string
    team?: string
}

interface Props {
    isSelfRegistration?: boolean
}

const LanguageHouseFieldset: React.FC<Props> = ({ isSelfRegistration }) => {
    const { i18n } = useLingui()
    const [selectedLanguageHouseId, setSelectedLanguageHouseId] = useState<string>('')

    const {
        data: organizations,
        loading: organizationsLoading,
        error: organizationsError,
    } = usePublicOrganizationsQuery()

    const [getTeams, { data: _loadedTeams, loading: teamsLoading, error: teamsError }] =
        usePublicTeamsForOrganizationLazyQuery({
            variables: {
                organizationId: selectedLanguageHouseId,
            },
            fetchPolicy: 'no-cache',
        })

    const teamsForDropdown = selectedLanguageHouseId ? _loadedTeams?.publicTeamsForOrganization || [] : []

    useEffect(() => {
        if (selectedLanguageHouseId) {
            getTeams({
                variables: {
                    organizationId: selectedLanguageHouseId,
                },
            })
        }
    }, [selectedLanguageHouseId, getTeams])

    return (
        <Section
            title={i18n._(t`Taalhuis`)}
            description={
                isSelfRegistration
                    ? i18n._('Bij welk Taalhuis wilt u zich aanmelden?')
                    : i18n._('Bij welk Taalhuis wilt u de deelnemer aanmelden?')
            }
        >
            <Column spacing={4}>
                <Field label={i18n._(t`Taalhuis`)} horizontal={true} required={true}>
                    {renderLanguageHouseSelect()}
                </Field>
                {!isSelfRegistration && (
                    <Field label={i18n._('Team')} required={true} horizontal={true}>
                        {renderTeamSelect()}
                    </Field>
                )}
            </Column>
        </Section>
    )

    function renderLanguageHouseSelect() {
        return (
            // TODO: reduce limit and use with infinite scroll
            <PageQuery loading={organizationsLoading} error={organizationsError} data={organizations}>
                {() => (
                    <Select
                        name={'languageHouse'}
                        placeholder={i18n._(t`Selecteer Taalhuis...`)}
                        options={getOptions(organizations?.publicOrganizations ?? [])}
                        onChangeValue={option => setSelectedLanguageHouseId(option?.value ?? '')}
                    />
                )}
            </PageQuery>
        )
    }

    function renderTeamSelect() {
        if (!selectedLanguageHouseId) {
            return <Select disabled={true} name="team" options={[]} placeholder={i18n._('Selecteer vestiging...')} />
        }

        return (
            <PageQuery loading={teamsLoading} error={teamsError} data={teamsForDropdown}>
                {() => (
                    <Select
                        name="team"
                        options={getOptions(teamsForDropdown)}
                        placeholder={i18n._('Selecteer vestiging...')}
                    />
                )}
            </PageQuery>
        )
    }

    function getOptions(results: { id: string; name: string }[]) {
        return results.map(r => ({ label: r.name, value: r.id }))
    }
}

export default LanguageHouseFieldset
