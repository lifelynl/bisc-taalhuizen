import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { Table } from 'components/Core/Table/Table'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import Paragraph from 'components/Core/Typography/Paragraph'
import { RemoveTeamMemberButtonContainer } from './RemoveTeamMemberButtonContainer'
import { OrganizationEmployeesForTeamQuery, OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    organizationId: string
    teamId: string
    enableRemoveTeamMembers?: boolean
    teamMembers: OrganizationEmployeesForTeamQuery['organizationEmployees']['nodes']
}

export const TeamMembersTable: React.FunctionComponent<Props> = props => {
    const { teamMembers, enableRemoveTeamMembers } = props
    const { i18n } = useLingui()

    return (
        <Table
            flex={1}
            lastItemIsIcon={true}
            headers={[
                { headerLabel: i18n._(`Achternaam`), field: 'lastName' },
                { headerLabel: i18n._(`Roepnaam`), field: 'firstName' },
                { headerLabel: i18n._(`Rol`), field: 'role' },
                { headerLabel: '', field: 'icon' },
            ]}
            rows={teamMembers.map(renderRow)}
            emptyMessage={i18n._(t`Er zijn nog geen teamleden`)}
        />
    )

    function renderRow(member: OrganizationEmployeesForTeamQuery['organizationEmployees']['nodes'][0]) {
        return [
            <Paragraph>{(member.person && NameFormatters.formattedLastName(member.person)) || '-'}</Paragraph>,
            <Paragraph>{member.person.givenName}</Paragraph>,
            member.role ? (
                <RoleLabelTag organizationType={OrganizationTypeEnum.LanguageHouse} role={member.role} />
            ) : (
                <></>
            ),
            enableRemoveTeamMembers ? (
                <RemoveTeamMemberButtonContainer
                    organizationId={props.organizationId}
                    teamId={props.teamId}
                    teamMember={member}
                    existingMemberIds={teamMembers.map(m => m.id)}
                />
            ) : (
                <></>
            ),
        ]
    }
}
