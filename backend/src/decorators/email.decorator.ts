import { UserEntity } from "../schema/user/user.entity";
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class IsEmailAlreadyInUseConstraint implements ValidatorConstraintInterface {
    async validate(email: any, args: ValidationArguments) {
        const user = await UserEntity.findOne({ email });
        if (user) return false;
        return true;
    }
}

export function IsEmailInUse(validationOptions?: ValidationOptions) {
    if (!validationOptions) {
        validationOptions = {
            message: 'The email is already in use 😪'
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyInUseConstraint,
        });
    };
}