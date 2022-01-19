DROP TABLE IF EXISTS conversations CASCADE;

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  userA_id INTEGER REFERENCES users(id),
  userB_id INTEGER REFERENCES users(id)
);