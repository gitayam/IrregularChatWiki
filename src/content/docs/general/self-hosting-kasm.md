---
title: "Self-Hosting Kasm"
---

# Self-Hosting Kasm

## Self-Hosting Kasm Guide
This guide provides step-by-step instructions for self-hosting Kasm Workspaces, following the official Kasm documentation for a single server installation.

### Installation Steps
Follow the steps below to install Kasm on your server.

### Install Required Dependencies
Before installing Kasm, you need to install the required dependencies on your server:

```

1. Install requirements
apt install sudo -y
sudo apt update
sudo apt install curl docker docker-compose -y

```

### Download and Install Kasm
After installing the necessary dependencies, move to the `/tmp` directory and download Kasm:

```

1. Move to tmp and download Kasm
cd /tmp
curl -O https://kasm-static-content.s3.amazonaws.com/kasm_release_1.14.0.3a7abb.tar.gz
tar -xf kasm_release_1.14.0.3a7abb.tar.gz

```

Next, run the installation script with the appropriate options:

```

1. Run the installation script
sudo bash kasm_release/install.sh --accept-eula --swap-size 8192

```

If the installation fails, try running the command again.

### Post Installation
After installation, you can access Kasm by navigating to your server's IP address in your web browser. Follow the prompts to finish the setup.

### Troubleshooting
If you encounter issues during the installation, ensure that all dependencies are correctly installed, and check the [Documentation](https://www.kasmweb.com/docs/latest/install/single_server_install.html) for additional support.

### Categories

- [*
-
