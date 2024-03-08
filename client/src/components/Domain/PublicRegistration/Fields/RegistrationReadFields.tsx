import React from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { ContactInformationFieldset } from 'components/fieldsets/shared/ContactInformationFieldset'
import { PersonInformationFieldset } from 'components/fieldsets/shared/PersonInformationFieldset'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import Field from 'components/Core/Field/Field'
import nl2br from 'react-nl2br'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { StudentType } from 'graphql/v2/generated/graphql'

interface Props {
    student: Partial<StudentType>
}

export const RegistrationReadFields: React.FunctionComponent<Props> = props => {
    const { student } = props
    const { i18n } = useLingui()

    const address = student?.person?.address

    return (
        <>
            <PersonInformationFieldset
                alternativeFieldsetTitle={i18n._(t`Naam`)}
                readOnly={true}
                prefillData={{
                    'person.givenName': student?.person?.givenName,
                    'person.additionalName': student?.person?.additionalName,
                    'person.familyName': student?.person?.familyName,
                }}
                fieldControls={{
                    birthplace: {
                        hidden: true,
                    },
                    birthday: {
                        hidden: true,
                    },
                    gender: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                alternativeFieldsetTitle={i18n._(t`Adresgegevens`)}
                readOnly={true}
                prefillData={{
                    'person.address.street': address?.street,
                    'person.address.houseNumber': address?.houseNumber,
                    'person.address.houseNumberSuffix': address?.houseNumberSuffix,
                    'person.address.postalCode': address?.postalCode,
                    'person.address.locality': address?.locality,
                }}
                fieldControls={{
                    email: { hidden: true },
                    telephone: { hidden: true },
                    emergencyTelephone: { hidden: true },
                    contactPreference: { hidden: true },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                readOnly={true}
                prefillData={{
                    'person.telephone': student?.person?.telephone,
                    'person.email': student?.person?.email,
                }}
                fieldControls={{
                    address: { hidden: true },
                    postalCode: { hidden: true },
                    locality: { hidden: true },
                    emergencyTelephone: { hidden: true },
                    contactPreference: { hidden: true },
                }}
            />
            <HorizontalRule />
            <Section title={i18n._(t`Aanmelder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Datum`)} horizontal={true}>
                        <Paragraph>{DateFormatters.formattedDate(student?.person?.createdAt)}</Paragraph>
                    </Field>
                    {student?.registration?.selfRegistered ? renderSelfRegisteredInfo() : renderNonSelfRegisteredInfo()}
                </Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Toelichting`)}>
                <Column spacing={4}>
                    <Field horizontal={true} label={i18n._(t`Notitie`)}>
                        <Paragraph>{nl2br(student?.registration?.remarks)}</Paragraph>
                    </Field>
                </Column>
            </Section>
        </>
    )

    function renderSelfRegisteredInfo() {
        return (
            <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                <Paragraph italic={true}>{i18n._(t`Deze deelnemer heeft zichzelf aangemeld`)}</Paragraph>
            </Field>
        )
    }

    function renderNonSelfRegisteredInfo() {
        return (
            <>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Paragraph>{student?.registration?.referringOrganizationOther}</Paragraph>
                </Field>
                <Field label={i18n._(t`Naam`)} horizontal={true}>
                    <Paragraph>
                        {student?.registration?.referringPerson &&
                            NameFormatters.formattedFullname(student?.registration?.referringPerson)}
                    </Paragraph>
                </Field>
                <Field label={i18n._(t`Team`)} horizontal={true}>
                    <Paragraph>{student?.registration?.referringTeam}</Paragraph>
                </Field>
                <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                    <Paragraph>{student?.registration?.referringPerson?.email}</Paragraph>
                </Field>
                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Paragraph>{student?.registration?.referringPerson?.telephone}</Paragraph>
                </Field>
            </>
        )
    }
}
