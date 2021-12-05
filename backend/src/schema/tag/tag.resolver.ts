import { FieldResolver, Resolver, Root } from "type-graphql";
import { TagEntity } from "./tag.entity";
import { Tag } from "./tag.types";

@Resolver(of => Tag)
export class TagResolver {
    @FieldResolver()
    async recipes(@Root() { idTag }: TagEntity) {
        const tag = await TagEntity.findOne({
            where: { idTag },
            relations: ["recipes"]
        })
        return tag.recipes;
    }
}
