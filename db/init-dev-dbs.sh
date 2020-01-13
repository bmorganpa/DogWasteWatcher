#!/bin/sh

set -e

echo "Creating databases"
"${psql[@]}" <<-EOSQL
  CREATE DATABASE projectx_development;
  CREATE DATABASE projectx_test;
EOSQL

for DB in projectx_development projectx_test; do
echo "Loading PostGIS extensions into $DB"
"${psql[@]}" --dbname="$DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL
done