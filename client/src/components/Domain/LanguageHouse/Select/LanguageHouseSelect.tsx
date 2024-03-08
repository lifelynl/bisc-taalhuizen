import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import { OrganizationTypeEnum, useOrganizationsQuery } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props {
    name: string
}

export const LanguageHouseSelect: React.FunctionComponent<Props> = ({ name }) => {
    const { i18n } = useLingui()
    const variables = { variables: { type: OrganizationTypeEnum.LanguageHouse, paginationArgs: { skip: 0, take: 20 } } }
    const { data, loading, refetch } = useOrganizationsQuery(variables)

    return (
        <Field label={i18n._(t`Taalhuis`)} grow={true}>
            <Select<DefaultSelectOption>
                name={name}
                placeholder={i18n._(t`Selecteer Taalhuis...`)}
                options={getOptions(data?.organizations.nodes ?? [])}
                isLoading={loading}
                loadOptions={(val, cb) => loadOptions(val, cb)}
            />
        </Field>
    )

    async function loadOptions(_search: string, callback: (options: DefaultSelectOption[]) => void) {
        const response = await refetch(variables.variables)
        const newOptions = getOptions(response.data.organizations.nodes)
        callback(newOptions)
    }

    function getOptions(results: { id: string; name: string }[]) {
        return results.map(r => ({ label: r.name, value: r.id }))
    }
}
