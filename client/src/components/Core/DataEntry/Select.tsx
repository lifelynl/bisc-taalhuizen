import classNames from 'classnames'
import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Select.module.scss'
import Input from './Input'

interface Props {
    name: string
    className?: string
    value?: string
    placeholder?: string
    disabled?: boolean
    options: string[]
    grow?: boolean
}

const Select: React.FunctionComponent<Props> = ({ disabled, placeholder, options, name, className, grow }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string | undefined>(placeholder)
    const [filteredOptions, setFilteredOptions] = useState<string[]>()
    const containerClassNames = classNames(styles.container, className, {
        [styles.grow]: grow,
    })

    return (
        <div className={containerClassNames}>
            <div className={styles.selectTrigger}>
                <Input
                    grow={true}
                    name={name}
                    className={styles.input}
                    value={selectedValue}
                    onChangeValue={value => {
                        setOpen(true)
                        setSelectedValue(value)
                        handleSearch(value)
                    }}
                    disabled={disabled}
                />
                <Icon
                    className={classNames(styles.arrow, {
                        [styles.disabledArrow]: !!disabled,
                    })}
                    type={getIconType(open)}
                    onClick={() => !disabled && setOpen(!open)}
                />
            </div>
            {renderList(filteredOptions ? filteredOptions : options)}
        </div>
    )

    function renderList(list: string[]) {
        if (!open) {
            return null
        }

        return (
            <div className={styles.options}>
                {list.map(option => (
                    <span
                        key={option}
                        onClick={() => {
                            setOpen(!open)
                            setSelectedValue(option)
                        }}
                    >
                        {option}
                    </span>
                ))}
            </div>
        )
    }

    function getPossibleNames(name: string, str: string) {
        const queryString = str
            .split('')
            .map(x => {
                return `(?=.*${x})`
            })
            .join('')
        const regex = new RegExp(`${queryString}`, 'g')
        return name.match(regex)
    }

    function handleSearch(value: string) {
        const query = value.toLowerCase()
        const filteredOptionsList = options.filter(option => {
            const optionSubstring = option.substring(0, 3).toLowerCase()
            return option.toLowerCase().includes(query) || getPossibleNames(optionSubstring, query)
        })

        if (filteredOptionsList.length > 0) {
            setFilteredOptions(filteredOptionsList)
        } else {
            setFilteredOptions(undefined)
        }
    }

    function getIconType(state: boolean): IconType {
        const iconType = state === false ? IconType.arrowDown : IconType.arrowUp
        return iconType
    }
}

export default Select
