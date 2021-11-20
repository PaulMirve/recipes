import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "../recipes/recipe.entity";

@Entity("Steps")
export class StepEntity {
    @PrimaryGeneratedColumn({ name: 'IdStep' })
    idStep: number;

    @Column({ name: 'Description', nullable: false })
    description: string;

    @Column({ name: 'IdRecipe', nullable: false })
    idRecipe: number;

    @ManyToOne(() => RecipeEntity, recipe => recipe.steps)
    @JoinColumn({ name: "IdRecipe" })
    recipe: RecipeEntity;
}