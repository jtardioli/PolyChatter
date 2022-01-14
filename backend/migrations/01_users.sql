DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  taret_lang VARCHAR(255) NOT NULL,
  mother_tongue VARCHAR(255) NOT NULL,
  user_conversation INT[]
  
);