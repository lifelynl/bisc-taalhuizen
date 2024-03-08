import React from 'react'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { EducationGroupStatus } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { ProviderGroupsOverviewContainer } from 'components/Domain/Provider/ProviderGroups/ProviderGroupsOverviewContainer'

export const FutureGroupsOverviewView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id
    if (!organizationId) {
        return null
    }

    return <ProviderGroupsOverviewContainer organizationId={organizationId} status={EducationGroupStatus.Future} />
}
