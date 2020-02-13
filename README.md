# Dog Waste Watcher
An app to track dog waste that is not picked up

## Development
1. `now`
1. `now dev`

### Database
First add the following to a `.env` file:
```
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=password
PGDATABASE=dogwastewatcher_development
PGPORT=55432
```

1. `docker build -t dogwastewatcher_db ./db`
1. `docker run --rm -it -p 55432:5432 dogwastewatcher_db`

Connect to the db with `PGPASSWORD=password psql -h localhost -U postgres -p 55432 -d dogwastewatcher_development`

## Migrations
First setup an environment variable file with the following variables:
```
FLYWAY_URL=jdbc:postgresql://<host>:<port>/<database_name>
FLYWAY_USER=db_user
FLYWAY_PASSWORD=db_password
```

1. Create new sql file under "migrations" directory
1. `docker run --rm --env-file <env_filename> -v ${PWD}/migrations:/flyway/sql flyway/flyway:6.2.0 migrate`