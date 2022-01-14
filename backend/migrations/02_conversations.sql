
DROP TABLE IF EXISTS converations CASCADE;


CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  userA_id INT,
  userB_id INT
);


