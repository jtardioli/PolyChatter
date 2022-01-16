DROP TABLE IF EXISTS conversations CASCADE;


CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  userA_id INTEGER,
  userB_id INTEGER
);