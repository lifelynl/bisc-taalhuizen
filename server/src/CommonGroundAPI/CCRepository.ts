import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { BaseRepository } from 'src/BaseRepository'
import { Config } from 'src/config'
import { getSdk, Sdk as CCSdk } from 'src/generated/cc-graphql'
import { CommonGroundAPIs } from './CommonGroundAPIsEnum'

@Injectable()
export class CCRepository extends BaseRepository {
    protected sdk: CCSdk
    protected commonGroundAPI = CommonGroundAPIs.CC

    public constructor(private configService: ConfigService<Config>) {
        super()

        const client = new GraphQLClient(`${this.commonGroundAPI}/graphql`, {
            headers: {
                authorization: this.configService.get('API_KEY') || '',
            },
        })
        this.sdk = getSdk(client)
    }
}
