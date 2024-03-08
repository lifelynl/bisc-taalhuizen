import { ParticipantsUpdateIntakeContainer } from 'components/Participants/components/ParticipantsUpdateContainer/ParticipantsUpdateContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams, providerRoutes } from 'routes/provider/providerRoutes'

export const ParticipantsUpdateIntakeView: React.FunctionComponent = () => {
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const baseRoot = providerRoutes(organizationSlug)

    return <ParticipantsUpdateIntakeContainer isProvider={true} routes={baseRoot} studentId={studentId} />
}
