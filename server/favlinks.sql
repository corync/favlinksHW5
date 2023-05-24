CREATE TABLE links (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  URL VARCHAR(30)
);



\echo 'Delete and recreate favlinks On db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE favlinks;
CREATE DATABASE favlinks;
\connect favlinks;

\i favlinks-schema.sql