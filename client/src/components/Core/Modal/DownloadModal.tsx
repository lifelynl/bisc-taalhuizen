import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { PeriodFieldset } from 'components/Domain/Shared/components/Reports/Fieldsets/PeriodFieldset'

interface Props {
    onClose: () => void
    organizationId?: string
    title: string
    text: string
    loading: boolean
    isLanguageHouse: boolean
}

export const DownloadModal: React.FunctionComponent<Props> = props => {
    const { onClose, organizationId, title, text, loading, isLanguageHouse } = props
    const { i18n } = useLingui()

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={title} heading="H4" />
                    <Paragraph>{text}</Paragraph>
                    <PeriodFieldset showLanguageHouseSelect={isLanguageHouse && !organizationId} />
                    <br />
                    <br />
                    <br />
                    <br />
                    {/** TECH DEBT: making room for dropdown that would otherwise be cut off due to scrollable modal */}
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} disabled={loading} onClick={onClose}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button type={ButtonType.primary} loading={loading} submit={true}>
                        {i18n._(t`Gegevens downloaden`)}
                    </Button>
                </>
            }
        />
    )
}
