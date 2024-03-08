import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import {
    LanguageHouseParticipantIntakeFieldsFormModel,
    ParticipantIntakeFields,
    ProviderParticipantIntakeFieldsFormModel,
} from 'components/Domain/Participation/Fields/ParticipantIntakeFields'
import { editStudentFieldsMapper } from 'components/Domain/Participation/mappers/studentFieldsMapper'
import { LanguageHouseDeleteParticipantButtonContainer } from 'components/Domain/LanguageHouse/Participants/LanguageHouseDeleteParticipantButtonContainer'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { OrganizationTypeEnum, useEditStudentMutation, useStudentForIntakeQuery } from 'graphql/v2/generated/graphql'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { providerRoutes } from 'routes/provider/providerRoutes'
import { languageHouseRoutes } from 'routes/languageHouse/languageHouseRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

interface Props {
    isProvider?: boolean
    routes: ReturnType<typeof languageHouseRoutes> | ReturnType<typeof providerRoutes>
    studentId: string
}

export const ParticipantsUpdateIntakeContainer: React.FunctionComponent<Props> = ({
    isProvider = false,
    routes,
    studentId,
}) => {
    const { i18n } = useLingui()
    const history = useHistory()

    const {
        data,
        loading: getStudentLoading,
        error: getStudentError,
    } = useStudentForIntakeQuery({ variables: { studentId } })

    const [editStudentMutation, { loading, error }] = useEditStudentMutation({
        update(cache) {
            cache.evict({ fieldName: 'students' })
        },
    })

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    if (getStudentLoading) {
        return (
            <Center grow={true}>
                <Spinner type={SpinnerAnimation.pageSpinner} />
            </Center>
        )
    }

    if (getStudentError || !data?.student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Column spacing={12}>
                <Headline
                    title={NameFormatters.formattedFullname(data?.student.person)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={
                                isProvider
                                    ? [breadcrumbItems.provider(organizationSlug).participants.overview]
                                    : [breadcrumbItems.languageHouse(organizationSlug).participants.overview]
                            }
                        />
                    }
                />
                <MutationErrorProvider mutationError={error?.message}>
                    <ParticipantIntakeFields
                        isProvider={isProvider}
                        student={data.student}
                        disabledIntakeFields={data.student.organization.disabledIntakeFields}
                    />
                </MutationErrorProvider>
                <Actionbar
                    LeftComponent={
                        <LanguageHouseDeleteParticipantButtonContainer
                            studentName={NameFormatters.formattedFullname(data?.student.person)}
                            studentId={studentId}
                            onSuccessDelete={() => {
                                if (sessionContext.user?.accessGroup === OrganizationTypeEnum.LanguageHouse) {
                                    history.push(languageHouseRoutes(organizationSlug).index)
                                } else if (sessionContext.user?.accessGroup === OrganizationTypeEnum.Provider) {
                                    history.push(providerRoutes(organizationSlug).index)
                                }
                            }}
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => history.goBack()}
                                disabled={getStudentLoading}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </Column>
        </Form>
    )

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<
            ProviderParticipantIntakeFieldsFormModel | LanguageHouseParticipantIntakeFieldsFormModel
        >(e)
        const input = editStudentFieldsMapper(formData, data!.student)

        try {
            await editStudentMutation({
                variables: {
                    editStudentInput: input,
                },
            })

            NotificationsManager.success(i18n._(t`Deelnemer is bijgewerkt`))

            history.push(routes.participants.detail(studentId).index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
