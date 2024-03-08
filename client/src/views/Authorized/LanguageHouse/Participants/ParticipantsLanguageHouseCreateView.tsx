import React, { useContext } from 'react'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { ParticipantsCreateContainer } from '../../../../components/Participants/components/ParticipantsCreateContainer/ParticipantsCreateContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'

interface Props {}

export const ParticipantsLanguageHouseCreateView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    const baseRoot = languageHouseRoutes(organizationSlug)

    return <ParticipantsCreateContainer routes={baseRoot} />
}
