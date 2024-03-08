import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useDoesEmailExistLazyQuery } from 'graphql/v2/generated/graphql'
import { useContext, useRef, useState } from 'react'

export function useShowMergeWarning(previousEmail?: string | null) {
    const { user, logout } = useContext(SessionContext)

    const formRef = useRef<HTMLFormElement>()
    const [userEmailToMergeTo, setUserEmailToMergeTo] = useState<string | null>(null)
    const [openMergeModal, setOpenMergeModal] = useState<boolean>(false)
    const [doesEmailExist, doesEmailExistResult] = useDoesEmailExistLazyQuery()
    const submitButtonActionProps = userEmailToMergeTo ? { onClick: () => setOpenMergeModal(true) } : { submit: true }

    async function checkEmail(email: string) {
        email = email.trim()
        if (!email || email === previousEmail) {
            if (userEmailToMergeTo) {
                setUserEmailToMergeTo(null)
            }
            return
        }

        const response = await doesEmailExist({ variables: { email }, fetchPolicy: 'network-only' })
        if (response.data?.doesEmailExist) {
            setUserEmailToMergeTo(email)
        }
    }

    async function onMerge() {
        if (!userEmailToMergeTo) {
            return
        }

        const currentUserEmail = user?.person?.email
        const mergingSelfToAnotherUser = currentUserEmail === previousEmail && currentUserEmail !== userEmailToMergeTo

        if (!mergingSelfToAnotherUser) {
            return
        }

        // because we are merging current user, the token will be invalid after merge, and
        // we need to redirect to login page to let them login with the merged account
        await logout?.()
    }

    return {
        formRef,
        userEmailToMergeTo,
        openMergeModal,
        setOpenMergeModal,
        doesEmailExistResult,
        checkEmail,
        submitButtonActionProps,
        onMerge,
    }
}
