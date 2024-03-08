import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'
import { studentReferringOrganizationEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import { Maybe, ReferringOrganizationEnum } from 'graphql/v2/generated/graphql'

interface Props {
    prefillData?: RefererInformationPrefillData
    readOnly?: boolean
    className?: string
}

export interface RefererInformationFieldsetModel extends RefererInformationPrefillData {}

interface RefererInformationPrefillData {
    'registration.referringOrganization'?: Maybe<ReferringOrganizationEnum>
    'registration.referringOrganizationOther'?: Maybe<string>
    'registration.referringPerson.email'?: Maybe<string>
}

export const RefererInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, className } = props
    const { i18n } = useLingui()
    const [referringOrganization, setReferringOrganization] = useState<ReferringOrganizationEnum | undefined>(undefined)
    const containerClassName = classNames(styles, className)
    const referringOrganizationOptions = getStudentReferringOrganizationEnumOptions()
    const defaultReferringOrganization = prefillData?.['registration.referringOrganization']

    useEffect(() => {
        setReferringOrganization(prefillData?.['registration.referringOrganization'] ?? undefined)
    }, [prefillData, setReferringOrganization])

    if (readOnly) {
        return (
            <Section className={containerClassName} title={i18n._(t`Aanmelder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>
                            {
                                referringOrganizationOptions.find(
                                    option => option.value === prefillData?.['registration.referringOrganization']
                                )?.label
                            }
                        </Paragraph>
                        {prefillData?.['registration.referringOrganization'] === ReferringOrganizationEnum.Other && (
                            <Paragraph italic={true}>
                                {prefillData?.['registration.referringOrganizationOther']}
                            </Paragraph>
                        )}
                    </Field>

                    <Field label={i18n._(t`E-mailadres aanmelder`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>
                            {prefillData?.['registration.referringPerson.email']}
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Aanmelder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Select
                        options={referringOrganizationOptions}
                        name="registration.referringOrganization"
                        defaultValue={
                            defaultReferringOrganization
                                ? {
                                      value: defaultReferringOrganization,
                                      label: studentReferringOrganizationEnumTranslations[defaultReferringOrganization],
                                  }
                                : undefined
                        }
                        onChangeValue={option => {
                            setReferringOrganization(option ? (option.value as ReferringOrganizationEnum) : undefined)
                        }}
                        placeholder={i18n._(t`Selecteer aanmelder`)}
                    />
                </Field>
                {referringOrganization === ReferringOrganizationEnum.Other && (
                    <Field label={i18n._(t`Aanmelder anders`)} horizontal={true}>
                        <Input
                            name="registration.referringOrganizationOther"
                            placeholder={i18n._(t`Anders`)}
                            defaultValue={prefillData?.['registration.referringOrganizationOther'] ?? undefined}
                        />
                    </Field>
                )}
                <Field label={i18n._(t`E-mailadres aanmelder`)} horizontal={true}>
                    <Input
                        name="registration.referringPerson.email"
                        placeholder={i18n._(t`instantie@email.nl`)}
                        defaultValue={prefillData?.['registration.referringPerson.email'] ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentReferringOrganizationEnumOptions(): DefaultSelectOption[] {
        return Object.values(ReferringOrganizationEnum).map(value => ({
            label: studentReferringOrganizationEnumTranslations[value] ?? 'TRANSLATION MISSING',
            value: value,
        }))
    }
}
