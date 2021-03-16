import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import RoleLabelTag from '../../Core/DataDisplay/LabelTag/RoleLabelTag'
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
    prefillData?: AccountInformationFieldsetModel
    readOnly?: boolean
    roleOptions?: Role[][]
    rolesLoading?: boolean
    rolesError?: boolean
}

export interface AccountInformationFieldsetModel {
    email?: string
    role?: string
    createdAt?: string
    updatedAt?: string
}

interface Role {
    id: string
    name: string
}

const AccountInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, roleOptions, rolesLoading, rolesError } = props
    const { i18n } = useLingui()

    const renderRoleOptions = (item: Role[], i: number, a: Role[][]) => {
        if (readOnly) {
            return (
                <Row spacing={1} key={`${i}-${a.length}`}>
                    {item.map((role, i, a) => (
                        <RoleLabelTag key={`${i}-${a.length}`} role={role.name} />
                    ))}
                </Row>
            )
        }

        return (
            <Row key={`${i}-${a.length}`}>
                <RadioButton
                    name={'role'}
                    value={item.map(i => i.id)}
                    defaultChecked={isEqual(
                        prefillData?.role,
                        item.map(i => i.id)
                    )}
                />
                <Row spacing={1}>
                    {item.map((role, i, a) => (
                        <RoleLabelTag key={`${i}-${a.length}`} role={role.name} />
                    ))}
                </Row>
            </Row>
        )
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Accountgegevens`)}>
                <Column spacing={6}>
                    <Field label={i18n._(t`Email`)} horizontal={true}>
                        <Paragraph>{prefillData?.email}</Paragraph>
                    </Field>
                    {renderRoleField()}
                    {prefillData?.createdAt && (
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{prefillData?.createdAt}</Paragraph>
                        </Field>
                    )}
                    {prefillData?.createdAt && (
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.updatedAt}`)}</Paragraph>
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
                        defaultValue={prefillData?.email}
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
                    <Column spacing={3}>{roleOptions.map(renderRoleOptions)}</Column>
                </Field>
            )
        }
    }
}

export default AccountInformationFieldset
