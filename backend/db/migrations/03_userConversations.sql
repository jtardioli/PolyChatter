DROP TABLE IF EXISTS userConverations CASCADE;


CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  userA_id INTEGER,
  userB_id INTEGER
);