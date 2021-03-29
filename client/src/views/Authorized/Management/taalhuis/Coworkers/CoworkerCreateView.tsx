import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
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
import AccountInformationFieldset from '../../../../../components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from '../../../../../components/fieldsets/shared/InformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { Forms } from '../../../../../utils/forms'
import { FormModel } from './CoworkerOverviewView'
import { coworkersCreateResponse } from './Detail/coworkers'

interface Props {}

const CoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    //TODO: implement real call
    const [createMedewerker, { loading }] = useMockMutation<any, any>(coworkersCreateResponse, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Medewerker `)}
                spacingType={SpacingType.default}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Beheer`)} to={routes.authorized.management.bisc.overview} />
                    </Breadcrumbs>
                }
            />
            <InformationFieldset />
            <HorizontalRule />
            <AccountInformationFieldset roleOptions={[]} />
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
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

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createMedewerker(formData)

            const medewerker = response as FormModel
            NotificationsManager.success(
                i18n._(t`Medewerker is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )

            history.push(
                routes.authorized.management.bisc.coworkers.read({
                    coworkerid: medewerker.id.toString(),
                    coworkername: medewerker.roepnaam,
                })
            )
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default CoworkerCreateView
