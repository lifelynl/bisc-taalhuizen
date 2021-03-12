import React, { useContext } from 'react'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { Type } from '../../../components/Providers/UserProvider/types'
import { ReportsBiscView } from './bisc/ReportsBiscView'
import { ReportsTaalhuisView } from './taalhuis/ReportsTaalhuisView'

interface Props {}

export const ManagementView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.environment === Type.bisc) {
        return <ReportsBiscView />
    }

    if (userContext.user?.environment === Type.taalhuis) {
        return <ReportsTaalhuisView />
    }

    return null
}
