---
title: "TAK (Tactical Awareness Kit)"
---

# TAK (Tactical Awareness Kit)

The **Tactical Awareness Kit (TAK)**, also known as the Team Awareness Kit, is a powerful situational awareness ecosystem developed by the US Department of Defense. It provides a common operational picture (COP) through mapping, chatting, and data sharing across various platforms.

Originally a military-only tool, the **Civilian (CIV)** version is now widely available for public safety, disaster response, and tech enthusiasts.

## The TAK Ecosystem

TAK is not just a single app; it is a suite of tools for different platforms:

| Tool | Platform | Use Case |
|------|----------|----------|
| **ATAK-CIV** | Android | The flagship mobile application. Most feature-rich and plugin-supported. |
| **WinTAK-CIV** | Windows | Ideal for TOC (Tactical Operations Center) use or desktop planning. |
| **iTAK** | iOS | A lighter version for iPhone/iPad users. Rapidly evolving but fewer features than ATAK. |
| **TAK Server** | Backend | The "hub" that connects all users, allowing for persistent chat, data sync, and remote PPL. |

---

## Getting Started (The "Day Zero" Guide)

### 1. Installation
The easiest way to start is with **ATAK-CIV** on an Android device.
- **Official Source**: [TAK.gov](https://tak.gov) (Requires account registration).
- **Public Source**: [Google Play Store](https://play.google.com/store/apps/details?id=com.atakmap.app.civ) (ATAK-CIV).
- **Windows**: Download WinTAK-CIV from [TAK.gov](https://tak.gov).

### 2. Basic Configuration
Once installed, configure your identity:
- **Callsign**: Your unique name on the map (e.g., `SCOUT-1`).
- **Team**: A color-coded group (e.g., Blue, Red, Cyan).
- **Role**: Your function (Team Member, Team Lead, etc.).

### 3. Mapping & Data
TAK uses a "layered" mapping approach.
- **Base Maps**: You can import online map sources (Google, Bing, OSM) or use offline maps (MBTiles, DTED).
- **Data Packages**: These are `.zip` files containing markers, maps, and overlays. You can share these P2P over Wi-Fi or through a server.
- **PPL (Position Location Information)**: Your location is shown as a marker on the map for all other users in your network.

---

## Connectivity: P2P vs. Server

### Peer-to-Peer (P2P)
If you are on the same Wi-Fi network (or using a VPN like Tailscale), TAK users can see each other automatically via Multicast. No server required. This is great for local team training.

### TAK Server
To connect users across the internet or different networks, you need a server.
- **[FreeTAKServer (FTS)](https://freetakserver.com)**: The most popular open-source, community-driven TAK server.
- **[TAKy](https://github.com/bkerler/taky)**: A lightweight, simple TAK server written in Python.
- **Official TAK Server**: Available via TAK.gov for government and public safety entities.

---

## Essential Plugins
ATAK's power comes from its modular plugin system:
- **WASP**: Wide Area Search Plugin for search and rescue operations.
- **Video**: Connect to drone feeds (RTSP/UDP) or static camera streams.
- **Hammer**: Integration with radios (e.g., Meshtastic, GoTenna, or traditional RF via acoustic coupling/cables) to send data when cellular is unavailable.
- **Data Sync**: Syncs specific mission folders across all connected devices.

---

## Community Resources

For those looking to dive deeper into the rabbit hole:
- **[Official TAK Documentation](https://tak.gov/documentation)**: The primary source for official manuals.
- **[CivTAK.org](https://www.civtak.org/)**: Community-driven guides and software mirrors.
- **[TAK Reddit](https://www.reddit.com/r/ATAK/)**: A very active community for troubleshooting and hardware setups.
- **[ATAK Discord](https://discord.gg/atak)**: Real-time help and developer discussions.
- **[TAWiki](https://wiki.takciv.org/)**: The unofficial community wiki.

---

## Hardware Considerations
While TAK can run on most modern Android devices, "power users" often look for:
- **Ruggedized Devices**: Samsung Galaxy XCover series, Panasonic Toughbook/Toughpad.
- **External GPS**: Dual-band GNSS receivers for high-precision mapping.
- **Radio Integration**: Meshtastic nodes for LoRa-based P2P data sharing.