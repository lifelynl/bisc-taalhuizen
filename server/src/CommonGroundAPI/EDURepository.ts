import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { BaseRepository } from 'src/BaseRepository'
import { Config } from 'src/config'
import { getSdk, Sdk as EDUSdk } from 'src/generated/edu-graphql'
import { CommonGroundAPIs } from './CommonGroundAPIsEnum'

@Injectable()
export class EDURepository extends BaseRepository {
    protected sdk: EDUSdk
    protected commonGroundAPI = CommonGroundAPIs.EDU

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
