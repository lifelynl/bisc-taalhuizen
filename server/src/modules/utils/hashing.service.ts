import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { Config } from 'src/config/config'

// Follows the recommendations of https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
@Injectable()
export class HashingService {
    public constructor(private configService: ConfigService<Config>) {}

    public hash(plainText: string) {
        // We prehash the plain text to allow any length and to ensure
        // the hashed text will always be a sufficient lengthy. The hashing also includes a secret key to
        // enforce "peppering", see: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#peppering
        const unsafePreHash = this.hashAndPepperPlainText(plainText)

        return bcrypt.hash(unsafePreHash, 10)
    }

    public compare(plainText: string, hash: string) {
        const unsafePreHash = this.hashAndPepperPlainText(plainText)

        return bcrypt.compare(unsafePreHash, hash)
    }

    public randomBytes(length = 32): Promise<string> {
        return new Promise((resolve, reject) =>
            crypto.randomBytes(length, (err, buffer) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(buffer.toString('hex'))
            })
        )
    }

    private hashAndPepperPlainText(textToHash: string) {
        const pepper = this.configService.getOrThrow('APP_PEPPER')

        return crypto.createHmac('sha256', pepper).update(textToHash).digest('hex')
    }
}
