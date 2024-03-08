import { Injectable } from '@nestjs/common'
import { UserDTO } from './user.entity'
import { UserRepository } from './user.repository'
import { wrap } from '@mikro-orm/core'

@Injectable()
export class UserService {
    public constructor(private readonly userRepository: UserRepository) {}

    public async findAll(): Promise<UserDTO[]> {
        const users = await this.userRepository.findAll()
        return users.map(user => wrap(user).toObject())
    }
}
