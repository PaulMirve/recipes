create table "Roles" (
    "IdRole" serial constraint "PK_9f87df50ef0cfa070c1e095671d" primary key,
    "Name" varchar not null
);
alter table "Roles" owner to postgres;
create table "Users" (
    "IdUser" serial constraint "PK_927cd340c63ae74fcca691375b5" primary key,
    "Name" varchar not null,
    "LastName" varchar not null,
    "Username" varchar not null constraint "UQ_a842ddfeb687f3df0f862ca73ea" unique,
    "Password" varchar not null,
    "IdRole" integer default 1 not null constraint "fk_user_role" references "Roles"
);
alter table "Users" owner to postgres;
create table "Recipes" (
    "IdRecipe" serial constraint "PK_39ee6f6a31755bfdb4d2f1b6f57" primary key,
    "Name" varchar not null,
    "Description" varchar not null,
    "NumberOfPeople" integer not null,
    "Photo" varchar not null,
    "DateCreated" timestamp default now() not null,
    "IdUser" integer not null constraint "fk_recipe_user" references "Users"
);
alter table "Recipes" owner to postgres;
create table "Comments" (
    "IdComment" serial constraint "PK_136dce126895d5665fe3ff0251c" primary key,
    "Comment" varchar not null,
    "DateCreated" timestamp default now() not null,
    "IdRecipe" integer not null constraint "fk_comment_recipe" references "Recipes",
    "IdUser" integer not null constraint "fk_comment_user" references "Users"
);
alter table "Comments" owner to postgres;
create table "Units" (
    "IdUnit" serial constraint "PK_66715895bb7ac23c336c045bc06" primary key,
    "Name" varchar not null
);
alter table "Units" owner to postgres;
create table "Ingredients" (
    "IdIngredient" serial constraint "PK_7befd2d20b7d9c0602df6c901d9" primary key,
    "Name" varchar not null,
    "Quantity" integer not null,
    "IdUnit" integer not null constraint "fk_ingredient_unit" references "Units",
    "IdUser" integer not null constraint "fk_ingredient_user" references "Users"
);
alter table "Ingredients" owner to postgres;
create table "UserHasFollowers" (
    "IdFollower" integer not null constraint "fk_userhasfollowers_user" references "Users" on update cascade on delete cascade,
    "IdUser" integer not null constraint "fk_userhasfollowers_user2" references "Users",
    constraint "PK_64f32b5475844ba71800817dda2" primary key ("IdFollower", "IdUser")
);
alter table "UserHasFollowers" owner to postgres;
create index "IDX_84b2b1fa69a585818860354a03" on "UserHasFollowers" ("IdFollower");
create index "IDX_8b3cb9fc6b32593f8d7cea3407" on "UserHasFollowers" ("IdUser");
create table "UserHasBookmarks" (
    "IdUser" integer not null constraint "fk_userhasbookmarks_user" references "Users" on update cascade on delete cascade,
    "IdRecipe" integer not null constraint "fk_userhasbookmarks_recipe" references "Recipes",
    constraint "PK_da3c1c9bd9d1d225c1a4aac9375" primary key ("IdUser", "IdRecipe")
);
alter table "UserHasBookmarks" owner to postgres;
create index "IDX_eda9c39cf873012ae36ead58f0" on "UserHasBookmarks" ("IdUser");
create index "IDX_0caf1224d5a4e8c3168b2d4dae" on "UserHasBookmarks" ("IdRecipe");
create table "UserHasLikedRecipe" (
    "IdUser" integer not null constraint "fk_userhaslikedrecipe_user" references "Users" on update cascade on delete cascade,
    "IdRecipe" integer not null constraint "fk_userhaslikedrecipe_recipe" references "Recipes",
    constraint "PK_9d938df8ad1dab052acbde28d2e" primary key ("IdUser", "IdRecipe")
);
alter table "UserHasLikedRecipe" owner to postgres;
create index "IDX_af904c64ae7701de5473b1c6f3" on "UserHasLikedRecipe" ("IdUser");
create index "IDX_55ec8be55a7790d7a545e2a51b" on "UserHasLikedRecipe" ("IdRecipe");
create table "UserHasLikedComment" (
    "IdUser" integer not null constraint "fk_userhaslikedcomment_user" references "Users" on update cascade on delete cascade,
    "IdComment" integer not null constraint "fk_userhaslikedcomment_comment" references "Comments",
    constraint "PK_feafee117afe039f787b39012c1" primary key ("IdUser", "IdComment")
);
alter table "UserHasLikedComment" owner to postgres;
create index "IDX_213c3044c3543ccd53671dc6a9" on "UserHasLikedComment" ("IdUser");
create index "IDX_97020aab3a86c99434a9c656c4" on "UserHasLikedComment" ("IdComment");
insert into "Roles" ("Name")
values ('USER_ROLE'),
    ('ADMIN_ROLE');