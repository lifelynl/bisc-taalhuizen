import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import DateInput from 'components/Core/DataEntry/DateInput'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { EditParticipationInputType, ParticipationQuery } from 'graphql/v2/generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { RecursivePartialMaybe } from 'utils/objects/objects'

interface Props {
    referringOrganizationName: string
    referredToOrganizationName: string
    prefillData?: ParticipationQuery['participation']
}

export type ParticipationFieldsetFormModel = RecursivePartialMaybe<InputData>

interface InputData {
    agreement: EditParticipationInputType['agreement']
    startParticipation: string
}

export const ParticipationFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Deelname gegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Verwijzing`)} horizontal={true}>
                    <Row spacing={1}>
                        <LabelTag label={props.referringOrganizationName} color={LabelColor.grey} />
                        <Icon type={IconType.arrowRight} />
                        <LabelTag label={props.referredToOrganizationName} color={LabelColor.grey} />
                    </Row>
                </Field>
                <Field label={i18n._(t`Afspraken over deelname`)} horizontal={true}>
                    <TextArea
                        name="agreement"
                        placeholder={i18n._(t`Afspraken`)}
                        defaultValue={props.prefillData?.agreement ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Start deelname`)} horizontal={true}>
                    <DateInput
                        name="startParticipation"
                        placeholder="DD / MM / YYYY"
                        defaultValue={DateFormatters.toString(props.prefillData?.startParticipation)}
                    />
                </Field>
            </Column>
        </Section>
    )
}
