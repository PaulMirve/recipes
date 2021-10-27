import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "../comment/comment.entity";
import { UserEntity } from "../user/user.entity";

@Entity('Recipes')
export class RecipeEntity {
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

    @ManyToOne(() => UserEntity, user => user.recipes)
    @JoinColumn({ name: 'IdUser' })
    user: UserEntity;

    @OneToMany(() => CommentEntity, comment => comment.recipe)
    comments: CommentEntity[];

    @ManyToMany(() => UserEntity, user => user.bookmarks)
    bookmarkedBy: UserEntity[];

    @ManyToMany(() => UserEntity, user => user.likedRecipes)
    likes: UserEntity[];
}