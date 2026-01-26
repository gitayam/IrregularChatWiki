---
title: "Linux Server Storage"
---

# Linux Server Storage

## Persistence Mounted Storage and Bind Mounts
Managing persistent storage is crucial for ensuring data availability and integrity, whether working with physical drives, virtualized environments like Proxmox, or cloud-based services. This guide covers setting up persistent mounted storage, configuring bind mounts for Proxmox containers and VMs, and using rclone to integrate cloud storage services such as Google Drive, ProtonDrive, pCloud, and more.

### Persistence Mounted Storage
```

1. Determine which drive has the size you attached
lsblk

1. Prompt the user to select the mounted storage drive
echo "Which is the mounted Storage? (Look at the Storage Size) such as sda, sdb, sdc: "
read DRIVE

1. Create a directory in the user's home directory
mkdir -p $HOME/datadrive

1. Format the drive (sda used here) to use as storage
sudo mkfs.ext4 /dev/$DRIVE

1. Mount storage to the created directory
sudo mount /dev/$DRIVE $HOME/datadrive

1. Ensure that attached storage is permanently mounted
echo "/dev/$DRIVE $HOME/datadrive ext4 defaults 0 0" | sudo tee -a /etc/fstab

```

### Bind Storage from Host Proxmox to and from Container/VM
**Direct Bind Mount**:
```

1. LXC containers support bind mounts directly, allowing you to make the host directory accessible inside the container.

1. Step 1: Edit the container’s configuration file
1. The configuration file is located at:
nano /etc/pve/lxc/<VMID>.conf

1. Step 2: Add a mount point entry
1. Example configuration line:
mp0: /datadrive/media/,mp=/media,readonly=0

1. Explanation:
1. - /datadrive/media/ is the source directory on the host.
1. - /media is the destination directory inside the container.
1. - readonly=0 allows write access. Remove it for read-only access.

1. Step 3: Restart the container to apply changes
pct restart <VMID>

```

### Using rclone for Cloud Storage Integration
rclone is a powerful tool for mounting and syncing cloud storage services as local directories. Follow these steps to set up rclone with popular services like Google Drive, ProtonDrive, and pCloud.

### Install rclone
```

1. Update package manager and install rclone
sudo apt update
sudo apt install -y rclone

```

### Configure rclone
```

1. Run the rclone configuration wizard
rclone config

1. Follow the prompts to:
1. - Create a new remote
1. - Select the cloud service (e.g., Google Drive, ProtonDrive, pCloud)
1. - Authenticate with your account
1. - Save the configuration

```

### Mount Cloud Storage Locally
```

1. Create a directory to mount the cloud storage
mkdir -p $HOME/cloudstorage

1. Use rclone to mount the cloud storage
rclone mount <remote_name>: $HOME/cloudstorage --daemon

1. Example:
1. rclone mount gdrive: $HOME/cloudstorage --daemon

```

### Automate rclone Mount on Boot
```

1. Create a systemd service file for rclone
sudo nano /etc/systemd/system/rclone.service

1. Add the following content, replacing <remote_name> and <mount_point>:
[Description=Mount rclone remote at boot
After=network-online.target

[Service](Unit])
Type=simple
ExecStart=/usr/bin/rclone mount <remote_name>: <mount_point> --config=/home/$USER/.config/rclone/rclone.conf --daemon
Restart=on-failure
User=$USER
Group=$USER

[WantedBy=multi-user.target

1. Save and enable the service
sudo systemctl enable rclone.service
sudo systemctl start rclone.service

```

### Supported Cloud Services
rclone supports a wide range of cloud storage providers. Some popular options include:

- **Google Drive**: Seamless integration for personal and business accounts.

- **ProtonDrive**: Secure and privacy-focused storage.

- **pCloud**: Affordable and reliable for personal and professional use.

- **Dropbox**: Widely used for personal and collaborative storage.

- **Amazon S3**: Scalable object storage for developers and enterprises.

### Categories


