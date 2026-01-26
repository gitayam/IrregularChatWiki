---
title: "Proxmox-Backup Restore"
---

# Proxmox-Backup Restore

## Proxmox Backup and Restore
This guide provides options for consistently backing up a server, instructions for restoring from backups, and best practices for testing backups prior to needing them.

Back to [## Assumptions
This guide focuses on Proxmox servers and assumes:

- A directory is established on the server for backups. Example: `/datadrive/Backups/`

- Services run within containers and VMs on the Proxmox server (host).

- SSH keys have been established and copied into each VM and container. Refer to the SSH Keys](/server-guides/) guide for more on SSH key generation and usage.

For specific service guides, see:

- [Backup](/infrastructure/authentik-backup)

### Backup
```
# /usr/local/bin/proxmox-backup.sh

1. Define variables
BACKUP_DIR="/datadrive/Backups"
VZ_DIR="/var/lib/vz/dump"
BACKUP_REMOTE="pcloud:Backups/Server-Backups"
VZ_REMOTE="pcloud:Backups/Server-Backups/VZDUMPS"
LOCAL_BACKUP_DIR="/datadrive/Backups"

1. Authentik variables
AUTHENTIK_REMOTE_USER="root"
AUTHENTIK_REMOTE_HOST="192.168.4.134"
AUTHENTIK_REMOTE_BACKUP_DIR="/home/authentik/authentik/authentik_backups"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

1. Ensure remote backup directory exists
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "mkdir -p $AUTHENTIK_REMOTE_BACKUP_DIR"

1. Backup PostgreSQL Database
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "docker exec -i authentik-postgresql-1 /usr/local/bin/pg_dump --username authentik authentik > $AUTHENTIK_REMOTE_BACKUP_DIR/postgres-back"

1. Save Redis Database
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "docker exec -i authentik-redis-1 redis-cli save"

1. Copy Redis Dump
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "docker cp authentik-redis-1:/data/dump.rdb $AUTHENTIK_REMOTE_BACKUP_DIR/redis-backup-$TIMESTAMP.rdb"

1. Create Tarball of Necessary Files
ssh $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST "tar czvf $AUTHENTIK_REMOTE_BACKUP_DIR/authentik-backup-$TIMESTAMP.tar.gz -C /home/authentik/authentik authentik docker-compose.yml certs"

1. Sync from Authentik server to Proxmox backup
rsync -avz --progress $AUTHENTIK_REMOTE_USER@$AUTHENTIK_REMOTE_HOST:$AUTHENTIK_REMOTE_BACKUP_DIR $LOCAL_BACKUP_DIR/authentik_backups

echo "Remote backup completed successfully."

```

### Restore
Instructions for restoring from backup will depend on the specific service and the type of backup used. Refer to the [Backup](/infrastructure/authentik-backup) or other service-specific guides for restoration steps.
