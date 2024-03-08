import { QueryOrder, expr } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { Organization, OrganizationTypeEnum } from '../organization/organization.entity'
import { PaginatedInputType } from '../utils/pagination.type'
import { PostalCodeAreaRepository } from './postalCodeArea.repository'
import { DomainError } from '../../errors/DomainError'

@Injectable()
export class PostalCodeAreaService {
    public constructor(private postalCodeAreaRepository: PostalCodeAreaRepository) {}

    public async getValidatedPostalCodeAreas(codes: number[], organization: Organization) {
        const { type, id } = organization
        if (type !== OrganizationTypeEnum.languageHouse) {
            throw new DomainError(`Trying to create PostalAreaCode for ${type} organization`)
        }
        const postalCodeAreaArray = await this.postalCodeAreaRepository.find({
            code: codes,
            $or: [{ organization: id }, { organization: null }],
        })

        if (codes.length !== postalCodeAreaArray.length) {
            throw new DomainError(`Specified postal code area(s) are unavailable`)
        }

        return postalCodeAreaArray
    }

    public async getAvailablePostalCodeAreas(paginationArgs: PaginatedInputType, search?: string) {
        const qb = this.postalCodeAreaRepository.createQueryBuilder().orderBy({ code: QueryOrder.ASC })

        if (search) {
            const paddedString = search.padEnd(4, '_')

            qb.andWhere({
                [expr('cast(code as text)')]: {
                    $like: paddedString,
                },
            })
        }

        qb.andWhere({
            organization: {
                $eq: null,
            },
        })

        return this.postalCodeAreaRepository.queryPaginated(qb, paginationArgs.take, paginationArgs.skip)
    }

    public getTotalCount(): Promise<number> {
        return this.postalCodeAreaRepository.count()
    }

    public async insertAllPostalCodes(): Promise<void> {
        await this.postalCodeAreaRepository.em.execute(`
            insert into "PostalCodeArea" (code, organization, "createdAt", "updatedAt")
            select gs, NULL, current_timestamp, current_timestamp
            from generate_series(1000, 9999) gs;
        `)
    }
}
