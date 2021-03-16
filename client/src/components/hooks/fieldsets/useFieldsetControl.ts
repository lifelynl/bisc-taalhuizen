import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { useCallback, useEffect, useState } from 'react'
import { Validator } from '../../../utils/validators/types'

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

        setControls(draftValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overwriteValues])

    return controls
}
