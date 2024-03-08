import isArray from 'lodash/isArray'

export enum BooleanCheckboxValue {
    yes = 'YES',
    no = 'NO',
}
export class Forms {
    public static getFormDataFromFormEvent<TData>(e: React.FormEvent<HTMLFormElement>): TData {
        const data = new FormData(e.currentTarget)
        type ToValue = FormDataEntryValue | FormDataEntryValue[] | undefined
        type ToEntry = [string, ToValue]
        let dataEntries: ToEntry[] = Array.from(data.entries())

        // Convert empty strings to undefined
        dataEntries = dataEntries.map(entry => {
            const key = entry[0]
            const value = entry[1] === '' ? undefined : entry[1]

            return [key, value]
        })

        // Convert multi-entries (e.g. `field[]`) to an array (e.g. `field = []`)
        dataEntries = dataEntries.reduce<ToEntry[]>((updatedEntries, entry) => {
            const key = entry[0]
            const value = entry[1] as FormDataEntryValue

            if (key?.endsWith('[]')) {
                // entry is multi-entry
                if (typeof value === 'undefined') {
                    return updatedEntries
                }

                const newKey = key.slice(0, -2)
                const existingMultiEntryArray = updatedEntries.find(entry => entry[0] === newKey)

                if (existingMultiEntryArray && isArray(existingMultiEntryArray[1])) {
                    // add value to existing array entry
                    existingMultiEntryArray[1].push(value)
                    return updatedEntries
                }

                // create new array entry
                const newEntry: ToEntry = [newKey, [value]]
                return [...updatedEntries, newEntry]
            }

            return [...updatedEntries, entry]
        }, [])

        return Object.fromEntries(dataEntries) as unknown as TData
    }

    public static getObjectsFromListWithStringList<TData>(
        compareKey: string,
        value?: string,
        items?: TData[]
    ): TData[] {
        const splittedValue = value?.split(', ') ?? []
        const list = splittedValue.map(valueItem => {
            const correspondingItem = items?.find(item => {
                // had to use any here, because the item is not known yet
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const field = (item as any)[compareKey]

                return field === valueItem
            })

            return correspondingItem
        })
        const filteredList: TData[] = list.filter(item => item) as TData[]

        return filteredList
    }

    public static getUpdatedValuesArrayForChangedCheckbox<ValueType>(
        allCheckboxValues: ValueType[],
        checkboxValue: ValueType,
        checked: boolean
    ): ValueType[] {
        // Checkbox checked. Add to array.
        if (checked && !allCheckboxValues.includes(checkboxValue)) {
            return [...allCheckboxValues, checkboxValue]
        }

        // Unchecked
        if (!checked && allCheckboxValues.includes(checkboxValue)) {
            const newFamilyComposition = [...allCheckboxValues]
            const index = newFamilyComposition.indexOf(checkboxValue)
            newFamilyComposition.splice(index, 1)
            return newFamilyComposition
        }

        // Nothing needs to change
        return allCheckboxValues
    }

    public static getNullableFieldValue<T extends Object, K extends keyof T>(key: K, obj: T) {
        if (!obj.hasOwnProperty(key)) {
            return
        }

        return obj[key] || null
    }

    public static getBooleanValueByCheckboxValue(checkboxValue?: BooleanCheckboxValue) {
        if (checkboxValue) {
            return checkboxValue === BooleanCheckboxValue.yes
        }
    }
}
