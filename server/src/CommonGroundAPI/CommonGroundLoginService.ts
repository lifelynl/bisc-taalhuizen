import request = require('request')
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'

interface LoginResponse {
    username: string
    userId: string | null
    res: { valid: boolean; body: string }
}

@Injectable()
export class CommonGroundLoginService {
    public constructor(private configService: ConfigService<Config>) {}

    public async login(username: string, password: string): Promise<LoginResponse> {
        const body = JSON.stringify({
            username,
            password,
        })

        const res: { valid: boolean; body: string } = await new Promise((resolve, reject) => {
            return request(
                'https://taalhuizen-bisc.commonground.nu/api/v1/uc/login',
                {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                (err, res) => {
                    console.log(res.statusCode)
                    console.log(res.body)
                    console.log(body)

                    if (err) {
                        reject(err)
                        return
                    }

                    if (res.statusCode === 200) {
                        resolve({ valid: true, body: res.body })
                        return
                    }

                    if (res.statusCode === 403) {
                        // We get 403 when username is not found or when password is incorrect
                        resolve({ valid: false, body: res.body })
                        return
                    }

                    // We expect only 200 or 404, reject on any other response
                    reject(res.body)
                    return
                }
            )
        })

        // TODO: Get more data from the response (role, person, organization, etc.)
        const responseBody = res.body && res.valid ? JSON.parse(res.body) : null

        return {
            username,
            userId: responseBody?.id ?? null,
            res,
        }
    }
}
