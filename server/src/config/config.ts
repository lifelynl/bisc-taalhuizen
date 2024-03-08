export interface Config {
    ENV: string
    APP_VERSION: string
    APP_NAME: string
    APP_PORT: string
    APP_PEPPER: string
    APP_URL: string

    DB_NAME: string
    DB_HOST: string
    DB_PORT: string
    DB_USER: string
    DB_PASSWORD: string
    DB_USE_SSL?: 'true'

    JWT_SECRET: string

    MAIL_FROM_NAME: string
    MAIL_FROM_EMAIL: string
    MAIL_SMTP_HOST: string
    MAIL_SMTP_PORT: string
    MAIL_SMTP_AUTH_USERNAME: string
    MAIL_SMTP_AUTH_PASSWORD: string
    FRONT_URL: string

    STORAGE_DRIVER: 's3' | 'local'
    STORAGE_AWS_S3_BUCKET: string
    STORAGE_AWS_S3_KEY: string
    STORAGE_AWS_S3_SECRET: string
    STORAGE_AWS_S3_REGION: string
    STORAGE_LOCAL_BASEPATH: string
    STORAGE_LOCAL_BASEURL: string
}
