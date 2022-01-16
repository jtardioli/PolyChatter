DROP TABLE IF EXISTS countries CASCADE;

CREATE TABLE countries (
  id SERIAL PRIMARY KEY NOT NULL,
  emoji VARCHAR,
  countryName VARCHAR,
  countryShortName VARCHAR
);