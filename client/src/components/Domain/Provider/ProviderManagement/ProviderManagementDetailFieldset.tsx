import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import StreetNumberAdditionField from 'components/Core/DataEntry/StreetNumberAdditionField'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { AddressType, OrganizationType } from 'graphql/v2/generated/graphql'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import { RecursivePartialMaybe } from 'utils/objects/objects'

interface Props {
    readOnly?: boolean
    prefillData?: PrefillData
}

type PrefillData = Pick<OrganizationType, 'name' | 'telephone' | 'email'> & {
    address?: Pick<AddressType, 'street' | 'houseNumber' | 'houseNumberSuffix' | 'postalCode' | 'locality'> | null
}

export type ProviderManagementDetailFieldsetModel = RecursivePartialMaybe<
    Omit<PrefillData, 'address'> & {
        'address.street': string
        'address.houseNumber': string
        'address.houseNumberSuffix': string
        'address.postalCode': string
        'address.locality': string
    }
>

export const ProviderManagementDetailFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { prefillData, readOnly } = props

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
