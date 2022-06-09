
CREATE OR REPLACE FUNCTION random_string(int) RETURNS text AS $$
  SELECT array_to_string(ARRAY(SELECT chr((97 + round(random() * 25)) :: integer)
  FROM generate_series(1,$1)), '');
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION unique_alias() RETURNS text AS $$
DECLARE
  alias_str text;
  done bool;
BEGIN
  done := false;
  WHILE NOT done LOOP
    alias_str := random_string(8);
    done := NOT exists(SELECT 1 FROM shorts WHERE alias=alias_str);
  END LOOP;
  RETURN alias_str;
END;
$$ LANGUAGE PLPGSQL VOLATILE;

CREATE TABLE IF NOT EXISTS shorts (
  id SERIAL PRIMARY KEY,
  alias VARCHAR NOT NULL DEFAULT unique_alias(),
  url TEXT NOT NULL,
  visits INT NOT NULL DEFAULT 0,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referrers (
  id SERIAL PRIMARY KEY,
  alias VARCHAR NOT NULL,
  referrer VARCHAR NOT NULL,
  visited TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
