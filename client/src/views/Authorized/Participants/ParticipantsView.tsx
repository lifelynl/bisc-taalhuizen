import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { Type } from '../../../components/Providers/UserProvider/types'
import { ParticipantTaalhuisView } from './taalhuis/ParticipantsTaalhuisView'

interface Props {}

export const ParticipantsView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.environment === Type.aanbieder) {
        return <ParticipantTaalhuisView />
    }

    return null
}
