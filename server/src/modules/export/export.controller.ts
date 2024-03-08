import { Controller, Get, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { CurrentUser } from '../auth/auth.decorator'
import { ExportPolicy } from '../utils/policy/export.policy'
import { PolicyAction } from '../utils/policy/policy'
import { ExportService } from './export.service'
import { UserWithCurrentEmployee } from '../auth/auth.interface'
import { DomainError } from '../../errors/DomainError'

interface ParticipationsArgs {
    organizationId: string
    start?: string
    end?: string
}

interface LearningNeedsArgs {
    organizationId?: string
    start?: string
    end?: string
}

interface StudentLearningNeedArgs {
    studentId?: string
    learningNeedId?: string
}

interface StudentArgs {
    organizationId?: string
    start?: string
    end?: string
}

@Controller('/exports')
export class ExportController {
    public constructor(private readonly exportPolicy: ExportPolicy, private readonly exportService: ExportService) {}

    @Get('/providerParticipations')
    public async getProviderParticipations(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Res() res: Response,
        @Query() { organizationId, start, end }: ParticipationsArgs
    ) {
        if (!organizationId) {
            throw new DomainError('organization id not provided')
        }

        await this.exportPolicy.throwIfNotSatisfiedBy(user, PolicyAction.export, {
            organizationId,
            type: 'providerParticipation',
        })

        const fileName = 'providerParticipations.xlsx'
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        })

        try {
            await this.exportService.exportProviderParticipations(res, organizationId, start, end)
        } catch (e) {
            console.log(e)
            res.destroy()
        }
    }

    @Get('/participations')
    public async getParticipations(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Res() res: Response,
        @Query() { organizationId, start, end }: ParticipationsArgs
    ) {
        if (!organizationId) {
            throw new DomainError('organization id not provided')
        }

        await this.exportPolicy.throwIfNotSatisfiedBy(user, PolicyAction.export, {
            organizationId,
            type: 'participation',
        })

        const fileName = 'participations.xlsx'
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        })

        try {
            await this.exportService.exportParticipations(res, organizationId, start, end)
        } catch (e) {
            console.log(e)
            res.destroy()
        }
    }

    @Get('/learningNeeds')
    public async getLearningNeeds(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Res() res: Response,
        @Query() { organizationId, start, end }: LearningNeedsArgs
    ) {
        if (!organizationId) {
            throw new DomainError('language house id not provided')
        }

        await this.exportPolicy.throwIfNotSatisfiedBy(user, PolicyAction.export, {
            organizationId,
            type: 'learningNeed',
        })

        const fileName = 'learning-needs.xlsx'
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        })

        try {
            await this.exportService.exportLearningNeeds(res, organizationId, start, end)
        } catch (e) {
            console.log(e)
            res.destroy()
        }
    }

    @Get('/studentLearningNeedForExternalUse')
    public async getStudentLearningNeedForExternalUse(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Res() res: Response,
        @Query() { studentId, learningNeedId }: StudentLearningNeedArgs
    ) {
        if (!studentId || !learningNeedId) {
            throw new DomainError('student or learning need id not provided')
        }

        await this.exportPolicy.throwIfNotSatisfiedBy(user, PolicyAction.export, {
            studentId,
            type: 'studentLearningNeed',
        })

        const fileName = 'student-learning-needs.pdf'
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        })

        try {
            const pdfBuffer = await this.exportService.exportStudentLearningNeedsForExternalUse(
                studentId,
                learningNeedId
            )
            return res.send(pdfBuffer)
        } catch (e) {
            console.log(e)
            res.destroy()
        }
    }

    @Get('/students')
    public async getStudents(
        @CurrentUser() user: UserWithCurrentEmployee,
        @Res() res: Response,
        @Query() { organizationId, start, end }: StudentArgs
    ) {
        if (!organizationId) {
            throw new DomainError('language house id not provided')
        }

        await this.exportPolicy.throwIfNotSatisfiedBy(user, PolicyAction.export, {
            organizationId,
            type: 'student',
        })

        const fileName = `students.xlsx`
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${fileName}"`,
        })

        try {
            await this.exportService.exportStudents(res, organizationId, start, end)
        } catch (e) {
            console.log(e)
            res.destroy()
        }
    }
}
