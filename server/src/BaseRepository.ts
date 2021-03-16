import { Injectable } from '@nestjs/common'
import { CommonGroundAPIs } from './CommonGroundAPI/CommonGroundAPIsEnum'

type NonNullableFields<T, K extends keyof T = keyof T> = NonNullable<T> &
    {
        [P in K]-?: NonNullable<T[P]>
    }

// function hasRequiredFields<T, K extends keyof T>(
//     object: T,
//     requiredFields: string[]
// ): object is NonNullableFields<T, K> {
//     if (!object) {
//         return false
//     }

//     for (const field of requiredFields) {
//         if (object[field as K] === undefined || object[field as K] === null) {
//             return false
//         }
//     }

//     return true
// }

export interface Dataloadable<T extends { id: string }> {
    findByIds(ids: readonly string[]): Promise<T[]>
}

@Injectable()
export abstract class BaseRepository {
    protected abstract commonGroundAPI: CommonGroundAPIs

    protected returnNonNullable<T>(object: T) {
        // TODO: Add type guard to make sure the fields are actually not null or undefined
        return object as NonNullableFields<NonNullable<typeof object>>
    }

    public makeURLfromID(id: string) {
        return `${this.commonGroundAPI}${id[0] === '/' ? '' : '/'}${id}`
    }

    // This will take any full URI and return the small version
    // If input is already small version then also the small version will be returned
    public stripURLfromID(fullURI: string) {
        // Input can be full URI or small version, for example:
        // - https://taalhuizen-bisc.commonground.nu/api/v1/wrc/organizations/12e0cd5a-6f52-4719-b310-4b2b50fcc076
        // - organizations/12e0cd5a-6f52-4719-b310-4b2b50fcc076
        const sections = fullURI.split('/')
        const uuid = sections.pop() // For example: 12e0cd5a-6f52-4719-b310-4b2b50fcc076
        const uuidPrefix = sections.pop() // For example: organizations
        const idWithoutURI = `${uuidPrefix}/${uuid}`

        return idWithoutURI
    }
}
