import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { ProviderEmployeeDeleteButtonContainer } from 'components/Domain/Provider/ProviderEmployees/ProviderEmployeeDeleteButtonContainer'
import React, { useContext } from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { biscRoutes, BiscProvidersDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { EmployeeQuery, PersonType, useEditEmployeeMutation, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import {
    ProviderEmployeeFieldset,
    ProviderEmployeeFieldsetModel,
} from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { getMappedEditProviderEmployeeFormFields } from 'components/Domain/Shared/mappers/providerEmployeeFieldsMappers'
import { useIsVolunteer } from 'components/Domain/Shared/hooks/useIsVolunteer'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { UserMergeWarningModal } from 'components/Domain/Shared/Modals/UserMergeWarningModal'
import { useShowMergeWarning } from 'components/Domain/Shared/hooks/useShowMergeWarning'

interface Props extends RouteComponentProps<BiscProvidersDetailCoworkersDetailRouteParams> {}

export const CoworkerDetailDataUpdateView: React.FunctionComponent<Props> = props => {
    const { providerId, providerEmployeeId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const { loading, error, data } = useEmployeeQuery({ variables: { id: providerEmployeeId, withEducations: true } })
    const { isVolunteer, handleOnFormChange } = useIsVolunteer(data?.employee.role)

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

    const {
        formRef,
        userEmailToMergeTo,
        openMergeModal,
        setOpenMergeModal,
        doesEmailExistResult,
        checkEmail,
        submitButtonActionProps,
        onMerge,
    } = useShowMergeWarning(data?.employee.person.email)

    const [editEmployee, editEmployeeMutation] = useEditEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
            cache.evict({ fieldName: 'employee' })
        },
    })

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage({ employee }: EmployeeQuery) {
        return (
            <>
                <Form onRef={formRef} onSubmit={e => handleUpdate(e, employee)} onChange={handleOnFormChange}>
                    <Headline
                        title={`${NameFormatters.formattedFullname(employee.person as PersonType)}`}
                        TopComponent={
                            <Breadcrumbs
                                breadcrumbItems={[
                                    breadcrumbItems.bisc(organizationName).providers.overview,
                                    breadcrumbItems
                                        .bisc(organizationName)
                                        .providers.detail.index(employee.organization.name, providerId),
                                    breadcrumbItems
                                        .bisc(organizationName)
                                        .providers.detail.coworkers.overview(providerId),
                                ]}
                            />
                        }
                    />
                    {renderForm(employee)}
                </Form>
            </>
        )
    }

    function renderForm(employee: EmployeeQuery['employee']) {
        return (
            <>
                <MutationErrorProvider mutationError={editEmployeeMutation.error?.message}>
                    <ProviderEmployeeFieldset
                        onEmailChange={checkEmail}
                        prefillData={employee}
                        isVolunteer={isVolunteer}
                    />
                </MutationErrorProvider>
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <ProviderEmployeeDeleteButtonContainer
                            employeeId={providerEmployeeId}
                            employeeName={NameFormatters.formattedFullname(employee.person)}
                            onSuccessfulDelete={() =>
                                history.push(biscRoutes(organizationName).providers.detail(providerId).coworkers.index)
                            }
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() =>
                                    history.push(
                                        biscRoutes(organizationName)
                                            .providers.detail(providerId)
                                            .coworkers.detail(providerEmployeeId).data.index
                                    )
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button
                                type={ButtonType.primary}
                                {...submitButtonActionProps}
                                loading={editEmployeeMutation.loading || doesEmailExistResult.loading}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <UserMergeWarningModal
                    open={openMergeModal}
                    onClose={() => setOpenMergeModal(false)}
                    newEmail={userEmailToMergeTo || ''}
                    loading={editEmployeeMutation.loading}
                    onConfirm={() =>
                        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                    }
                />
            </>
        )
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>, employee: EmployeeQuery['employee']) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ProviderEmployeeFieldsetModel>(e)
        const editEmployeeInput = getMappedEditProviderEmployeeFormFields(formData, employee)

        try {
            await editEmployee({ variables: { editEmployeeInput } })

            NotificationsManager.success(
                i18n._(t`Medewerker is bijgewerkt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            await onMerge()

            history.push(biscRoutes(organizationName).providers.detail(providerId).coworkers.detail(employee.id).index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
