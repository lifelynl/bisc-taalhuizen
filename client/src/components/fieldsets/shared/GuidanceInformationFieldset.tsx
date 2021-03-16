import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../Core/DataEntry/Checkbox'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: GuidanceInformationFieldsetModel
    readOnly?: true
}

export interface GuidanceInformationFieldsetModel {
    target: string
    preference: string
    foundVia: string
    experience: string
}

const GuidanceInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Begeleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Straatnaam + huisnr.`)} horizontal={true}>
                        <p>{prefillData?.target}</p>
                    </Field>

                    <Field label={i18n._(t`Voorkeur vrijwilligerswerk`)} horizontal={true}>
                        <p>{prefillData?.preference}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{prefillData?.foundVia}</p>
                    </Field>

                    <Field label={i18n._(t`Tel. nr. contactpersoon`)} horizontal={true}>
                        <p>{prefillData?.experience}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Begeleiding`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Doelgroep voorkeur`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <Checkbox name={'target-preference'} value="no" />
                            <p>{i18n._(t`N1`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'target-preference'} value="yes" />
                            <p>{i18n._(t`N2`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Voorkeur vrijwilligerswerk`)} horizontal={true}>
                    <Input
                        name="communitywork"
                        placeholder={i18n._(t`Voorkeur`)}
                        defaultValue={prefillData?.preference}
                    />
                </Field>
                <Field
                    label={i18n._(t`Hoe ben je bij het Taalhuis terecht gekomen voor vrijwilligerswerk?`)}
                    horizontal={true}
                >
                    <Input
                        name="foundVia"
                        placeholder={i18n._(t`Terecht gekomen via..`)}
                        defaultValue={prefillData?.foundVia}
                    />
                </Field>

                <Field label={i18n._(t`Ervaring met de doelgroep`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'experience'} value="no" />
                            <p>{i18n._(t`Bellen`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'experience'} value="ja" />
                            <p>{i18n._(t`Ja, namelijk`)}</p>
                        </Row>
                        <Input name="anders" placeholder={i18n._(t`Anders`)} defaultValue={prefillData?.experience} />
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default GuidanceInformationFieldset
