import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "../recipes/recipe.entity";

@Entity("Tags")
export class TagEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'IdTag' })
    idTag: number;

    @Column({ name: 'Name', nullable: false })
    name: string;

    @ManyToMany(() => RecipeEntity, recipe => recipe.tags)
    recipes: RecipeEntity[];
}