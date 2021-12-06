import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "../comment/comment.entity";
import { IngredientEntity } from "../ingredient/ingredient.entity";
import { StepEntity } from "../step/step.entity";
import { TagEntity } from "../tag/tag.entity";
import { UserEntity } from "../user/user.entity";

@Entity('Recipes')
export class RecipeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "IdRecipe" })
    idRecipe: number;

    @Column({ name: 'Name', nullable: false })
    name: string;

    @Column({ name: 'Description', nullable: false })
    description: string;

    @Column({ name: 'NumberOfPeople', nullable: false })
    numberOfPeople: number;

    @Column({ name: 'Photo', nullable: false })
    photo: string;

    @Column({ name: 'DateCreated', type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
    dateCreated: string;

    @Column({ name: "IdUser", nullable: false })
    idUser: number;

    @Column({ name: 'Active', nullable: false, default: true })
    active: boolean;

    @ManyToOne(() => UserEntity, user => user.recipes)
    @JoinColumn({ name: 'IdUser' })
    user: UserEntity;

    @OneToMany(() => CommentEntity, comment => comment.recipe)
    comments: CommentEntity[];

    @ManyToMany(() => UserEntity, user => user.bookmarks)
    bookmarkedBy: UserEntity[];

    @ManyToMany(() => UserEntity, user => user.likedRecipes)
    likes: UserEntity[];

    @ManyToMany(() => TagEntity, tag => tag.recipes, { cascade: true })
    @JoinTable({
        name: 'RecipeHasTags',
        joinColumn: {
            name: 'IdRecipe'
        },
        inverseJoinColumn: {
            name: 'IdTag'
        }
    })
    tags: TagEntity[];

    @OneToMany(() => IngredientEntity, ingredient => ingredient.recipe, { cascade: true, onUpdate: 'CASCADE' })
    ingredients: IngredientEntity[];

    @OneToMany(() => StepEntity, step => step.recipe, { cascade: true })
    steps: StepEntity[];
}