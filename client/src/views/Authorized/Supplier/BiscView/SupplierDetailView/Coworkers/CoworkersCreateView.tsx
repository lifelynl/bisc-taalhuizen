import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    AanbiederEmployeesDocument,
    AanbiederUserRoleType,
    useCreateAanbiederEmployeeMutation,
    UserRoleEnum,
    useUserRolesByAanbiederIdQuery,
} from 'generated/graphql'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { SupplierDetailLocationStateProps } from '../SupplierDetailView'
import { CoworkersLocationStateProps } from './CoworkersView'

// TODO: volunteer fields are not implemented yet
interface FormModel extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetFormModel {}

interface Props {
    routeState: CoworkersLocationStateProps
}

const CoworkerCreateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { state } = useLocation<SupplierDetailLocationStateProps>()
    const { data: userRolesData, loading: userRolesLoading, error: userRolesError } = useUserRolesByAanbiederIdQuery({
        variables: {
            aanbiederId: state.supplierId,
        },
    })
    const [createAanbiederEmployee, { loading }] = useCreateAanbiederEmployeeMutation()
    // TODO: add isVolunteer handler back
    // const [isVolunteer, setIsVolunteer] = useState<boolean>(false)

    // const handleOnFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    //     const data = Forms.getFormDataFromFormEvent<FormModel>(e)

    //     return setIsVolunteer(data.roles.includes(Roles.volunteer))
    // }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Medewerkers`)} to={routes.authorized.supplier.bisc.overview} />
                    </Breadcrumbs>
                }
            />
            <InformationFieldset />
            {/* TODO: add back availabillity */}
            {/* <HorizontalRule />
            <AvailabillityFieldset /> */}
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
            />
            <Space pushTop={true} />
            {/* {isVolunteer && (
                <>
                    <SectionTitle title={i18n._(t`Vrijwilliger gegevens`)} heading="H3" />
                    <Space pushTop={true} />

                    <PersonInformationFieldset
                        fieldControls={{
                            lastName: {
                                hidden: true,
                            },
                            insertion: {
                                hidden: true,
                            },
                            nickName: {
                                hidden: true,
                            },
                        }}
                    />
                    <HorizontalRule />
                    <ContactInformationFieldset
                        fieldControls={{
                            email: {
                                hidden: true,
                            },
                            phone: {
                                hidden: true,
                            },
                        }}
                    />
                    <HorizontalRule />
                    <HorizontalRule />
                    <EducationInformationFieldset />
                    <HorizontalRule />
                    <CourseInformationFieldset />
                    <HorizontalRule />
                    <Space pushTop={true} />
                </>
            )} */}

            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.supplier.bisc.read.coworkers.overview,
                                    state: routeState,
                                })
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} icon={IconType.send}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createAanbiederEmployee({
            variables: {
                input: {
                    aanbiederId: state.supplierId,
                    userGroupIds: Forms.getObjectsFromListWithStringList<AanbiederUserRoleType>(
                        'name',
                        data.roles,
                        userRolesData?.userRolesByAanbiederId
                    ).map(role => role.id),
                    givenName: data.callSign ?? '',
                    additionalName: data.insertion,
                    familyName: data.lastname ?? '',
                    email: data.email ?? '',
                    telephone: data.phonenumber ?? '',
                },
            },
            refetchQueries: [{ query: AanbiederEmployeesDocument, variables: { aanbiederId: routeState.supplierId } }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de medewerker`)
        )

        history.push({
            pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
            search: '',
            hash: '',
            state: {
                ...routeState,
                coworkerName: NameFormatters.formattedFullname({
                    givenName: response.data?.createAanbiederEmployee.givenName,
                    additionalName: response.data?.createAanbiederEmployee.additionalName,
                    familyName: response.data?.createAanbiederEmployee.familyName,
                }),
                coworkerId: response.data?.createAanbiederEmployee.id,
            },
        })
    }
}

export default CoworkerCreateView
