---
title: "Running-WikiJS"
---

# Running-WikiJS

## Configure Wiki.js with Docker Compose
Using Docker Compose simplifies the process of updating Wiki.js while ensuring safe practices. This is a matter of personal preference, but it's a highly recommended approach for managing Dockerized services.

### Configure Wiki.js
Create the following `docker-compose.yml` file in a user home directory for Wiki.js. Refer to the [Server Initial Setup](/server-guides/linux-server-initial-setup) guide for preliminary server setup.

```
version: "3"
services:

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: wiki
      POSTGRES_PASSWORD: super_secret_here
      POSTGRES_USER: wikijs
    logging:
      driver: "none"
    restart: unless-stopped
    volumes:
      - db-data:/var/lib/postgresql/data

  wiki:
    image: ghcr.io/requarks/wiki:2
    depends_on:
      - db
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: super_secret_here
      DB_NAME: wiki
    restart: unless-stopped
    ports:
      - "XZY:3000"

volumes:
  db-data:
```

- Update the port where it says `XZY` (e.g., `80:3000` for typical use). If using [adjust to your desired port.

- Replace the placeholder passwords (`super_secret_here`) with secure values.

### Run Wiki.js
To run Wiki.js, execute the following command:

```

docker compose up -d

```

### Update Wiki.js
To safely update Wiki.js, use:

```

docker-compose pull && docker-compose up -d

```

This command will pull the latest images specified in your `docker-compose.yml` file and restart the containers in detached mode.

### Backup Wiki.js
Backup your data before updating or making significant changes. Use the following command to create a database dump:

```

docker exec -t db pg_dumpall -c -U wikijs > dump_$(date +"%d-%m-%Y_%H-%M-%S").sql

```

- Replace `db` with the name of your database container if it's different.

Verify the logs of your Wiki.js container after the update to ensure it’s running correctly:

```

docker logs wiki

```

To restore the backup if needed:

```

cat your_backup.sql | docker exec -i db psql -U wikijs

```

- Replace `your_backup.sql` with the actual path to your backup file.

### Best Practices

- Always test updates in a non-production environment to avoid disruption to live users.

- Ensure the backup is valid and retrievable before making changes.

- Monitor the logs for any errors post-update to take corrective actions quickly.

,
