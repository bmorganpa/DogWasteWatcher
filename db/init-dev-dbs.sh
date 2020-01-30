#!/bin/sh

set -e

echo "Creating databases"
"${psql[@]}" <<-EOSQL
  CREATE DATABASE dogwastewatcher_development;
  CREATE DATABASE dogwastewatcher_test;
EOSQL

for DB in dogwastewatcher_test; do
echo "Loading PostGIS extensions into $DB"
"${psql[@]}" --dbname="$DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS postgis;
EOSQL
done