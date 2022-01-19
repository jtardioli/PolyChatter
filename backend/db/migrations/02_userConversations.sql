DROP TABLE IF EXISTS userConversations CASCADE;


CREATE TABLE userConversations (
  id SERIAL PRIMARY KEY NOT NULL,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  userA_id INTEGER,
  userB_id INTEGER
);