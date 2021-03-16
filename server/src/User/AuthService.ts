import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommonGroundLoginService } from 'src/CommonGroundAPI/CommonGroundLoginService'

@Injectable()
export class AuthService {
    public constructor(private jwtService: JwtService, private commonGroundLoginService: CommonGroundLoginService) {}

    public async login(username: string, password: string): Promise<{ accessToken: string }> {
        const login = await this.commonGroundLoginService.login(username, password)

        if (!login || !login.res.valid) {
            throw new UnauthorizedException()
        }

        if (!login.userId) {
            throw new Error(`Login was successful, but userId is not set. That should not happen.`)
        }

        return { accessToken: this.jwtService.sign({ userId: login.userId }) }
    }
}
