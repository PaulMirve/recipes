import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "../recipes/recipe.entity";
import { UnitEntity } from "../unit/unit.entity";
import { UserEntity } from "../user/user.entity";

@Entity('Ingredients')
export class IngredientEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'IdIngredient' })
    idIngredient: number;

    @Column({ name: 'Name', nullable: false })
    name: string;

    @Column({ name: 'Quantity', nullable: false })
    quantity: number;

    @Column({ name: "IdUnit", nullable: false })
    idUnit: number;

    @ManyToOne(() => UnitEntity, unit => unit.ingredients)
    @JoinColumn({ name: 'IdUnit' })
    unit: UnitEntity;

    @Column({ name: 'IdRecipe', nullable: false })
    idRecipe: number;

    @ManyToOne(() => RecipeEntity, recipe => recipe.ingredients)
    @JoinColumn({ name: "IdRecipe" })
    recipe: RecipeEntity;
}