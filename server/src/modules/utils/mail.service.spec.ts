import { MailerService } from '@nestjs-modules/mailer'
import { Test, TestingModule } from '@nestjs/testing'
import { MailService } from './mail.service'

describe('MailService', () => {
    let mailService: MailService
    const sendMail = jest.fn()

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{ provide: MailerService, useValue: { sendMail } }, MailService],
        }).compile()

        mailService = module.get(MailService)
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(mailService).toBeDefined()
    })

    it('should user invite mail', async () => {
        await mailService.sendInviteUserMail({
            to: 'johndoe@example.com',
            inviteURL: 'http://domain.com',
            name: 'John Doe',
            organization: 'Example Inc.',
        })

        expect(sendMail).toBeCalledTimes(1)
    })

    it('should password forgot mail', async () => {
        await mailService.sendPasswordForgotMail({
            to: 'johndoe@example.com',
            resetURL: 'http://domain.com',
            name: 'John Doe',
            organization: 'Example Inc.',
        })

        expect(sendMail).toBeCalledTimes(1)
    })

    it('should after password reset mail', async () => {
        await mailService.sendAfterPasswordResetMail({
            to: 'johndoe@example.com',
            name: 'John Doe',
            organization: 'Example Inc.',
        })

        expect(sendMail).toBeCalledTimes(1)
    })
})
