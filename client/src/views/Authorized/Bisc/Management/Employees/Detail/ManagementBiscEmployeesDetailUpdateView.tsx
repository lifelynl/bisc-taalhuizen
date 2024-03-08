import Headline from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Space from 'components/Core/Layout/Space/Space'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Forms } from 'utils/forms'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { getMappedBiscCoworkerFormFields } from 'components/Domain/Bisc/mappers/biscFieldsMappers'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscManagementCoworkerDetailRouteParams, biscRoutes } from 'routes/bisc/biscRoutes'
import BiscCoworkerDeleteModalView from './BiscCoworkerDeleteModal'
import {
    BiscCoworkersInformationFieldset,
    BiscCoworkersInformationFieldsetModel,
} from 'components/fieldsets/bisc/BiscCoworkersInformationFieldset'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { EmployeeQuery, useEditEmployeeMutation, useEmployeeQuery } from 'graphql/v2/generated/graphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { UserMergeWarningModal } from 'components/Domain/Shared/Modals/UserMergeWarningModal'
import { useShowMergeWarning } from 'components/Domain/Shared/hooks/useShowMergeWarning'

interface Props {}

export const ManagementBiscEmployeesDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { biscEmployeeId } = useParams<BiscManagementCoworkerDetailRouteParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const history = useHistory()
    const organizationId = sessionContext.user?.currentEmployee?.organization.id!
    const { loading, error, data } = useEmployeeQuery({ variables: { id: biscEmployeeId } })
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

    function renderPage(employeeObject: EmployeeQuery) {
        const { employee } = employeeObject

        return (
            <Form onRef={formRef} onSubmit={handleEdit(employee)}>
                <Headline
                    title={i18n._(t`Medewerker ${NameFormatters.formattedFullname(employee.person)}`)}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.bisc(organizationName).management.overview,
                                breadcrumbItems.bisc(organizationName).management.employees,
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
                            <Button disabled={loading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button
                                type={ButtonType.primary}
                                {...submitButtonActionProps}
                                loading={loading || doesEmailExistResult.loading}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <BiscCoworkerDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        coworkerId={biscEmployeeId}
                        coworkerName={employee.person.givenName}
                        onSuccess={() => {
                            history.push(biscRoutes(organizationName).management.coworkers.index)
                        }}
                    />
                </Modal>
                <UserMergeWarningModal
                    open={openMergeModal}
                    onClose={() => setOpenMergeModal(false)}
                    newEmail={userEmailToMergeTo || ''}
                    loading={editEmployeeMutation.loading}
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
            <MutationErrorProvider mutationError={editEmployeeMutation.error?.message}>
                <BiscCoworkersInformationFieldset
                    prefillData={{
                        'person.givenName': person.givenName,
                        'person.additionalName': person.additionalName,
                        'person.familyName': person.familyName,
                        'person.email': person.email,
                        'person.telephone': person.telephone,
                    }}
                    onEmailChange={checkEmail}
                />
            </MutationErrorProvider>
        )
    }

    function handleEdit(employee: EmployeeQuery['employee']) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const formData = Forms.getFormDataFromFormEvent<BiscCoworkersInformationFieldsetModel>(e)
            const input = getMappedBiscCoworkerFormFields(formData, organizationId, employee)

            try {
                await editEmployee({
                    variables: {
                        editEmployeeInput: {
                            id: biscEmployeeId,
                            person: {
                                id: biscEmployeeId,
                                familyName: input.person?.familyName,
                                additionalName: input.person?.additionalName,
                                givenName: input.person?.givenName,
                                email: input.person?.email,
                                telephone: input.person?.telephone,
                            },
                        },
                    },
                })

                NotificationsManager.success(i18n._(t`Medewerker is bijgewerkt`))
                await onMerge()

                history.push(biscRoutes(organizationName).management.coworkers.detail(employee.id).data.index)
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
