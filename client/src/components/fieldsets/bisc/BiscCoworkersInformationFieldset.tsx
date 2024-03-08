import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'graphql/v2/generated/graphql'
import React from 'react'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: BiscCoworkersInformationFieldsetModel
    readOnly?: true
    onEmailChange?: (value: string) => void
}

export interface BiscCoworkersInformationFieldsetModel {
    'person.givenName'?: Maybe<string>
    'person.additionalName'?: Maybe<string>
    'person.familyName'?: Maybe<string>
    'person.email'?: Maybe<string>
    'person.telephone'?: Maybe<string>
}

export const BiscCoworkersInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, onEmailChange } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Gegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['person.givenName']}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                            <Paragraph>
                                {i18n._(
                                    t`${prefillData?.['person.familyName']}${
                                        prefillData?.['person.additionalName'] &&
                                        prefillData?.['person.additionalName']?.length > 0
                                            ? ','
                                            : ''
                                    } ${prefillData?.['person.additionalName']}`
                                )}
                            </Paragraph>
                        </Field>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['person.telephone']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['person.email']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <Space pushTop={true} />
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                        <Input
                            name="person.givenName"
                            placeholder={i18n._(t`Peter`)}
                            defaultValue={prefillData?.['person.givenName'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input
                            name="person.additionalName"
                            placeholder={i18n._(t`de`)}
                            defaultValue={prefillData?.['person.additionalName'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                        <Input
                            name="person.familyName"
                            placeholder={i18n._(t`Wit`)}
                            defaultValue={prefillData?.['person.familyName'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true} required={true}>
                        <Input
                            name="person.telephone"
                            placeholder={i18n._(t`030 - 123 45 67`)}
                            defaultValue={prefillData?.['person.telephone'] ?? undefined}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input
                                name="person.email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                defaultValue={prefillData?.['person.email'] ?? undefined}
                                onBlur={e => onEmailChange?.(e.target.value)}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
        </>
    )
}
