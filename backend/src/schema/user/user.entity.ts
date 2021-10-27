import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeEntity } from "../recipes/recipe.entity";
import { RoleEntity } from "../role/role.entity";

@Entity('Users')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'IdUser' })
    idUser: number;

    @Column({ name: 'Name', nullable: false })
    name: string;

    @Column({ name: 'LastName', nullable: false })
    lastName: string;

    @Column({ name: 'Username', nullable: false })
    username: string;

    @Column({ name: 'Password', nullable: false })
    password: string;

    @Column({ name: 'IdRole', nullable: false })
    idRole: number;

    @ManyToOne(() => RoleEntity, role => role.users)
    @JoinColumn({ name: 'IdRole' })
    role: RoleEntity;

    @OneToMany(() => RecipeEntity, recipe => recipe.user)
    recipes: RecipeEntity[];

    @ManyToMany(() => UserEntity, user => user.followers)
    @JoinTable({
        name: 'UserHasFollowers',
        joinColumn: {
            name: 'IdFollower'
        },
        inverseJoinColumn: {
            name: 'IdUser'
        }
    })
    following: UserEntity[];

    @ManyToMany(() => UserEntity, user => user.following)
    followers: UserEntity[]
}