---
title: "Self-host-cloudflare-tunnels"
---

# Self-host-cloudflare-tunnels

## Self-host with Cloudflare
[DarkWeb](http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion|source:)

```

```

### How to use Cloudflare

### Why use Cloudflare

### Securing Cloudflare Tunnels
Many clearnet websites related to DNM, such as link rotators and directories, host on Cloudflare. However, they often fail to take measures to prevent bots from scanning their HTTP services (e.g., Shodan, Censys), which can expose their backend IP addresses.

To verify if you are affected, you can use:

```

telnet YOUR-BACKEND-IP 80

```

or

```

nmap YOUR-BACKEND-IP

```

If you can connect via telnet or Nmap returns your HTTP port, follow the steps below to enhance your security. A simple way to protect yourself is to block any traffic from outside Cloudflare on HTTP port 80 (or whatever port you have proxied with Cloudflare).

**This script does:**

- Allows SSH traffic (customizable based on your setup)

- Fetches Cloudflare's current IPs (both IPv4 and IPv6)

- Adds iptables rules to allow connections from Cloudflare's IPs

- Adds iptables rules to block all connections on HTTP port 80

- Allows localhost and other essential traffic (these rules can be modified or deleted based on your requirements)

```

#!/bin/bash

CLOUDFLARE_IPV4_URL="https://www.cloudflare.com/ips-v4"
CLOUDFLARE_IPV6_URL="https://www.cloudflare.com/ips-v6"

CLOUDFLARE_IPV4=$(curl -s $CLOUDFLARE_IPV4_URL)
CLOUDFLARE_IPV6=$(curl -s $CLOUDFLARE_IPV6_URL)

iptables -F INPUT
ip6tables -F INPUT

iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
ip6tables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

iptables -A INPUT -p tcp --dport 22 -j ACCEPT
ip6tables -A INPUT -p tcp --dport 22 -j ACCEPT

for ip in $CLOUDFLARE_IPV4; do
    iptables -A INPUT -p tcp -s $ip --dport 80 -j ACCEPT
done

for ip in $CLOUDFLARE_IPV6; do
    ip6tables -A INPUT -p tcp -s $ip --dport 80 -j ACCEPT
done

iptables -A INPUT -p tcp --dport 80 -j DROP
ip6tables -A INPUT -p tcp --dport 80 -j DROP

iptables -A INPUT -i lo -j ACCEPT
ip6tables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
ip6tables -A INPUT -p ipv6-icmp -j ACCEPT

```

_Note: If your SSL mode is set to **Full** or **Full Strict**, you will also need to apply similar rules to SSL port 443._

Additionally, if you run a hidden service with Tor, you can further enhance security by allowing traffic only from Tor exit IPs. A separate post will be made for Hidden Services.
