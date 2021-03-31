import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import { EmailValidators } from '../../../../utils/validators/EmailValidators'
import Input from '../../../Core/DataEntry/Input'
import Select from '../../../Core/DataEntry/Select'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    prefillData?: RefererInformationFieldsetModel
    readOnly?: boolean
    className?: string
}

export interface RefererInformationFieldsetModel {
    notifyingParty?: string
    referrerInstant?: string
    referrerEmailAddress: string
}

const RefererInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, className } = props
    const { i18n } = useLingui()
    const containerClassName = classNames(styles, className)

    if (readOnly) {
        return (
            <Section className={containerClassName} title={i18n._(t`Verwijzer`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Verwijzende instantie`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>{prefillData?.notifyingParty}</Paragraph>
                    </Field>
                    {prefillData?.referrerInstant && (
                        <Field label={i18n._(t`Naam instantie`)} horizontal={true}>
                            <Paragraph className={styles.paragraph}>{prefillData?.notifyingParty}</Paragraph>
                        </Field>
                    )}
                    <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>{prefillData?.referrerEmailAddress}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Verwijzer`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Select name="notifyingParty" placeholder={i18n._(t`Selecteer verwijzer`)} options={['test']} />
                </Field>
                <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
                    <Input
                        name="referrerEmailAddress"
                        placeholder={i18n._(t`instantie@email.nl`)}
                        defaultValue={prefillData?.notifyingParty}
                        validators={[EmailValidators.isEmailAddress]}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default RefererInformationFieldset
