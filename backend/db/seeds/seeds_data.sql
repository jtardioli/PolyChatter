-- Users seeds data
INSERT INTO users (
  name, 
  email, 
  password, 
  country, 
  target_lang, 
  mother_tongue)
VALUES (
  'Brenda Paul',
  'Brenda@gmail.com',
  'Brenda123',
  'Canada',
  'French',
  'English'
);

INSERT INTO users (
  name, 
  email, 
  password, 
  country, 
  target_lang, 
  mother_tongue)
VALUES (
  'Giselle Vance',
  'Giselle@gmail.com',
  'Giselle123',
  'Italy',
  'Russian',
  'Italian'
);

INSERT INTO users (
  name, 
  email, 
  password, 
  country, 
  target_lang, 
  mother_tongue)
VALUES (
  'Nigel Conway',
  'Nigel@gmail.com',
  'Nigel123',
  'Vietnam',
  'German',
  'Vietamese'
);
-- Conversations seeds data
INSERT INTO conversations (
  userA_id, 
  userB_id)
VALUES (
  1,
  2
);

-- Messages seeds data