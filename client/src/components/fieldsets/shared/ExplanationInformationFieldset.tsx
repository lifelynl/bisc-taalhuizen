import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ControlField from 'components/Core/Field/ControlField'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import { Maybe } from 'graphql/v2/generated/graphql'
import React from 'react'
import TextArea from '../../Core/DataEntry/TextArea'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: ExplanationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface ExplanationInformationFieldsetModel {
    'registration.remarks'?: Maybe<string>
}

interface ExplanationInformationFieldsetPrefillData {
    'registration.remarks'?: Maybe<string>
}

type Fields = 'remarks'

const ExplanationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldControls = {} } = props
    const { i18n } = useLingui()

    const controls = useFieldsetControl<Fields>(
        {
            remarks: {},
        },
        fieldControls
    )

    if (readOnly) {
        return (
            <Section title={i18n._(t`Toelichting`)}>
                <Column spacing={4}>
                    <ControlField control={controls.remarks} label={i18n._(t`Notitie`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.['registration.remarks']}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Toelichting`)}>
            <Column spacing={4}>
                <ControlField control={controls.remarks} label={i18n._(t`Notitie`)} horizontal={true}>
                    <TextArea
                        name="registration.remarks"
                        placeholder={i18n._(t`Opmerkingen van de deelnemer`)}
                        defaultValue={prefillData?.['registration.remarks'] ?? undefined}
                    />
                </ControlField>
            </Column>
        </Section>
    )
}

export default ExplanationInformationFieldset
