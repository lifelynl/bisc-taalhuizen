import React from 'react'
import Input, { BaseInputProps } from './Input'

interface Props extends BaseInputProps {}

export const YearInput: React.FunctionComponent<Props> = props => {
    return <Input type="number" min="1900" max="2099" step="1" {...props} />
}
