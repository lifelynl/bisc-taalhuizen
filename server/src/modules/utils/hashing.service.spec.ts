import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { HashingService } from 'src/modules/utils/hashing.service'

describe(HashingService.name, () => {
    let hashingService: HashingService

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [HashingService, ConfigService],
        }).compile()

        hashingService = module.get<HashingService>(HashingService)
    })

    it('should be defined', () => {
        expect(hashingService).toBeDefined()
    })

    it('should return false when comparing unmatched texts', async () => {
        const hashed = await hashingService.hash('plainText')

        await expect(hashingService.compare('plainText1', hashed)).resolves.toBeFalsy()
    })

    it('should successfully hash & compare hashed texts', async () => {
        const plainText = 'plainText'
        const hashed = await hashingService.hash(plainText)

        await expect(hashingService.compare(plainText, hashed)).resolves.toBeTruthy()
    })
})
