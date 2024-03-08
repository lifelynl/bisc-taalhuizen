import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import Input, { BaseInputProps } from './Input'

interface Props extends BaseInputProps {
    defaultValue?: string
}

const DateInput: React.FunctionComponent<Props> = props => {
    const { defaultValue, ...rest } = props
    const formattedDefaultValue = defaultValue && getFormattedDate(defaultValue)

    return <Input type="date" defaultValue={formattedDefaultValue} {...rest} />

    function getFormattedDate(dateString: string) {
        const date = new Date(dateString)
        return DateFormatters.formattedUsaDate(date.toString())
    }
}

export default DateInput
