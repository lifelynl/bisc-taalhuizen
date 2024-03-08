import { Test } from '@nestjs/testing'
import { PostalCodeAreaPolicy } from '../utils/policy/postalCodeArea.policy'
import { PostalCodeAreaRepository } from './postalCodeArea.repository'
import { PostalCodeAreaResolver } from './postalCodeArea.resolver'
import { PostalCodeAreaService } from './postalCodeArea.service'
import { UserWithCurrentEmployee } from '../auth/auth.interface'

describe(PostalCodeAreaResolver.name, () => {
    const queryPaginated = jest.fn()
    const throwIfNotSatisfiedBy = jest.fn()
    const andWhere = jest.fn()

    const findOneOrFail = jest.fn()
    let postalCodeAreaResolver: PostalCodeAreaResolver

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PostalCodeAreaService,
                PostalCodeAreaResolver,
                { provide: PostalCodeAreaPolicy, useValue: { throwIfNotSatisfiedBy } },
                {
                    provide: PostalCodeAreaRepository,
                    useValue: {
                        findOneOrFail,
                        queryPaginated,
                        createQueryBuilder: () => {
                            return {
                                orderBy: () => ({
                                    andWhere: andWhere,
                                }),
                            }
                        },
                    },
                },
            ],
        }).compile()

        postalCodeAreaResolver = module.get(PostalCodeAreaResolver)
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getPostalCodes', () => {
        it('should check access', async () => {
            try {
                await postalCodeAreaResolver.availablePostalCodes({} as UserWithCurrentEmployee, {}, { search: '' })
            } catch {}

            expect(throwIfNotSatisfiedBy).toBeCalledTimes(1)
        })

        it('should get an array', async () => {
            throwIfNotSatisfiedBy.mockResolvedValueOnce(null)

            try {
                await postalCodeAreaResolver.availablePostalCodes({} as UserWithCurrentEmployee, {}, { search: '' })
            } catch {}

            expect(queryPaginated).toBeCalled()
        })
    })
})
