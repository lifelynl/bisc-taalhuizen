import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { LearningNeedQuery, useDeleteLearningNeedMutation } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'

interface Props {
    onClose: () => void
    onDelete?: () => void
    onDeleteSuccess: () => void
    learningNeed: LearningNeedQuery['learningNeed']
}

export const DeleteLearningNeedModal: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { onClose, learningNeed, onDeleteSuccess } = props

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const [deleteLearningNeedMutation, { loading, error }] = useDeleteLearningNeedMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeeds' })
        },
    })

    return (
        <MutationErrorProvider mutationError={error?.message}>
            <DeleteModal
                onClose={onClose}
                handleDelete={handleDelete}
                title={i18n._(t`Leervraag verwijderen`)}
                text={i18n._(t`
             Weet je zeker dat je de leervraag ${learningNeed.description} wilt verwijderen?`)}
                loading={loading}
            />
        </MutationErrorProvider>
    )

    async function handleDelete() {
        try {
            await deleteLearningNeedMutation({
                variables: {
                    learningNeedId: learningNeed.id,
                },
            })

            NotificationsManager.success(
                i18n._(t`Leervraag is verwijderd`),
                i18n._(t`Je wordt doorgestuurd naar het overzicht`)
            )

            history.push(
                languageHouseRoutes(organizationSlug).participants.detail(learningNeed.student.id).data.learningNeeds
                    .index
            )

            onDeleteSuccess()
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(error)
            }
        }
    }
}
