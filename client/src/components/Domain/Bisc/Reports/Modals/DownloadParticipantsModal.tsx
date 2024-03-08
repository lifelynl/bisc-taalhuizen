import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { useContext, useState } from 'react'
import { downloadFile } from 'utils/downloadFile'
import { Forms } from 'utils/forms'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { DownloadModal } from 'components/Core/Modal/DownloadModal'
import { LanguageHousePeriodFieldsetFormModel } from 'components/Domain/Shared/components/Reports/Fieldsets/PeriodFieldset'

interface Props {
    onClose: () => void
    organizationId?: string
}

interface FormModel extends LanguageHousePeriodFieldsetFormModel {}

export const DownloadParticipantsModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { organizationSlug } = useContext(SessionContext)
    const { onClose, organizationId } = props
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <Form onSubmit={handleDownload}>
            <DownloadModal
                onClose={onClose}
                title={i18n._(t`Gegevens deelnemers downloaden`)}
                text={i18n._(t`
                Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd op periode naar keuze.`)}
                loading={loading}
                isLanguageHouse={true}
                organizationId={organizationId}
            />
        </Form>
    )

    async function handleDownload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const organization = organizationId || formData.organization
        const start = formData.periodFrom
        const end = formData.periodTo

        if (start && end) {
            if (new Date(start) > new Date(end)) {
                NotificationsManager.error(
                    i18n._(`Actie mislukt`),
                    i18n._(`De startdatum moet vóór de einddatum liggen`)
                )
                // eslint-disable-next-line no-console
                console.error(e)
                onClose()
                return
            }
        }

        if (organization && start && end) {
            try {
                await downloadFile(
                    '/exports/students',
                    { organizationId: organization, start, end },
                    'students.xlsx',
                    organizationSlug
                )

                NotificationsManager.success(i18n._(t`Rapportage wordt gedownload`))
                onClose()
            } catch (e) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
                // eslint-disable-next-line no-console
                console.error(e)
            }
        } else {
            if (!organization) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Selecteer een Taalhuis`))
            }

            if (!start || !end) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Selecteer een periode`))
            }
        }

        setLoading(false)
    }
}
