# Dog Waste Watcher
An app to track dog waste that is not picked up

## Development
1 `npm install`
1 `npm run dev`

## Migrations
First setup an environment variable file with the following variables:
```
FLYWAY_URL=jdbc:postgresql://<host>:<port>/<database_name>
FLYWAY_USER=db_user
FLYWAY_PASSWORD=db_password
```

1 Create new sql file under "migrations" directory
1 `docker run --rm --env-file <env_filename> -v ${PWD}/migrations:/flyway/sql flyway/flyway:6.2.0 migrate`