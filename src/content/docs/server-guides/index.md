---
title: "Server Guides"
---

# Server Guides

## Server Guides

### Community Server Guides

- [Server Guide](/server-guides/mantrix-with-ansible)
  - Maubot Chatbot Guides

- SimpleX Server

- [- Storage - Nextcloud](/privacy/service-storage-nextcloud)

- *Installation*

- [Up Cryptpad Server](/server-guides/setting-up-cryptpad-server)

- Proxmox

- Clapper

- [Server Initial Setup](/server-guides/linux-server-initial-setup)

- [Server Storage](/server-guides/linux-server-storage)

### Best Practices to Secure Servers in 2024
Source:

- [Best practice to secure servers in 2024](https://www.reddit.com/r/linuxadmin/comments/1an0vqp/best_practice_to_secure_servers_in_2024/)

- [Madaidans Insecurities Linux Hardening Guide](https://madaidans-insecurities.github.io/guides/linux-hardening.html)

- [Cyberciti Linux Security Tips](https://www.cyberciti.biz/tips/linux-security.html)

### General Security Practices

- **No Root Login**: Disable root login to enhance security.

- **[Keys](/general/ssh-keys) with Password**: Use SSH keys with a passphrase and disable password login.

- **VPN Access**: VPN access is required to reach the SSH server.

- **Firmware and Auto Updates**: Enable automatic updates for both firmware and software.

- **Firewall**: Configure a firewall to control incoming and outgoing traffic.

- **Regular Updates**: Ensure the server and all software are regularly updated.

- **Split Disks**: Separate */tmp* and */var* partitions with *noexec* flag.

- **Log Monitoring**: Regularly monitor server logs for suspicious activities.

- **Privilege Escalation Mitigation**: Use *sysctl* variables and kernel parameters to mitigate privilege escalation.

- **Audit**: Regularly audit the server using tools like *rkhunter* and *debsecan*.

- **Open Ports**: Only open necessary ports (e.g., 80, 443, 22).

### Detailed Security Measures

- **Data Encryption**: Encrypt all data communication.
  - Use *scp*, *ssh*, *rsync*, rclone or *sftp* for file transfer.
  - Consider reverse proxy (tail scale, Cloudflare) or wireguard.

- **Service Management**:
  - Avoid using insecure services like FTP, Telnet, and Rsh.
  - Minimize installed software to reduce vulnerability.

- **Kernel and Software Updates**:
  - Apply all security patches promptly.
    - Use an Ansible Script to patch multiple servers periodically including OS, docker, git, etc

- **Linux Security Extensions**:
  - Enable SELinux or other security extensions to enforce limitations on applications.

- **User Accounts and Password Policies**:
  - Enforce strong password policies.
  - Use tools like *pam_cracklib* to enforce password strength.
  - Set up password aging policies using *chage*.

- **Fail2ban**:
  - Install and configure Fail2ban to block IP addresses after failed login attempts.

- **Disable Unwanted Services**:
  - Disable unnecessary services and daemons.
  - Use *systemctl* to manage services on modern Linux distributions.

- **Network Security**:
  - Use *iptables* or *firewalld* to manage firewall rules.
  - Use tools like *nmap* to scan open ports.

- **File System Security**:
  - Separate critical file systems into different partitions with appropriate mount options (*noexec*, *nodev*, *nosuid*).

- **Regular Backups**:
  - Implement regular, encrypted backups to an offsite location.

- **Intrusion Detection Systems (IDS)**:
  - Use tools like AIDE and RKHunter for host-based intrusion detection.

- **Secure SSH Configuration**:
  - Configure SSH for maximum security (e.g., disabling root login, using SSH keys, configuring Fail2ban).
