import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { useEffect, useState } from 'react'
interface ContentField {
    label?: string
    description?: string
    placeholder?: string
}

export interface FieldsetContentProps<T extends string> {
    fieldNaming?: FieldsContentOverwriteValues<T>
}

type GenericContentKeys<T extends string> = {
    [key in T]?: ContentField
}
type FieldsContentDefaultValues<T extends string> = GenericContentKeys<T> & { title: string }
type FieldsContentOverwriteValues<T extends string> = GenericContentKeys<T> & { title?: string }

export function useFieldsetContent<T extends string>(
    defaultValues: FieldsContentDefaultValues<T>,
    overwriteValues?: FieldsContentOverwriteValues<T>
) {
    const [content, setContent] = useState<FieldsContentDefaultValues<T>>(defaultValues)

    useEffect(() => {
        const draftValues = cloneDeep(defaultValues)
        merge([draftValues], [overwriteValues])

        setContent(draftValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overwriteValues])

    return content
}
