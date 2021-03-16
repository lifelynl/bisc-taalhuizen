import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import InputContainer from '../../Core/Containers/ConditionalCard'
import DateInput from '../../Core/DataEntry/DateInput'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: EducationInformationFieldsetModel
    readOnly?: true
}

export interface EducationInformationFieldsetModel {
    study: string
    institution: string
    offersCertificate: string
}

const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Opleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Huidige opleiding`)} horizontal={true}>
                        <p>{prefillData?.study}</p>
                    </Field>
                    <Field label={i18n._(t`Waar volg je de opleiding?`)} horizontal={true}>
                        <p>{prefillData?.institution}</p>
                    </Field>
                    <Field label={i18n._(t`Biedt de opleiding een certificaat?`)} horizontal={true}>
                        <p>{prefillData?.offersCertificate}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section
            title={i18n._(t`Opleiding`)}
            description={i18n._(t`Volg je op dit moment een opleiding die te maken heeft met het vrijwilligerswerk?`)}
        >
            <Column spacing={4}>
                <Field label={i18n._(t`Huidige opleiding`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'study'} value="ja" />
                            <p>{i18n._(t`Ja, sinds:`)}</p>
                        </Row>

                        <InputContainer>
                            <Column spacing={5}>
                                <Field label={i18n._(t`Waar volg je de opleiding`)}>
                                    <Input name="anders" placeholder={i18n._(t`Anders`)} defaultValue={undefined} />
                                </Field>

                                <Field label={'Biedt de opleiding een certificaat?'}>
                                    <Column spacing={4}>
                                        <Row>
                                            <RadioButton name={'provides-certificate'} value="yes" />
                                            <p>{i18n._(t`Ja`)}</p>
                                        </Row>
                                        <Row>
                                            <RadioButton name={'provides-certificate'} value="no" />
                                            <p>{i18n._(t`Nee`)}</p>
                                        </Row>
                                    </Column>
                                </Field>
                            </Column>
                        </InputContainer>

                        <Row>
                            <RadioButton name={'study'} value="no" />
                            <p>{i18n._(t`Nee`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'study'} value="no-but" />
                            <p>{i18n._(t`Nee, maar wel gevolgd tot`)}</p>
                        </Row>
                        <DateInput name="country" placeholder={i18n._(t`Land`)} />
                        <InputContainer>
                            <Column spacing={5}>
                                <Field label={i18n._(t`Niveau`)}>
                                    <Input name="level" placeholder={i18n._(t`Niveau`)} defaultValue={undefined} />
                                </Field>

                                <Field label={i18n._(t`Diploma`)}>
                                    <Column spacing={3}>
                                        <Row>
                                            <RadioButton name={'certificate'} value="yes" />
                                            <p>{i18n._(t`Ja`)}</p>
                                        </Row>
                                        <Row>
                                            <RadioButton name={'certificate'} value="no" />
                                            <p>{i18n._(t`Nee`)}</p>
                                        </Row>
                                    </Column>
                                </Field>
                            </Column>
                        </InputContainer>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default EducationInformationFieldset
