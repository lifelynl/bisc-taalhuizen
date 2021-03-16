import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

@Injectable()
export class PasswordHashingService {
    public async hash(plainTextPassword: string) {
        if (!plainTextPassword) {
            throw new Error('No password given')
        }

        const generatedHash = await bcrypt.hash(plainTextPassword, 10)

        return this.transformHashToBeUsedInPhp(generatedHash)
    }

    public randomPassword() {
        return this.generateSecureRandomToken()
    }

    private transformHashToBeUsedInPhp(nodejsHash: string) {
        // Sanity check
        if (nodejsHash.substr(0, 7) !== '$2b$10$') {
            throw new Error(`Unexpected start of generated hash`)
        }

        const phpCompatibleHash = `$2y$10$${nodejsHash.substr(7)}`

        return phpCompatibleHash
    }

    private generateSecureRandomToken() {
        return crypto.randomBytes(36).toString('hex')
    }
}
