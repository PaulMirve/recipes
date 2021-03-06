import { Query, Resolver } from "type-graphql";

@Resolver()
export class HiResolver {
    @Query(of => String)
    hi() {
        return 'Hello World!'
    }

    @Query(of => String)
    goodbye() {
        return 'Goodbye World!'
    }
}