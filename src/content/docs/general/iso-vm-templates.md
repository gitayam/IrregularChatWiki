---
title: "ISO VM templates"
---

# ISO VM templates

It is important to set up a template for VMs due to the long process it can take but the value in isolation instead of just linux containers.


- **Update and Upgrade Packages**:


- First, ensure all packages are up-to-date. This step is optional but recommended.

```bash
sudo apt update && sudo apt upgrade -y
```


- **Clean Up APT Cache**:


- Remove downloaded package files to save space.

```bash
sudo apt clean
```


- **Remove Old Kernels** (optional):


- This step is optional and only needed if you’ve upgraded the kernel and have old ones lying around.

```bash
sudo apt autoremove --purge
```


- **Clear Temporary Files and Directories**:


- Clear out temporary files to clean up the system.

```bash
sudo rm -rf /tmp/* /var/tmp/*
```


- **Clear System Logs**:


- Clearing old logs can help protect privacy and reduce template size.

```bash
sudo find /var/log -type f -exec truncate -s 0 {} \;
```


- **Clear Bash History**:


- Clear the command history to remove any traces of commands you’ve run.

```bash
history -c && history -w
```


- **Reset Network Settings** (if necessary):


- If you want the cloned VMs to configure network settings on first boot, reset the network configuration. This process depends on whether your VM uses `ifupdown`, `NetworkManager`, or `systemd-networkd`.


For `ifupdown`, edit `/etc/network/interfaces` and remove or comment out all configurations except `lo` (loopback).

- **Generalize the System** (optional for Linux):


- Unlike Windows, Linux doesn’t require a generalize step like `sysprep`. However, you might want to remove or anonymize machine-specific data, such as SSH host keys (they will regenerate on first boot).

```bash
sudo rm -f /etc/ssh/ssh_host_*
```


- **Shutdown the VM**:


- Once you’ve completed these steps, shut down the VM.

```bash
sudo shutdown now
```


After the VM is shut down, you can convert it into a template in Proxmox. This template can then be used to deploy new VMs quickly. Remember, each cloned VM will require some initial setup, such as setting hostnames and network configurations.
