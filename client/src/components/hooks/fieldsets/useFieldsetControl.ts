import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { useEffect, useState } from 'react'
import { Validator } from 'utils/validators/types'
import isEqual from 'lodash/isEqual'

export interface FieldControl {
    hidden?: boolean
    required?: boolean
    validators?: Validator<string | null>[]
}

export interface FieldsetControlsProps<T extends string> {
    fieldControls?: FieldsContent<T>
}

type FieldsContent<T extends string> = { [key in T]?: FieldControl }
export function useFieldsetControl<T extends string>(
    defaultValues: FieldsContent<T>,
    overwriteValues?: FieldsContent<T>
) {
    const [controls, setControls] = useState<FieldsContent<T>>(defaultValues)
    useEffect(() => {
        const draftValues = cloneDeep(defaultValues)
        merge([draftValues], [overwriteValues])

        if (!isEqual(draftValues, controls)) {
            setControls(draftValues)
        }
    }, [overwriteValues, controls, defaultValues])

    return controls
}
