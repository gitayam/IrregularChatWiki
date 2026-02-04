---
title: "VirtualBox Guide"
---

# VirtualBox Guide

### What is VirtualBox
Return to [Guide](/general/dfp-guide) • Return to [Environment](/general/virtual-environments)

VirtualBox is a powerful x86 and AMD64/Intel64 virtualization product for enterprise and home use. It is an extremely feature-rich, high-performance product for enterprise customers and the only professional solution that is freely available as Open-Source Software under the terms of the GNU General Public License (GPL) version 2. See “About VirtualBox” for an introduction.

**NOTE:** VirtualBox does not work well with ARM-based computers like the Apple Silicon MacBooks.

VirtualBox is actively developed with frequent releases and has an ever-growing list of features, supported guest operating systems, and platforms it runs on. VirtualBox is a community effort backed by a dedicated company: everyone is encouraged to contribute, while Oracle ensures the product always meets professional quality criteria.

### Why You Should Use VirtualBox
VirtualBox is Free Open-Source Software with active support and a large community. Despite its challenges, VirtualBox provides all “paid” features for other virtualization software.

Unlike trial or pirated software, VirtualBox receives timely security updates and patches.

### Installing VirtualBox

1. [Download](https://www.virtualbox.org/wiki/Downloads) the latest VirtualBox Application.
2. Install the downloaded VirtualBox Application.
3. [Download](https://download.virtualbox.org/virtualbox/6.1.38/Oracle_VM_VirtualBox_Extension_Pack-6.1.38.vbox-extpack) the latest VirtualBox extension pack.
4. Install the downloaded extension pack by double-clicking it.
5. Download the Operating System (ISO) - see below.
6. Configure VirtualBox.

:::note
VirtualBox 7 may have errors that randomly require you to unselect the audio from the virtual machine settings.
:::

### Download ISO

An ISO is an operating system file. You'll use it to build your virtual computer, the operating system inside your virtual machine.

**Recommended distributions:**

- [Linux Mint](https://www.linuxmint.com/download.php) - Simple and easy to use
- [Pop!_OS](https://pop.system76.com) - Simple and good for gaming
- [Kali](https://www.kali.org/get-kali/#kali-platforms) - Red Team, Purple Team, Research, RF ([VM images ready to run](https://www.kali.org/get-kali/#kali-installer-images))
- [DragonOS](/radio/dragonos) - RF and SDR focused
- [Ubuntu](https://ubuntu.com/download/desktop) - Most widely used (note: opt-out of data collection during setup)
- [Arch](https://archlinux.org/download/) - Advanced users ([Installation Guide](https://wiki.archlinux.org/title/Installation_guide))

:::tip
Remember where you download this ISO to, as you'll need to find it when creating a VM.
:::

### Using VirtualBox

### Import Virtual Machine (Appliance)

To import a pre-built Virtual Machine, also known as an Appliance, follow these steps:

1. Download the Virtual Machine (Appliance) file, usually distributed as an OVA or OVF file.
2. Open VirtualBox and go to **File → Import Appliance**.
3. Click the "Choose" button in the Import Appliance dialog and select the downloaded Appliance file.
4. Click "Next" to proceed to the Appliance settings.
5. Review and adjust the Appliance settings as needed, such as adjusting the amount of RAM or the number of CPUs allocated to the virtual machine.
6. Click "Import" to start the import process.
7. Wait for the import process to complete.

### Create a Virtual Machine (From ISO)

To create a new virtual machine from an ISO file, follow these steps:

1. Open VirtualBox and click the "New" button to create a new virtual machine.
2. In the Create Virtual Machine dialog, enter a name and select the operating system type and version.
3. Set the amount of RAM and the number of CPUs allocated to the virtual machine.
4. In the "Hard disk" section, select "Create a virtual hard disk now" and click "Create."
5. Select the hard disk file type and click "Next."
6. Select "Dynamically allocated" for the storage on the physical hard disk and click "Next."
7. Set the virtual hard disk size and click "Create."
8. Select the "Storage" section in the virtual machine settings and click on the empty CD/DVD drive.
9. Click the CD/DVD icon in the Attributes section and select the ISO file you want to install.
10. Start the virtual machine.

### Export Virtual Machine (Appliance)

To export a virtual machine as an Appliance, follow these steps:

1. Shut down the virtual machine that you want to export.
2. Select the virtual machine in VirtualBox and go to **File → Export Appliance**.
3. In the Export Appliance dialog, select the virtual machine you want to export and click "Next."
4. Choose a name and location for the Appliance file and click "Next."
5. Select the file format for the Appliance (usually OVA) and click "Next."
6. Review the Appliance settings and click "Export."
7. Wait for the export process to complete.

***


## References

- [VirtualBox Official Site](https://www.virtualbox.org/)
