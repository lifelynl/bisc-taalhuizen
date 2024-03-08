import isObject from 'lodash/isObject'
import forIn from 'lodash/forIn'

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> }
export type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>
export type RecursiveMaybe<T> = { [P in keyof T]?: RecursiveMaybe<T[P] | null> }
export type RecursivePartialMaybe<T> = { [P in keyof T]?: RecursivePartialMaybe<T[P] | null> }

export function omitDeep(obj: any, omitKey: string) {
    forIn(obj, function (value, key) {
        if (isObject(value)) {
            omitDeep(value, omitKey)
        } else if (key === omitKey) {
            delete obj[key]
        }
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function areAllKeysUndefined(obj: any) {
    for (const key of Object.keys(obj)) {
        if (obj[key] !== undefined) {
            return false
        }
    }

    return true
}
