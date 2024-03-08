import { CustomBaseRepository } from 'src/database/CustomBaseRepository'
import { Education } from './education.entity'

export class EducationRepository extends CustomBaseRepository<Education> {
    protected readonly entityName = 'Education'
}
