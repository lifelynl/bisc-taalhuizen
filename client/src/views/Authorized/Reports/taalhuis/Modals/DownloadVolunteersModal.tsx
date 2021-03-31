import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'

import Button, { ButtonType } from 'components/Core/Button/Button'
import Select from 'components/Core/DataEntry/Select'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Field from 'components/Core/Field/Field'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useMockMutation } from 'hooks/UseMockMutation'
import { Forms } from 'utils/forms'

interface Props {
    onClose: () => void
}

interface FormModel {
    year: string
    quarter: string
}

const DownloadVolunteersModalView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [downloadFile, { loading }] = useMockMutation('download-link')
    const { onClose } = props

    return (
        <Form onSubmit={handleDownload}>
            <ModalView
                onClose={onClose}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle title={i18n._(t`Gegevens vrijwilligers downloaden`)} heading="H4" />
                        <Paragraph>
                            {i18n._(t`
                                Download een CSV bestand van alle vrijwilligers van dit Taalhuis. Gefilterd per jaar of kwartaal.`)}
                        </Paragraph>

                        <Row spacing={5}>
                            <Field label={i18n._(t`Jaar`)} grow={true}>
                                <Select
                                    name={'year'}
                                    placeholder={i18n._(t`Selecteer jaar`)}
                                    options={[]}
                                    grow={true}
                                />
                            </Field>
                            <Field label={i18n._(t`Kwartaal`)} grow={true}>
                                <Select
                                    name={'quarter'}
                                    placeholder={i18n._(t`Selecteer jaar`)}
                                    options={[]}
                                    grow={true}
                                />
                            </Field>
                        </Row>
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} onClick={onClose}>
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button type={ButtonType.primary} loading={loading}>
                            {i18n._(t`Gegevens downloaden`)}
                        </Button>
                    </>
                }
            />
        </Form>
    )

    async function handleDownload(e: React.FormEvent<HTMLFormElement>) {
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await downloadFile({
            quarter: formData.quarter,
            year: formData.year,
        })

        if (response?.errors?.length) {
            return
        }

        NotificationsManager.success(i18n._(t`download is begonnen`), '')
        onClose()
    }
}

export default DownloadVolunteersModalView
