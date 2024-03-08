import React, { useContext } from 'react'
import { ParticipantsCreateContainer } from 'components/Participants/components/ParticipantsCreateContainer/ParticipantsCreateContainer'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const ParticipantsProviderCreateView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const baseRoot = providerRoutes(organizationSlug)
    return <ParticipantsCreateContainer isProvider={true} routes={baseRoot} />
}
