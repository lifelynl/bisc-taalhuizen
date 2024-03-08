import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'

import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Maybe } from 'graphql/v2/generated/graphql'

interface Props {
    prefillData?: ReferringOrganizationData
    className?: string
}

interface ReferringOrganizationData {
    'person.createdAt'?: Maybe<string>
    'registration.selfRegistered'?: Maybe<boolean>
    'registration.referringOrganizationOther'?: Maybe<string>
    'registration.referringTeam'?: Maybe<string>
    'registration.referringPerson.familyName'?: Maybe<string>
    'registration.referringPerson.additionalName'?: Maybe<string>
    'registration.referringPerson.givenName'?: Maybe<string>
    'registration.referringPerson.email'?: Maybe<string>
    'registration.referringPerson.telephone'?: Maybe<string>
}

export const ReferringOrganizationReadonlyFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, className } = props
    const { i18n } = useLingui()
    const containerClassName = classNames(styles, className)

    return (
        <Section className={containerClassName} title={i18n._(t`Organisatie`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Datum`)} horizontal={true}>
                    <Paragraph>
                        {prefillData?.['person.createdAt'] &&
                            DateFormatters.formattedDate(prefillData?.['person.createdAt'])}
                    </Paragraph>
                </Field>

                {prefillData?.['registration.selfRegistered']
                    ? renderSelfRegisteredFields()
                    : renderNonSelfRegisteredFields()}
            </Column>
        </Section>
    )

    function renderSelfRegisteredFields() {
        return (
            <>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Paragraph italic={true}>{i18n._(t`Deze deelnemer heeft zichzelf aangemeld`)}</Paragraph>
                </Field>
            </>
        )
    }

    function renderNonSelfRegisteredFields() {
        return (
            <>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Paragraph>{prefillData?.['registration.referringOrganizationOther']}</Paragraph>
                </Field>

                <Field label={i18n._(t`Team`)} horizontal={true}>
                    <Paragraph className={styles.paragraph}>{prefillData?.['registration.referringTeam']}</Paragraph>
                </Field>

                <Field label={i18n._(t`Naam`)} horizontal={true}>
                    <Paragraph>
                        {NameFormatters.formattedFullname({
                            givenName: prefillData?.['registration.referringPerson.givenName'] || undefined,
                            additionalName: prefillData?.['registration.referringPerson.additionalName'] || undefined,
                            familyName: prefillData?.['registration.referringPerson.familyName'] || undefined,
                        })}
                    </Paragraph>
                </Field>

                <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                    <Paragraph className={styles.paragraph}>
                        {prefillData?.['registration.referringPerson.email']}
                    </Paragraph>
                </Field>

                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Paragraph className={styles.paragraph}>
                        {prefillData?.['registration.referringPerson.telephone']}
                    </Paragraph>
                </Field>
            </>
        )
    }
}
