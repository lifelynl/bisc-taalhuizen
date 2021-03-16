import React, { FunctionComponent, useState } from 'react'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Center from '../../Core/Layout/Center/Center'
import { useMockQuery } from '../../hooks/useMockQuery'
import { UserContext } from './context'
import { userMock } from './mocks'
import { Type, User } from './types'

interface Props {}

export const UserProvider: FunctionComponent<Props> = props => {
    const { children } = props
    const { data, loading, error } = useMockQuery<User>(userMock)

    // This is temporary
    const [environment, setEnvironment] = useState(userMock.environment)

    return (
        <UserContext.Provider
            value={{
                loading: loading,
                error: error,
                user: data
                    ? {
                          ...data,
                          environment,
                      }
                    : null,
                changeEnvironment: (env: Type) => setEnvironment(env),
            }}
        >
            {renderContent()}
        </UserContext.Provider>
    )

    function renderContent() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        return children
    }
}
