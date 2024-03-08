import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { DownloadActivitiesModalView } from 'components/Domain/Provider/Reports/Modals/DownloadActivitiesModalView'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import ReportCard, { ReportCardBackgroundType } from 'components/Reports/ReportCard'
import ReportsList from 'components/Reports/ReportsList'
import { useContext, useState } from 'react'

export const ReportsView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const sessionContext = useContext(SessionContext)
    const [activitiesIsOpen, setActivitiesIsOpen] = useState(false)
    const organizationId = sessionContext.user?.currentEmployee?.organization.id

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._('Rapportages')} />
            <ReportsList>
                <ReportCard
                    backgroundType={ReportCardBackgroundType.blue}
                    title={i18n._('Activiteiten')}
                    description={i18n._('Download een CSV bestand van alle activiteiten van deze Aanbieder.')}
                    ActionButton={
                        <Button
                            icon={IconType.download}
                            type={ButtonType.quaternary}
                            onClick={() => setActivitiesIsOpen(true)}
                        >
                            {i18n._('Activiteiten downloaden')}
                        </Button>
                    }
                />
            </ReportsList>
            {organizationId && (
                <>
                    <Modal isOpen={activitiesIsOpen} onRequestClose={() => setActivitiesIsOpen(false)}>
                        <DownloadActivitiesModalView
                            onClose={() => setActivitiesIsOpen(false)}
                            organizationId={organizationId}
                        />
                    </Modal>
                </>
            )}
        </>
    )
}
