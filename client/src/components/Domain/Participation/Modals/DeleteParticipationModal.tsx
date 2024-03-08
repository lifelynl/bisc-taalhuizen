import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DeleteModal } from 'components/Core/Modal/DeleteModal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useEditParticipationMutation } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
    ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams,
    providerRoutes,
} from 'routes/provider/providerRoutes'

interface Props {
    onClose: () => void
    onDelete?: () => void
    onDeleteSuccess: () => void
}

export const DeleteParticipationModal: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { onClose, onDeleteSuccess } = props

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const { learningNeedId, providerParticipantId, referralId } =
        useParams<ProviderParticipantDetailLearningNeedsDetailReferralsDetailRouteParams>()

    const [editParticipation, editParticipationMutation] = useEditParticipationMutation({
        update(cache) {
            cache.evict({ fieldName: 'learningNeed' })
            cache.evict({ fieldName: 'learningNeeds' })
            cache.evict({ fieldName: 'participation' })
            cache.evict({ fieldName: 'participations' })
            cache.evict({ fieldName: 'providerStudents' })
        },
    })

    return (
        <MutationErrorProvider mutationError={editParticipationMutation.error?.message}>
            <DeleteModal
                onClose={onClose}
                handleDelete={handleDelete}
                title={i18n._(t`Deelname verwijderen`)}
                text={i18n._(t`Weet je zeker dat je de deelname wilt verwijderennnn?`)}
                loading={editParticipationMutation.loading}
            />
        </MutationErrorProvider>
    )

    async function handleDelete() {
        try {
            await editParticipation({ variables: { input: { id: referralId, educationGroup: null, mentor: null } } })

            NotificationsManager.success(
                i18n._(t`Deelname is verwijderd`),
                i18n._(t`Je wordt doorgestuurd naar het overzicht`)
            )

            history.push(
                providerRoutes(organizationSlug)
                    .participants.detail(providerParticipantId)
                    .data.learningNeeds.detail(learningNeedId).index
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
