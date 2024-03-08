import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Icon, { IconStyle } from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import { TableColumnAlignment } from 'components/Core/Table/TableRow'

import { SessionContext } from 'components/Providers/SessionProvider/context'
import { TeamsQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

interface Props {
    readOnly?: boolean
    teams: Team[]
}

type Team = TeamsQuery['teams']['nodes'][0]

export interface TeamsVisibilityCheckboxFields {
    teams?: string[]
}

export const TeamsVisibilityTable: React.FC<Props> = ({ readOnly, teams }) => {
    const { i18n } = useLingui()
    const { organizationSlug } = useContext(SessionContext)

    return (
        <Table
            flex={[5, 2]}
            headers={[
                { headerLabel: i18n._(`TEAM`), field: 'name' },
                {
                    headerLabel: i18n._(`ZICHTBAAR IN AANMELDFORMULIER`),
                    field: 'isPublic',
                    alignment: TableColumnAlignment.Right,
                },
            ]}
            rows={getRows()}
            emptyMessage={i18n._(`Er zijn nog geen aanbieder`)}
        />
    )

    function getRows() {
        return teams.map(team => [
            <TableLink to={languageHouseRoutes(organizationSlug).teams.detail(team.id).index} text={team.name} />,
            renderCheck(team),
        ])
    }

    function renderCheck(team: Team) {
        if (readOnly) {
            if (!team.hiddenFromPublic) {
                return <Icon type={IconType.checkmark} iconStyle={IconStyle.Enabled} />
            }

            return <Icon type={IconType.close} iconStyle={IconStyle.Disabled} />
        }

        return <Checkbox inline={true} value={team.id} defaultChecked={!team.hiddenFromPublic} name={'teams[]'} />
    }
}
