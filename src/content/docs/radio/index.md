---
title: "RF/SDR/Communications"
---

# RF/SDR/Communications

## RF Learning

*   [RF Learning Pipeline](/radio/rf-learning-pipeline) - A comprehensive guide to learning RF engineering concepts, skills, and certifications.

## Getting Started

| Resource | Description |
|----------|-------------|
| [Software Defined Radios (SDRs)](/radio/software-defined-radios-sdrs) | Introduction to SDR concepts and hardware |
| [DragonOS](/radio/dragonos) | Pre-configured Linux for SDR operations |
| [HAM Radio](/radio/ham-radio) | Amateur radio licensing and resources |

## Software Defined Radio (SDR)

### What is SDR?

Software-defined radio (SDR) is a radio communication system where components traditionally implemented in analog hardware (mixers, filters, amplifiers, modulators/demodulators) are instead implemented using software on a computer or embedded system.

### SDR Hardware

| Device | Use Case | Notes |
|--------|----------|-------|
| **RTL-SDR** | Entry-level | Receive only, inexpensive |
| **HackRF One** | General purpose | Transmit and receive, wide frequency range |
| **PlutoSDR** | Learning/Teaching | Great with PySDR, networkable, FPGA capable |
| **LimeSDR** | Advanced | Full duplex, high bandwidth |
| **BladeRF** | Professional | High performance |

### Getting Started with SDR

**Recommended for Learning**: PlutoSDR + PySDR
- Can be networked for remote learning
- Supports Maia firmware for 50MHz+ spectrum via FPGA
- Can be hacked for LTE support
- Available at Mouser Electronics

### SDR Software & Platforms

- [DragonOS](/radio/dragonos) - Pre-configured Linux with SDR software suite
- [GNU Radio](https://www.gnuradio.org/) - Open-source signal processing toolkit
- [SDR++](https://www.sdrpp.org/) - Cross-platform SDR software
- [GQRX](https://gqrx.dk/) - Open source SDR receiver

## DragonOS

[DragonOS](/radio/dragonos) leverages Lubuntu Linux as a delivery package for pre-installed open-source SDR software.

### Supported Platforms

| Platform | Notes |
|----------|-------|
| VirtualBox | Virtualized |
| VMware | Virtualized |
| Raspberry Pi 3/4 | Native ARM |
| Intel | Native x86 |

### Installation

1. [Download from SourceForge](https://sourceforge.net/projects/dragonos-focal/files/latest/download)
2. Prepare USB with [Ventoy](https://www.ventoy.net/en/download.html) or [Etcher](https://www.balena.io/etcher/)
3. Boot from live image or install dual-boot

### DragonOS Resources

- [DragonOS Guide](/radio/dragonos) - Full installation and usage guide
- [YouTube Channel](https://www.youtube.com/channel/UC9U2kaqhE716J2WNSTcOghg) - Video tutorials
- [Discord Community](https://discord.gg/9uSC2un)
- [Matrix Channels](https://matrix.to/#/#dragon-os:matrix.org)

### Pre-configured Products

- [WarDragon Kit+](https://cemaxecuter.com/?post_type=product) - Ready-to-use SDR kit

## HAM Radio

### License Classes (US)

| License | Privileges | Exam |
|---------|-----------|------|
| **Technician** | VHF/UHF, local/regional comms | 35 questions |
| **General** | HF privileges, worldwide comms | 35 questions |
| **Amateur Extra** | All privileges, all bands | 50 questions |

Licenses valid for 10 years. See [ARRL Getting Licensed](https://www.arrl.org/getting-licensed).

### Study Resources

| Resource | Link |
|----------|------|
| Ham Cram | [ham-cram.com](http://ham-cram.com/member-lounge/technician-study.php) |
| ARRL Exam Practice | [arrl.org/exam-practice](https://www.arrl.org/exam-practice) |
| Technician Anki Deck | [Anki Flashcards](https://ankiweb.net/shared/info/1989339803) |
| Extra Class Anki Deck | [Anki Flashcards](https://ankiweb.net/shared/info/817192394) |

### Find Exam Sessions

[ARRL Exam Session Finder](https://www.arrl.org/find-an-amateur-radio-license-exam-session) - In-person and online testing

See: [HAM Radio Guide](/radio/ham-radio)

## Flipper Zero

[Flipper Zero](/radio/flipper-zero) - Multi-tool device for pentesters and RF enthusiasts.

### Resources

- [Flipc.org](https://flipc.org/) - Collection of Flipper Zero applications
- [GitHub: fap-list](https://github.com/playmean/fap-list) - .fap files built automatically

## Radio Operations

- [Radio Checks](/radio/radio-checks) - Proper radio check procedures

## Related Topics

### Electronic Warfare

SDR knowledge applies to understanding EW concepts:
- Signal analysis and identification
- Spectrum monitoring
- Communications security

### Unmanned Systems

RF knowledge is critical for:
- Command and control links (ELRS, Crossfire)
- Video transmission (5.8GHz FPV)
- GPS/GNSS systems
- Counter-UAS jamming

See: [Unmanned Systems](/general/unmanned-systems)

## References

### Books

- Dillinger, Markus et al. (2003). *Software Defined Radio: Architectures, Systems, and Functions*. Wiley & Sons.
- Amaral, Cristiano (2021). *Guia Moderno do Radioescuta*. Brazil: Amazon.

### External Resources

- [Wikipedia: Software-defined radio](https://en.wikipedia.org/wiki/Software-defined_radio)
- [DragonOS SourceForge Wiki](https://sourceforge.net/p/dragonos-focal/wiki/Home/)
- [Wireless Innovation Forum](https://www.wirelessinnovation.org/)

## Related Pages

- [Unmanned Systems](/general/unmanned-systems) - RF links for drones
- [Counter-UxS](/general/counter-uxs) - Electronic warfare concepts
- [Certifications](/general/certifications) - RF/EW certifications
