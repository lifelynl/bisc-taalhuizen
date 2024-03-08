import Form from 'components/Core/Form/Form'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Forms } from 'utils/forms'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import LanguageHouseCoworkersInformationFieldset, {
    LanguageHouseCoworkersInformationFieldsetModel,
} from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { getMappedLanguageHouseCoworkerFormFields } from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import CoworkerDeleteModalView from 'components/Domain/Shared/Modals/CoworkerDeleteModal'
import {
    LanguageHouseManagementCoworkerDetailRouteParams,
    languageHouseRoutes,
} from 'routes/languageHouse/languageHouseRoutes'
import { EmployeeQuery, EmployeeRole, useEditEmployeeMutation, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { UserMergeWarningModal } from 'components/Domain/Shared/Modals/UserMergeWarningModal'
import { useShowMergeWarning } from 'components/Domain/Shared/hooks/useShowMergeWarning'

export const ManagementLanguageHouseEmployeesDetailUpdateView: React.FunctionComponent = () => {
    const { languageHouseEmployeeId } = useParams<LanguageHouseManagementCoworkerDetailRouteParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!

    const { loading, error, data } = useEmployeeQuery({ variables: { id: languageHouseEmployeeId } })
    const [editEmployeeMutation, { loading: editLoading, error: mutateError }] = useEditEmployeeMutation({
        update(cache) {
            cache.evict({ fieldName: 'organizationEmployees' })
            cache.evict({ fieldName: 'employee' })
        },
    })

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

    return (
        <PageQuery loading={loading} error={error} data={data}>
            {renderPage}
        </PageQuery>
    )

    function renderPage(employeeObject: EmployeeQuery) {
        const { employee } = employeeObject

        return (
            <Form onRef={formRef} onSubmit={handleEdit(employee)}>
                {renderSections(employee)}
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
                            <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button
                                {...submitButtonActionProps}
                                type={ButtonType.primary}
                                loading={loading || editLoading || doesEmailExistResult.loading}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <CoworkerDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        coworkerId={languageHouseEmployeeId}
                        coworkerName={employee.person.givenName}
                        onSuccess={() => {
                            history.push(
                                languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.index
                            )
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
        const { person } = employee

        return (
            <MutationErrorProvider mutationError={mutateError?.message}>
                <LanguageHouseCoworkersInformationFieldset
                    prefillData={{
                        'person.givenName': person.givenName,
                        'person.additionalName': person.additionalName,
                        'person.familyName': person.familyName,
                        'person.email': person.email,
                        'person.telephone': person.telephone,
                        role: employee.role as EmployeeRole,
                        createdAt: employee.createdAt,
                        updatedAt: employee.updatedAt,
                    }}
                    onEmailChange={checkEmail}
                />
            </MutationErrorProvider>
        )
    }

    function handleEdit(employee: EmployeeQuery['employee']) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<LanguageHouseCoworkersInformationFieldsetModel>(e)
            const input = getMappedLanguageHouseCoworkerFormFields(formData, organizationId, employee)

            try {
                await editEmployeeMutation({
                    variables: {
                        editEmployeeInput: {
                            id: languageHouseEmployeeId,
                            person: {
                                id: employee.person.id,
                                familyName: input.person?.familyName,
                                additionalName: input.person?.additionalName,
                                givenName: input.person?.givenName,
                                email: input.person?.email,
                                telephone: input.person?.telephone,
                            },
                            employeeRole: input.role,
                        },
                    },
                })

                NotificationsManager.success(
                    i18n._(t`Medewerker is bijgewerkt`),
                    i18n._(t`Je wordt teruggestuurd naar het overzicht`)
                )

                await onMerge()

                history.push(
                    languageHouseRoutes(sessionContext.organizationSlug).management.coworkers.detail(employee.id).index
                )
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}
