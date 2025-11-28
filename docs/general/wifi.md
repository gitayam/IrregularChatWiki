---
title: "Wifi"
---

# Wifi

## Wifi

### Introduction
**Wi-Fi**, rumored on corners of the internet to be short for *Wireless Fidelity*, is a technology that allows devices to connect to a network wirelessly using the IEEE 802.11 standards. It enables laptops, smartphones, IoT devices, and countless other systems to exchange data over radio waves instead of physical cables. Operating primarily in the 2.4 GHz and 5 GHz bands—now extended to 6 GHz with Wi-Fi 6E—Wi-Fi is a cornerstone of modern digital communication, both in homes and in industrial, academic, and military environments.

### History and Evolution of Wi-Fi Versions
Since its inception, Wi-Fi has evolved significantly in speed, range, and efficiency. The following table summarizes major iterations:

| Wi-Fi Version | IEEE Standard | Year | Max Speed | Key Features |
|---------------|---------------|------|-----------|--------------|
| Wi-Fi 1 | 802.11b | 1999 | 11 Mbps | First widely adopted standard |
| Wi-Fi 2 | 802.11a | 1999 | 54 Mbps | Operated in 5 GHz band |
| Wi-Fi 3 | 802.11g | 2003 | 54 Mbps | Backward-compatible with 802.11b |
| Wi-Fi 4 | 802.11n | 2009 | 600 Mbps | MIMO (Multiple Input, Multiple Output) |
| Wi-Fi 5 | 802.11ac | 2014 | 1.3+ Gbps | Beamforming, wider channels |
| Wi-Fi HaLow | 802.11ah | 2016 | ~347 Mbps | Sub-1 GHz, long-range IoT, similar to LoRa |
| Wi-Fi 6 | 802.11ax | 2019 | 9.6 Gbps | OFDMA, MU-MIMO, Target Wake Time |
| Wi-Fi 6E | 802.11ax (6 GHz) | 2021 | 9.6 Gbps | Expansion to 6 GHz spectrum |
| Wi-Fi 7 | 802.11be | 2024-2025 | 30+ Gbps | Extremely low latency, 320 MHz channels |

### Wi-Fi as a Signal Intelligence Vector
While Wi-Fi is best known for its utility, it is also a rich source of wireless signal intelligence. Every Wi-Fi-enabled device emits frames containing identifiers, signal strength, channel usage, and even hints of user behavior. Open-source tools, such as **Aircrack-NG** and **Kismet Wireless**, can passively intercept and analyze these emissions.

### Aircrack-NG and Wireless Surveying
The **Aircrack-NG suite** is a powerful collection of open-source tools used for auditing Wi-Fi network security. At the heart of this toolkit is **Airodump-NG**, a packet capture utility tool that allows users to monitor all nearby wireless traffic while collecting critical metadata such as BSSIDs, ESSIDs, encryption types, and client association data. Airodump-NG can capture WPA2 four-way handshakes when clients connect to access points.

Once a handshake is captured, **Aircrack-NG** can be used to attempt to recover the pre-shared key (PSK) by executing dictionary-based or brute-force attacks against the encrypted credentials found in the `.pcap` file. This makes Aircrack-NG a foundational toolset in Wi-Fi penetration testing, especially for assessing the effectiveness of a network's Wi-Fi security settings an the strength of user-chosen passwords on WPA/WPA2 networks.

### Kismet Wireless Overview
**Kismet** is a robust, open-source wireless network detector, sniffer, and intrusion detection system. It supports most Wi-Fi cards capable of monitor mode and can work in both passive and active scanning modes. Kismet does not transmit packets by default, making it ideal for covert data collection and RF analysis.

Key Features:

- Capture of beacon, probe request, probe response, and data frames

- Real-time detection of new devices and access points

- Logging and replay capabilities in pcap and netxml formats

- Integration with GPS for geolocation of detected networks and clients

- Support for 802.11a/b/g/n/ac/ax, and 802.15/802.11-based SDR sniffing

### Capturing WPA2 Four-Way Handshakes
The WPA2-PSK (Wi-Fi Protected Access 2 - Pre-Shared Key) authentication model relies on a four-way handshake exchange between a client and access point. Using Airodump-NG (a tool of the Aircrack-NG suite), passive capture of a 4-way handshake and even the "half handshake" are possible - allowing that network's PSK to be cracked. Kismet can be configured to passively capture this handshake, a critical step in offline password cracking using tools like `hashcat` or `aircrack-ng`.

### Steps to Capture a Handshake Using Kismet

## Enable monitor mode on a compatible wireless card.

2. Launch Kismet and configure it to use the desired interface and lock to the channel of targeted AP.

3. Wait for a client to connect to the target AP or force a reconnection (with external tools like `aireplay-ng`).

4. Kismet will automatically log the handshake when the client rejoins.

5. Extract the handshake from the Kismet logs (`.pcap` format) and analyze it with cracking tools.

### Wi-Fi Direction Finding and Target Tracking
Each Wi-Fi device, whether an access point or a client, emits frames containing its MAC address and other metadata. These emissions serve as a unique digital signature, especially when randomized MAC features are disabled or circumvented.

With multiple antennas or mobile setups, Kismet (in conjunction with other tools such as `rtlamr`, `Yagi antennas`, or GPS) can be used to:

- Estimate signal strength and triangulate a source's location

- Correlate devices across time and space using MAC address persistence

- Track specific clients (e.g., mobile phones) through probe requests or known AP responses

This kind of RF telemetry is often employed in:

- Penetration testing and red team operations

- Crowd monitoring and de-anonymization research

- Asset tracking in secure environments

### Ethical and Legal Considerations
While tools like Kismet and Aircrack-NG are invaluable for legitimate security research and network diagnostics, unauthorized interception of wireless traffic may violate local or federal laws. Always ensure you have **explicit authorization** before engaging in wireless surveillance or traffic capture.

### Conclusion
Wi-Fi is more than a convenient way to access the internet—it is a constantly emitting RF signature that can be analyzed, mapped, and, under the right circumstances, exploited. Tools like Aircrack-NG and Kismet Wireless democratize access to this data, enabling defenders, researchers, and ethical hackers to better understand the RF landscape, secure networks, and conduct technical reconnaissance in a wireless-first world.

### Disclaimer

This wiki page is intended for educational and informational purposes only. All content, including guides, tools, and methodologies discussed herein, is provided with the explicit understanding that it will be used responsibly, ethically, and legally.

Unauthorized access, surveillance, or manipulation of networks, systems, or devices without proper consent is illegal and strictly condemned by the administrators of this wiki. We do not condone or support any activities that violate laws, terms of service, or the privacy of individuals or organizations.

Users are solely responsible for how they apply the knowledge found on this site. Always ensure you have clear permission before engaging in any form of network analysis, penetration testing, or signal monitoring. Use common sense, good judgment, and respect for legal boundaries at all times.

### External Links

- [Official Kismet Website](https://www.kismetwireless.net/)

- [Kismet GitHub Repository](https://github.com/kismetwireless/kismet)

- [Official Aircrack-NG Website](https://www.aircrack-ng.org/)

- [Wi-Fi Alliance](https://www.wi-fi.org/)
