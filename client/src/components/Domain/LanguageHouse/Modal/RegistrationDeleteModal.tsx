import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useHistory } from 'react-router-dom'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { useRejectRegistrationMutation } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'

interface Props {
    studentName: string
    studentId: string
    onClose: () => void
}

export const RegistrationDeleteModal: React.FC<Props> = props => {
    const { studentName, studentId, onClose } = props
    const history = useHistory()
    const { i18n } = useLingui()

    const [rejectRegistrationMutation, { loading: rejectStudentLoading }] = useRejectRegistrationMutation({
        update(cache) {
            cache.evict({ fieldName: 'students' })
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <DeleteModal
            onClose={onClose}
            handleDelete={handleDelete}
            title={i18n._(t`Aanmelding van ${studentName} verwijderen?`)}
            text={i18n._(t`
        Weet je zeker dat je de aanmelding wil verwijderen?`)}
            loading={rejectStudentLoading}
        />
    )

    async function handleDelete() {
        try {
            await rejectRegistrationMutation({
                variables: {
                    studentId,
                },
            })

            NotificationsManager.success(
                i18n._(t`Registratie is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(languageHouseRoutes(organizationSlug).participants.registrations.index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
