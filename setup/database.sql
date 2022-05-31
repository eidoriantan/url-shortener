
CREATE OR REPLACE FUNCTION random_string(int) RETURNS text AS $$
  SELECT array_to_string(ARRAY(SELECT chr((97 + round(random() * 25)) :: integer)
  FROM generate_series(1,15)), '');
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION unique_short() RETURNS text AS $$
DECLARE
  short text;
  done bool;
BEGIN
  done := false;
  WHILE NOT done LOOP
    short := random_string(8);
    done := NOT exists(SELECT 1 FROM shorts WHERE short_id=short);
  END LOOP;
  RETURN short;
END;
$$ LANGUAGE PLPGSQL VOLATILE;

CREATE TABLE IF NOT EXISTS shorts (
  id SERIAL PRIMARY KEY,
  short_id VARCHAR NOT NULL DEFAULT unique_short(),
  url TEXT NOT NULL,
  visits INT NOT NULL DEFAULT 0,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
