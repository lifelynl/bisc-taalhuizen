import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { OrganizationQuery, useDeleteOrganizationMutation } from 'graphql/v2/generated/graphql'

interface Props {
    onClose: () => void
    provider: OrganizationQuery['organization']
    onSuccess: () => void
}

export function DeleteModalView(props: Props) {
    const { i18n } = useLingui()
    const [deleteOrganizationMutation, { loading }] = useDeleteOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizations' })
        },
    })
    const { onClose, onSuccess, provider } = props

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Aanbieder ${provider.name} verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(
                            t`Weet je zeker dat je de aanbieder wil verwijderen? Hiermee worden ook alle onderliggende medewerkers en deelnemers verwijderd.`
                        )}
                    </Paragraph>
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} onClick={onClose}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button
                        danger={true}
                        type={ButtonType.primary}
                        icon={IconType.delete}
                        onClick={handleDelete}
                        loading={loading}
                    >
                        {i18n._(t`Verwijderen`)}
                    </Button>
                </>
            }
        />
    )

    async function handleDelete() {
        try {
            await deleteOrganizationMutation({
                variables: {
                    orgId: provider.id,
                },
                update(cache) {
                    cache.evict({ fieldName: 'organizations' })
                },
            })
            NotificationsManager.success(
                i18n._(t`Aanbieder is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )
            if (onSuccess) {
                onSuccess()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
