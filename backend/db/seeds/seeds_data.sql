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
  ''
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
  ''
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
  ''
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
  ''
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
  ''
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
  ''
);
-- Conversations seeds data
INSERT INTO conversations (
  userA_id, 
  userB_id)
VALUES (
  1,
  2
);

-- Countries seeds data
INSERT INTO countries (
  emoji,
  countryName, 
  countryShortName)
VALUES (
  '🇨🇦',
  'Canada',
  'CA'
);
INSERT INTO countries (
  emoji,
  countryName, 
  countryShortName)
VALUES (
  '🇮🇹',
  'Italy',
  'IT'
);
INSERT INTO countries (
  emoji,
  countryName, 
  countryShortName)
VALUES (
  '🇻🇳',
  'Vietnam',
  'VN'
);
INSERT INTO countries (
  emoji,
  countryName, 
  countryShortName)
VALUES (
  '🇷🇺',
  'Russia',
  'RU'
);
INSERT INTO countries (
  emoji,
  countryName, 
  countryShortName)
VALUES (
  '🇴🇲',
  'Oman',
  'OM'
);
INSERT INTO countries (
  emoji,
  countryName, 
  countryShortName)
VALUES (
  '🇰🇿',
  'Kazakhstan',
  'KZ'
);

-- Languages seeds data
INSERT INTO Languages (
  shortForm,
  longForm)
VALUES (
  'En',
  'English'
);
INSERT INTO Languages (
  shortForm,
  longForm)
VALUES (
  'Vi',
  'Vietnamese'
);
INSERT INTO Languages (
  shortForm,
  longForm)
VALUES (
  'Ru',
  'Russian'
);
INSERT INTO Languages (
  shortForm,
  longForm)
VALUES (
  'Ru',
  'Arabic'
);

