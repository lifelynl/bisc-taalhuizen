import { GenericValidators } from './GenericValidators'
class Insertion {
    public isValidInsertion = (value: string | null) => {
        const check = [GenericValidators.noCapitals(value), GenericValidators.noSpecialCharacters(value)]
        if (check.every(validator => validator !== null)) {
            return check[0]
        }
        return null
    }
}

export const InsertionValidators = new Insertion()
