create table if not exists "Roles" (
    "IdRole" serial constraint "PK_9f87df50ef0cfa070c1e095671d" primary key,
    "Name" varchar not null
);
create table if not exists "Users" (
    "IdUser" serial constraint "PK_927cd340c63ae74fcca691375b5" primary key,
    "Name" varchar not null,
    "LastName" varchar not null,
    "Username" varchar not null constraint "UQ_a842ddfeb687f3df0f862ca73ea" unique,
    "Password" varchar not null,
    "IdRole" integer default 1 not null constraint "FK_c96757b482b5a4eb9f8cf217b9e" references "Roles",
    "Email" varchar not null constraint "UQ_884fdf47515c24dbbf6d89c2d84" unique
);
create table if not exists "Recipes" (
    "IdRecipe" serial constraint "PK_39ee6f6a31755bfdb4d2f1b6f57" primary key,
    "Name" varchar not null,
    "Description" varchar not null,
    "NumberOfPeople" integer not null,
    "Photo" varchar not null,
    "DateCreated" timestamp default now() not null,
    "IdUser" integer not null constraint "FK_8386a7e1559575a2f5abcaae6ff" references "Users",
    "Active" boolean default true not null
);
create table if not exists "Units" (
    "IdUnit" serial constraint "PK_66715895bb7ac23c336c045bc06" primary key,
    "Name" varchar not null
);
create table if not exists "Ingredients" (
    "IdIngredient" serial constraint "PK_7befd2d20b7d9c0602df6c901d9" primary key,
    "Name" varchar not null,
    "Quantity" integer not null,
    "IdUnit" integer not null constraint "FK_3c60f2235210a63dc0fd72f31f9" references "Units",
    "IdRecipe" integer not null constraint "FK_d4ca48bb1f5ca17192959de9ff2" references "Recipes"
);
create table if not exists "Comments" (
    "IdComment" serial constraint "PK_136dce126895d5665fe3ff0251c" primary key,
    "Comment" varchar not null,
    "DateCreated" timestamp default now() not null,
    "IdRecipe" integer not null constraint "FK_ecd6dbaf4fa771387582028b14a" references "Recipes",
    "IdUser" integer not null constraint "FK_73c5ad8394c6086d995d6d4546d" references "Users"
);
create table if not exists "UserHasFollowers" (
    "IdFollower" integer not null constraint "FK_84b2b1fa69a585818860354a03c" references "Users" on update cascade on delete cascade,
    "IdUser" integer not null constraint "FK_8b3cb9fc6b32593f8d7cea34074" references "Users",
    constraint "PK_64f32b5475844ba71800817dda2" primary key ("IdFollower", "IdUser")
);
create index if not exists "IDX_84b2b1fa69a585818860354a03" on "UserHasFollowers" ("IdFollower");
create index if not exists "IDX_8b3cb9fc6b32593f8d7cea3407" on "UserHasFollowers" ("IdUser");
create table if not exists "UserHasBookmarks" (
    "IdUser" integer not null constraint "FK_eda9c39cf873012ae36ead58f08" references "Users" on update cascade on delete cascade,
    "IdRecipe" integer not null constraint "FK_0caf1224d5a4e8c3168b2d4daea" references "Recipes",
    constraint "PK_da3c1c9bd9d1d225c1a4aac9375" primary key ("IdUser", "IdRecipe")
);
create index if not exists "IDX_eda9c39cf873012ae36ead58f0" on "UserHasBookmarks" ("IdUser");
create index if not exists "IDX_0caf1224d5a4e8c3168b2d4dae" on "UserHasBookmarks" ("IdRecipe");
create table if not exists "UserHasLikedRecipe" (
    "IdUser" integer not null constraint "FK_af904c64ae7701de5473b1c6f3f" references "Users" on update cascade on delete cascade,
    "IdRecipe" integer not null constraint "FK_55ec8be55a7790d7a545e2a51bc" references "Recipes",
    constraint "PK_9d938df8ad1dab052acbde28d2e" primary key ("IdUser", "IdRecipe")
);
create index if not exists "IDX_af904c64ae7701de5473b1c6f3" on "UserHasLikedRecipe" ("IdUser");
create index if not exists "IDX_55ec8be55a7790d7a545e2a51b" on "UserHasLikedRecipe" ("IdRecipe");
create table if not exists "UserHasLikedComment" (
    "IdUser" integer not null constraint "FK_213c3044c3543ccd53671dc6a9c" references "Users" on update cascade on delete cascade,
    "IdComment" integer not null constraint "FK_97020aab3a86c99434a9c656c4a" references "Comments",
    constraint "PK_feafee117afe039f787b39012c1" primary key ("IdUser", "IdComment")
);
create index if not exists "IDX_213c3044c3543ccd53671dc6a9" on "UserHasLikedComment" ("IdUser");
create index if not exists "IDX_97020aab3a86c99434a9c656c4" on "UserHasLikedComment" ("IdComment");
create table if not exists "Steps" (
    "IdStep" serial constraint "PK_c829c56ffc0b3075eaeff4e8434" primary key,
    "Description" varchar not null,
    "IdRecipe" integer not null constraint "FK_31333fb27c203ab2e6a46efb4a3" references "Recipes"
);
create table if not exists "Tags" (
    "IdTag" serial constraint "PK_7735c6d952ff4f229348ebc5d9b" primary key,
    "Name" varchar not null
);
create table if not exists "RecipeHasTags" (
    "IdRecipe" integer not null constraint "FK_0294b64d18c66b550ed9bb1d294" references "Recipes" on update cascade on delete cascade,
    "IdTag" integer not null constraint "FK_ff77e0ca6d17417455b3522bfa5" references "Tags",
    constraint "PK_40b08cf46e299e1ee07e487f990" primary key ("IdRecipe", "IdTag")
);
create index if not exists "IDX_0294b64d18c66b550ed9bb1d29" on "RecipeHasTags" ("IdRecipe");
create index if not exists "IDX_ff77e0ca6d17417455b3522bfa" on "RecipeHasTags" ("IdTag");
insert into "Roles" ("Name")
values ('USER_ROLE'),
    ('ADMIN_ROLE');
insert into "Units" ("Name")
values ('gr'),
    ('k'),
    ('ml'),
    ('l'),
    ('piece(s)'),
    ('spoon(s)'),
    ('cup(s)');