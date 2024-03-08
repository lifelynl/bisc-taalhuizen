import { HashingService } from 'src/modules/utils/hashing.service'
import { User } from './user.entity'

export function mockDefaultUserFields() {
    return {
        username: 'username',
        email: 'email@email.com',
        password: 'password',
    }
}

export async function mockUser(hashingService: HashingService, customProps?: Partial<User>): Promise<User> {
    const defaultUser = mockDefaultUserFields()
    const mergedUser = { ...defaultUser, ...customProps }

    const password = await hashingService.hash(mergedUser.password)

    const user = new User()
    user.username = mergedUser.username
    user.password = password

    return user
}

export function getMockUserWithoutPassword() {
    const user = new User()

    const defaultFields = mockDefaultUserFields()
    Object.entries(defaultFields).forEach(([k, v]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(user as any)[k] = v
    })

    return user
}
