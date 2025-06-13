-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "avatar" BYTEA,
    "hash_password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar_mimetype" VARCHAR,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "stories" (
    "story_id" SERIAL NOT NULL,
    "tema" VARCHAR,
    "system_instruction" VARCHAR,
    "chapter" INTEGER,
    "badge_id" INTEGER,
    "checkpoint_pack" INTEGER,

    CONSTRAINT "story_id_pk" PRIMARY KEY ("story_id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "progress_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "story_id" INTEGER NOT NULL,
    "time_do" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "progress_user_pk" PRIMARY KEY ("progress_id")
);

-- CreateTable
CREATE TABLE "detail_progress" (
    "progress_id" INTEGER NOT NULL,
    "audio" BYTEA,
    "accumulate_xp" INTEGER,
    "history_feedback" JSONB,

    CONSTRAINT "pk_progress_id" PRIMARY KEY ("progress_id")
);

-- CreateTable
CREATE TABLE "post-test" (
    "post_test_id" SERIAL NOT NULL,
    "progress_id" INTEGER NOT NULL,
    "anxiety_level" SMALLINT,
    "anxiety_reason" VARCHAR,

    CONSTRAINT "pk_post_test" PRIMARY KEY ("post_test_id")
);

-- CreateTable
CREATE TABLE "pre-test" (
    "pre_test_id" SERIAL NOT NULL,
    "progress_id" INTEGER NOT NULL,
    "anxiety_level" SMALLINT,
    "anxiety_reason" VARCHAR,

    CONSTRAINT "pk_pre_test" PRIMARY KEY ("pre_test_id")
);

-- CreateTable
CREATE TABLE "user_detail" (
    "detail_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "history_xp" INTEGER,
    "times" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "badge_id" INTEGER,
    "progress_id" INTEGER,

    CONSTRAINT "user_detail_pkey" PRIMARY KEY ("detail_id")
);

-- CreateTable
CREATE TABLE "badge" (
    "badge_id" SERIAL NOT NULL,
    "badge_name" VARCHAR,
    "category" VARCHAR,
    "requirements" VARCHAR,

    CONSTRAINT "badge_pkey" PRIMARY KEY ("badge_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "username_unique" ON "users"("username");

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "fk_stories_badge" FOREIGN KEY ("badge_id") REFERENCES "badge"("badge_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "fk_progress_story" FOREIGN KEY ("story_id") REFERENCES "stories"("story_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "fk_progress_user" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_progress" ADD CONSTRAINT "fk_user_progress_detail_progress" FOREIGN KEY ("progress_id") REFERENCES "user_progress"("progress_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post-test" ADD CONSTRAINT "fk_post-test_progress" FOREIGN KEY ("progress_id") REFERENCES "user_progress"("progress_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pre-test" ADD CONSTRAINT "fk_pre-test_progress" FOREIGN KEY ("progress_id") REFERENCES "user_progress"("progress_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "fk_user_detail" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "fk_user_detail_badge" FOREIGN KEY ("badge_id") REFERENCES "badge"("badge_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_detail" ADD CONSTRAINT "fk_user_detail_user_progress" FOREIGN KEY ("progress_id") REFERENCES "user_progress"("progress_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
