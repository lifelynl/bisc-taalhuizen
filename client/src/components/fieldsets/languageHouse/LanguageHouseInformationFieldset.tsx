import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DefaultSelectOption } from 'components/Core/DataEntry/Select'
import { LanguageHousePostcodeField } from 'components/Domain/LanguageHouse/Fields/LanguageHousePostcodeField'
import { Maybe } from 'graphql/v2/generated/graphql'
import React from 'react'
import { AdressFormatters } from 'utils/formatters/Address/Address'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: LanguageHouseInformationFieldsetPrefillData
    readOnly?: true
    postalCodesLoading?: boolean
    postalCodesLoad?: (inputValue: string, callback: (options: DefaultSelectOption[]) => void) => void
}
export interface LanguageHouseInformationFieldsetPrefillData {
    name?: Maybe<string>
    'address.street'?: Maybe<string>
    'address.houseNumber'?: Maybe<string>
    'address.houseNumberSuffix'?: Maybe<string>
    'address.postalCode'?: Maybe<string>
    'address.locality'?: Maybe<string>
    'address.country'?: Maybe<string>
    telephone?: Maybe<string>
    email?: Maybe<string>
    postalCodes?: Maybe<number[]>
}

// NOTE: Don't use these fieldset for new screens, these should be split up in a TaalhuisBranchInformationFieldset and TaalhuisContactInformationFieldset
const LanguageHouseInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, postalCodesLoad, postalCodesLoading } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.name}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Paragraph>
                                {AdressFormatters.formattedAddress({
                                    street: prefillData?.['address.street'],
                                    houseNumber: prefillData?.['address.houseNumber'],
                                    houseNumberSuffix: prefillData?.['address.houseNumberSuffix'],
                                })}
                            </Paragraph>
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['address.postalCode']}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['address.locality']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />
                <LanguageHousePostcodeField defaultValues={prefillData?.postalCodes} readOnly={true} />
                <HorizontalRule />

                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['telephone']}`)}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['email']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <Space pushTop={true} />
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                        <Input
                            name="name"
                            placeholder={i18n._(t`Taalhuis X`)}
                            defaultValue={prefillData?.name ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <StreetNumberAdditionField
                            prefixName="address."
                            prefillData={{
                                street: prefillData?.['address.street'] || '',
                                houseNumber: prefillData?.['address.houseNumber'] || '',
                                houseNumberSuffix: prefillData?.['address.houseNumberSuffix'] || '',
                            }}
                        />
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Input
                            name="address.postalCode"
                            placeholder={i18n._(t`1234AB`)}
                            defaultValue={prefillData?.['address.postalCode'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Input
                            name="address.locality"
                            placeholder={i18n._(t`Utrecht`)}
                            defaultValue={prefillData?.['address.locality'] ?? undefined}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <LanguageHousePostcodeField
                errorPath="postalCodes"
                loading={postalCodesLoading ?? false}
                defaultValues={prefillData?.postalCodes}
                required={true}
                loadOptions={postalCodesLoad}
            />
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telephone"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                defaultValue={prefillData?.['telephone'] ?? undefined}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                defaultValue={prefillData?.['email'] ?? undefined}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
        </>
    )
}

export default LanguageHouseInformationFieldset
