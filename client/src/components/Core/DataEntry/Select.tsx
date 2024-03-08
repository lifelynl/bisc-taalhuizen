import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import React from 'react'
import {
    ActionMeta,
    OnChangeValue,
    components as reactSelectComponents,
    ControlProps,
    InputProps,
    MultiValueProps,
} from 'react-select'
import ReactAsyncSelect from 'react-select/async'
import ReactAsyncSelectCreatable from 'react-select/async-creatable'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import Row from '../Layout/Row/Row'
import { MutationErrorContext } from '../MutationErrorProvider/MutationErrorProvider'
import Paragraph from '../Typography/Paragraph'
import styles from './Select.module.scss'

export interface DefaultSelectOption {
    label: React.ReactNode
    value: string | number
    searchableLabel?: string
}

export interface Props<Option extends DefaultSelectOption, IsMulti extends boolean = false>
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value'> {
    className?: string
    grow?: boolean
    options: Option[]
    isMulti?: IsMulti
    isClearable?: boolean
    onChangeValue?: (value?: OnChangeValue<Option, IsMulti>) => void
    loadOptions?: (inputValue: string, callback: (options: Option[]) => void) => void
    isLoading?: boolean
    defaultValue?: Option | Option[]
    value?: Option | Option[]
    errorPath?: string
    creatable?: boolean
}

// This components should be outside of Select component, otherwise it could cause render issues
const CustomControlContainer = <Option extends DefaultSelectOption, IsMulti extends boolean = false>(
    props: ControlProps<Option, IsMulti>
) => <reactSelectComponents.Control {...props} />

const CustomInputContainer = <Option extends DefaultSelectOption, IsMulti extends boolean = false>(
    props: InputProps<Option, IsMulti>
) => <reactSelectComponents.Input {...props} />

const CustomMultiValueContainer = <Option extends DefaultSelectOption, IsMulti extends boolean = false>(
    props: MultiValueProps<Option, IsMulti>
) => <reactSelectComponents.MultiValue {...props} className={classNames(props.className, styles.value)} />

export const Select = <Option extends DefaultSelectOption, IsMulti extends boolean = false>(
    props: Props<Option, IsMulti>
) => {
    const { i18n } = useLingui()

    return (
        <MutationErrorContext.Consumer>
            {({ findAndConsumeFieldErrors }) => {
                const _errorPath = props.errorPath || props.name
                const mutationErrors = _errorPath ? findAndConsumeFieldErrors(_errorPath) : []
                const errorMessages = mutationErrors.map(e => e.message)

                const containerClassName = classNames(styles.container, props.className, {
                    [styles.grow]: props.grow,
                })

                const Component = props.creatable ? ReactAsyncSelectCreatable : ReactAsyncSelect

                return (
                    <div className={containerClassName}>
                        <Component<Option, IsMulti>
                            isClearable={props.isClearable ?? true}
                            onChange={handleChange}
                            isMulti={props.isMulti}
                            name={props.isMulti ? `${props.name}[]` : props.name}
                            isDisabled={props.disabled}
                            form={props.form}
                            isSearchable={true}
                            isLoading={props.isLoading}
                            noOptionsMessage={params =>
                                props.loadOptions && params.inputValue.length < 3
                                    ? i18n._(t`Blijf typen voor hints`)
                                    : i18n._(t`Geen opties mogelijk`)
                            }
                            loadOptions={loadOptions}
                            defaultOptions={true}
                            placeholder={
                                <span className={styles.placeholder}>
                                    {props.placeholder ?? i18n._(t`Selecteer...`)}
                                </span>
                            }
                            defaultValue={props.defaultValue}
                            formatCreateLabel={val => (
                                <Row justifyContent="space-between">
                                    <Paragraph subtle={true}>
                                        {i18n._('Toevoegen')} "{val}"
                                    </Paragraph>
                                    <Paragraph subtle={true}>
                                        <Icon type={IconType.add} />
                                    </Paragraph>
                                </Row>
                            )}
                            value={props.value}
                            components={{
                                Control: CustomControlContainer,
                                Input: CustomInputContainer,
                                MultiValue: CustomMultiValueContainer,
                            }}
                            className={styles.reactSelect}
                        />
                        {errorMessages.length > 0 &&
                            errorMessages.map((errorMessage, index) => (
                                <p key={index} className={styles.errorMessage}>
                                    {errorMessage}
                                </p>
                            ))}
                    </div>
                )
            }}
        </MutationErrorContext.Consumer>
    )

    function loadOptions(inputValue: string, callback: (options: Option[]) => void) {
        if (props.loadOptions) {
            // delegate loading options (possibly asyncronously) to the loadOptions prop
            props.loadOptions(inputValue, callback)
        } else if (props.options) {
            // default behaviour: use props.options and apply simple filtering for search
            const filteredOptions = defaultOptionsFilter<Option>(inputValue, props.options)
            callback(filteredOptions)
        }
    }

    function handleChange(newValue: OnChangeValue<Option, IsMulti>, actionMeta: ActionMeta<Option>) {
        if (props.onChangeValue) {
            props.onChangeValue(newValue)
        }
    }
}

function defaultOptionsFilter<Option extends DefaultSelectOption>(inputValue: string, options: Option[]): Option[] {
    return options.filter(option => {
        const stringLabel = option.label && typeof option.label === 'string' ? option.label : ''
        const searchableLabel = option.searchableLabel ?? stringLabel

        return searchableLabel.toLowerCase().includes(inputValue.toLowerCase())
    })
}
