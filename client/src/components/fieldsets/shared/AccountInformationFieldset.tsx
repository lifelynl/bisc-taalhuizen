import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { EmployeeRole, Maybe, OrganizationTypeEnum } from 'graphql/v2/generated/graphql'
import React from 'react'
import { DateFormatters } from '../../../utils/formatters/Date/Date'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    organizationType: OrganizationTypeEnum
    prefillData?: AccountInformationFieldsetPrefillData
    readOnly?: boolean
    // TODO: useFieldsetControls should be implemented here instead of this
    hideRoles?: boolean
    onEmailChange?: (value: string) => void
}

interface AccountInformationFieldsetPrefillData {
    email?: Maybe<string>
    role?: Maybe<EmployeeRole>
    createdAt?: string
    updatedAt?: string
}

export interface AccountInformationFieldsetFormModel {
    email?: string
    role?: EmployeeRole
}

const AccountInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, hideRoles, onEmailChange } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Accountgegevens`)}>
                <Column spacing={6}>
                    <Field label={i18n._(t`Email`)} horizontal={true}>
                        <Paragraph>{prefillData?.email}</Paragraph>
                    </Field>

                    {!hideRoles && (
                        <Field label={i18n._(t`Rol`)} horizontal={true}>
                            <Row spacing={1}>
                                {prefillData?.role && (
                                    <RoleLabelTag role={prefillData.role} organizationType={props.organizationType} />
                                )}
                            </Row>
                        </Field>
                    )}

                    {prefillData?.createdAt && (
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(prefillData.createdAt)}</Paragraph>
                        </Field>
                    )}
                    {prefillData?.updatedAt && (
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(prefillData.updatedAt)}</Paragraph>
                        </Field>
                    )}
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Accountgegevens`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Email`)} horizontal={true} required={true}>
                    <Input
                        name="email"
                        placeholder={i18n._(t`john@doe.com`)}
                        defaultValue={prefillData?.email ?? ''}
                        required={true}
                        onBlur={e => onEmailChange?.(e.target.value)}
                    />
                </Field>

                {!hideRoles && (
                    <Field label={i18n._(t`Rol`)} horizontal={true}>
                        <Column spacing={3}>{renderRoleOptions()}</Column>
                    </Field>
                )}
            </Column>
        </Section>
    )

    function renderRoleOptions() {
        if (props.organizationType === OrganizationTypeEnum.LanguageHouse) {
            return renderRoleOptionsByOptions([EmployeeRole.Coordinator, EmployeeRole.Employee])
        }

        if (props.organizationType === OrganizationTypeEnum.Provider) {
            return renderRoleOptionsByOptions([
                EmployeeRole.Coordinator,
                EmployeeRole.Mentor,
                EmployeeRole.CoordinatorMentor,
                EmployeeRole.Volunteer,
            ])
        }
    }

    function renderRoleOptionsByOptions(roles: EmployeeRole[]) {
        return roles.map((role, index) => (
            <Row key={index}>
                <RadioButton name="role" value={role} defaultChecked={role === prefillData?.role} />
                <RoleLabelTag organizationType={props.organizationType} role={role} />
            </Row>
        ))
    }
}

export default AccountInformationFieldset
