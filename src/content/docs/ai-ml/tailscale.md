---
title: "Tailscale"
---

# Tailscale

## Tailscale Guide
Return to [NOTE: Running wireguard at the same time is not compatible

NOTE: running in a container instead of a VM may present issues with TUN.

Run the Linux Server Initial Setup](/server-guides/) first as it installs curl and other requirements. ## Installing Tailscale

```shell
cd /tmp
echo "This may take a few seconds"
printf ".\n..\n..."
curl -fsSL https://tailscale.com/install.sh | sh
echo "tailscale up --ssh"
echo "run the command above after you authenticate."
cd -
```
NOTE: if you are ssh’d into the machine through tailscale already you’ll need to run

```shell
tailscale up --ssh --accept-risk=lose-ssh
```

### Trouble Shooting Tailscale
