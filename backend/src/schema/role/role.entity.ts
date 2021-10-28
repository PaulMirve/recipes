import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity("Roles")
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'IdRole' })
    idRole: number;

    @Column({ name: 'Name', nullable: false })
    name: string;

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[];
}