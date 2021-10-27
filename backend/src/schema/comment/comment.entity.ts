import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "../recipes/recipe.entity";
import { UserEntity } from "../user/user.entity";

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

    @Column({ name: 'IdUser', nullable: false })
    idUser: number;

    @ManyToOne(() => UserEntity, user => user.comments)
    @JoinColumn({ name: 'IdUser' })
    user: UserEntity;
}