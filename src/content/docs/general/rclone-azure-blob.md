---
title: "Rclone Azure Blob"
---

# Rclone Azure Blob

## Rclone Azure Blob Storage

Set up Azure storage account with all defaults. Then follow the image to get the SAS key.

### Installation

**Unix-based systems:**
```bash
curl https://rclone.org/install.sh | sudo bash
```

**Windows:** Download from https://rclone.org/downloads/

### Mounting in Linux

Follow directions from https://rclone.org/azureblob/ or reference this [video tutorial](https://www.youtube.com/watch?v=j4kPsbrzfZA).

#### Configuration Steps

1. Run `rclone config`

2. Choose the following options:
   - `n` - for new remote
   - `30` - for Azure Blob
   - Use defaults till you reach `sas_url` then copy the sas_url for your container

**Note:** You must create the sas_url from the container NOT the account. Also make sure you give the right permissions.

Example sas_url:
```
https://storage.blob.core.windows.net/cloud?sp=racwdlmeop&st=2023-07-03T12:41:58Z&se=2027-07-03T20:41:58Z&spr=keyofsomesort
```

3. Use defaults to the end and quit the config. You will see something like this:

```
Configuration complete.
Options:
- type: azureblob
- account: storage
- sas_url: "thesasurl"

Keep this "sas" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y

Current remotes:
Name                 Type
====                 ====
sas                  azureblob

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q
```

### Connection Options

#### Syncing

Sync a target directory. You will need to set a cron job to back and sync regularly.

```bash
rclone sync /home/drok/blob sas:cloud/test
# Format: rclone sync /target_directory "remote_name":"container_name"/"directory_in_container"
```

#### Mounting

Similar to sync, but the service stays connected.

```bash
rclone mount --allow-non-empty sas:teleportcloud/test /home/drok/blob/
```

Running this command in the terminal will remain active. You will need to run this in the background as a service.

### Running on Boot

1. Create a simple script: `nano rclone_blobmount.sh`

```bash
#!/bin/bash
rclone mount --allow-non-empty --daemon sas:teleportcloud/test /home/drok/blob/
```

2. Make it executable:

```bash
chmod +x rclone_blobmount.sh
```

3. Create a systemd file: `sudo nano /etc/systemd/system/blobmount.service`

```ini
Description=rclone blobstorage mount
After=network.target
After=systemd-user-sessions.service
After=network-online.target

User=drok
Type=forking
ExecStart=/home/drok/rclone_blobmount.sh
TimeoutSec=30
Restart=on-failure
RestartSec=30
StartLimitInterval=350
StartLimitBurst=10

Alias=blobmount.service
WantedBy=multi-user.target
```

4. Restart systemd daemon:

```bash
sudo systemctl daemon-reload
```

5. Run the service:

```bash
sudo systemctl start blobmount.service
```

6. Enable on boot:

```bash
sudo systemctl enable blobmount.service
```
