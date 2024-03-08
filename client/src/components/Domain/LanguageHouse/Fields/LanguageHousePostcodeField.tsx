import { useLingui } from '@lingui/react'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import Spinner, { SpinnerAnimation } from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Maybe } from 'graphql/v2/generated/graphql'

interface Props {
    defaultValues?: Maybe<number[]>
    readOnly?: boolean
    errorPath?: string
    disabled?: boolean
    options?: DefaultSelectOption[]
    loading?: boolean
    required?: boolean
    loadOptions?: (inputValue: string, callback: (options: DefaultSelectOption[]) => void) => void
    inputValue?: string
}

export const LanguageHousePostcodeField = (props: Props) => {
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
                {readOnly ? <Paragraph>{defaultValues?.join(', ')}</Paragraph> : renderSelectField()}
            </Field>
        </Section>
    )

    function renderSelectField() {
        if (props.loading) {
            return <Spinner type={SpinnerAnimation.simpleSpinner} />
        }

        const defaultOptions = defaultValues?.map(c => ({ label: c, value: c }))

        return (
            <Select<DefaultSelectOption, true>
                errorPath={errorPath || 'codes'}
                name="postalCodes"
                isMulti={true}
                loadOptions={props.loadOptions}
                isClearable={true}
                defaultValue={defaultOptions}
                options={props.options || []}
                disabled={disabled}
                placeholder={i18n._('Selecteer postcodegebied(en)')}
            />
        )
    }
}
