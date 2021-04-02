import React, { useContext, useState } from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
// import {
//     AanbiederManagementEmployeeTab,
//     AanbiederManagementEmployeeTabs,
// } from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'
import Form from 'components/Core/Form/Form'
import ActionBar from 'components/Core/Actionbar/Actionbar'
import { AanbiederEmployeeDeleteButtonContainer } from 'components/Domain/Aanbieder/AanbiederEmployees/AanbiederEmployeeDeleteButtonContainer'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import {
    AanbiederEmployeeDetailFieldsContainer,
    AanbiederEmployeeDetailForm,
} from 'components/Domain/Aanbieder/AanbiederEmployees/AanbiederEmployeeDetailFieldsContainer'
import {
    AanbiederEmployeesDocument,
    useAanbiederEmployeeQuery,
    useUpdateAanbiederEmployeeMutation,
    useUserRolesByAanbiederIdQuery,
} from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { UserContext } from 'components/Providers/UserProvider/context'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { useHistory } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {
    employeeId: string
}

export const AanbiederManagementEmployeeDetailOverviewView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [isEditing, setIsEditing] = useState(false)
    const { user } = useContext(UserContext)
    const history = useHistory()
    const { employeeId } = props

    const aanbiederId = user!.organizationId!
    const { data, loading, error } = useAanbiederEmployeeQuery({ variables: { userId: employeeId } })
    const { data: userRoles } = useUserRolesByAanbiederIdQuery({ variables: { aanbiederId } })
    const [updateEmployee, { loading: updateLoading }] = useUpdateAanbiederEmployeeMutation()

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    const fullName = NameFormatters.formattedFullname({
        givenName: data?.aanbiederEmployee.givenName,
        additionalName: data?.aanbiederEmployee.additionalName,
        familyName: data?.aanbiederEmployee.familyName,
    })

    return (
        <>
            <Headline
                spacingType={SpacingType.small}
                title={fullName}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.aanbieder.management.overview,
                            breadcrumbItems.aanbieder.management.employees.overview,
                        ]}
                    />
                }
            />
            <Column spacing={10}>
                {/* {renderTabs()} */}
                <Form onSubmit={handleEdit}>
                    {renderData()}
                    <ActionBar LeftComponent={renderDeleteButton()} RightComponent={renderEditButton()} />
                </Form>
            </Column>
        </>
    )

    // TODO: part of 2nd sprint
    // function renderTabs() {
    //     if (isEditing) {
    //         return
    //     }

    //     return (
    //         <AanbiederManagementEmployeeTabs
    //             currentTab={AanbiederManagementEmployeeTab.overview}
    //             employeeId={employeeId}
    //         />
    //     )
    // }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<AanbiederEmployeeDetailForm>(e)
        if (!formData || !data?.aanbiederEmployee) {
            setIsEditing(false)
            return
        }

        const { callSign, lastname, phonenumber, email, roles } = formData
        const userGroups = Forms.getObjectsFromListWithStringList('name', roles, userRoles?.userRolesByAanbiederId)

        const response = await updateEmployee({
            variables: {
                input: {
                    userId: employeeId,
                    givenName: callSign === undefined ? data.aanbiederEmployee.givenName : callSign,
                    familyName: lastname === undefined ? data.aanbiederEmployee.familyName : lastname,
                    telephone: phonenumber === undefined ? data.aanbiederEmployee.telephone : phonenumber,
                    email: email === undefined ? data.aanbiederEmployee.email : email,
                    userGroupIds: userGroups.map(r => r.id),
                },
            },
        })

        if (response.data?.updateAanbiederEmployee) {
            NotificationsManager.success(i18n._(t`Medewerker is bewerkt`))
            setIsEditing(false)
        }
    }

    function renderData() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <AanbiederEmployeeDetailFieldsContainer isEditing={isEditing} employee={data.aanbiederEmployee} />
    }

    function renderDeleteButton() {
        if (!isEditing) {
            return
        }

        return (
            <AanbiederEmployeeDeleteButtonContainer
                loading={updateLoading}
                employeeId={employeeId}
                employeeName={data?.aanbiederEmployee.givenName || ''}
                onSuccessfulDelete={() => history.push(supplierRoutes.management.employees.overview)}
                refetchQueries={[{ query: AanbiederEmployeesDocument, variables: { aanbiederId } }]}
            />
        )
    }

    function renderEditButton() {
        if (isEditing) {
            return (
                <Row>
                    <Button type={ButtonType.secondary} disabled={updateLoading} onClick={() => setIsEditing(false)}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button type={ButtonType.primary} submit={true} loading={updateLoading}>
                        {i18n._(t`Opslaan`)}
                    </Button>
                </Row>
            )
        }

        return (
            <Button type={ButtonType.primary} onClick={() => setIsEditing(true)}>
                {i18n._(t`Bewerken`)}
            </Button>
        )
    }
}
