---
title: "VPN Recommendation"
---

# VPN Recommendation

## What is a VPN

A VPN (Virtual Private Network) is a tool that creates a private network connection across a public network, such as the Internet. It provides privacy (obfuscation) and security (encryption) while on the public network but does not guarantee anonymity. To achieve anonymity, The Onion Routing (TOR) is required.

Beyond traditional VPNs, there are alternative tools like [**Cloudflare Tunnels**](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), [**ZeroTier**](https://en.wikipedia.org/wiki/ZeroTier), [**Tailscale**](https://en.wikipedia.org/wiki/Tailscale), and proprietary solutions like [**Apple Private Relay**](https://en.wikipedia.org/wiki/ICloud#Private_Relay) and [**Cloudflare WARP**](https://en.wikipedia.org/wiki/1.1.1.1#WARP). These tools offer unique features and integrations that can complement or replace VPNs depending on the use case.

> Consider VPNs for what they are, a middleman. They have benefits. They also absolutely have associated risks. They are a tool in the box but not an end-all-be-all solution. They are far from it. We need to understand their use case when compared to various threat models.

### VPNs and Alternatives

| Tool | Features | Use Cases | Notable Integrations |
|------|----------|-----------|---------------------|
| [Mullvad VPN](https://mullvad.net/en/) | Privacy-focused, no email association, cash payment support | Obfuscation, secure browsing | Integrates with Tailscale for private routing |
| [IVPN](https://ivpn.net) | Privacy-first, anonymous signups, supports cash payments | Secure browsing, privacy-focused users | Supports multi-hop and WireGuard configurations |
| [ProtonVPN](https://protonvpn.com) | Swiss-based, strong privacy laws, free tier available | Secure browsing, privacy-conscious users | Integrates with ProtonMail for encrypted email |
| [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) | Exposes local services securely via Cloudflare's network | Hosting services without public IP, bypassing firewalls | Works with Cloudflare Access for zero-trust security |
| [ZeroTier](https://www.zerotier.com/) | Peer-to-peer virtual network with mesh routing | IoT devices, gaming, remote access | Supports IPv4/IPv6 networks and integrates with network controllers |
| [Tailscale](https://tailscale.com/) | Simplifies VPN configuration using WireGuard | Secure remote access to private resources | Mullvad VPN integration provides enhanced privacy by routing via Mullvad servers |

### VPNs to Avoid

- **Private Internet Access** - Was bought for $127 million in 2019
- **ExpressVPN** - Was acquired for $936 million in 2021

[Kape VPN relationships visualization](https://embed.kumu.io/9ced55e897e74fd807be51990b26b415#vpn-company-relationships/kape-vpns)

Users should carefully evaluate VPN providers' transparency and privacy policies before choosing a service.

### References

- [Privacy Guides - VPN](https://www.privacyguides.org/vpn/)
- [That One Privacy Site](https://thatoneprivacysite.xyz/)
