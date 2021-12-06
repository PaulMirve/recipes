import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Step {
    @Field(of => Int)
    idStep: number;
    @Field(of => String)
    description: string;
}

@InputType()
export class StepInput {
    @Field(of => String)
    description: string;
}