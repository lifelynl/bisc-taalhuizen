import { i18n } from '@lingui/core'

import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'

interface MetaData {
    entity: string
    field: string
    value: string
}
export class EntityAlreadyExistsHandler {
    public constructor(private readonly graphQLError: GraphQLError) {
        this.handleEntityAlreadyExistsError()
    }

    private handleEntityAlreadyExistsError() {
        // @ts-ignore
        const metaData = this.graphQLError.extensions?.exception?.response?.metaData as unknown as MetaData

        NotificationsManager.error(`${metaData.value} bestaat al`, i18n._(`Vul een andere waarde in`))
    }
}
