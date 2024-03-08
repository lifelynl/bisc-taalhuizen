import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { ConfirmModal } from 'components/Core/Modal/ConfirmModal'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TeamQuery, useDeleteTeamMutation } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props {
    team: TeamQuery['team']
    modalOpen: boolean
    onClose: () => void
    onDelete: () => void
}

export const TeamDeleteModalContainer: React.FunctionComponent<Props> = props => {
    const { team, modalOpen, onClose } = props

    const { i18n } = useLingui()

    const [deleteTeamMutation, { loading }] = useDeleteTeamMutation({
        update(cache) {
            cache.evict({ fieldName: 'teams' })
        },
    })

    return (
        <ConfirmModal
            modalOpen={modalOpen}
            title={i18n._('Team opheffen')}
            message={
                <Paragraph>
                    {i18n._('Weet je zeker dat je het team ')}
                    <strong>{team.name}</strong>
                    {i18n._(' wilt opheffen?')}
                </Paragraph>
            }
            confirmButtonLabel={i18n._('Team opheffen')}
            danger={true}
            loading={loading}
            onClose={onClose}
            onConfirm={handleDelete}
        />
    )

    async function handleDelete() {
        try {
            await deleteTeamMutation({
                variables: {
                    input: {
                        id: props.team.id,
                    },
                },
                update(cache) {
                    cache.evict({ fieldName: 'teams' })
                },
            })

            NotificationsManager.success(
                i18n._(`Team is verwijderd`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            props.onDelete()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(
                    i18n._(`Actie mislukt`),
                    error.message || i18n._(`Er is een onverwachte fout opgetreden`)
                )
            }
        }
    }
}
