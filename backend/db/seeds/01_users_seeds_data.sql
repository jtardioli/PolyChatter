-- Users seeds data
INSERT INTO users (
  username,
  name,
  email, 
  password, 
  country_id, 
  bio)
VALUES (
  'bpaul',
  'Brenda Paul'
  'Brenda@gmail.com',
  'Brenda123',
  1,
  'Passionate polyglot, speaking 5 languages. Let\'s talk!'
);

INSERT INTO users (
  username,
  name,
  email, 
  password, 
  country_id, 
  bio)
VALUES (
  'gvance',
  'Giselle Vance',
  'Giselle@gmail.com',
  'Giselle123',
  2,
  'Passionate polyglot, speaking 5 languages. Let\'s talk!'
);

INSERT INTO users (
  username,
  name,
  email, 
  password, 
  country_id, 
  bio)
VALUES (
  'nconway',
  'Nigel Conway',
  'Nigel@gmail.com',
  'Nigel123',
  3,
  'Passionate polyglot, speaking 5 languages. Let\'s talk!'
);

INSERT INTO users (
  username,
  name,
  email, 
  password, 
  country_id, 
  bio)
VALUES (
  'ksimon',
  'Keely Simon',
  'Keely@gmail.com',
  'Keely123',
  4,
  'Passionate polyglot, speaking 5 languages. Let\'s talk!'
);

INSERT INTO users (
  username,
  name,
  email, 
  password, 
  country_id, 
  bio)
VALUES (
  'kleon',
  'Leon Peters',
  'Leon@gmail.com',
  'Leon123',
  5,
  'Passionate polyglot, speaking 5 languages. Let\'s talk!'
);
INSERT INTO users (
  username,
  name,
  email, 
  password, 
  country_id, 
  bio)
VALUES (
  'caiden',
  'Jaiden Cabrera',
  'Jaiden@gmail.com',
  'Jaiden123',
  6,
  'Passionate polyglot, speaking 5 languages. Let\'s talk!'
);
-- Conversations seeds data
INSERT INTO conversations (
  userA_id, 
  userB_id)
VALUES (
  1,
  2
);


