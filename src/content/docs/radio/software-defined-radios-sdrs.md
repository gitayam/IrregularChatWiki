---
title: "Software Defined Radios (SDRs)"
---

# Software Defined Radios (SDRs)

## SDR, According to [Wikipedia](https://en.wikipedia.org/wiki/Software-defined_radio)
> Software-defined radio (SDR) is a radio communication system where components that have been traditionally implemented in analog hardware (e.g., mixers, filters, amplifiers, modulators/demodulators, detectors, etc.) are instead implemented using software on a personal computer or embedded system. While the concept of SDR is not new, the rapidly evolving capabilities of digital electronics render practical many processes that were once only theoretically possible.

A basic SDR system may consist of a personal computer with a sound card or analog-to-digital converter, preceded by some RF front end. Significant signal processing is handed over to the general-purpose processor rather than done in special-purpose hardware (electronic circuits). Such a design produces a radio that can receive and transmit widely different radio protocols (sometimes called waveforms) based solely on the software used.

Software radios have significant utility for the military and cell phone services, which must serve various changing radio protocols in real time. In the long term, proponents like the Wireless Innovation Forum expect software-defined radios to become the dominant technology in radio communications. SDRs and software-defined antennas are the enablers of cognitive radio.

### SDR In Use

- HackRF

- PlutoSDR

### SDR To Start
If you're trying to teach/learn, the PlutoSDR + Pysdr is great. If you want to learn a little about networking mixed in, it can be made to be networked. If you want to learn about FPGA a little, it can run Maia firmware and see over 50Mhz broad spectrum via FPGA/onboard web interface. Another firmware does nearly the same + adds 8-bit mode to get even more bandwidth. It can be hacked to support LTE. If you want to learn about building roots and your own firmware, you can also do that. It's a pretty extensive list, to be honest, and they're available at Mouser.

- Aaron

### SDR Comparison
[SDR Comparison Chart|center](#)
[Comparison](#)
[Image Source](https://www.crowdsupply.com/lime-micro/limesdr#products)

[Comparison Ant E200 vs. Pluto](#)
[Image Source](https://www.crowdsupply.com/microphase-technology/antsdr-e200)

### SDR Software

- [DragonOS SourceForge](https://sourceforge.net/p/dragonos-focal/wiki/Home/) ([Internal Link](/radio/dragonos))

## SDR Tools & Hardware

### Specialized SDR Platforms
- **AntSDR**: A popular platform for SDR research and drone-specific applications. Recent firmware for models like the DJI O4 allows for enhanced signal sniffing and analysis. Note: Default credentials often include `root/abawavearm` or `root/1`.

### SDR Design & Analysis Tools
- **AntennaCalculator**: [Dollarhyde/AntennaCalculator](https://github.com/Dollarhyde/AntennaCalculator) - An open-source tool for computing antenna dimensions and exporting designs directly to fabrication-ready formats like Gerber, DXF, and PNG.

## References

- Dillinger, Markus; Madani, Kambiz; Alonistioti, Nancy (2003). *Software Defined Radio: Architectures, Systems, and Functions*. Wiley & Sons. ISBN 0-470-85164-3.

- Amaral, Cristiano (2021). *Guia Moderno do Radioescuta*. Brazil: Amazon. ISBN 978-65-00-20800-9.
