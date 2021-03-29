import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import ModalView from '../../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../routes/routes'
import { RegistrationsMock, taalhuisRegistrationsCreateResponse } from '../../../mocks/registrations'

interface Props {
    registrationName: string
    registrationId: string
    onClose: () => void
}

export const RegistrationDeleteModal: React.FC<Props> = ({ registrationName, registrationId, onClose }) => {
    const history = useHistory()
    const [taalhuisRegistrationDelete, { loading, error, data }] = useMockMutation<RegistrationsMock, {}>(
        taalhuisRegistrationsCreateResponse,
        false
    )

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Aanmelding ${registrationName} verwijderen`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je de aanmelding wil verwijderen? Hiermee worden ook alle onderliggende
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
            await taalhuisRegistrationDelete(taalhuisRegistrationsCreateResponse)

            if (error) {
                NotificationsManager.error(
                    i18n._(t`Wij konden de gegevens niet verwijderen, probeer het opnieuw`),
                    i18n._(t`Probeer het later opnieuw`)
                )
                return
            }

            if (data) {
                NotificationsManager.success(
                    i18n._(t`Aanmelder is verwijderd`),
                    i18n._(t`Je wordt teruggestuurd naar de overzichtspagina`)
                )
                history.push(routes.authorized.participants.taalhuis.registrations.overview)
            }
        } catch (e) {
            NotificationsManager.error(
                i18n._(t`Wij konden de gegevens niet verwijderen, probeer het opnieuw`),
                i18n._(t`Probeer het later opnieuw`)
            )
            return
        }
    }
}
