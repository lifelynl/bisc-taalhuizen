import { DriverType } from '@codebrew/nestjs-storage'
import { registerAs } from '@nestjs/config'

export default registerAs('storage', () => ({
    default: process.env.STORAGE_DRIVER || 'local',
    disks: getUploadConfig(),
}))

function getUploadConfig() {
    return {
        local: {
            driver: DriverType.LOCAL,
            config: {
                root: `${process.cwd()}${process.env.STORAGE_LOCAL_BASEPATH}/`,
            },
        },
        s3: {
            driver: DriverType.S3,
            config: {
                key: process.env.STORAGE_AWS_S3_KEY,
                endpoint: process.env.STORAGE_AWS_S3_KEY_ENDPOINT,
                secret: process.env.STORAGE_AWS_S3_SECRET,
                bucket: process.env.STORAGE_AWS_S3_BUCKET,
                region: process.env.STORAGE_AWS_S3_REGION,
            },
        },
    }
}
