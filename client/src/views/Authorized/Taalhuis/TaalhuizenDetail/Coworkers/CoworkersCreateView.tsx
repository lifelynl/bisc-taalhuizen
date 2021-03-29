import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from '../../../../../components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, {
    InformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/InformationFieldset'
import {
    AanbiederEmployeesDocument,
    useCreateTaalhuisEmployeeMutation,
    useUserRolesByTaalhuisIdQuery,
} from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../utils/forms'

interface Props {}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetFormModel {}

const CoworkersCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createCoworker, { loading }] = useCreateTaalhuisEmployeeMutation()
    const params = useParams<TaalhuisDetailParams>()
    const decodedTaalhuisId = decodeURIComponent(params.taalhuisid)
    const { loading: loadingUserRoles, data: userRoles, error: userRolesError } = useUserRolesByTaalhuisIdQuery({
        variables: { taalhuisId: decodedTaalhuisId },
    })

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createCoworker({
            variables: {
                input: {
                    taalhuisId: decodedTaalhuisId,
                    userGroupId: userRoles?.userRolesByTaalhuisId.find(role => role.name === formData.roles)?.id || '',
                    givenName: formData.callSign || '',
                    additionalName: formData.insertion,
                    familyName: formData.lastname || '',
                    email: formData.email || '',
                    telephone: formData.phonenumber || '',
                },
            },
            refetchQueries: [{ query: AanbiederEmployeesDocument }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de medewerker `)
        )

        history.push(
            routes.authorized.taalhuis.read.coworkers.detail.data({
                taalhuisid: params.taalhuisid,
                taalhuisname: params.taalhuisname,
                coworkerid: encodeURIComponent(response.data.createTaalhuisEmployee.id),
                coworkername: response.data.createTaalhuisEmployee.givenName,
            })
        )
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb
                            text={params.taalhuisname}
                            to={routes.authorized.taalhuis.read.coworkers.index(params)}
                        />
                    </Breadcrumbs>
                }
            />
            <InformationFieldset />
            <HorizontalRule />
            <AccountInformationFieldset
                roleOptions={userRoles?.userRolesByTaalhuisId.map(role => [role.name])}
                rolesLoading={loadingUserRoles}
                rolesError={!!userRolesError}
            />
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.taalhuis.read.coworkers.index(params))}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )
}

export default CoworkersCreateView
