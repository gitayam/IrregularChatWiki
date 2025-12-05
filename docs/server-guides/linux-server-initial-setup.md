---
title: "Linux Server Initial Setup"
---

# Linux Server Initial Setup

## Installing Docker and Setting Up the System
This guide introduces setting up a server with Docker and organizing sections to help users get started with development environments.

### Sections

- **From Source on a Computer**: Direct installation on a local system.

- **Within a Dockerfile**: Create a base Dockerfile for repeatable setups.

- **Remotely with Ansible**: Automate Docker setup across multiple servers.

- **Without Docker**: General system preparation without Docker.

### From Source on a Computer
Source: [Docker Official Documentation](https://docs.docker.com/engine/install/debian/#install-using-the-repository)

```

1. Step 1: Install sudo and update the system
apt install -y sudo
sudo apt update
sudo apt upgrade -y

1. Step 2: Enable unattended-upgrades
sudo apt install -y unattended-upgrades
sudo sh -c 'echo "APT::Periodic::Update-Package-Lists \"1\"; APT::Periodic::Unattended-Upgrade \"1\";" > /etc/apt/apt.conf.d/20auto-upgrades'

1. Step 3: Install basic tools
sudo apt install -y git ca-certificates curl rsync pass p7zip-full unzip fail2ban ufw
sudo install -m 0755 -d /etc/apt/keyrings

1. Step 4: Set up Docker
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

1. Add the Docker repository to Apt sources
echo "deb [--print-architecture) signed-by=/etc/apt/keyrings/docker.asc](arch=$(dpkg) https://download.docker.com/linux/debian \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

1. Step 5: Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

1. Step 6: Add current user to the Docker group
sudo usermod -aG docker $USER

```

### Remotely Setting Up with Ansible
Automate Docker setup on remote servers using this Ansible playbook:

```

***
- name: Install Docker on remote servers
  hosts: all
  become: yes

  tasks:
    - name: Update and upgrade the system
      apt:
        update_cache: yes
        upgrade: dist

    - name: Install essential packages
      apt:
        name:
          - sudo
          - git
          - ca-certificates
          - curl
          - rsync
          - p7zip-full
          - unzip
        state: present

    - name: Add Docker GPG key
      command: >
        curl -fsSL https://download.docker.com/linux/debian/gpg -o /usr/share/keyrings/docker.gpg

    - name: Add Docker repository
      lineinfile:
        path: /etc/apt/sources.list.d/docker.list
        line: >
          deb [ansible_architecture }} signed-by=/usr/share/keyrings/docker.gpg](arch={{)
          https://download.docker.com/linux/debian  stable

    - name: Install Docker
      apt:
        name:
          - docker-ce
          - docker-ce-cli
          - containerd.io
        state: present

    - name: Add user to Docker group
      user:
        name: ""
        groups: docker
        append: yes

```

### Without Docker
If Docker is not needed, follow these steps for a basic system setup:

```

1. Step 1: Install sudo and update the system
apt install -y sudo
sudo apt update
sudo apt upgrade -y

1. Step 2: Install basic tools
sudo apt install -y git ca-certificates curl rsync pass p7zip-full unzip fail2ban ufw

1. Step 3: Enable unattended-upgrades
sudo apt install -y unattended-upgrades
sudo sh -c 'echo "APT::Periodic::Update-Package-Lists \"1\"; APT::Periodic::Unattended-Upgrade \"1\";" > /etc/apt/apt.conf.d/20auto-upgrades'

1. Step 4: Reload necessary services
systemctl reload postfix

```

### Categories
