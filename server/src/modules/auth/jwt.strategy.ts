import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './auth.interface'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    public constructor(private authService: AuthService, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
            passReqToCallback: true,
        })
    }

    public async validate(req: Request, payload: JwtPayload) {
        const organizationSlug = req.headers['organization-slug']
        if (!organizationSlug || typeof organizationSlug !== 'string') {
            throw new UnauthorizedException()
        }

        const user = await this.authService.findUserWithCurrentEmployee(payload.username, organizationSlug)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
