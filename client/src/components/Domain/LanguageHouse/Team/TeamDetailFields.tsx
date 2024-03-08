import { t } from '@lingui/macro'
import React, { useContext, useEffect } from 'react'
import Section from 'components/Core/Field/Section'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TeamPostcodeField } from '../Fields/TeamPostcodeField'
import { TeamMembersTable } from './TeamMembersTable'
import { SectionTitleWithBorder } from 'components/Core/Field/SectionTitleWithBorder'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Row from 'components/Core/Layout/Row/Row'
import { AddTeamMembersButtonContainer } from './AddTeamMembersButtonContainer'
import Input from 'components/Core/DataEntry/Input'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { TeamQuery, useOrganizationEmployeesForTeamLazyQuery, useOrganizationQuery } from 'graphql/v2/generated/graphql'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'

interface Props {
    team?: TeamQuery['team']
    readOnly?: boolean
    showTeamMembersTable?: boolean
    enableAddRemoveTeamMembers?: boolean
}

interface TeamDetailField {
    code: number
}

//TODO remove when we update detail types
export type TeamDetailFormFields = TeamDetailField & { name: string; codes: string[] }

export const TeamDetailFields: React.FunctionComponent<Props> = (props: Props) => {
    const { i18n } = useLingui()

    const organizationId = useContext(SessionContext).user?.currentEmployee?.organization.id!

    const organizationQuery = useOrganizationQuery({
        variables: {
            input: organizationId,
        },
    })

    const [getMembers, membersQuery] = useOrganizationEmployeesForTeamLazyQuery()

    useEffect(() => {
        if (props.team) {
            getMembers({
                variables: {
                    paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
                    organizationId: organizationId,
                    teamId: props.team.id,
                },
            })
        }
    }, [props.team, getMembers, organizationId])

    return (
        <>
            <Section title={i18n._(`Gegevens`)}>
                <Field label={i18n._(`Teamnaam`)} horizontal={true} required={true} readOnly={props.readOnly}>
                    {renderNameInput()}
                </Field>
            </Section>
            <HorizontalRule />
            {organizationQuery.error ? (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            ) : organizationQuery.loading ? (
                <Spinner type={SpinnerAnimation.simpleSpinner} />
            ) : (
                <TeamPostcodeField
                    defaultValues={props.team?.postalCodeAreas}
                    readOnly={props.readOnly}
                    errorPath="team_postalCodes(\[[0-9]+\])?(\.code)?"
                    options={(organizationQuery.data?.organization.postalCodes || []).map((code: any) => {
                        return {
                            label: code.code.toString(),
                            value: code.id,
                        }
                    })}
                />
            )}
            {props.showTeamMembersTable === true && renderMembersSection()}
        </>
    )

    function renderNameInput() {
        if (props.readOnly) {
            return <Paragraph>{props.team?.name}</Paragraph>
        }

        return <Input name="name" errorPath="name" placeholder={i18n._('Naam team')} defaultValue={props.team?.name} />
    }

    function renderMembersSection() {
        if (!props.team) {
            return
        }

        const currentTeamMembers = membersQuery.data?.organizationEmployees.nodes || []

        return (
            <>
                <HorizontalRule />
                <Row justifyContent="space-between">
                    <SectionTitleWithBorder title={i18n._(`Teamleden`)} />
                    {props.team && props.enableAddRemoveTeamMembers && (
                        <AddTeamMembersButtonContainer
                            teamId={props.team.id}
                            existingMemberIds={currentTeamMembers.map(m => m.id)}
                        />
                    )}
                </Row>
                <InfiniteScroll
                    hasMore={membersQuery?.data?.organizationEmployees.hasMore ?? false}
                    loadMore={paginationArgs =>
                        membersQuery.fetchMore({
                            variables: {
                                paginationArgs,
                            },
                        })
                    }
                >
                    <TeamMembersTable
                        organizationId={organizationId}
                        teamId={props.team.id}
                        enableRemoveTeamMembers={props.enableAddRemoveTeamMembers}
                        teamMembers={currentTeamMembers}
                    />
                </InfiniteScroll>
            </>
        )
    }
}
