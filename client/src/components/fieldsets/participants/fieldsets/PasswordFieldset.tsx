import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Input from 'components/Core/DataEntry/Input'
import Password from 'components/Core/DataEntry/Password'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { PasswordValidators } from 'utils/validators/PasswordValidators'
import PasswordStrengthBar from 'components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'

interface Props {
    prefillData?: Partial<PasswordFieldsetModel>
    readOnly?: boolean
}

export interface PasswordFieldsetModel {
    currentPassword: string
    password: string
    passwordRepeat: string
}

const PasswordFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly } = props

    const { i18n } = useLingui()
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>('')

    if (readOnly) {
        return (
            <Section title={i18n._(t`Wachtwoord aanpassen`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Huidig wachtwoord`)} horizontal={true}>
                        <p>••••••••••••</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Wachtwoord aanpassen`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Huidig wachtwoord`)} horizontal={true}>
                    <Input name={'currentPassword'} type={'password'} validators={[GenericValidators.required]} />
                </Field>
                <Field label={i18n._(t`Nieuw wachtwoord`)} horizontal={true}>
                    <Column spacing={6}>
                        <Password
                            onChangeValue={value => setNewPassword(value)}
                            name={'password'}
                            placeholder={i18n._(t`Nieuw wachtwoord`)}
                            validators={[GenericValidators.required, PasswordValidators.passwordStrength]}
                        />
                        <PasswordStrengthBar value={newPassword} />
                    </Column>
                </Field>
                <Field label={i18n._(t`Herhaal wachtwoord`)} horizontal={true}>
                    <Password
                        name={'passwordRepeat'}
                        placeholder={i18n._(t`Herhaal wachtwoord`)}
                        onChangeValue={value => setNewPasswordRepeat(value)}
                        validators={[
                            GenericValidators.required,
                            value =>
                                PasswordValidators.stringsMatch({
                                    newPassword: newPassword,
                                    repeatPassword: newPasswordRepeat,
                                }),
                        ]}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default PasswordFieldset
