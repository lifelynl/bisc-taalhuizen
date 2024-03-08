import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { DocumentsQuery, useDocumentLazyQuery } from 'graphql/v2/generated/graphql'
import { downloadFile } from 'utils/files/files'

interface Props {
    document: DocumentsQuery['documents']['nodes'][0]
    children: (downloadFile: () => void, loading: boolean) => JSX.Element
}

export const DownloadFileContainer = (props: Props) => {
    const { i18n } = useLingui()
    const [getDocument, { loading }] = useDocumentLazyQuery()

    return props.children(handleDownload, loading)

    async function handleDownload() {
        const { data: dataResult } = await getDocument({
            variables: {
                document: props.document!.id,
            },
        })

        try {
            if (dataResult) {
                NotificationsManager.success(i18n._(t`Bestand wordt gedownload`))
                downloadFile(dataResult.document.file)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
