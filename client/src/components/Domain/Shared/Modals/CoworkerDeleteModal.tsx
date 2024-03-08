import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Maybe, useDeleteEmployeeMutation } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'

interface Props {
    onClose: () => void
    coworkerId: string
    coworkerName?: Maybe<string>
    onSuccess: () => void
}

const CoworkerDeleteModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const { onClose, onSuccess, coworkerId, coworkerName } = props
    const [deleteEmployee, { loading }] = useDeleteEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
        },
    })

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={handleDelete}
            title={i18n._(t`Medewerker ${coworkerName} verwijderen`)}
            text={i18n._(t`
        Weet je zeker dat je het medewerker wilt verwijderen? Deze medewerker zal geen toegang meer hebben tot de applicatie.`)}
            loading={loading}
        />
    )

    async function handleDelete() {
        try {
            await deleteEmployee({
                variables: {
                    employeeId: coworkerId,
                },
                update(cache) {
                    cache.evict({ fieldName: 'organizationEmployees' })
                },
            })
            NotificationsManager.success(
                i18n._(t`Medewerker is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            if (sessionContext.user?.person?.employees?.some(e => e.id === coworkerId)) {
                sessionContext.refetch?.()
            }

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

export default CoworkerDeleteModalView
