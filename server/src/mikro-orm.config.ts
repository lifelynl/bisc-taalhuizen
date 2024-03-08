import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { EntityCaseNamingStrategy, LoadStrategy } from '@mikro-orm/core'

const config: Options = {
    type: 'postgresql',
    dbName: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: process.env.ENV === 'development',
    loadStrategy: LoadStrategy.JOINED,
    metadataProvider: TsMorphMetadataProvider,
    namingStrategy: EntityCaseNamingStrategy,
    registerRequestContext: false,
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/database/migrations',
    },
}

if (process.env.DB_USE_SSL === 'true') {
    config.driverOptions = {
        connection: { ssl: { rejectUnauthorized: false } },
    }
}

export default config
