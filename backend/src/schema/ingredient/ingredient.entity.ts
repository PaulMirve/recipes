import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../unit/unit.entity";
import { UserEntity } from "../user/user.entity";

@Entity('Ingredients')
export class IngredientEntity {
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

    @Column({ name: 'IdUser', nullable: false })
    idUser: number;

    @ManyToOne(() => UserEntity, user => user.recipes)
    @JoinColumn({ name: 'IdUser' })
    user: UserEntity;
}