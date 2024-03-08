import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import Paragraph from 'components/Core/Typography/Paragraph'
import { OrganizationEmployeesForTeamQuery, useEditTeamMutation } from 'graphql/v2/generated/graphql'
import React, { useState } from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    organizationId: string
    teamId: string
    existingMemberIds: string[]
    teamMember: OrganizationEmployeesForTeamQuery['organizationEmployees']['nodes'][0]
}

export const RemoveTeamMemberButtonContainer: React.FunctionComponent<Props> = props => {
    const [modalOpen, setModalOpen] = useState(false)
    const { i18n } = useLingui()

    const [editTeam, editTeamMutation] = useEditTeamMutation({
        update(cache) {
            cache.evict({ fieldName: 'teams' })
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    return (
        <Row justifyContent="flex-end">
            <Button type={ButtonType.secondary} onClick={() => setModalOpen(true)}>
                <Icon type={IconType.close} />
            </Button>
            <ConfirmModal
                modalOpen={modalOpen}
                title={i18n._('Medewerker uit team halen')}
                message={
                    <Paragraph>
                        {i18n._('Weet je zeker dat je ')}
                        <strong>{NameFormatters.formattedFullname(props.teamMember.person)}</strong>
                        {i18n._(' uit het team wilt verwijderen?')}
                    </Paragraph>
                }
                confirmButtonLabel={i18n._('Uit team halen')}
                danger={true}
                loading={editTeamMutation.loading}
                onClose={() => setModalOpen(false)}
                onConfirm={handleRemove}
            />
        </Row>
    )

    async function handleRemove() {
        try {
            await editTeam({
                variables: {
                    input: {
                        teamId: props.teamId,
                        memberIds: props.existingMemberIds.filter(id => id !== props.teamMember.id),
                    },
                },
            })

            setModalOpen(false)

            NotificationsManager.success(
                i18n._(`Team is bijgewerkt`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
