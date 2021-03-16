export interface Config {
    ENV: string
    APP_VERSION: string
    APP_NAME: string
    APP_PORT: string
    APP_SERVER_URL: string
    APP_CLIENT_URL: string

    APP_PEPPER: string
    APP_SECRET: string
    API_KEY: string

    MAIL: string
    MAIL_FROM_NAME: string
    MAIL_FROM_EMAIL: string
    MAIL_SENDER?: string

    MAIL_SMTP_HOST: string
    MAIL_SMTP_PORT: number
    MAIL_SMTP_AUTH_USERNAME: string
    MAIL_SMTP_AUTH_PASSWORD: string

    SENTRY_DNS: string
}
