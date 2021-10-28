import { UserEntity } from "../schema/user/user.entity";
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(username: any, args: ValidationArguments) {
        const user = await UserEntity.findOne({ username });
        if (user) return false;
        return true;
    }
}

export function IsUsernameExist(validationOptions?: ValidationOptions) {
    if (!validationOptions) {
        validationOptions = {
            message: 'The username is already in use 😪'
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}