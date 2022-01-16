DROP TABLE IF EXISTS userConversations CASCADE;


CREATE TABLE userConversations (
  id SERIAL PRIMARY KEY NOT NULL,
  userA_id INTEGER,
  userB_id INTEGER
);