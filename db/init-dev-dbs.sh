#!/bin/sh

set -e

echo "Creating databases"
"${psql[@]}" <<-EOSQL
  CREATE DATABASE dogwastewatcher_development;
  CREATE DATABASE dogwastewatcher_test;
EOSQL