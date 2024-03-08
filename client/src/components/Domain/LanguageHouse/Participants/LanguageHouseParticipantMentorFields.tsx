import { useLingui } from '@lingui/react'
import { Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    OrganizationEmployeesForDropdownQuery,
    StudentForMentorQuery,
    TeamsForDropdownQuery,
    useOrganizationEmployeesForDropdownLazyQuery,
    useTeamsForDropdownQuery,
} from 'graphql/v2/generated/graphql'
import React, { useEffect, useState } from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    readOnly?: true
    student: StudentForMentorQuery['student']
}

export interface LanguageHouseParticipantMentorFormFields {
    team?: string
    mentor?: string
}

export const LanguageHouseParticipantMentorFields: React.FunctionComponent<Props> = props => {
    const { readOnly, student } = props
    const { i18n } = useLingui()
    const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>(student.team?.id)

    const teamsQuery = useTeamsForDropdownQuery({
        variables: {
            organizationId: student.organization.id,
            paginationArgs: { skip: 0, take: 100 }, // TODO make paginatable
        },
    })

    const [getMentors, mentorsQuery] = useOrganizationEmployeesForDropdownLazyQuery()

    useEffect(() => {
        if (selectedTeamId) {
            getMentors({
                variables: {
                    organizationId: student.organization.id,
                    teamId: selectedTeamId,
                    paginationArgs: { skip: 0, take: 100 }, // TODO make paginatable
                },
                fetchPolicy: 'no-cache',
            })
        }
    }, [selectedTeamId, student, getMentors])

    const paginatedMentors =
        selectedTeamId && !mentorsQuery.loading ? mentorsQuery.data?.organizationEmployees : undefined

    return (
        <Section title={i18n._('Begeleiding')}>
            <Column spacing={4}>
                <Field readOnly={readOnly} label={i18n._('Team')} horizontal={true} required={true}>
                    {renderTeamField()}
                </Field>
                <Field readOnly={readOnly} label={i18n._('Begeleider')} horizontal={true} required={true}>
                    {renderMemberField()}
                </Field>
            </Column>
        </Section>
    )

    function renderTeamField() {
        if (readOnly) {
            return <Paragraph>{student.team?.name}</Paragraph>
        }

        if (teamsQuery.loading) {
            return <Select key="loading" isClearable={false} isLoading={true} options={[]} />
        }

        const teamOptions = teamsQuery.data?.teams.nodes ? getTeamOptions(teamsQuery.data.teams.nodes) : []
        const defaultTeamOption = teamOptions.find(t => t.value === student.team?.id)

        return (
            <Select
                isClearable={false}
                name="team"
                isLoading={teamsQuery.loading}
                options={teamOptions}
                defaultValue={defaultTeamOption}
                onChangeValue={option => setSelectedTeamId(option?.value)}
            />
        )
    }

    function renderMemberField() {
        if (readOnly) {
            const name = student.mentor ? NameFormatters.formattedFullname(student.mentor.person) : ''

            return <Paragraph>{name}</Paragraph>
        }

        if (!selectedTeamId) {
            return <Select key="mentors-disabled" disabled={true} isClearable={false} options={[]} />
        }

        if (mentorsQuery.loading) {
            return <Select key="mentors-loading" isClearable={false} isLoading={true} options={[]} />
        }

        const mentorOptions = paginatedMentors?.nodes ? getMentorOptions(paginatedMentors.nodes) : []
        const defaultMentorOption = mentorOptions.find(m => m.value === student.mentor?.id)

        return (
            <Select
                // React-Select cannot deal with changing defaultValue.
                // And since the defaultMentorOption becomes undefined when changing the team,
                // we want to have a fresh remount. That is why we use a key that contains the defaultMentorOption
                key={`mentor-${defaultMentorOption?.value}`}
                isClearable={false}
                name="mentor"
                isLoading={mentorsQuery.loading}
                options={mentorOptions}
                defaultValue={defaultMentorOption}
            />
        )
    }

    function getTeamOptions(teams: TeamsForDropdownQuery['teams']['nodes']) {
        return teams.map(team => ({ label: team.name, value: team.id }))
    }

    function getMentorOptions(employees: OrganizationEmployeesForDropdownQuery['organizationEmployees']['nodes']) {
        return employees.map(employee => ({
            label: NameFormatters.formattedFullname(employee.person),
            value: employee.id,
        }))
    }
}
