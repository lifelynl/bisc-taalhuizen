import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'
import { useEffect, useState } from 'react'
interface ContentField {
    label: string
    placeholder?: string
}

export interface FieldsetContentProps<T extends string> {
    fieldNaming?: FieldsContent<T>
}

type FieldsContent<T extends string> = { [key in T]?: ContentField }
export function useFieldsetContent<T extends string>(
    defaultValues: FieldsContent<T>,
    overwriteValues?: FieldsContent<T>
) {
    const [content, setContent] = useState<FieldsContent<T>>(defaultValues)

    useEffect(() => {
        const draftValues = cloneDeep(defaultValues)
        merge([draftValues], [overwriteValues])

        setContent(draftValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overwriteValues])

    return content
}
