import { Arg, Query, Resolver } from "type-graphql";
import { RecipeEntity } from "../recipes/recipe.entity";
import { UserEntity } from "../user/user.entity";
import { searchResultUnion } from "./search.types";

@Resolver()
export class SearchResolver {
    @Query(returns => [searchResultUnion])
    async search(@Arg("phrase") phrase: string) {
        const users = await UserEntity
            .createQueryBuilder("user")
            .where("user.username ilike :username", { username: `%${phrase}%` })
            .getMany();
        const recipes = await RecipeEntity
            .createQueryBuilder("recipe")
            .where("recipe.name ilike :name", { name: `%${phrase}%` })
            .orWhere("recipe.description ilike :description", { description: `%${phrase}%` })
            .getMany();
        return [...users, ...recipes];
    }
}