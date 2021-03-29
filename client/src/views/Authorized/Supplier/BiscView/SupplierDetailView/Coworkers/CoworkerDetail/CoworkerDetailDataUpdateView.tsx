import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    AanbiederUserRoleType,
    useAanbiederEmployeeQuery,
    UserRoleEnum,
    useUpdateAanbiederEmployeeMutation,
    useUserRolesByAanbiederIdQuery,
} from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { CoworkersDetailLocationStateProps } from './CoworkerDetailView'

interface Props {
    routeState: CoworkersDetailLocationStateProps
}

interface FormModel extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetFormModel {}

export const CoworkerDetailDataUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data: userRolesData, loading: userRolesLoading, error: userRolesError } = useUserRolesByAanbiederIdQuery({
        variables: {
            aanbiederId: routeState.supplierId,
        },
    })
    const { loading: aanbiederLoading, error: aanbiederError, data: aanbiederData } = useAanbiederEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })
    const [updateAanbiederEmployee, { loading: mutationLoading }] = useUpdateAanbiederEmployeeMutation()

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={routeState.coworkerName}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.bisc.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
        </Form>
    )

    function renderForm() {
        if (aanbiederLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (aanbiederError || !aanbiederData) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <InformationFieldset
                    prefillData={{
                        lastname: aanbiederData.aanbiederEmployee.familyName,
                        insertion: aanbiederData.aanbiederEmployee.additionalName,
                        callSign: aanbiederData.aanbiederEmployee.givenName,
                        phonenumber: aanbiederData.aanbiederEmployee.telephone,
                    }}
                />
                {/* <HorizontalRule />
                <AvailabillityFieldset
                    prefillData={{
                        available: data.available,
                        note: data.note,
                    }}
                /> */}
                <HorizontalRule />
                <AccountInformationFieldset
                    rolesError={!!userRolesError}
                    rolesLoading={userRolesLoading}
                    roleOptions={[
                        [UserRoleEnum.AanbiederCoordinator],
                        [UserRoleEnum.AanbiederMentor],
                        [UserRoleEnum.AanbiederMentor, UserRoleEnum.AanbiederCoordinator],
                        [UserRoleEnum.AanbiederVolunteer],
                    ]}
                    prefillData={{
                        email: aanbiederData.aanbiederEmployee.email,
                        roles: aanbiederData.aanbiederEmployee.userRoles.map(role => role.name),
                    }}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() =>
                                    history.push({
                                        pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
                                        state: routeState,
                                    })
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={mutationLoading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)

        if (aanbiederData) {
            const response = await updateAanbiederEmployee({
                variables: {
                    input: {
                        userId: routeState.coworkerId,
                        userGroupIds: Forms.getObjectsFromListWithStringList<AanbiederUserRoleType>(
                            'name',
                            data.roles,
                            userRolesData?.userRolesByAanbiederId
                        ).map(role => role.id),
                        givenName: data.callSign ?? aanbiederData.aanbiederEmployee.givenName,
                        additionalName: data.insertion,
                        familyName: data.lastname ?? aanbiederData.aanbiederEmployee.familyName,
                        email: data.email ?? aanbiederData.aanbiederEmployee.email,
                        telephone: data.phonenumber ?? aanbiederData.aanbiederEmployee.telephone,
                    },
                },
            })

            if (response.errors?.length || !response.data) {
                return
            }

            NotificationsManager.success(
                i18n._(t`Medewerker is bewerkt`),
                i18n._(t`U word doorgestuurd naar de medewerker pagina`)
            )

            history.push({
                pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
                state: {
                    ...routeState,
                    coworkerName: NameFormatters.formattedFullname({
                        givenName: response.data?.updateAanbiederEmployee.givenName,
                        additionalName: response.data?.updateAanbiederEmployee.additionalName,
                        familyName: response.data?.updateAanbiederEmployee.familyName,
                    }),
                    coworkerId: response.data?.updateAanbiederEmployee.id,
                },
            })
        }
    }
}
