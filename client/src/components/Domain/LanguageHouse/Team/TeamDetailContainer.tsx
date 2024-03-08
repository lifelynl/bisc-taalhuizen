import Column from 'components/Core/Layout/Column/Column'
import { TeamQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import { TeamDetailFields } from './TeamDetailFields'

interface Props {
    team: TeamQuery['team']
    onEditMembers: () => void
}

export const TeamDetailContainer: React.FunctionComponent<Props> = props => {
    const { team } = props

    return (
        <Column spacing={10}>
            <TeamDetailFields
                showTeamMembersTable={true}
                enableAddRemoveTeamMembers={true}
                team={team}
                readOnly={true}
            />
        </Column>
    )
}
