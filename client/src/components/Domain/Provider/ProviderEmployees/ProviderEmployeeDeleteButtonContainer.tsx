import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext, useState } from 'react'

import Button, { ButtonType } from 'components/Core/Button/Button'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import Column from 'components/Core/Layout/Column/Column'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import Row from 'components/Core/Layout/Row/Row'
import { IconType } from 'components/Core/Icon/IconType'
import { useDeleteEmployeeMutation } from 'graphql/v2/generated/graphql'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {
    employeeId: string
    employeeName: string
    onSuccessfulDelete?: () => void
}

export const ProviderEmployeeDeleteButtonContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [isVisible, setIsVisible] = useState(false)
    const sessionContext = useContext(SessionContext)

    const [deleteEmployee, { loading }] = useDeleteEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    return (
        <>
            <Button
                type={ButtonType.quaternary}
                danger={true}
                icon={IconType.delete}
                loading={loading}
                onClick={() => setIsVisible(true)}
            >
                {i18n._(t`Medewerker verwijderen`)}
            </Button>
            <Modal isOpen={isVisible} onRequestClose={() => setIsVisible(false)}>
                <ModalView
                    onClose={() => setIsVisible(false)}
                    ContentComponent={renderContent()}
                    BottomComponent={renderButtons()}
                />
            </Modal>
        </>
    )

    function renderContent() {
        const { employeeName } = props
        const message = i18n._(
            'Weet je zeker dat je het medewerker wilt verwijderen? Deze medewerker zal geen toegang meer hebben tot de applicatie.'
        )

        return (
            <Column spacing={6}>
                <SectionTitle heading="H4" title={i18n._(t`Medewerker ${employeeName} verwijderen`)} />
                <Paragraph>{message}</Paragraph>
            </Column>
        )
    }

    function renderButtons() {
        return (
            <Row justifyContent="flex-end">
                <Button
                    type={ButtonType.secondary}
                    disabled={false /*deleteLoading*/}
                    onClick={() => setIsVisible(false)}
                >
                    {i18n._(t`Annuleren`)}
                </Button>
                <Button
                    danger={true}
                    type={ButtonType.primary}
                    icon={IconType.delete}
                    onClick={handleDelete}
                    loading={false /*deleteLoading*/}
                >
                    {i18n._(t`Verwijderen`)}
                </Button>
            </Row>
        )
    }

    async function handleDelete() {
        const { employeeId, onSuccessfulDelete } = props

        try {
            await deleteEmployee({
                variables: {
                    employeeId: employeeId,
                },
            })
            NotificationsManager.success(
                i18n._(t`Medewerker is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )
            setIsVisible(false)

            if (sessionContext.user?.person?.employees?.some(e => e.id === employeeId)) {
                sessionContext.refetch?.()
            }

            if (onSuccessfulDelete) {
                onSuccessfulDelete()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
