import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import * as zxcvbn from 'zxcvbn'

@ValidatorConstraint({ async: false })
export class IsPasswordStrengthSufficientConstraint implements ValidatorConstraintInterface {
    public validate(password: string) {
        const { score } = zxcvbn(password)

        console.log(score)

        if (score >= 4) {
            return true
        }

        return false
    }

    public defaultMessage() {
        return 'PASSWORD_STRENGTH_WEAK'
    }
}
