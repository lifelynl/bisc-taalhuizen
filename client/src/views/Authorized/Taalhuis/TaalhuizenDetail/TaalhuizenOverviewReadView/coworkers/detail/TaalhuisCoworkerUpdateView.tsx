import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../../../components/Core/Form/Form'
import { IconType } from '../../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../../components/Core/Layout/Row/Row'
import Modal from '../../../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../../components/Core/Typography/Paragraph'
import TaalhuisCoworkersInformationFieldset from '../../../../../../../components/fieldsets/taalhuis/TaalhuisCoworkersInformationFieldset'
import { useMockQuery } from '../../../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../../routes/routes'
import { TaalhuisCoworkersDetailParams } from '../../../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../../../utils/forms'
import { coworkerCreateResponse } from '../../../Coworkers/mocks/coworkers'

interface Props {}

export interface TaalhuisCoworkersFormModel {
    id: number
    achternaam: string
    tussenvoegsel: string
    roepnaam: string
    telefoonnummer: string
    email: string
    rol: string
    createdAt: string
    updatedAt: string
}

const TaalhuisCoworkersUpdateView: React.FunctionComponent<Props> = () => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisid, taalhuisname } = useParams<TaalhuisCoworkersDetailParams>()
    const { data: coworker, loading: loadCoworkerData, error } = useMockQuery(coworkerCreateResponse)
    const [updateCoworker, { loading }] = useMockMutation<TaalhuisCoworkersFormModel, TaalhuisCoworkersFormModel>(
        coworkerCreateResponse,
        false
    )
    const [deleteCoworker, { loading: loadingDelete }] = useMockMutation<boolean, boolean>(true, false)

    if (!taalhuisid) {
        return null
    }

    return <Form onSubmit={handleEdit}>{renderForm()}</Form>

    async function handleDelete() {
        const response = await deleteCoworker(true)

        if (!response) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker te verwijderen`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is verwijderd`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )

        history.push(routes.authorized.taalhuis.overview)
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<TaalhuisCoworkersFormModel>(e)
            const response = await updateCoworker(formData)

            if (response) {
                const coworker = response as TaalhuisCoworkersFormModel
                NotificationsManager.success(
                    i18n._(t`Medewerker is bijgewerkt`),
                    i18n._(t`U word teruggestuurd naar het overzicht`)
                )
                history.push(
                    routes.authorized.taalhuis.read.coworkers.detail.data({
                        taalhuisid,
                        taalhuisname,
                        coworkerid: `${coworker.id}`,
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

    function renderForm() {
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (loadCoworkerData) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (coworker) {
            return (
                <>
                    <Headline
                        title={i18n._(t`Medewerker ${coworker.roepnaam}`)}
                        TopComponent={
                            <Breadcrumbs>
                                <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                                <Breadcrumb
                                    text={taalhuisname || ''}
                                    to={routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname })}
                                />
                            </Breadcrumbs>
                        }
                    />
                    <TaalhuisCoworkersInformationFieldset
                        prefillData={{
                            lastName: coworker.achternaam,
                            insertion: coworker.tussenvoegsel,
                            nickName: coworker.roepnaam,
                            phoneNumber: coworker.telefoonnummer,
                            role: coworker.rol,
                            email: coworker.email,
                            createdAt: coworker.createdAt,
                            updatedAt: coworker.updatedAt,
                        }}
                    />

                    <Actionbar
                        LeftComponent={
                            <Row>
                                <Button
                                    type={ButtonType.secondary}
                                    danger={true}
                                    icon={IconType.delete}
                                    onClick={() => setModalIsVisible(true)}
                                >
                                    {i18n._(t`medewerker verwijderen`)}
                                </Button>
                            </Row>
                        }
                        RightComponent={
                            <Row>
                                <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                    {i18n._(t`Annuleren`)}
                                </Button>

                                <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                                    {i18n._(t`Opslaan`)}
                                </Button>
                            </Row>
                        }
                    />
                    <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                        <ModalView
                            onClose={() => setModalIsVisible(false)}
                            ContentComponent={
                                <Column spacing={6}>
                                    <SectionTitle
                                        title={i18n._(t`'Medewerker ${coworker.roepnaam} verwijderen'`)}
                                        heading="H4"
                                    />
                                    <Paragraph>
                                        {i18n._(t`
                                Weet je zeker dat je het medewerker wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.`)}
                                    </Paragraph>
                                </Column>
                            }
                            BottomComponent={
                                <>
                                    <Button type={ButtonType.secondary} onClick={() => setModalIsVisible(false)}>
                                        {i18n._(t`Annuleren`)}
                                    </Button>
                                    <Button
                                        danger={true}
                                        type={ButtonType.primary}
                                        icon={IconType.delete}
                                        onClick={handleDelete}
                                        loading={loadingDelete}
                                    >
                                        {i18n._(t`Verwijderen`)}
                                    </Button>
                                </>
                            }
                        />
                    </Modal>
                </>
            )
        }
    }
}

export default TaalhuisCoworkersUpdateView
