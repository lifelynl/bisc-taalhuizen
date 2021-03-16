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
    AccountInformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, {
    InformationFieldsetModel,
} from '../../../../../components/fieldsets/shared/InformationFieldset'
import { useCreateTaalhuisEmployeeMutation, useUserRolesByTaalhuisIdQuery } from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../utils/forms'

interface Props {}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetModel {}

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
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createCoworker({
                variables: {
                    input: {
                        taalhuisId: decodedTaalhuisId,
                        userGroupId: formData.role || '',
                        givenName: formData.callSign || '',
                        additionalName: formData.insertion,
                        familyName: formData.lastname || '',
                        email: formData.email || '',
                        telephone: formData.phonenumber || '',
                    },
                },
            })

            if (response.errors?.length || !response.data) {
                throw new Error()
            }

            if (response) {
                NotificationsManager.success(
                    i18n._(t`Medewerker is aangemaakt`),
                    i18n._(t`U word doorgestuurd naar de gegevens van de medewerker `)
                )

                history.push(
                    routes.authorized.taalhuis.read.coworkers.detail.data({
                        taalhuisid: params.taalhuisid,
                        taalhuisname: params.taalhuisname,
                        coworkerid: response.data.createTaalhuisEmployee.id,
                    })
                )
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
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
                roleOptions={userRoles?.userRolesByTaalhuisId.map(role => [role])}
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
