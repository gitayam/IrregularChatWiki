---
title: "Service - storage - Nextcloud"
---

# Service - storage - Nextcloud

Return to [Server Guides](/server-guides/)

Nextcloud AIO is inspired by projects like Portainer that directly manage the Docker daemon by interacting with it through the Docker socket. This concept allows users to install only one container with a single command, which then manages all necessary containers to provide a fully functional Nextcloud installation with most features included. This approach simplifies updates, as the environment is no longer bound to the host system and its slower update cycles. Everything operates within containers, providing a consistent and efficient experience. Additionally, a simple interface is provided for managing your Nextcloud AIO installation, making it user-friendly.

[Github Source](https://github.com/nextcloud/all-in-one#are-reverse-proxies-supported)

For usage, see [Nextcloud Usage](/general/usage-nextcloud)

## Server Setup

### Create an Instance

- See [Instance Setup](/server-guides/linux-server-initial-setup) for instructions.

### Allow Additional Inbound Ports

- Open ports: **3478**, **8080**

### SSH into the Server

Follow your preferred method to establish an SSH connection.

### Mount Storage Persistently

- Refer to [Server Storage](/server-guides/linux-server-storage) for guidance.

### Set Up a Server for Docker

- Follow [Server Initial Setup for Docker](/server-guides/linux-server-initial-setup) for instructions.

### Set Up Git Repository for Nextcloud AIO

```bash
cd $HOME
git clone https://github.com/nextcloud/all-in-one.git
cd $HOME/all-in-one # This is the Nextcloud AIO repo directory
mv compose.yaml compose.yaml.bk
touch compose.yaml
```

#### Create the `compose.yaml` File

```yaml
version: "3.8"
volumes:
  nextcloud_aio_mastercontainer:
    name: nextcloud_aio_mastercontainer

services:
  nextcloud:
    image: nextcloud/all-in-one:latest
    restart: always
    container_name: nextcloud-aio-mastercontainer
    volumes:
      - nextcloud_aio_mastercontainer:/mnt/docker-aio-config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 8080:8080
    networks:
      - nextcloud_network
    environment:
      - APACHE_PORT=11000
      - APACHE_IP_BINDING=127.0.0.1
      - NEXTCLOUD_DATADIR="/home/user/ncdata"
      - NEXTCLOUD_UPLOAD_LIMIT=50G
      - NEXTCLOUD_MEMORY_LIMIT=512M
      - TALK_PORT=3478
      - SKIP_DOMAIN_VALIDATION=true
```

### Start the Compose Service

```bash
cd $HOME/all-in-one # This is the Nextcloud AIO repo directory
sudo docker-compose up -d
```

### Web Setup

Wait approximately 3–7 minutes, then navigate to the server's IP address on port **8080** in your browser. Follow these steps:

1. Log in with the provided password (available on the "Open Nextcloud AIO Login" page).
2. Define your domain.
3. Install the latest Nextcloud version.
4. Install additional add-ons as needed.

### Setup Cloudflared

1. See [Proxy - Cloudflared](/infrastructure/reverse-proxy-cloudflared) for instructions.
2. On [Cloudflare](https://one.dash.cloudflare.com/), set up a tunnel using `http://localhost:11000` with your chosen domain or subdomain.
3. Visit the Cloudflare-configured domain (e.g., `https://nextcloud.example.com`).

Your username and password will be displayed at the top of the Mastercontainer page.

## Ports Explained

### Inbound Rules

The following ports must be open for incoming connections:

| Port | Purpose |
|------|---------|
| 8080/TCP | Used to access the Mastercontainer interface internally |
| 80/TCP | Used for HTTP redirection to Nextcloud and ACME HTTP-challenge for certificate retrieval |
| 8443/TCP | Used for secure access to the Mastercontainer interface with a valid certificate |
| 443/TCP | Used by the Apache container for secure HTTPS traffic |
| 443/UDP | Used by the Apache container for HTTP/3 traffic, if enabled |
| 3478/TCP and 3478/UDP | Used by the Talk container's TURN server |
