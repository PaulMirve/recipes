import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Step {
    @Field(of => String)
    description: string;
}

@InputType()
export class StepInput {
    @Field(of => String)
    description: string;
}