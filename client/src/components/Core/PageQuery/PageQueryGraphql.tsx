import { ApolloError } from '@apollo/client'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { EmptyState } from '../EmptyState/EmptyState'
import ErrorBlock from '../Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from '../Feedback/Spinner/Spinner'
import Center from '../Layout/Center/Center'

interface Props<T> {
    children: (data: T) => JSX.Element
    customErrorTitle?: string
    customErrorMessage?: string
    customEmptyMessage?: string
    loading: boolean
    error?: ApolloError
    data?: T
}

export function PageQuery<T>(props: Props<T>) {
    const { loading, error, data, children, customErrorMessage, customErrorTitle, customEmptyMessage } = props
    const { i18n } = useLingui()

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (error) {
        return (
            <ErrorBlock
                title={customErrorTitle || i18n._(t`Er ging iets fout`)}
                message={customErrorMessage || i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    if (!data) {
        return <EmptyState message={customEmptyMessage || i18n._('Er zijn nog geen gegevens')} />
    }

    return children(data)
}
