---
title: "Tailscale Exit Node"
---

# Tailscale Exit Node

## Set Up Exit Node with Tailscale
Setting up an Exit Node with Tailscale allows you to route your internet traffic through a specific device in your network, providing enhanced privacy and flexibility. This guide outlines the configuration process and provides best practices for optimizing performance.

### Exit Node Configuration
To configure a device as an exit node, use the following command:

```

sudo tailscale up --advertise-exit-node

```

Once the device is set up as an exit node, you can select it as the preferred route in your Tailscale settings. For additional details, refer to the official Tailscale documentation:

- [Tailscale Exit Nodes Guide](https://tailscale.com/kb/1103/exit-nodes?tab=linux)

- [Performance Best Practices](https://tailscale.com/kb/1320/performance-best-practices#ethtool-configuration)

### Auto-Starting Tailscale
To ensure Tailscale starts automatically with the correct settings, follow these steps:

### 1. Check Network Dispatcher Status
Verify if the `networkd-dispatcher` service is enabled:

```

systemctl is-enabled networkd-dispatcher

```

If not, enable it by running:

```

sudo systemctl enable networkd-dispatcher

```

### 2. Create a Service File for Tailscale
Create a custom `systemd` service to apply optimized `ethtool` settings for Tailscale:

```

sudo nano /etc/systemd/system/ethtool-tailscale-settings.service

```

Add the following configuration:

```
[Description=Apply ethtool settings for Tailscale optimizations
After=network.target

[Service](Unit])
Type=oneshot
ExecStart=/bin/sh -c 'NETDEV=$(ip route show 0/0 | cut -f5 -d" ") && ethtool -K $NETDEV rx-udp-gro-forwarding on rx-gro-list off'

[WantedBy=multi-user.target
```

### 3. Enable the Service
Enable the service so it starts automatically on boot:

```

sudo systemctl enable ethtool-tailscale-settings.service

```

### 4. Start the Service
Start the service immediately without rebooting:

```

sudo systemctl start ethtool-tailscale-settings.service

```

### Best Practices for Exit Node Performance
To optimize the performance of your Tailscale exit node, follow these guidelines:

- **Optimize Network Settings**:
  - Adjust the MTU (Maximum Transmission Unit) size for better performance.
  - Use tools like `ethtool` to fine-tune network settings.

- **Regular Software Updates**:
  - Keep Tailscale and your system software updated to leverage the latest improvements.

- **Monitor Traffic and Performance**:
  - Use monitoring tools like `iftop` or `vnstat` to keep track of network traffic and identify bottlenecks.

- **Use High-Performance Hardware**:
  - If possible, use a device with sufficient CPU and memory to handle the traffic demands of being an exit node.

### Conclusion
By setting up an exit node with Tailscale, you can improve your network's privacy and versatility. Following the outlined configuration and best practices ensures a reliable and high-performing exit node.
