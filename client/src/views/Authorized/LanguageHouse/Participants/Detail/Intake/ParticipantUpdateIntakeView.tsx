import { ParticipantsUpdateIntakeContainer } from 'components/Participants/components/ParticipantsUpdateContainer/ParticipantsUpdateContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
    LanguageHouseParticipantsDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'

export const ParticipantsUpdateIntakeView: React.FunctionComponent = () => {
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const baseRoot = languageHouseRoutes(organizationSlug)

    return <ParticipantsUpdateIntakeContainer routes={baseRoot} studentId={languageHouseParticipantId} />
}
