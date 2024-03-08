import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ControlField from 'components/Core/Field/ControlField'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from 'components/hooks/fieldsets/types'
import { useFieldsetContent } from 'components/hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from 'components/hooks/fieldsets/useFieldsetControl'
import { Maybe } from 'graphql/v2/generated/graphql'
import React from 'react'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: IntakeInformationPrefillData
}

interface IntakeInformationPrefillData {
    nameOfCustomer?: Maybe<string>
    dateOfIntake?: Maybe<string>
}

type Fields = 'nameOfCustomer' | 'dateOfIntake'

const IntakeInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Afnemer`),
            nameOfCustomer: {
                label: i18n._(t`Naam afnemer`),
            },
            dateOfIntake: {
                label: i18n._(t`Datum intake`),
            },
        },
        fieldNaming
    )

    const controls = useFieldsetControl<Fields>({}, fieldControls)

    return (
        <Section title={content.title}>
            <Column spacing={4}>
                <ControlField control={controls.nameOfCustomer} label={content.nameOfCustomer?.label} horizontal={true}>
                    <p>{`${prefillData?.nameOfCustomer}`}</p>
                </ControlField>

                <ControlField control={controls.dateOfIntake} label={content.dateOfIntake?.label} horizontal={true}>
                    <p>{prefillData?.dateOfIntake}</p>
                </ControlField>
            </Column>
        </Section>
    )
}

export default IntakeInformationFieldset
