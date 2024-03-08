import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { OwnProfileFields, OwnProfileFieldsFormModel } from 'components/Domain/Participation/Fields/OwnProfileFields'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import React, { useContext } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { PersonType, useChangePasswordMutation, useCurrentUserQuery } from '../../../graphql/v2/generated/graphql'

interface Props extends RouteComponentProps {}

export const ProfileUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const user = useContext(SessionContext).user
    const history = useHistory()

    const [changePasswordMutation, { loading, error }] = useChangePasswordMutation()
    const { data: fetchedUser } = useCurrentUserQuery()

    if (!user || !fetchedUser) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline title={NameFormatters.formattedFullname(user.person as unknown as Partial<PersonType>)} />
            <MutationErrorProvider mutationError={error?.message}>
                <OwnProfileFields />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!user) {
            NotificationsManager.success(i18n._(t`Actie mislukt`))
            return
        }

        const formData = Forms.getFormDataFromFormEvent<OwnProfileFieldsFormModel>(e)

        try {
            const organizationId = user?.currentEmployee?.organization.id

            if (!organizationId) {
                throw Error('organization does not have an id')
            }

            await changePasswordMutation({
                variables: {
                    oldPassword: formData.currentPassword,
                    newPassword: formData.password,
                },
            })

            NotificationsManager.success(i18n._(t`Wachtwoord is gewijzigd`))

            history.push(routes.authorized.profile.index)
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(error)
            }
        }
    }
}
