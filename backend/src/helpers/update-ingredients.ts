import { IngredientEntity } from "../schema/ingredient/ingredient.entity";
import { IngredientUpdateInput } from "../schema/ingredient/ingredient.types";

export const updateIngredients = async (ingredients: IngredientEntity[], updatedIngredients: IngredientUpdateInput[]) => {
    const toDeleteIngredients = ingredients.filter(ingredient => !updatedIngredients.some(ingredient2 => ingredient.idIngredient === ingredient2.idIngredient));
    await IngredientEntity.remove(toDeleteIngredients);
    const toUpdateIngredients = updatedIngredients.filter(ingredient => !toDeleteIngredients.some(ingredient2 => ingredient.idIngredient === ingredient2.idIngredient)).map(el => {
        if (el.idIngredient !== 0) return el;
        const { idIngredient, ...ingredient } = el;
        return ingredient;
    }) as IngredientEntity[];
    return toUpdateIngredients;
}