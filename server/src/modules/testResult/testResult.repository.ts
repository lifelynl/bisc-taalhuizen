import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { TestResult } from './testResult.entity'

export class TestResultRepository extends CustomBaseRepository<TestResult> {
    protected readonly entityName = 'TestResult'
}
