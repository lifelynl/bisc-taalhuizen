import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Icon, { IconStyle } from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import { TableColumnAlignment } from 'components/Core/Table/TableRow'
import Paragraph from 'components/Core/Typography/Paragraph'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { ProvidersForLanguageHouseQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { biscRoutes } from 'routes/bisc/biscRoutes'

interface Props {
    readOnly?: boolean
    providers: ProvidersForLanguageHouseQuery['organizations']['nodes']
}

export interface LanguageHouseProvidersCheckboxFields {
    providers?: string[]
}

export const LanguageHouseProvidersTable: React.FC<Props> = ({ readOnly, providers }) => {
    const { i18n } = useLingui()
    const { organizationSlug } = useContext(SessionContext)

    return (
        <Table
            flex={[4, 1, 0.75]}
            headers={[
                { headerLabel: i18n._(`AANBIEDER`), field: 'name' },
                {
                    headerLabel: i18n._(`VERWEZEN DEELNEMERS`),
                    field: 'studentCount',
                    alignment: TableColumnAlignment.Right,
                },
                { headerLabel: i18n._(`BESCHIKBAAR`), field: 'isProvider', alignment: TableColumnAlignment.Right },
            ]}
            rows={getRows()}
            emptyMessage={i18n._(`Er zijn nog geen aanbieder`)}
        />
    )

    function getRows() {
        return providers.map(provider => [
            <TableLink to={biscRoutes(organizationSlug).providers.detail(provider.id).index} text={provider.name} />,
            <Paragraph>{provider.students?.length ?? 0}</Paragraph>,
            renderCheck(provider),
        ])
    }

    function renderCheck(provider: ProvidersForLanguageHouseQuery['organizations']['nodes'][0]) {
        if (readOnly) {
            if (provider.isLanguageHouseProvider) {
                return <Icon type={IconType.checkmark} iconStyle={IconStyle.Enabled} />
            }

            return <Icon type={IconType.close} iconStyle={IconStyle.Disabled} />
        }

        return (
            <Checkbox
                inline={true}
                value={provider.id}
                defaultChecked={!!provider.isLanguageHouseProvider}
                name={'providers[]'}
            />
        )
    }
}
