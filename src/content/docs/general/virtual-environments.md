---
title: "Virtual Environments"
---

# Virtual Environments

## Hypervisors
Hypervisors are the software, firmware, or hardware that create and run virtual machines. They come in two types:

- **Type 1 Hypervisors:** Also known as bare-metal hypervisors, they run directly on the host’s hardware to manage guest operating systems. Examples include VMware ESXi, Microsoft Hyper-V, and Xen.

- **Type 2 Hypervisors:** These run on a host operating system and provide virtualization services. Examples include VMware Workstation, Oracle VM VirtualBox, and Parallels Desktop.

### Virtual Machines (VMs)

### What is a VM?
A Virtual Machine (VM) is a software-based computer system emulation. VMs provide the functionality of a physical computer, but they run as a process on a host machine. VMs are essential for isolating and containing vulnerabilities, as they provide a separate environment for running applications without affecting the host system.


### Why Use a VM?

- **Isolation:** VMs allow you to run applications in a contained environment, reducing the risk of system-wide vulnerabilities.

- **Testing and Development:** VMs are ideal for testing new software or operating systems without additional hardware.

- **Resource Optimization:** Multiple VMs can run on a single physical machine, efficiently using hardware resources.


### Virtual Environment Options

- **[A free, open-source virtualization product for enterprise and home use.

- **[VMware](/general/virtualbox-guide):**)(/vmware):** A popular virtualization platform offering both free and commercial products.

- **UTM (MacOS Only):** A simple VM management tool for macOS. [here](https://mac.getutm.app)

- **Parallels (MacOS Only):** A commercial solution for running Windows on Mac.

- **Bare Metal (Type 1 Hypervisor):** For direct installation on hardware. See [to Flash ISO to Hardware](/general/booting-os-from-usb)

- **Docker:** A tool designed to make creating, deploying, and running container applications easier.

- **[Containers for research](/research/research-containers)**

- **[Virtual Device (AVD) Emulator](/general/android-virtual-device):** A tool for running and debugging Android applications. It is part of Android Studio and offers a free and open-source solution for Android development.

***

### Related Pages

- [* Docker Containers for research](/general/vmware)

- [Guide](/general/dfp-guide)



