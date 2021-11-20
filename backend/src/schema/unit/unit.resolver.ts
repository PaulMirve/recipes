import { Query, Resolver } from "type-graphql";
import { UnitEntity } from "./unit.entity";
import { Unit } from "./unit.types";

@Resolver(of => Unit)
class UnitResolver {
    @Query(of => [Unit])
    getUnits() {
        return UnitEntity.find();
    }
}