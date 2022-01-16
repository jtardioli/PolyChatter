DROP TABLE IF EXISTS messageConversations CASCADE;

CREATE TABLE messageConversations (
  id SERIAL PRIMARY KEY NOT NULL,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  message_id INTEGER
);