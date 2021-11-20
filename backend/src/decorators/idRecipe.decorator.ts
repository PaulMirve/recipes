import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { RecipeEntity } from "../schema/recipes/recipe.entity";

@ValidatorConstraint({ async: true })
class IsRecipeExistConstraint implements ValidatorConstraintInterface {
    async validate(idRecipe: any, args: ValidationArguments) {
        const recipe = await RecipeEntity.findOne({ idRecipe });
        if (!recipe) return false;
        return true;
    }
}

export function IsRecipeExist(validationOptions?: ValidationOptions) {
    if (!validationOptions) {
        validationOptions = {
            message: "The recipe doesn't exist 😒"
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRecipeExistConstraint,
        });
    };
}