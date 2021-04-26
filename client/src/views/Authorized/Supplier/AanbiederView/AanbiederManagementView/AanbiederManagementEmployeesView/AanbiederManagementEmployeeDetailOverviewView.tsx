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
    ProviderEmployeesDocument,
    useProviderEmployeeQuery,
    useUpdateProviderEmployeeMutation,
    useUserRolesByProviderIdQuery,
} from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { UserContext } from 'components/Providers/UserProvider/context'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { useHistory } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import {
    AanbiederManagementEmployeeTab,
    AanbiederManagementEmployeeTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'
import { AanbiederManagementEmployeesLocationStateProps } from './AanbiederManagementEmployeesView'

interface Props {
    routeState: AanbiederManagementEmployeesLocationStateProps
}

export const AanbiederManagementEmployeeDetailOverviewView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [isEditing, setIsEditing] = useState(false)
    const { user } = useContext(UserContext)
    const history = useHistory()
    const { routeState } = props

    const providerId = user!.organizationId!
    const { data, loading, error } = useProviderEmployeeQuery({ variables: { userId: routeState.employeeId } })
    const { data: userRoles } = useUserRolesByProviderIdQuery({ variables: { providerId: providerId } })
    const [updateEmployee, { loading: updateLoading }] = useUpdateProviderEmployeeMutation()

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    const fullName = NameFormatters.formattedFullname({
        givenName: data?.providerEmployee.givenName,
        additionalName: data?.providerEmployee.additionalName,
        familyName: data?.providerEmployee.familyName,
    })

    return (
        <>
            {/* TODO: add breadcrumbs */}
            <Headline spacingType={SpacingType.small} title={fullName} />
            <Column spacing={10}>
                {renderTabs()}
                <Form onSubmit={handleEdit}>
                    {renderData()}
                    <ActionBar LeftComponent={renderDeleteButton()} RightComponent={renderEditButton()} />
                </Form>
            </Column>
        </>
    )

    function renderTabs() {
        if (isEditing) {
            return
        }

        return (
            <AanbiederManagementEmployeeTabs
                currentTab={AanbiederManagementEmployeeTab.overview}
                routeState={routeState}
            />
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<AanbiederEmployeeDetailForm>(e)
        if (!formData || !data?.providerEmployee) {
            setIsEditing(false)
            return
        }

        const { callSign, lastname, phonenumber, email, roles } = formData
        const userGroups = Forms.getObjectsFromListWithStringList('name', roles, userRoles?.userRolesByProviderId)

        const response = await updateEmployee({
            variables: {
                input: {
                    userId: routeState.employeeId,
                    givenName: callSign === undefined ? data.providerEmployee.givenName : callSign,
                    familyName: lastname === undefined ? data.providerEmployee.familyName : lastname,
                    telephone: phonenumber === undefined ? data.providerEmployee.telephone : phonenumber,
                    email: email === undefined ? data.providerEmployee.email : email,
                    userGroupIds: userGroups.map(r => r.id),
                },
            },
        })

        if (response.data?.updateProviderEmployee) {
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

        return <AanbiederEmployeeDetailFieldsContainer isEditing={isEditing} employee={data.providerEmployee} />
    }

    function renderDeleteButton() {
        if (!isEditing) {
            return
        }

        return (
            <AanbiederEmployeeDeleteButtonContainer
                loading={updateLoading}
                employeeId={routeState.employeeId}
                employeeName={data?.providerEmployee.givenName || ''}
                onSuccessfulDelete={() => history.push(supplierRoutes.management.employees.overview)}
                refetchQueries={[{ query: ProviderEmployeesDocument, variables: { providerId } }]}
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
