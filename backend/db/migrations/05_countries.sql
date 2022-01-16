DROP TABLE IF EXISTS countries CASCADE;

CREATE TABLE countries (
  id SERIAL PRIMARY KEY NOT NULL,
  emoji VARCHAR,
  country_id VARCHAR REFERENCES users(countryId) ON DELETE CASCADE,
  countryName VARCHAR,
  countryShortName VARCHAR
);