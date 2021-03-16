// TODO: We need this when we want to use AuthGuard('jwt') in JwtAuthGuard, keeping it commented for now

// import { ExtractJwt, Strategy } from 'passport-jwt'
// import { PassportStrategy } from '@nestjs/passport'
// import { Injectable } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     public constructor(configService: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: configService.get('APP_SECRET'),
//         })
//     }

//     public async validate(payload: { sub: number; username: string }) {
//         return { userId: payload.sub, username: payload.username }
//     }
// }
