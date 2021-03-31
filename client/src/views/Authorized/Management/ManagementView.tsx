import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { UserEnvironmentEnum } from '../../../generated/graphql'
import { ManagementAanbiederView } from './aanbieder/ManagementAanbiederView'
import { ManagementBiscView } from './bisc/ManagementBiscView'
import { ManagementTaalhuisView } from './taalhuis/ManagementTaalhuisView'

interface Props {}

export const ManagementView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.userEnvironment === UserEnvironmentEnum.Bisc) {
        return <ManagementBiscView />
    }

    if (userContext.user?.userEnvironment === UserEnvironmentEnum.Aanbieder) {
        return <ManagementAanbiederView />
    }

    if (userContext.user?.userEnvironment === UserEnvironmentEnum.Taalhuis) {
        return <ManagementTaalhuisView />
    }

    return null
}
