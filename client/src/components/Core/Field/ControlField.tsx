import React from 'react'
import { FieldControl } from '../../hooks/fieldsets/useFieldsetControl'
import Field, { FieldProps } from './Field'

interface Props extends FieldProps {
    control?: FieldControl
}

const ControlField: React.FunctionComponent<Props> = props => {
    const { control, children } = props

    if (control?.hidden) {
        return null
    }

    return (
        <Field {...props} required={control?.required}>
            {children}
        </Field>
    )
}

export default ControlField
