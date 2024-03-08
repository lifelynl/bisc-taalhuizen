import Headline from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import LanguageHouseCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/LanguageHouses/Breadcrumbs/LanguageHouseCoworkersDetailBreadcrumbs'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BiscLanguageHousesDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Space from 'components/Core/Layout/Space/Space'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import CoworkerDeleteModalView from '../../../../../../../components/Domain/Shared/Modals/CoworkerDeleteModal'
import { routes } from 'routes/routes'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Forms } from 'utils/forms'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import LanguageHouseCoworkersInformationFieldset, {
    LanguageHouseCoworkersInformationFieldsetModel,
} from 'components/fieldsets/languageHouse/LanguageHouseCoworkersInformationFieldset'
import { getMappedLanguageHouseCoworkerFormFields } from 'components/Domain/LanguageHouse/mappers/languageHouseFieldsMappers'
import { NameFormatters } from 'utils/formatters/name/Name'
import {
    EmployeeQuery,
    EmployeeRole,
    OrganizationType,
    useEditEmployeeMutation,
    useEmployeeQuery,
} from 'graphql/v2/generated/graphql'
import { PageQuery } from 'components/Core/PageQuery/PageQueryGraphql'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { useShowMergeWarning } from 'components/Domain/Shared/hooks/useShowMergeWarning'
import { UserMergeWarningModal } from 'components/Domain/Shared/Modals/UserMergeWarningModal'

interface Props {
    organization: OrganizationType
}

const CoworkersDetailUpdateView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const { languageHouseId, languageHouseEmployeeId } = useParams<BiscLanguageHousesDetailCoworkersDetailRouteParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()

    const { loading, error, data } = useEmployeeQuery({ variables: { id: languageHouseEmployeeId } })

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

    const sessionContext = useContext(SessionContext)
    const { organizationSlug: organizationName } = sessionContext

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
                        <LanguageHouseCoworkersDetailBreadcrumbs
                            languageHouseId={languageHouseId}
                            languageHouseName={organization.name}
                            organizationSlug={organizationName}
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
                                loading={editEmployeeMutation.loading || doesEmailExistResult.loading}
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
                                routes.authorized.bisc(organizationName).languageHouses.detail(languageHouseId)
                                    .coworkers.index
                            )
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
            const input = getMappedLanguageHouseCoworkerFormFields(formData, languageHouseId, employee)

            try {
                await editEmployee({
                    variables: {
                        editEmployeeInput: {
                            id: employee.id,
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

                NotificationsManager.success(i18n._(t`Medewerker is bijgewerkt`))
                await onMerge()

                history.push(
                    routes.authorized
                        .bisc(organizationName)
                        .languageHouses.detail(languageHouseId)
                        .coworkers.detail(languageHouseEmployeeId).data.index
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

export default CoworkersDetailUpdateView
