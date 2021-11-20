import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IngredientEntity } from "../ingredient/ingredient.entity";

@Entity({ name: 'Units' })
export class UnitEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'IdUnit' })
    idUnit: number;

    @Column({ name: 'Name', nullable: false })
    name: string;

    @OneToMany(() => IngredientEntity, ingredient => ingredient.unit)
    ingredients: IngredientEntity[];
}