import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import Form from 'components/Core/Form/Form'
import ActionBar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import Column from 'components/Core/Layout/Column/Column'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { useCreateAanbiederEmployeeMutation, UserRoleEnum, useUserRolesByAanbiederIdQuery } from 'generated/graphql'
import { Forms } from 'utils/forms'
import { UserContext } from 'components/Providers/UserProvider/context'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

export const AanbiederManagementEmployeesCreateView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { user } = useContext(UserContext)

    const { data } = useUserRolesByAanbiederIdQuery({ variables: { aanbiederId: user!.organizationId! } })
    const [createEmployee, { loading }] = useCreateAanbiederEmployeeMutation()

    return (
        <Column spacing={10}>
            <Headline
                spacingType={SpacingType.small}
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.aanbieder.management.overview,
                            breadcrumbItems.aanbieder.management.employees.overview,
                        ]}
                    />
                }
            />
            <Form onSubmit={handleSubmit}>
                {renderFormFields()}
                <ActionBar RightComponent={renderButtons()} />
            </Form>
        </Column>
    )

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        type FormData = InformationFieldsetModel & AccountInformationFieldsetFormModel

        const formData = Forms.getFormDataFromFormEvent<FormData>(e)
        if (!formData) {
            return
        }

        const { callSign, insertion, lastname, phonenumber, email, roles } = formData
        const userGroups = Forms.getObjectsFromListWithStringList('name', roles, data?.userRolesByAanbiederId)

        const response = await createEmployee({
            variables: {
                input: {
                    aanbiederId: user!.organizationId!,
                    givenName: callSign || '',
                    additionalName: insertion,
                    familyName: lastname || '',
                    telephone: phonenumber,
                    email: email || '',
                    userGroupIds: userGroups.map(r => r.id),
                },
            },
        })

        if (response.data?.createAanbiederEmployee) {
            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`U word doorgestuurd naar de medewerker`)
            )

            history.push(supplierRoutes.management.employees.index)
        }
    }

    function renderFormFields() {
        return (
            <>
                <InformationFieldset />
                <HorizontalRule />
                {/* TODO: add availability field (not part of current sprint) */}
                <AccountInformationFieldset
                    roleOptions={[
                        [UserRoleEnum.AanbiederCoordinator],
                        [UserRoleEnum.AanbiederMentor],
                        [UserRoleEnum.AanbiederMentor, UserRoleEnum.AanbiederCoordinator],
                        [UserRoleEnum.AanbiederVolunteer],
                    ]}
                />
            </>
        )
    }

    function renderButtons() {
        return (
            <Row>
                <Button
                    type={ButtonType.secondary}
                    disabled={loading}
                    onClick={() => history.push(supplierRoutes.management.employees.index)}
                >
                    {i18n._(t`Annuleren`)}
                </Button>
                <Button submit={true} icon={IconType.send} loading={loading}>
                    {i18n._(t`Uitnodigen`)}
                </Button>
            </Row>
        )
    }
}
