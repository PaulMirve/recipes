import { FieldResolver, Resolver, Root } from "type-graphql";
import { IngredientEntity } from "./ingredient.entity";
import { Ingredient } from "./ingredient.types";

@Resolver(of => Ingredient)
export class IngredientResolver {
    @FieldResolver()
    async unit(@Root() { idIngredient }: IngredientEntity) {
        const ingredient = await IngredientEntity.findOne({
            where: { idIngredient },
            relations: ["unit"]
        });
        return ingredient.unit;
    }
}