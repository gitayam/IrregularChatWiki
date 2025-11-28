---
title: "GSM-Basestation"
---

# GSM-Basestation

## Setting Up a GSM Base Station
Quickly create a GSM network that can support calls and SMS. Previously covered on this [RTL-SDR Post](https://www.rtl-sdr.com/setting-up-a-gsm-basestation-in-minutes-with-a-usrp-and-dragonos/).

### Requirements

### Software

- [* UHD

- OpenBTS

### Hardware

- Computer or Raspberry Pi running DragonOS](/radio/dragonos)

- Software Defined Radio (SDR)
  - [Phone](/general/phone-for-basestation)
  - *SDR*

### Cemaxecuter Guide

Watch on [YouTube](https://youtu.be/6EnASi9MvSI?si=awiw-LvLI_43ov6I).

### Set Up Base Station Calling

## Plug in the SDR.
  - Connect SDR to the computer.
  - Perform Checks.
```
lsusb
ifconfig
```

## Configure the network connection for IPv4.
  - Create a new interface netmask graphically or via CLI:
```
Interface#
IPV4
192.168.1.20/24
```

## Confirm the setup using:
```
uhd_find_devices
```
    Ensure the device is listed.

## Update the configuration:
```
cd /usr/src/osmo-nitb-scripts
sudo nano config.json
sudo main_uhd.py -u --sip
```
  - `-u` enables interactive mode.
  - `--sip` enables Asterisk support.

## Run the following in another terminal:
```
/usr/bin/osmo-trx-uhd -C /etc/osmocom/osmo-trx-uhd.cfg
```

### Set Up Base Station OpenBTS

## Plug in the SDR.
  - Confirm the interface name:
```
lsusb
ifconfig
```

## Configure the network connection for IPv4.
  - Create a new interface netmask:
```
Interface#
IPV4
192.168.1.20/24
```

## Navigate to the OpenBTS directory:
```
cd /usr/src/OpenBTS/
```

## Register the SIM:
```
sudo /usr/src/OpenBTS/OpenBTS
```
    Connection should be quick.

### Details

### Compatible Phones
For this to work, the mobile device needs to have a [Calypso baseband chip](https://osmocom.org/projects/baseband/wiki/CalypsoBTS).

**Motorola:**

- [C115 $40](https://www.ebay.com/itm/125794237715) or C117 (E87)

- C123/C121/C118 (E88)

- [C140 $27](https://www.ebay.com/itm/203919668429) or [C139 $15](https://www.ebay.com/itm/185686317627) (E86)

- C155 (E99)

- V171 (E68/E69)

**SonyEricsson:**

- [J100i $8.99](https://www.ebay.com/itm/125542851653)

### Compatible SDR
See the [comparison](/radio/software-defined-radios-sdrs) table.

**Requirements:**

- Full-duplex SDR

- Covers frequency ranges: **850 MHz and 1900 MHz**

- Compatible with the software

#### YateBTS works with:

- [BladeRF $540+](https://www.nuand.com/bladerf-2-0-micro/#accessories-wapper)

#### srsRan supports:

- [BladeRF $540+](https://www.nuand.com/bladerf-2-0-micro/#accessories-wapper)

- *#### Osmo-nitb works with:

- [LimeSDR*)(/limesdr-products)

- [AntSDR E200](https://www.crowdsupply.com/microphase-technology/antsdr-e200)


[Defined Radio]
