-- PostgreSQL Database Backup
-- Generated on: $(date)
-- Database: pitch-pro

-- Drop existing tables if they exist (for clean restore)
DROP TABLE IF EXISTS "user_detail" CASCADE;

DROP TABLE IF EXISTS "detail_progress" CASCADE;

DROP TABLE IF EXISTS "post-test" CASCADE;

DROP TABLE IF EXISTS "pre-test" CASCADE;

DROP TABLE IF EXISTS "user_progress" CASCADE;

DROP TABLE IF EXISTS "stories" CASCADE;

DROP TABLE IF EXISTS "badge" CASCADE;

DROP TABLE IF EXISTS "users" CASCADE;

-- Create sequences
CREATE SEQUENCE IF NOT EXISTS user_user_id_seq;

CREATE SEQUENCE IF NOT EXISTS badge_badge_id_seq;

CREATE SEQUENCE IF NOT EXISTS story_story_id_seq;

CREATE SEQUENCE IF NOT EXISTS user_progress_progress_id_seq;

CREATE SEQUENCE IF NOT EXISTS "pre-test_pre_test_id_seq";

CREATE SEQUENCE IF NOT EXISTS "post-test_post_test_id_seq";

CREATE SEQUENCE IF NOT EXISTS user_detail_detail_id_seq;

-- Create tables
CREATE TABLE users (
    user_id INTEGER NOT NULL DEFAULT nextval('user_user_id_seq'::regclass),
    email CHARACTER VARYING NOT NULL,
    username CHARACTER VARYING NOT NULL,
    xp INTEGER NOT NULL DEFAULT 0,
    avatar BYTEA,
    hash_password CHARACTER VARYING NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    avatar_mimetype CHARACTER VARYING,
    PRIMARY KEY (user_id)
);

CREATE TABLE badge (
    badge_id INTEGER NOT NULL DEFAULT nextval('badge_badge_id_seq'::regclass),
    badge_name CHARACTER VARYING,
    category CHARACTER VARYING,
    requirements CHARACTER VARYING,
    PRIMARY KEY (badge_id)
);

CREATE TABLE stories (
    story_id INTEGER NOT NULL DEFAULT nextval('story_story_id_seq'::regclass),
    tema CHARACTER VARYING,
    system_instruction CHARACTER VARYING,
    chapter INTEGER,
    badge_id INTEGER,
    checkpoint_pack INTEGER,
    PRIMARY KEY (story_id),
    FOREIGN KEY (badge_id) REFERENCES badge(badge_id)
);

CREATE TABLE user_progress (
    progress_id INTEGER NOT NULL DEFAULT nextval('user_progress_progress_id_seq'::regclass),
    user_id INTEGER NOT NULL,
    story_id INTEGER NOT NULL,
    time_do TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    PRIMARY KEY (progress_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id)
);

CREATE TABLE "pre-test" (
    pre_test_id INTEGER NOT NULL DEFAULT nextval('"pre-test_pre_test_id_seq"'::regclass),
    progress_id INTEGER NOT NULL,
    anxiety_level SMALLINT,
    anxiety_reason CHARACTER VARYING,
    PRIMARY KEY (pre_test_id),
    FOREIGN KEY (progress_id) REFERENCES user_progress(progress_id)
);

CREATE TABLE "post-test" (
    post_test_id INTEGER NOT NULL DEFAULT nextval('"post-test_post_test_id_seq"'::regclass),
    progress_id INTEGER NOT NULL,
    anxiety_level SMALLINT,
    anxiety_reason CHARACTER VARYING,
    PRIMARY KEY (post_test_id),
    FOREIGN KEY (progress_id) REFERENCES user_progress(progress_id)
);

CREATE TABLE detail_progress (
    progress_id INTEGER NOT NULL,
    audio BYTEA,
    accumulate_xp INTEGER,
    history_feedback JSONB,
    PRIMARY KEY (progress_id),
    FOREIGN KEY (progress_id) REFERENCES user_progress (progress_id)
);

CREATE TABLE user_detail (
    detail_id INTEGER NOT NULL DEFAULT nextval('user_detail_detail_id_seq'::regclass),
    user_id INTEGER NOT NULL,
    history_xp INTEGER,
    times TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    badge_id INTEGER,
    progress_id INTEGER,
    PRIMARY KEY (detail_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (badge_id) REFERENCES badge(badge_id),
    FOREIGN KEY (progress_id) REFERENCES user_progress(progress_id)
);

-- Data will be inserted below this line
-- (Data export will be added by running additional queries)

-- Insert data into users table
INSERT INTO
    users (
        user_id,
        email,
        username,
        xp,
        avatar,
        hash_password,
        created_at,
        updated_at,
        avatar_mimetype
    )
VALUES (
        6,
        'andi@gmail.com',
        'andi riogi',
        0,
        NULL,
        '$2b$10$8K15Y7P.xzQ/So6kTaOB/eSTwPueuCHRt6jHUkKL63vopHMTVpGUG',
        '2025-04-17 08:18:08.031',
        '2025-04-17 08:18:08.031',
        NULL
    ),
    (
        7,
        'andiharjo@gmail.com',
        'diharjo',
        0,
        NULL,
        '$2b$10$b.7KcSGuJV/RQmKTgSxZf.vvM/2eabNSHlRFryQCJXgbmiA5lGSBa',
        '2025-04-24 07:07:53.563',
        '2025-04-24 07:07:53.563',
        NULL
    ),
    (
        8,
        'andihadiamanah@gmail.com',
        'dihakimi',
        27,
        NULL,
        '$2b$10$Cdj9HFGIkNiSmCavrER/ju78mLmhpsEQruFSiALW0Xg1OETPd61j2',
        '2025-04-26 06:43:25.151',
        '2025-04-26 06:43:25.151',
        NULL
    ),
    (
        9,
        'tes1@gmail.com',
        'altes1',
        0,
        NULL,
        '$2b$10$GSsHaFOj7qC1sYRmV4tt2O7ToxL04Da7p3V/6udxxhlAcghmxG4q6',
        '2025-05-04 06:42:04.341',
        '2025-05-04 06:42:04.341',
        NULL
    ),
    (
        10,
        'andihadiamanahh@gmail.com',
        'dihakimin',
        0,
        NULL,
        '$2b$10$j2IKUDIhfWrau80ulOxL3.AVGRomjnoLDT.o4CqNTHW8Sif55ttEe',
        '2025-05-04 07:38:30.171',
        '2025-05-04 07:38:30.171',
        NULL
    ),
    (
        11,
        'ryandi@gmail.com',
        'dihakiminBpk',
        0,
        NULL,
        '$2b$10$gagHHBcy6Rkm5QXzYAQtVe32mmG41d1QPmoc3L9EU2rJfwq1NSsu6',
        '2025-05-04 08:25:36.223',
        '2025-05-04 08:25:36.223',
        NULL
    ),
    (
        12,
        'abcdef@gmail.com',
        'Ryandi47',
        250,
        NULL,
        '$2b$10$Ed4gr.j0rAtBfV/GWh6sPepewadDjTMfNuXbj4CHK9YqTWTsJEKSK',
        '2025-05-07 02:06:08.228',
        '2025-05-07 02:06:08.228',
        NULL
    ),
    (
        13,
        'andihh@gmail.com',
        'dihakmin',
        0,
        NULL,
        '$2b$10$2eylHwPBftVChCoIe39BO.OS3Yug/I/RFHze724WUxbIzwJhCgnXe',
        '2025-05-08 02:01:15.061',
        '2025-05-08 02:01:15.061',
        NULL
    ),
    (
        25,
        'altest4@gmail.com',
        'altest4',
        3368,
        NULL,
        '$2b$10$urFE6y15NO8ME.LU4ET5fOzVOxX3wJenqSzFJyf/wH6rm8ua1TN86',
        '2025-05-12 23:25:22.550',
        '2025-05-12 23:25:22.550',
        NULL
    ),
    (
        30,
        'altest5@gmail.com',
        'altoplelah',
        1258,
        NULL,
        '$2b$10$5Vqt2N28YoaUF7974dCbUuvM0uJPBxupU0zqiKtyCgvUOMKj6SLZq',
        '2025-05-16 01:10:18.785',
        '2025-05-16 01:10:18.785',
        NULL
    ),
    (
        33,
        'Top10@gmail.com',
        'Pitchpro',
        922,
        NULL,
        '$2b$10$czp/oPTp5.S8sjBCowZBx.bUTmXKWZCPHoTU24SrKQt/uGFbXcZci',
        '2025-05-16 09:22:34.232',
        '2025-05-16 09:22:34.232',
        NULL
    ),
    (
        35,
        'alfianc220@gmail.com',
        'alfianadicandra',
        1140,
        NULL,
        '$2b$10$Gbeu3MBmXp1Lgqj9YAwLg.ej1uj05KcpssTqX6T437lWQS6Ix/ysi',
        '2025-05-16 11:36:24.458',
        '2025-05-16 11:36:24.458',
        NULL
    );

-- Insert data into badge table
INSERT INTO
    badge (
        badge_id,
        badge_name,
        category,
        requirements
    )
VALUES (
        1,
        'Persuation Pro',
        'persuative',
        'when complete scenario to persuade dimas'
    ),
    (
        2,
        'Professor Favorite',
        'presentation QnA',
        'after correct answering question from the professor'
    ),
    (
        3,
        'From Blank To Bold',
        'train with friend',
        'when success training presentation with friends'
    );

-- Insert data into stories table
INSERT INTO
    stories (
        story_id,
        tema,
        system_instruction,
        chapter,
        badge_id,
        checkpoint_pack
    )
VALUES (
        1,
        'Presentation With Friends',
        'Evaluasilah apakah inputan merupakan kalimat ajakan atau persuasif yang tepat untuk mengajak teman kampus bernama Dimas agar bersedia membantu Arga dalam belajar dan menyusun presentasi, termasuk mengajarkan cara mendeliver presentasi. Kalimat ajakan sebaiknya terdengar sopan, meyakinkan, dan relevan dengan konteks kerja sama tugas kuliah. Jika mengandung kata kasar atau tidak ada ajakan eksplisit, anggaplah tidak relevan.\\\\n\\\\nEvaluate whether the user input is a polite and persuasive invitation directed to a classmate named Dimas, asking him to help Arga with preparing and delivering a presentation. The sentence should sound friendly, clear, and relevant to a university collaboration context. If the sentence includes rude language or lacks an actual invitation, consider it irrelevant.\\\\n\\\\nContoh input yang sesuai / Valid examples:\\\\n- ''Dim, yuk kita kerja bareng buat presentasi ini.''\\\\n- ''Gimana kalau kita bikin presentasinya bareng?''\\\\n- ''Dim, aku bener-bener butuh bantuanmu buat belajar presentasi.''\\\\n- ''Hey Dimas, would you like to work together on this presentation? I really need your help on how to deliver it well.''\\\\n- ''I think we''d make a great team for this project. Can you help me with the delivery part, Dimas?''\\\\n\\\\nContoh input yang tidak sesuai / Invalid examples:\\\\n- ''Terserah lo mau ikut apa nggak.''\\\\n- ''Gue males.''\\\\n- ''You figure it out yourself.''\\\\n- ''Why should I ask Dimas, he''s arrogant.',
        1,
        1,
        1
    ),
    (
        2,
        'Make Strong Hook For Opening Presentatian The Theme: The Artist vs The AI | AI''s Threat to Artistic Integrity and Ghibli''s Legacy',
        'Apakah inputan sesuai dengan opening presentasi dengan tema The Artist vs The AI: AI''s Threat to Artistic Integrity and Ghibli''s Legacy',
        1,
        NULL,
        2
    ),
    (
        3,
        'Content The Presentation About Differences Art From AI And Ghibli Studio, Include The Response of Artist from Ghibli Studio',
        'Apakah inputan sesuai untuk menjadi isi presentasi dengan pembahasan isi yaitu perbedaan antara gambaran yang dihasilkan AI sama karya asli Ghibli, plus tanggapan dari para artist Ghibli',
        1,
        NULL,
        2
    ),
    (
        4,
        'Content The Presentation About Risk, Negative Impact, and Concern For The Artist In Future',
        'Apakah inputan sesuai dengan pembahasan dari risiko, dampak negatif, dan kekhawatiran para seniman ke depannya mengenai The Artist vs AI''S: AI;s Threat to Artistic Integrity and Ghibli''s Legacy',
        1,
        NULL,
        2
    ),
    (
        5,
        'Content The Presentation About Copyright Issue, Cause, And Ethic Side With The Issue',
        'Apakah inputan sesuai dengan isu copyright, kenapa hal The Artist vs AI''S: AI;s Threat to Artistic Integrity and Ghibli''s Legacy bisa terjadi, dan sisi etnisnya',
        1,
        NULL,
        2
    ),
    (
        6,
        'Make Closing Statement For The Presentation',
        'Apakah inputan sesuai untuk menjadi penutup presentasi dengan tema The Artist vs The AI: AI''s Threat to Artistic Integrity and Ghibli''s Legacy',
        1,
        3,
        2
    ),
    (
        7,
        'Answering Question From The Professor Part 1',
        'Apakah inputan sesuai dengan jawaban dari pertanyaan that AI can mimic styles without consent or compensation. In your opinion, how can we create a fair system where AI tools are still useful but artists are protected?',
        1,
        NULL,
        3
    ),
    (
        8,
        'Answering Question From The Professor Part 2',
        'Apakah inputan sesuai dengan jawaban dari pertanyaan You quoted Hayao Miyazaki calling AI art ''an insult to life itself.'' Do you personally agree with that statement? Or do you think there''s a way AI can be used ethically in the creative process?',
        1,
        2,
        3
    );

-- Sample user_progress data (first 20 records)
INSERT INTO
    user_progress (
        progress_id,
        user_id,
        story_id,
        time_do
    )
VALUES (
        1,
        7,
        1,
        '2025-04-24 07:22:14.785'
    ),
    (
        3,
        8,
        1,
        '2025-04-26 18:22:48.218'
    ),
    (
        5,
        8,
        1,
        '2025-04-26 18:26:24.235'
    ),
    (
        6,
        12,
        1,
        '2025-05-07 02:07:06.966'
    ),
    (
        7,
        8,
        2,
        '2025-05-09 14:25:14.735'
    ),
    (
        8,
        8,
        4,
        '2025-05-09 14:43:36.863'
    ),
    (
        9,
        12,
        6,
        '2025-05-09 20:46:18.690'
    ),
    (
        10,
        12,
        2,
        '2025-05-09 20:46:18.691'
    ),
    (
        11,
        12,
        3,
        '2025-05-09 20:46:18.691'
    ),
    (
        12,
        12,
        4,
        '2025-05-09 20:46:18.691'
    ),
    (
        13,
        12,
        5,
        '2025-05-09 20:46:18.690'
    ),
    (
        14,
        12,
        7,
        '2025-05-09 20:49:58.566'
    ),
    (
        16,
        14,
        1,
        '2025-05-10 20:32:43.497'
    ),
    (
        17,
        21,
        8,
        '2025-05-11 04:03:40.451'
    ),
    (
        18,
        21,
        7,
        '2025-05-11 04:03:40.451'
    ),
    (
        19,
        21,
        1,
        '2025-05-11 04:04:10.764'
    ),
    (
        20,
        22,
        1,
        '2025-05-12 09:00:51.492'
    ),
    (
        21,
        23,
        1,
        '2025-05-12 09:35:04.851'
    ),
    (
        22,
        24,
        1,
        '2025-05-12 22:42:19.211'
    ),
    (
        23,
        25,
        1,
        '2025-05-12 23:26:08.922'
    );

-- Sample pre-test data
INSERT INTO
    "pre-test" (
        pre_test_id,
        progress_id,
        anxiety_level,
        anxiety_reason
    )
VALUES (1, 1, 6, 'The Topic'),
    (3, 3, 6, 'The Topic'),
    (5, 5, 6, 'The Topic'),
    (6, 6, 6, 'The Topic'),
    (7, 7, 7, 'The topic'),
    (8, 8, 6, 'The Topic'),
    (10, 16, 6, 'The Topic'),
    (11, 19, 6, 'The Audience'),
    (12, 20, 2, 'The Topic'),
    (13, 21, 2, 'The Topic'),
    (14, 22, 6, 'The Topic'),
    (15, 23, 7, 'The topic');

-- Reset sequences to current max values
SELECT setval ( 'user_user_id_seq', ( SELECT MAX(user_id) FROM users ) );

SELECT setval (
        'badge_badge_id_seq', (
            SELECT MAX(badge_id)
            FROM badge
        )
    );

SELECT setval (
        'story_story_id_seq', (
            SELECT MAX(story_id)
            FROM stories
        )
    );

SELECT setval (
        'user_progress_progress_id_seq', (
            SELECT MAX(progress_id)
            FROM user_progress
        )
    );

SELECT setval (
        '"pre-test_pre_test_id_seq"', (
            SELECT MAX(pre_test_id)
            FROM "pre-test"
        )
    );

-- Note: This backup contains a sample of the data. For a complete backup,
-- you would need to export all records from each table.
-- Additional tables (post-test, detail_progress, user_detail) would also need to be included.

COMMIT;