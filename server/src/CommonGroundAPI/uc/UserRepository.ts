import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { UCRepository } from '../UCRepository'

type UserEntity = {
    id: string
    dateCreated?: string
    dateModified?: string
    email: string
    userRoles: { id: string; name: string }[]
}

@Injectable()
export class UserRepository extends UCRepository {
    public async createUser(email: string, personId: string, userGroupId: string, passwordHash: string) {
        const result = await this.sdk.createUser({
            input: {
                username: email,
                person: personId,
                userGroups: [userGroupId],
                password: passwordHash,
                locale: 'nl',
            },
        })

        const userObject = result?.createUser?.user
        assertNotNil(userObject, `Failed to create user`)

        userObject.id = this.makeURLfromID(userObject.id)

        return this.returnNonNullable(userObject)
    }

    public async deleteUser(id: string) {
        try {
            const result = await this.sdk.deleteUser({ input: { id: this.stripURLfromID(id) } })
            return !!result
        } catch {
            // allow this to fail, it seems to get auto deleted sometimes
        }

        return true
    }

    public async findByEmail(email: string) {
        const result = await this.sdk.findUsersByUsername({ username: email })

        const userEdges = result.users?.edges
        assertNotNil(userEdges)

        if (userEdges.length === 0) {
            return null
        }

        if (userEdges.length > 1) {
            throw new Error(`Found multiple users with email '${email}', but expected only 1`)
        }

        const user = userEdges.pop()?.node
        assertNotNil(user)

        return this.returnNonNullable(user)
    }

    public async findById(id: string) {
        const result = await this.sdk.findById({ id: this.stripURLfromID(id) })

        if (!result?.user) {
            return null
        }

        return {
            ...result.user,
            id: this.makeURLfromID(result.user?.id),
        }
    }

    public async findByPersonId(personId: string): Promise<UserEntity | null> {
        const result = await this.sdk.findUsersByPersonId({ personId })

        const userEdges = result.users?.edges
        assertNotNil(userEdges, `User not found for personId ${personId}`)

        if (userEdges.length === 0) {
            throw new Error(`User not found for personId ${personId}`)
        }

        if (userEdges.length > 1) {
            throw new Error(`Found multiple users for personId ${personId}, but expected only 1`)
        }

        const user = userEdges.pop()?.node
        assertNotNil(user)

        const userGroupEdges = user.userGroups?.edges
        const userRoles = userGroupEdges
            ? userGroupEdges.map(userGroupEdge => {
                  const id = userGroupEdge?.node?.id
                  assertNotNil(id)
                  const name = userGroupEdge?.node?.name
                  assertNotNil(name)

                  return {
                      id: this.makeURLfromID(id),
                      name,
                  }
              })
            : []

        const userEntity: UserEntity = {
            id: this.makeURLfromID(user.id),
            email: user.username,
            dateCreated: user.dateCreated ?? undefined,
            dateModified: user.dateModified ?? undefined,
            userRoles,
        }

        return userEntity
    }
}
