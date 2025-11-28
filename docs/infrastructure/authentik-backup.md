---
title: "Authentik-Backup"
---

# Authentik-Backup

## Backing Up Authentik Server
This guide provides steps to back up an Authentik server, including PostgreSQL and Redis databases, and sync the backup to a Proxmox server for redundancy.

### Overview
This process includes:

- Backing up critical components of the Authentik server, such as databases and configuration files.

- Compressing backups into a single tarball for easy transfer and storage.

- Encrypting backups for additional security (optional).

- Syncing backups from the Authentik server to the Proxmox server.

### Prerequisites

- Access to the Authentik server and Proxmox server.

- Authentik server's IP address or hostname and a user with appropriate SSH privileges.

- Tools: `rsync`, `ssh`, and required Docker utilities installed on both servers.

- Backup storage location on Proxmox server.

- Remote storage (e.g., pCloud) for redundancy.

### Backup Script
```

1. Define variables
BACKUP_DIR="/datadrive/Backups"
VZ_DIR="/var/lib/vz/dump"
BACKUP_REMOTE="pcloud:Backups/Server-Backups"
VZ_REMOTE="pcloud:Backups/Server-Backups/VZDUMPS"
LOCAL_BACKUP_DIR="/datadrive/Backups"

1. Authentik variables
AUTHENTIK_REMOTE_USER="root"
AUTHENTIK_REMOTE_HOST="192.168.X.Y" # Replace with Authentik server's IP
AUTHENTIK_REMOTE_BACKUP_DIR="/home/authentik/authentik/authentik_backups"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

1. Ensure remote backup directory exists
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "mkdir -p $AUTHENTIK_REMOTE_BACKUP_DIR"

1. Backup PostgreSQL Database
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST \
"docker exec -i authentik-postgresql-1 /usr/local/bin/pg_dump --username authentik authentik > $AUTHENTIK_REMOTE_BACKUP_DIR/postgres-back-$TIMESTAMP.sql"

1. Save Redis Database
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "docker exec -i authentik-redis-1 redis-cli save"

1. Copy Redis Dump
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST \
"docker cp authentik-redis-1:/data/dump.rdb $AUTHENTIK_REMOTE_BACKUP_DIR/redis-backup-$TIMESTAMP.rdb"

1. Create Tarball of Necessary Files
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST \
"tar czvf $AUTHENTIK_REMOTE_BACKUP_DIR/authentik-backup-$TIMESTAMP.tar.gz -C /home/authentik/authentik authentik docker-compose.yml certs"

1. Sync backups from Authentik server to Proxmox server
rsync -avz --progress $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST:$AUTHENTIK_REMOTE_BACKUP_DIR/ $LOCAL_BACKUP_DIR/authentik_backups

echo "Backup and sync completed successfully."

```

### Optional Encryption
To add encryption, use tools like `gpg` or `age`. For example:

### GPG
```

1. Encrypt the tarball with GPG
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST \
"gpg --symmetric --cipher-algo AES2# $AUTHENTIK_REMOTE_BACKUP_DIR/authentik-backup-$TIMESTAMP.tar.gz"

```

### age
```

1. Encrypt the tarball with age
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST \
"age -e -a -r default.recipient $AUTHENTIK_REMOTE_BACKUP_DIR/authentik-backup-$TIMESTAMP.tar.gz"

```

### Considerations

1. **Security:** Ensure SSH access to the Authentik server is secure (e.g., use key-based authentication).

1. **Automation:** Consider scheduling this script via `cron` or a similar tool for regular backups.

1. **Testing:** Regularly test your backup restoration process to ensure integrity and usability.

### Categories
