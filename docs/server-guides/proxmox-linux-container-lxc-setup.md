---
title: "Proxmox Linux Container LXC Setup"
---

# Proxmox Linux Container LXC Setup

Within LXC source: https://github.com/spantaleev/matrix-docker-ansible-deploy/issues/703

```shell
mkdir -p /etc/systemd/system/matrix-synapse.service.d
echo "[Service]
Type=simple
Environment="HOME=/root"
ExecStartPre=-/usr/bin/env sh -c 'mount --make-shared /'
" > /etc/systemd/system/matrix-synapse.service.d/override.conf
systemctl daemon-reload
```
