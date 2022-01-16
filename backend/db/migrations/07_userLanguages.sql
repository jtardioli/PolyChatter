DROP TABLE IF EXISTS userLanguages CASCADE;

CREATE TABLE userLanguages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  language_id INTEGER REFERENCES Languages(id) ON DELETE CASCADE,
  user_level INTEGER,
  nativeLanguage BOOLEAN
);