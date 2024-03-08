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
import { OrganizationType, useDeleteOrganizationMutation } from 'graphql/v2/generated/graphql'

interface Props {
    onClose: () => void
    languageHouse: Pick<OrganizationType, 'id' | 'name'>
    onSuccess: () => void
}

const LanguageHouseDeleteModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { onClose, onSuccess, languageHouse } = props

    const [deleteOrganizationMutation, { loading }] = useDeleteOrganizationMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizations' })
        },
    })

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Taalhuis ${languageHouse.name} verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je het taalhuis wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.`)}
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
                    orgId: props.languageHouse.id,
                },
                update(cache) {
                    cache.evict({ fieldName: 'organizations' })
                },
            })
            NotificationsManager.success(
                i18n._(t`Taalhuis is verwijderd`),
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

export default LanguageHouseDeleteModalView
