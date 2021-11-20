import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { RecipeEntity } from "../schema/recipes/recipe.entity";
import { UserEntity } from "../schema/user/user.entity";

@ValidatorConstraint({ async: true })
class IsUserExistConstraint implements ValidatorConstraintInterface {
    async validate(idUser: any, args: ValidationArguments) {
        const user = await UserEntity.findOne({ idUser });
        if (!user) return false;
        return true;
    }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
    if (!validationOptions) {
        validationOptions = {
            message: "The user doesn't exist 😒"
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserExistConstraint,
        });
    };
}