import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import {
    LanguageHouseParticipantIntakeFieldsFormModel,
    ProviderParticipantIntakeFieldsFormModel,
    ParticipantIntakeFields,
} from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { createStudentFieldsMapper } from 'components/Domain/Participation/mappers/studentFieldsMapper'
import { ParticipantCreateRedirectModal } from 'components/Participants/ParticipantCreateRedirectModal'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useCreateStudentMutation } from 'graphql/v2/generated/graphql'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { Forms } from 'utils/forms'

interface Props {
    isProvider?: boolean
    routes: ReturnType<typeof languageHouseRoutes> | ReturnType<typeof providerRoutes>
}

export const ParticipantsCreateContainer: React.FunctionComponent<Props> = ({ isProvider = false, routes }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [studentId, setStudentId] = useState<string>()

    const sessionContext = useContext(SessionContext)
    const organisation = sessionContext.user?.currentEmployee?.organization

    const [createStudentMutation, { loading, error }] = useCreateStudentMutation({
        update(cache) {
            cache.evict({ fieldName: 'students' })
        },
    })

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Deelnemer `)}
                spacingType={SpacingType.default}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.languageHouse(sessionContext.organizationSlug).participants.overview,
                        ]}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.message}>
                <ParticipantIntakeFields
                    isProvider={isProvider}
                    disabledIntakeFields={organisation?.disabledIntakeFields}
                    showTeamSelectForEmployee={!isProvider ? sessionContext.user?.currentEmployee : undefined}
                />
            </MutationErrorProvider>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
            {renderRedirectModal()}
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<
            ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel
        >(e)

        const organisationId = organisation!.id!
        const input = createStudentFieldsMapper(formData, organisationId)

        try {
            const response = await createStudentMutation({
                variables: {
                    createStudentInput: input,
                },
            })

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de deelnemer`)
            )

            if (!isProvider && response.data?.createStudent.id) {
                // this will trigger the redirect modal to open
                setStudentId(response.data.createStudent.id)
            } else {
                history.push(routes.participants.detail(response.data?.createStudent.id).index)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }

    function renderRedirectModal() {
        if (!studentId) {
            return null
        }

        return (
            <Modal isOpen={true}>
                <ParticipantCreateRedirectModal studentId={studentId} />
            </Modal>
        )
    }
}
