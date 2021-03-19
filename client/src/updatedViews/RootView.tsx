import React, { useContext } from 'react'
import { SessionContext } from '../components/Providers/SessionProvider/context'
import { UserContext } from '../components/Providers/UserProvider/context'
import { Type } from '../components/Providers/UserProvider/types'

export const RootView: React.FunctionComponent = () => {
    const context = useContext(SessionContext)
    const user = useContext(UserContext).user

    // if no session || no user
    if (!context.accesstoken || !user) {
        // TODO: return authorization view
        return null
    }

    // if user type is bisc
    if (user.environment === Type.bisc) {
        // TODO
        return null
    }

    // if user type is aanbieder
    if (user.environment === Type.aanbieder) {
        // TODO
        return null
    }

    // if user type is taalhuis
    if (user.environment === Type.taalhuis) {
        // TODO
        return null
    }

    // TODO: not found view (do we have one?)
    return null
}
