import { useLingui } from '@lingui/react'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Maybe, PostalCodeAreaType } from 'graphql/v2/generated/graphql'

interface Props {
    defaultValues?: Maybe<Array<Pick<PostalCodeAreaType, 'code' | 'id'>>>
    readOnly?: boolean
    errorPath?: string
    disabled?: boolean
    options?: DefaultSelectOption[]
    required?: boolean
    inputValue?: string
}

export const TeamPostcodeField = (props: Props) => {
    const { defaultValues, readOnly, errorPath, disabled } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._('Postcodegebied(en)')}>
            <Field
                readOnly={disabled || readOnly}
                label={i18n._('Postcodegebied(en)')}
                horizontal={true}
                required={props.required}
            >
                {readOnly ? <Paragraph>{defaultValues?.map(d => d.code).join(', ')}</Paragraph> : renderSelectField()}
            </Field>
        </Section>
    )

    function renderSelectField() {
        const defaultOptions = defaultValues?.map(c => ({ label: c.code, value: c.id }))

        return (
            <Select<DefaultSelectOption, true>
                errorPath={errorPath || 'codes'}
                name="codes"
                isMulti={true}
                isClearable={true}
                defaultValue={defaultOptions}
                options={props.options || []}
                disabled={disabled}
                placeholder={i18n._('Selecteer postcodegebied(en)')}
            />
        )
    }
}
