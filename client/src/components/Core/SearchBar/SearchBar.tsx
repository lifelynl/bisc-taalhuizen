import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import Input from 'components/Core/DataEntry/Input'
import { IconType } from '../Icon/IconType'
import styles from './SearchBar.module.scss'
import Icon from '../Icon/Icon'
import debounce from 'lodash/debounce'
import { IconButton } from '../Button/IconButton'

interface Props {
    onSearch: (searchValue: string) => void
    defaultValue?: string
}

export const SearchBar: React.FunctionComponent<Props> = props => {
    const { onSearch, defaultValue } = props
    const { i18n } = useLingui()
    const [value, setValue] = useState(defaultValue)

    return (
        <div className={styles.wrapper}>
            <Input
                name="searchbar"
                placeholder={i18n._(`Zoek op naam`)}
                defaultValue={defaultValue}
                value={value}
                onChangeValue={val => {
                    debounce(() => onSearch(val), 200)()
                    setValue(val)
                }}
                className={styles.input}
            />
            {value && value.length > 0 && (
                <IconButton
                    className={styles.buttonicon}
                    onClick={() => {
                        onSearch('')
                        setValue('')
                    }}
                    icon={IconType.close}
                />
            )}
            <Icon type={IconType.search} className={styles.icon} />
        </div>
    )
}
