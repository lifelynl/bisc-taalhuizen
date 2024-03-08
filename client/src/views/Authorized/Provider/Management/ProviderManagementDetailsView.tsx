import { ProviderManagementDetailsContainer } from 'components/Domain/Provider/ProviderManagement/Containers/ProviderManagementDetailsContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export const ProviderManagementDetailsView: React.FunctionComponent<Props> = props => {
    const sessionContext = useContext(SessionContext)

    const organizationId = sessionContext.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return <ProviderManagementDetailsContainer organizationId={organizationId} />
}
