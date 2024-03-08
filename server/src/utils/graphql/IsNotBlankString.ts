/* eslint-disable @typescript-eslint/ban-types */
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint()
export class IsNotBlankStringConstraint implements ValidatorConstraintInterface {
    public validate(value: unknown, _args: ValidationArguments) {
        if (value === undefined) {
            return true
        }

        if (typeof value !== 'string' || !value.length) {
            return false
        }

        return !!(value.trim().length > 0)
    }
}

export function IsNotBlankString(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: `Field ${propertyName} is empty`,
                ...validationOptions,
            },
            constraints: [],
            validator: IsNotBlankStringConstraint,
        })
    }
}
