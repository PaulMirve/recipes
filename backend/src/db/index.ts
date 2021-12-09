import { createConnection } from 'typeorm';
import { CommentEntity } from '../schema/comment/comment.entity';
import { IngredientEntity } from '../schema/ingredient/ingredient.entity';
import { RecipeEntity } from '../schema/recipes/recipe.entity';
import { RoleEntity } from '../schema/role/role.entity';
import { StepEntity } from '../schema/step/step.entity';
import { TagEntity } from '../schema/tag/tag.entity';
import { UnitEntity } from '../schema/unit/unit.entity';
import { UserEntity } from '../schema/user/user.entity';

const connect = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                CommentEntity,
                IngredientEntity,
                RecipeEntity,
                RoleEntity,
                StepEntity,
                TagEntity,
                UnitEntity,
                UserEntity
            ],
            //synchronize: true
        });
        console.log('Database is connected ⚡'.blue);
    } catch (err) {
        console.log("Failed to connect to dabatabase: ".red, err);
    }
}
export default connect;