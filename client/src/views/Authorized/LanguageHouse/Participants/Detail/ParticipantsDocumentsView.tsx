import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import { Page } from 'components/Core/Page/Page'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DownloadFileContainer } from 'components/Domain/Documents/DownloadFile'
import { DocumentDeleteModal } from 'components/Domain/Documents/Modals/DocumentDeleteModal'
import { LanguageHouseParticipantDetailTabsEnum } from 'components/Domain/LanguageHouse/Participants/LanguageHouseParticipantDetailTabs'
import { DocumentsQuery, useDocumentsLazyQuery, useStudentForDetailHeaderQuery } from 'graphql/v2/generated/graphql'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { LanguageHouseParticipantsDetailRouteParams } from 'routes/languageHouse/languageHouseRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { ParticipantDetailHeader } from './ParticipantDetailHeader'

export const ParticipantsDocumentsOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const { languageHouseParticipantId } = useParams<LanguageHouseParticipantsDetailRouteParams>()

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [deleteModalData, setDeleteModalData] = useState<undefined | DocumentsQuery['documents']['nodes'][0]>(
        undefined
    )

    const studentQuery = useStudentForDetailHeaderQuery({
        variables: {
            studentId: languageHouseParticipantId,
        },
    })
    const [getDocuments, { data, loading, error, fetchMore }] = useDocumentsLazyQuery()

    useEffect(() => {
        if (studentQuery.data?.student.person.id) {
            getDocuments({
                variables: {
                    paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE },
                    person: studentQuery.data?.student.person.id,
                },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentQuery.data?.student.person.id])

    return (
        <Page>
            <Column spacing={12}>
                <ParticipantDetailHeader activeTabId={LanguageHouseParticipantDetailTabsEnum.Documents} />
                {renderPage()}
            </Column>
        </Page>
    )

    function renderPage() {
        return (
            <Column spacing={12}>
                <Row justifyContent={'flex-end'}>
                    <DocumentUploadButtonContainer personId={studentQuery.data?.student.person.id} />
                </Row>
                <InfiniteScroll
                    hasMore={data?.documents?.hasMore ?? false}
                    loadMore={paginationArgs =>
                        fetchMore({
                            variables: {
                                paginationArgs,
                            },
                        })
                    }
                >
                    {renderDocumentList()}
                </InfiniteScroll>
            </Column>
        )
    }

    function renderDocumentList() {
        if (!data && loading) {
            return (
                <Center grow={true}>
                    <Spinner type={SpinnerAnimation.pageSpinner} />
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
            <>
                <Table
                    flex={[1, 1, 0.25]}
                    headers={[
                        { headerLabel: i18n._(t`BESTAND`), field: 'file' },
                        { headerLabel: i18n._(t`GEÜPLOAD OP`), field: 'createdAt' },
                        { headerLabel: '', field: 'icon' },
                    ]}
                    rows={getRows()}
                    emptyMessage={i18n._(t`Er zijn nog geen documenten`)}
                />
                {deleteModalData && (
                    <Modal isOpen={deleteModalOpen}>
                        <DocumentDeleteModal onClose={() => setDeleteModalOpen(false)} document={deleteModalData} />
                    </Modal>
                )}
            </>
        )
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.documents.nodes.map(item => [
            <Row spacing={2}>
                <Icon type={IconType.download} />
                <DownloadFileContainer document={item}>
                    {(downloadFile, loading) => <TableLink onClick={downloadFile} text={item.file.name} />}
                </DownloadFileContainer>
            </Row>,
            <Paragraph>{DateFormatters.formattedDate(item.createdAt)}</Paragraph>,
            <Button
                type={ButtonType.secondary}
                icon={IconType.delete}
                onClick={() => handleOnItemOpenDeleteModal(item)}
            />,
        ])
    }

    function handleOnItemOpenDeleteModal(item: DocumentsQuery['documents']['nodes'][0]) {
        setDeleteModalOpen(true)
        setDeleteModalData(item)
    }
}
