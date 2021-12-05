import { Arg, Query, Resolver } from "type-graphql";
import { RecipeEntity } from "../recipes/recipe.entity";
import { TagEntity } from "../tag/tag.entity";
import { UserEntity } from "../user/user.entity";
import { searchResultUnion } from "./search.types";

@Resolver()
export class SearchResolver {
    @Query(returns => [searchResultUnion])
    async search(@Arg("phrase") phrase: string) {
        const users = await UserEntity
            .createQueryBuilder("user")
            .where("user.username ilike :username", { username: `%${phrase}%` })
            .orWhere("user.name ilike :name", { name: `%${phrase}%` })
            .orWhere("user.lastName ilike :lastName", { lastName: `%${phrase}%` })
            .getMany();
        const recipes = await RecipeEntity
            .createQueryBuilder("recipe")
            .innerJoinAndSelect("recipe.tags", "tags")
            .where("recipe.name ilike :name", { name: `%${phrase}%` })
            .orWhere("recipe.description ilike :description", { description: `%${phrase}%` })
            .orWhere("tags.name ilike :name", { name: `%${phrase}%` })
            .getMany();
        const tags = await TagEntity
            .createQueryBuilder("tag")
            .where("tag.name ilike :name", { name: `%${phrase}%` })
            .getMany();
        return [...users, ...recipes, ...tags];
    }
}