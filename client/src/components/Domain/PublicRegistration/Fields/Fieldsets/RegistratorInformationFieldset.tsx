import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { Maybe } from 'graphql/v2/generated/graphql'
import React from 'react'

export interface RegistratorInformationFieldsetModel {
    'registration.referringOrganizationOther'?: Maybe<string>
    'registration.referringPerson.givenName'?: Maybe<string>
    'registration.refferingTeam'?: Maybe<string>
    'registration.referringPerson.email'?: Maybe<string>
    'registration.referringPerson.telephone'?: Maybe<string>
}

export const RegistratorInformationFieldset: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Aanmelder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende organisatie`)} horizontal={true} required={true}>
                    <Input name="registration.referringOrganizationOther" placeholder={i18n._(t`Uw organisatie`)} />
                </Field>
                <Field label={i18n._(t`Uw naam`)} horizontal={true} required={true}>
                    <Input name="registration.referringPerson.givenName" placeholder={i18n._(t`Uw naam`)} />
                </Field>
                <Field label={i18n._(t`Team`)} horizontal={true}>
                    <Input name="registration.refferingTeam" placeholder={i18n._(t`Team of afdeling`)} />
                </Field>
                <Field label={i18n._(t`Uw telefoonnummer`)} horizontal={true} required={true}>
                    <Input name="registration.referringPerson.telephone" placeholder={i18n._(t`06 - 12 34 56 78`)} />
                </Field>
                <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                    <Input name="registration.referringPerson.email" placeholder={i18n._(t`naam@organisatie.nl`)} />
                </Field>
            </Column>
        </Section>
    )
}
