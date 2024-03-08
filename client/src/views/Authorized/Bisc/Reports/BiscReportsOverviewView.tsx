import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Modal from 'components/Core/Modal/Modal'
import { DownloadParticipantsModalView } from 'components/Domain/Bisc/Reports/Modals/DownloadParticipantsModal'
import { DownloadLearningNeedsModalView } from 'components/Domain/Bisc/Reports/Modals/DownloadLearningNeedsModal'
import ReportCard, { ReportCardBackgroundType } from 'components/Reports/ReportCard'
import ReportsList from 'components/Reports/ReportsList'
import React, { useState } from 'react'

interface Props {}

export const BiscReportsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [participantsIsOpen, setParticipantsIsOpen] = useState(false)
    const [learningNeedsIsOpen, setLearningNeedsIsOpen] = useState(false)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Rapportages`)} />
            {renderList()}
        </>
    )

    function renderList() {
        return (
            <>
                <ReportsList>
                    <ReportCard
                        backgroundType={ReportCardBackgroundType.blue}
                        title={i18n._(t`Deelnemers`)}
                        description={i18n._(
                            t`Download een CSV bestand van alle deelnemers van dit Taalhuis. Gefilterd op periode naar keuze.`
                        )}
                        ActionButton={
                            <Button
                                icon={IconType.download}
                                type={ButtonType.quaternary}
                                onClick={() => setParticipantsIsOpen(true)}
                            >
                                {i18n._(t`Deelnemers downloaden`)}
                            </Button>
                        }
                    />
                    <ReportCard
                        backgroundType={ReportCardBackgroundType.orange}
                        title={i18n._(t`Leervragen`)}
                        description={i18n._(
                            t`Download een CSV bestand van alle leervragen van de deelnemers van dit Taalhuis. Gefilterd op periode naar keuze.`
                        )}
                        ActionButton={
                            <Button
                                icon={IconType.download}
                                type={ButtonType.quaternary}
                                onClick={() => setLearningNeedsIsOpen(true)}
                            >
                                {i18n._(t`Leervragen downloaden`)}
                            </Button>
                        }
                    />
                </ReportsList>
                <Modal isOpen={participantsIsOpen} onRequestClose={() => setParticipantsIsOpen(false)}>
                    <DownloadParticipantsModalView onClose={() => setParticipantsIsOpen(false)} />
                </Modal>
                <Modal isOpen={learningNeedsIsOpen} onRequestClose={() => setLearningNeedsIsOpen(false)}>
                    <DownloadLearningNeedsModalView onClose={() => setLearningNeedsIsOpen(false)} />
                </Modal>
            </>
        )
    }
}
