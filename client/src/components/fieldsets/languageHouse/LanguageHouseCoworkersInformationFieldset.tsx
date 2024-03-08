import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Row from 'components/Core/Layout/Row/Row'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { EmployeeRole, Maybe, OrganizationTypeEnum, TeamType } from 'graphql/v2/generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'
import { TeamSelect } from 'components/Domain/LanguageHouse/Select/TeamSelect'

interface Props {
    prefillData?: LanguageHouseCoworkersInformationPrefillData
    readOnly?: true
    showTeams?: boolean
    showTeamSelectForOrganization?: string
    onEmailChange?: (email: string) => void
}

interface LanguageHouseCoworkersInformationPrefillData extends LanguageHouseCoworkersInformationFieldsetModel {
    createdAt?: string
    updatedAt?: string
    teams?: Pick<TeamType, 'name'>[] | null
}

export interface LanguageHouseCoworkersInformationFieldsetModel {
    'person.givenName'?: Maybe<string>
    'person.additionalName'?: Maybe<string>
    'person.familyName'?: Maybe<string>
    'person.email'?: Maybe<string>
    'person.telephone'?: Maybe<string>
    role?: Maybe<EmployeeRole>
    team?: Maybe<string>
}

// NOTE: Don't use these fieldset for new screens, these should be split up into existing shared InformationFieldset and AccountInformationFieldset
const LanguageHouseCoworkersInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, showTeams, onEmailChange, showTeamSelectForOrganization } = props
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
                                {NameFormatters.formattedLastName({
                                    familyName: prefillData?.['person.familyName'] || '',
                                    additionalName: prefillData?.['person.additionalName'] || '',
                                })}
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
                        <Field label={'Rol'} horizontal={true}>
                            {prefillData?.['role'] && (
                                <RoleLabelTag
                                    organizationType={OrganizationTypeEnum.LanguageHouse}
                                    role={prefillData.role}
                                />
                            )}
                        </Field>
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(prefillData?.['createdAt'])}</Paragraph>
                        </Field>
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(prefillData?.['updatedAt'])}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                {showTeams && (
                    <>
                        <HorizontalRule />
                        <Section title={i18n._('Teams')}>
                            <Field label={i18n._('Teams')} horizontal={true}>
                                <Paragraph>{prefillData?.teams?.map(t => t.name).join(', ')}</Paragraph>
                            </Field>
                        </Section>
                    </>
                )}
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
                                onChange={e => onEmailChange?.(e.currentTarget.value)}
                            />
                        </Field>
                        <Field label={i18n._(t`Rol`)} horizontal={true}>
                            <Column spacing={1}>
                                {[EmployeeRole.Coordinator, EmployeeRole.Employee].map((role, index) => (
                                    <Row key={index}>
                                        <RadioButton
                                            name="role"
                                            value={role}
                                            defaultChecked={role === prefillData?.role}
                                            label={
                                                <RoleLabelTag
                                                    organizationType={OrganizationTypeEnum.LanguageHouse}
                                                    role={role}
                                                />
                                            }
                                        />
                                    </Row>
                                ))}
                            </Column>
                        </Field>
                    </Column>
                </Section>
            </Column>
            {showTeamSelectForOrganization && (
                <>
                    <HorizontalRule />
                    <Section title={i18n._('Team')}>
                        <Field required={true} label={i18n._('Team')} horizontal={true}>
                            <TeamSelect organizationId={showTeamSelectForOrganization} />
                        </Field>
                    </Section>
                </>
            )}
            <Space pushTop={true} />
        </>
    )
}

export default LanguageHouseCoworkersInformationFieldset
