import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import StreetNumberAdditionField from 'components/Core/DataEntry/StreetNumberAdditionField'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AddressType, OrganizationType } from 'graphql/v2/generated/graphql'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import { BooleanCheckboxValue } from 'utils/forms'
import { RecursivePartialMaybe } from 'utils/objects/objects'

interface Props {
    prefillData?: PrefillData
    readOnly?: boolean
}

type PrefillData = Pick<OrganizationType, 'name' | 'telephone' | 'email' | 'type' | 'hasLimitedEditRights'> & {
    address?: Pick<
        AddressType,
        'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality' | 'country'
    > | null
}

export type BiscProviderFieldsetModel = RecursivePartialMaybe<
    Omit<PrefillData, 'address' | 'hasLimitedEditRights'> & {
        'address.street': string
        'address.houseNumber': string
        'address.houseNumberSuffix': string
        'address.postalCode': string
        'address.locality': string
    }
> & { hasLimitedEditRights?: BooleanCheckboxValue }

export function BiscProviderFieldset(props: Props) {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const limitedEditRightsOptions: Record<BooleanCheckboxValue, string> = {
        [BooleanCheckboxValue.yes]: i18n._(t`Met beperkte bewerkingsrechten`),
        [BooleanCheckboxValue.no]: i18n._(t`Met uitgebreide bewerkingsrechten`),
    }

    const defaultEditRightsCheckBoxValue = prefillData?.hasLimitedEditRights
        ? BooleanCheckboxValue.yes
        : BooleanCheckboxValue.no

    if (readOnly) {
        if (!prefillData) {
            return null
        }

        return (
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field horizontal={true} label={i18n._(t`Naam vestiging`)}>
                            <Paragraph>{i18n._(t`${prefillData.name}`)}</Paragraph>
                        </Field>
                        <Field horizontal={true} label={i18n._(t`Straat en huisnr.`)}>
                            <Paragraph>
                                {AdressFormatters.formattedAddress({
                                    street: prefillData.address?.street,
                                    houseNumber: prefillData.address?.houseNumber,
                                    houseNumberSuffix: prefillData.address?.houseNumberSuffix,
                                })}
                            </Paragraph>
                        </Field>
                        <Field horizontal={true} label={i18n._(t`Postcode`)}>
                            <Paragraph>{i18n._(t`${prefillData.address?.postalCode}`)}</Paragraph>
                        </Field>
                        <Field horizontal={true} label={i18n._(t`Plaats`)}>
                            <Paragraph>{i18n._(t`${prefillData.address?.locality}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Type aanbieder`)}>
                    <Column spacing={4}>
                        <Field horizontal={true} label={i18n._(t`Type aanbieder`)}>
                            <Paragraph>{limitedEditRightsOptions[defaultEditRightsCheckBoxValue]}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData['telephone']}`)}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData['email']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field horizontal={true} label={i18n._(t`Naam vestiging`)} required={true}>
                        <Input
                            name="name"
                            placeholder={i18n._(t`Naam vestiging`)}
                            defaultValue={prefillData?.name ?? undefined}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Straat en huisnr.`)}>
                        <StreetNumberAdditionField
                            prefixName="address."
                            prefillData={{
                                street: prefillData?.address?.street ?? undefined,
                                houseNumber: prefillData?.address?.houseNumber ?? undefined,
                                houseNumberSuffix: prefillData?.address?.houseNumberSuffix ?? undefined,
                            }}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Postcode`)}>
                        <Input
                            name="address.postalCode"
                            placeholder={i18n._(t`1234 AB`)}
                            defaultValue={prefillData?.address?.postalCode ?? undefined}
                        />
                    </Field>
                    <Field horizontal={true} label={i18n._(t`Plaats`)}>
                        <Input
                            name="address.locality"
                            placeholder={i18n._(t`Utrecht`)}
                            defaultValue={prefillData?.address?.locality ?? undefined}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Type aanbieder`)}>
                <Column spacing={4}>
                    <Field required={true} horizontal={true} label={i18n._(t`Type aanbieder`)}>
                        <Column spacing={4}>
                            {Object.entries(limitedEditRightsOptions).map(([type, label]) => (
                                <RadioButton
                                    key={type}
                                    name="hasLimitedEditRights"
                                    value={type}
                                    label={label}
                                    defaultChecked={type === defaultEditRightsCheckBoxValue}
                                />
                            ))}
                        </Column>
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Input
                            name={'telephone'}
                            placeholder={i18n._(t`030 - 123 45 67`)}
                            defaultValue={prefillData?.telephone || ''}
                        />
                    </Field>
                    <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                        <Input
                            name={'email'}
                            placeholder={i18n._(t`aanbieder@email.nl`)}
                            defaultValue={prefillData?.email || ''}
                        />
                    </Field>
                </Column>
            </Section>
        </>
    )
}
