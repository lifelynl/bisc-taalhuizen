import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { DateFormatters } from '../../../utils/formatters/Date/Date'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import RoleLabelTag from '../../Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import ErrorBlock from '../../Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Center from '../../Core/Layout/Center/Center'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: AccountInformationFieldsetPrefillData
    readOnly?: boolean
    roleOptions?: string[][]
    rolesLoading?: boolean
    rolesError?: boolean
}

export interface AccountInformationFieldsetPrefillData {
    email?: string | null
    roles?: string[]
    createdAt?: string | Date
    updatedAt?: string | Date
}

export interface AccountInformationFieldsetFormModel {
    email?: string
    roles?: string
    createdAt?: string
    updatedAt?: string
}

const AccountInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, roleOptions, rolesLoading, rolesError } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Accountgegevens`)}>
                <Column spacing={6}>
                    <Field label={i18n._(t`Email`)} horizontal={true}>
                        <Paragraph>{prefillData?.email}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Rol`)} horizontal={true}>
                        <Row spacing={1}>
                            {prefillData?.roles?.map((role, i, a) => (
                                <RoleLabelTag key={`${i}-${a.length}`} role={role} />
                            ))}
                        </Row>
                    </Field>

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
                        validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                    />
                </Field>
                {renderRoleField()}
            </Column>
        </Section>
    )

    function renderRoleField() {
        if (rolesLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.simpleSpinner} />
                </Center>
            )
        }

        if (rolesError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (roleOptions) {
            return (
                <Field label={i18n._(t`Rol`)} horizontal={true}>
                    <Column spacing={3}>{renderRoleOptions(roleOptions)}</Column>
                </Field>
            )
        }
    }

    function renderRoleOptions(roleOptions: string[][]) {
        return roleOptions.map((roleOption: string[], index: number, roleOptions: string[][]) => {
            const isChecked = isEqual(roleOption.sort(), prefillData?.roles?.sort())

            return (
                <Row key={`${index}-${roleOptions.length}`}>
                    <RadioButton required={true} name={'roles'} value={roleOption} defaultChecked={isChecked} />
                    <Row spacing={1}>{renderRoleRows(roleOption)}</Row>
                </Row>
            )
        })
    }

    function renderRoleRows(roleOption: string[]) {
        return roleOption.map((role, i, a) => <RoleLabelTag key={`${i}-${a.length}`} role={role} />)
    }
}

export default AccountInformationFieldset
