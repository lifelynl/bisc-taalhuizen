import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { EmployeeQuery, useEditEmployeeMutation, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

import Headline from 'components/Chrome/Headline'

import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Space from 'components/Core/Layout/Space/Space'
import Modal from 'components/Core/Modal/Modal'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import {
    ProviderEmployeeFieldset,
    ProviderEmployeeFieldsetModel,
} from 'components/Domain/Shared/Fieldsets/ProviderEmployeeFieldset'
import { useIsVolunteer } from 'components/Domain/Shared/hooks/useIsVolunteer'
import { getMappedEditProviderEmployeeFormFields } from 'components/Domain/Shared/mappers/providerEmployeeFieldsMappers'
import CoworkerDeleteModalView from 'components/Domain/Shared/Modals/CoworkerDeleteModal'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ProviderManagementCoworkerDetailRouteParams } from 'routes/provider/providerRoutes'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useShowMergeWarning } from 'components/Domain/Shared/hooks/useShowMergeWarning'
import { UserMergeWarningModal } from 'components/Domain/Shared/Modals/UserMergeWarningModal'

export const ProviderManagementCoworkerEditView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [editEmployeeMutation, { loading: editLoading, error: editError }] = useEditEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
            cache.evict({ fieldName: 'employee' })
        },
    })
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const params = useParams<ProviderManagementCoworkerDetailRouteParams>()
    const providerEmployeeId = params.providerEmployeeId
    const {
        data: employeeQueryData,
        loading: isEmployeeQueryLoading,
        error: employeeQueryError,
    } = useEmployeeQuery({
        variables: {
            id: providerEmployeeId,
            withEducations: true,
        },
    })
    const { isVolunteer, handleOnFormChange } = useIsVolunteer(employeeQueryData?.employee.role)

    const {
        formRef,
        userEmailToMergeTo,
        openMergeModal,
        setOpenMergeModal,
        doesEmailExistResult,
        checkEmail,
        submitButtonActionProps,
        onMerge,
    } = useShowMergeWarning(employeeQueryData?.employee.person.email)

    const sessionContext = useContext(SessionContext)
    const { organizationSlug } = sessionContext

    return (
        <PageQuery loading={isEmployeeQueryLoading} error={employeeQueryError} data={employeeQueryData}>
            {renderPage}
        </PageQuery>
    )

    function renderPage({ employee }: EmployeeQuery) {
        return (
            <Form onRef={formRef} onSubmit={e => handleEdit(e, employee)} onChange={handleOnFormChange}>
                <Headline
                    title={NameFormatters.formattedFullname(employee.person)}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.provider(organizationSlug).management.overview,
                                breadcrumbItems.provider(organizationSlug).management.coworkers,
                            ]}
                        />
                    }
                />
                {renderSections(employee)}
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                danger={true}
                                icon={IconType.delete}
                                onClick={() => setModalIsVisible(true)}
                            >
                                {i18n._(t`Medewerker verwijderen`)}
                            </Button>
                        </Row>
                    }
                    RightComponent={
                        <Row>
                            <Button disabled={editLoading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button
                                type={ButtonType.primary}
                                {...submitButtonActionProps}
                                loading={editLoading || doesEmailExistResult.loading}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <CoworkerDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        coworkerId={providerEmployeeId}
                        coworkerName={employee.person.givenName}
                        onSuccess={() => {
                            history.push(routes.authorized.provider(organizationSlug).management.coworkers.index)
                        }}
                    />
                </Modal>
                <UserMergeWarningModal
                    open={openMergeModal}
                    onClose={() => setOpenMergeModal(false)}
                    newEmail={userEmailToMergeTo || ''}
                    loading={editLoading}
                    onConfirm={() =>
                        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                    }
                />
            </Form>
        )
    }

    function renderSections(employee: EmployeeQuery['employee']) {
        return (
            <MutationErrorProvider mutationError={editError?.message}>
                <ProviderEmployeeFieldset
                    onEmailChange={checkEmail}
                    readOnly={false}
                    isVolunteer={isVolunteer}
                    prefillData={employee}
                />
            </MutationErrorProvider>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>, employee: EmployeeQuery['employee']) {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<ProviderEmployeeFieldsetModel>(e)
            const editEmployeeInput = getMappedEditProviderEmployeeFormFields(data, employee)
            const response = await editEmployeeMutation({
                variables: { editEmployeeInput, withEducations: true },
            })
            if (!response || !response.data) {
                throw new Error()
            }
            NotificationsManager.success(
                i18n._(t`Medewerker is aange`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van de medewerker `)
            )
            await onMerge()

            history.push(
                routes.authorized.provider(organizationSlug).management.coworkers.detail(providerEmployeeId).index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
        }
    }
}
