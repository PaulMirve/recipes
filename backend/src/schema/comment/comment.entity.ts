import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "../recipes/recipe.entity";

@Entity('Comments')
export class CommentEntity {
    @PrimaryGeneratedColumn({ name: 'IdComment' })
    idComment: number;

    @Column({ name: 'Comment', nullable: false })
    comment: string;

    @Column({ name: 'DateCreated', type: 'timestamp', default: () => "CURRENT_TIMESTAMP", nullable: false })
    dateCreated: string;

    @Column({ name: 'IdRecipe', nullable: false })
    idRecipe: number;

    @ManyToOne(() => RecipeEntity, recipe => recipe.comments)
    @JoinColumn({ name: 'IdRecipe' })
    recipe: RecipeEntity;
}