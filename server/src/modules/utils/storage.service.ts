import { Injectable } from '@nestjs/common'
import { DriverType, StorageService as StorageServiceImport } from '@codebrew/nestjs-storage'
import { AmazonWebServicesS3Storage } from '@slynova/flydrive-s3'

@Injectable()
export class StorageService {
    public constructor(private storage: StorageServiceImport) {
        if (process.env.STORAGE_DRIVER === 's3') {
            storage.registerDriver('s3', AmazonWebServicesS3Storage)
        }
    }
    public getDisk() {
        return this.storage.getDisk()
    }
}

export interface StorageOptions {
    default: string
    disks: {
        [x: string]: {
            driver: DriverType
            config: {
                root: string
            }
        }
    }
}
