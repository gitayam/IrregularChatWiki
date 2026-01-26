---
title: "Container Dashboard - Portainer"
---

# Container Dashboard - Portainer

```

```
[source](https://docs.portainer.io/start/install-ce/server/docker/linux)

```shell
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```
On a browser go to: `https://localhost:9443` or `https://ip.addr.here:9443`
