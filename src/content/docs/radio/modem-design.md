---
title: "Modem Design & Digital Modes"
---

# Modem Design & Digital Modes

## RF Modem Synchronization
Designing a custom modem from scratch involves shifting from a byte-buffer paradigm to the time domain. Key challenges include achieving timing locks over a medium.

### Timing and Sync
- **Sync Bits**: Symbols sent at the beginning of a transmission to allow the receiver to calculate ticks and derive offsets.
- **Calculated Drift**: Smart receivers can calculate drift over time to maintain synchronization.
- **External Timing**: Leveraging GPS time or Network Time Protocol (NTP) to sync symbols (e.g., starting transmissions at the top of a second).
- **Monotonic Timers**: Essential for internal timing consistency during symbol processing.

### Prototyping
- **Python/NumPy**: Excellent for prototyping mathematical models and encoding bits to waveforms (e.g., 2FSK).
- **C/Rust**: Often required for real-time performance in production modems to handle high sample rates and low-latency requirements.

## AT Commands (Hayes Command Set)
Despite being a legacy technology, AT (Attention) commands remain the de-facto interface for modern communication modules, including:
- **LTE/Cellular Modems**: Still use proprietary and standard AT commands for configuration and status.
- **GSM Specifications**: Explicitly state the use of AT commands.
- **Radio CAT Control**: Many radios use AT-style commands for computer-aided tuning.

Common commands include `ATI` for information parsing (with `ATI4`, `ATI5`, etc., providing increasing verbosity).

## Data Link Protocols
- **PPP (Point-to-Point Protocol)**: A data link layer protocol used to establish a direct connection between two nodes. It supports authentication, encryption, and compression.
- **SLIP (Serial Line Internet Protocol)**: An older, simpler encapsulation method for IP over serial ports. While largely supplanted by PPP, it remains popular in microcontrollers due to its minimal overhead.

## Tools & Resources
- **Iridium Sniffer**: [alphafox02/iridium-sniffer](https://github.com/alphafox02/iridium-sniffer) - A standalone burst detector and demodulator in C.
- **Antenna Calculator**: [Dollarhyde/AntennaCalculator](https://github.com/Dollarhyde/AntennaCalculator) - Open-source tool for computing antenna dimensions and exporting to Gerber formats.

### References & Documentation
- [Network Time Protocol (NTP) - Wikipedia](https://en.wikipedia.org/wiki/Network_Time_Protocol)
- [Hayes AT Command Set - Wikipedia](https://en.wikipedia.org/wiki/Hayes_AT_command_set)
- [Point-to-Point Protocol (PPP) - Wikipedia](https://en.wikipedia.org/wiki/Point-to-Point_Protocol)
- [Serial Line Internet Protocol (SLIP) - Wikipedia](https://en.wikipedia.org/wiki/Serial_Line_Internet_Protocol)
