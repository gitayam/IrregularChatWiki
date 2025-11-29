---
title: "Booting OS from USB"
---

# Booting OS from USB

## Flashing Linux on Various Computer Brands
This page provides detailed instructions for installing Linux on computers from several top brands. It includes troubleshooting tips for common issues encountered during the installation process.

### Table of Contents

- [Preparation](#general-preparation)
- [Brand-Specific Instructions](#brand-specific-instructions)
  - [Table for BIOS/UEFI Access](#key-table)
  - [HP](#hp)
  - [ASUS](#asus)
- [Common Installation Issues and Troubleshooting](#common-installation-issues-and-troubleshooting)
- [Additional Resources](#additional-resources)

### General Preparation
Before flashing Linux, ensure the following steps are completed:

- **Backup Data**: Always back up important data to an external drive or cloud storage.

- **Create a Bootable USB Drive**: Use tools like Rufus or Balena Etcher to create a Linux bootable USB drive. [Here](#bootable-usb)

- **Update BIOS/UEFI**: Ensure your BIOS/UEFI firmware is up-to-date to avoid compatibility issues.

### Brand-Specific Instructions

### Key Table for BIOS/UEFI Access
The table below summarizes the key combinations to access BIOS/UEFI for different computer manufacturers.


| Manufacturer | Keys | Comments |
|--------------|------|----------|
| Dell | F2 | Press during boot. Disable "Secure Boot" under Security tab |
| HP | F10 | Press as computer starts. Enable "Legacy Support" for USB boot |
| Lenovo | F1 or F2 | Tap when Lenovo logo appears. Change from UEFI to Legacy if needed |
| ASUS | F2 or Delete | Press when ASUS logo shows. Adjust Boot Priority to select USB first |
| Acer | F2 | Press as Acer logo appears. Set USB as first boot device |

### Dell

#### Accessing BIOS/UEFI

- Restart your Dell computer and press **F2** during boot to enter BIOS settings.

- Navigate to the “Boot” tab and change the boot order to prioritize the USB drive.

#### Secure Boot

- Disable “Secure Boot” to allow Linux to install, which is typically found under the “Security” tab.

### HP

#### Accessing BIOS/UEFI

- Press **F10** as your HP computer starts to enter BIOS settings.

#### Legacy Support

- In BIOS, enable “Legacy Support” to allow booting from USB.

### Lenovo

#### Accessing BIOS/UEFI

- Tap the **F1** or **F2** key when the Lenovo logo appears.

#### UEFI/Legacy Boot

- Change the boot mode from UEFI to Legacy if facing issues with the USB boot.

### ASUS

#### Accessing BIOS/UEFI

- Press **F2** or **Delete** when the ASUS logo shows.

#### Boot Priority

- Adjust the Boot Priority to ensure the USB drive is selected first.

### Acer

#### Accessing BIOS/UEFI

- Press the **F2** key as soon as the Acer logo appears.

#### Setting Boot Order

- Prioritize the USB drive in the boot sequence to start the Linux installation.

### Common Installation Issues and Troubleshooting

### Issue 1: System Stuck on Brand Logo

- **Solution**: Check if “Secure Boot” is disabled in BIOS settings.

### Issue 2: No Bootable Device Found

- **Solution**: Switch the boot mode from UEFI to Legacy or vice versa, depending on your system setup.

### Issue 3: Black Screen After Booting from USB

- **Solution**: Modify the Linux boot parameters by adding `nomodeset` before booting.

### Issue 4: Installation Freezes

- **Solution**: Try using a different USB port or re-creating the bootable USB drive.

### Additional Resources

- [Ubuntu Installation Guide](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview)

- [Linux Mint Installation Documentation](https://linuxmint-installation-guide.readthedocs.io/en/latest/)

