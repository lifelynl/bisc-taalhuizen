import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import ContentTag from '../../../../../../../components/Core/DataDisplay/ContentTag/ContentTag'
import ErrorBlock from '../../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../../../../../components/Core/Field/Field'
import Icon from '../../../../../../../components/Core/Icon/Icon'
import { IconType } from '../../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../../components/Core/Layout/Row/Row'
import Modal from '../../../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../../../components/Core/Modal/ModalView'
import { Table } from '../../../../../../../components/Core/Table/Table'
import Tab from '../../../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../../../components/Core/TabSwitch/types'
import SectionTitle from '../../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../../components/Core/Typography/Paragraph'
import { useMockQuery } from '../../../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../../routes/routes'
import { SupplierDetailCoworkersParams } from '../../../../../../../routes/supplier/types'
import {
    CoworkerDetailDocumentsMock,
    coworkerDetailDocumentsMock,
    coworkerDetailDocumentsResponseMock,
} from '../../mocks/coworkers'

interface Props {}

enum Tabs {
    data = 'data',
    documenten = 'documenten',
}

const CoworkerDetailDocumentsView: React.FunctionComponent<Props> = props => {
    const history = useHistory()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false)
    const { data, loading, error } = useMockQuery(coworkerDetailDocumentsMock)
    const { i18n } = useLingui()
    const params = useParams<SupplierDetailCoworkersParams>()

    const [deleteDocument, { loading: deleteLoading }] = useMockMutation<
        CoworkerDetailDocumentsMock,
        { documentid: string }
    >(coworkerDetailDocumentsResponseMock, false)

    //needs to be implemented later
    const [uploadDocument, { loading: uploadLoading }] = useMockMutation<
        CoworkerDetailDocumentsMock,
        { documentid: string }
    >(coworkerDetailDocumentsResponseMock, false)

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === Tabs.data) {
            history.push(routes.authorized.supplier.read.coworkers.detail.data.index(params))
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDocument({ documentid: 'NOT YET IMPLEMENTED' })
            setDeleteModalOpen(false)
            NotificationsManager.success(
                i18n._(t`Document is verwijderd`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om het document te verwijderen`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    const handleRemoveUploadedDocument = () => {
        console.log('removing uploaded doc')
    }

    return (
        <>
            <Headline
                title={params.coworkername}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                        <Breadcrumb text={'breadcrumb'} to={routes.authorized.supplier.overview} />
                        <Breadcrumb
                            text={i18n._(t`Medewerkers`)}
                            to={routes.authorized.supplier.read.coworkers.index()}
                        />
                    </Breadcrumbs>
                }
                spacingType={SpacingType.small}
            />
            <Column spacing={2}>
                <Row>
                    <TabSwitch defaultActiveTabId={Tabs.documenten} onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                        <Tab label={i18n._(t`Documenten`)} tabid={Tabs.documenten} />
                    </TabSwitch>
                </Row>
                <Row justifyContent={'flex-end'}>
                    <Button
                        icon={IconType.add}
                        onClick={() => setUploadModalOpen(true)}
                        // onClick={() => history.push(routes.authorized.supplier.read.coworkers.detail.documents.create(id, name))}
                    >
                        {i18n._(t`Document uploaden`)}
                    </Button>
                </Row>
                {renderList()}
                <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                    <ModalView
                        onClose={() => setDeleteModalOpen(false)}
                        ContentComponent={
                            <Column spacing={6}>
                                <SectionTitle title={i18n._(t`Document verwijderen`)} heading="H4" />
                                <Paragraph>
                                    {i18n._(
                                        t`Weet je zeker dat je het volgende document [NOT IMPLEMENENTED] wilt verwijderen?`
                                    )}
                                </Paragraph>
                            </Column>
                        }
                        BottomComponent={
                            <>
                                <Button type={ButtonType.secondary} onClick={() => setDeleteModalOpen(false)}>
                                    {i18n._(t`Annuleren`)}
                                </Button>
                                <Button
                                    danger={true}
                                    type={ButtonType.primary}
                                    icon={IconType.delete}
                                    onClick={handleDelete}
                                    loading={deleteLoading}
                                >
                                    {i18n._(t`Verwijderen`)}
                                </Button>
                            </>
                        }
                    />
                </Modal>
                <Modal isOpen={uploadModalOpen} onRequestClose={() => setUploadModalOpen(false)}>
                    <ModalView
                        onClose={() => setUploadModalOpen(false)}
                        ContentComponent={
                            <Column spacing={6}>
                                <SectionTitle title={i18n._(t`Document toevoegen`)} heading="H4" />
                                <Column spacing={2}>
                                    <Field
                                        label={i18n._(t`Bestand`)}
                                        horizontal={true}
                                        displayBlock={true}
                                        evenContainers={true}
                                    >
                                        <Button type={ButtonType.tertiary} icon={IconType.add}>
                                            {i18n._(t`Bestand selecteren`)}
                                        </Button>
                                    </Field>
                                    <Field label={''} horizontal={true} evenContainers={true}>
                                        <ContentTag>
                                            <label>
                                                <span>
                                                    <Icon type={IconType.document} />
                                                </span>
                                                Example.pdf
                                            </label>

                                            <Button
                                                type={ButtonType.secondary}
                                                danger={true}
                                                icon={IconType.delete}
                                                onClick={handleRemoveUploadedDocument}
                                            />
                                        </ContentTag>
                                    </Field>
                                </Column>
                            </Column>
                        }
                        BottomComponent={
                            <>
                                <Button
                                    type={ButtonType.secondary}
                                    onClick={() => {
                                        return setUploadModalOpen(false)
                                    }}
                                >
                                    {i18n._(t`Annuleren`)}
                                </Button>
                                <Button type={ButtonType.primary} submit={true} loading={uploadLoading}>
                                    {i18n._(t`Uploaden`)}
                                </Button>
                            </>
                        }
                    />
                </Modal>
            </Column>
        </>
    )

    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <Table
                flex={1}
                lastItemIsIcon={true}
                headers={[i18n._(t`BESTAND`), i18n._(t`GEÜPLOAD OP`), '']}
                rows={getRows()}
            />
        )
    }

    function getRows() {
        if (!data) {
            return []
        }
        return data.map(item => [
            <Link to={'#'}>{item.name}</Link>,
            <p>{item.uploadedAt}</p>,
            <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setDeleteModalOpen(true)} />,
        ])
    }
}

export default CoworkerDetailDocumentsView
