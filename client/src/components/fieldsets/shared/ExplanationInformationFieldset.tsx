import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: ExplanationInformationFieldsetModel
    readOnly?: boolean
}

export interface ExplanationInformationFieldsetModel {
    note?: string
}

const ExplanationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Toelichting`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Notitie`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.note}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Toelichting`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Notities`)} horizontal={true}>
                    <TextArea name="note" placeholder={i18n._(t`Notities`)} defaultValue={prefillData?.note} />
                </Field>
            </Column>
        </Section>
    )
}

export default ExplanationInformationFieldset
