DROP TABLE IF EXISTS messageConversations CASCADE;

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  userConversation_id INTEGER REFERENCES userConversations(id) ON DELETE CASCADE,
  message_id INTEGER
);