import { useLingui } from '@lingui/react'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import { TeamType, useTeamsForDropdownQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import { OnChangeValue } from 'react-select'

interface Props {
    onSelect?: (team: Team | null) => void
    organizationId: string
    filterForEmployeeId?: string
    defaultValue?: Team | null
}

type Team = Pick<TeamType, 'id' | 'name'>

export const TeamSelect: React.FunctionComponent<Props> = ({
    onSelect,
    organizationId,
    filterForEmployeeId,
    defaultValue,
}) => {
    const { i18n } = useLingui()
    // TECH_DEBT: use paginated select component instead
    const variables = { variables: { organizationId, filterForEmployeeId, paginationArgs: { skip: 0, take: 100000 } } }
    const { data, loading, refetch } = useTeamsForDropdownQuery(variables)

    return (
        <Select<DefaultSelectOption>
            name="team"
            placeholder={i18n._('Selecteer vestiging...')}
            options={getOptions(data?.teams.nodes ?? [])}
            onChangeValue={handleChange}
            isLoading={loading}
            loadOptions={(val, cb) => loadOptions(val, cb)}
            defaultValue={getDefaultOption()}
        />
    )

    async function loadOptions(_search: string, callback: (options: DefaultSelectOption[]) => void) {
        const response = await refetch(variables.variables)
        const newOptions = getOptions(response.data?.teams.nodes || [])
        callback(newOptions)
    }

    function getOptions(results: { id: string; name: string }[]) {
        return results.filter(r => r.id !== defaultValue?.id).map(r => ({ label: r.name, value: r.id }))
    }

    function getDefaultOption() {
        if (!defaultValue) {
            return
        }

        return { label: defaultValue.name, value: defaultValue.id }
    }

    function handleChange(v?: OnChangeValue<DefaultSelectOption, false>) {
        if (!onSelect) {
            return
        }

        if (!v) {
            return onSelect(null)
        }

        return onSelect({ id: v.value as string, name: v.label as string })
    }
}
