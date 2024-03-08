import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import { DEFAULT_INITIAL_PAGE_SIZE, InfiniteScroll } from 'components/Core/InfiniteScroll/InfiniteScroll'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    ProviderParticipantDetailHeader,
    ProviderParticipantDetailTabsEnum,
} from 'components/Domain/Provider/ProviderParticipants/ProviderParticipantHeader'
import { DownloadFileContainer } from 'components/Domain/Documents/DownloadFile'
import { DocumentsQuery, useDocumentsLazyQuery, useStudentForDetailHeaderQuery } from 'graphql/v2/generated/graphql'
import React, { useCallback, useEffect } from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { ProviderParticipantDetailRouteParams } from 'routes/provider/providerRoutes'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props extends RouteComponentProps<ProviderParticipantDetailRouteParams> {}

export const ParticipantDocumentsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { providerParticipantId: studentId } = useParams<ProviderParticipantDetailRouteParams>()
    const { data: studentData } = useStudentForDetailHeaderQuery({ variables: { studentId } })
    const [getDocuments, { data, loading, error, fetchMore }] = useDocumentsLazyQuery()

    const getDocsCb = useCallback(
        (person: string) => {
            getDocuments({ variables: { person, paginationArgs: { take: DEFAULT_INITIAL_PAGE_SIZE } } })
        },
        [getDocuments]
    )

    useEffect(() => {
        if (studentData?.student.person.id) {
            getDocsCb(studentData.student.person.id)
        }
    }, [studentData?.student.person.id, getDocsCb])

    return (
        <Column spacing={12}>
            <ProviderParticipantDetailHeader activeTabId={ProviderParticipantDetailTabsEnum.documents} />
            {renderPage()}
        </Column>
    )

    function renderPage() {
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
            <InfiniteScroll
                hasMore={data?.documents?.hasMore ?? false}
                loadMore={paginationArgs => fetchMore({ variables: { paginationArgs } })}
            >
                {renderDocumentList(data?.documents.nodes || [])}
            </InfiniteScroll>
        )
    }

    function renderDocumentList(documents: DocumentsQuery['documents']['nodes']) {
        return (
            <Table
                flex={[1, 1, 0.25]}
                headers={[
                    { headerLabel: i18n._(t`BESTAND`), field: 'file' },
                    { headerLabel: i18n._(t`GEÜPLOAD OP`), field: 'createdAt' },
                ]}
                rows={getRows(documents)}
                emptyMessage={i18n._(t`Er zijn nog geen documenten`)}
            />
        )
    }

    function getRows(documents: DocumentsQuery['documents']['nodes']) {
        return documents.map(item => [
            <Row spacing={2}>
                <Icon type={IconType.download} />
                <DownloadFileContainer document={item}>
                    {(downloadFile, loading) => <TableLink onClick={downloadFile} text={item.file.name} />}
                </DownloadFileContainer>
            </Row>,
            <Paragraph>{DateFormatters.formattedDate(item.createdAt)}</Paragraph>,
        ])
    }
}
