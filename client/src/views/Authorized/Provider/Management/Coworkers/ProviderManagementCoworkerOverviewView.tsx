import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { ProviderManagementCoworkersOverviewContainer } from '../../../../../components/Domain/Provider/ProviderManagement/Containers/ProviderManagementCoworkersOverviewContainer'

export const ProviderManagementCoworkerOverviewView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return <ProviderManagementCoworkersOverviewContainer organizationId={organizationId} />
}
