---
title: "Cloudflare Trouble Shooting"
---

# Cloudflare Trouble Shooting

### Cloudflared Status
```shell
systemctl status cloudflared.service
```

### See Cloudflare Logs
```shell
journalctl -u cloudflared.service --no-pager --lines=80
```

### Upgrade Cloudflared
NOTE: It is important that you are not ssh’d using a cloudflared tunnel when running this command.

```shell
cloudflared service uninstall
COMMAND_FROM_Cloudflare
```
