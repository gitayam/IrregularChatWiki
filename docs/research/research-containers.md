---
title: "Research Containers"
---

# Research Containers

## Containers for Digital Force Protection and Collaborative Research

Return to [DFP Guide](/general/dfp-guide) | Return to [Research](/research/)

## Overview

This guide provides a step-by-step approach to using Docker containers for achieving digital force protection, maintaining elevated privacy, and ensuring continuity of system/behavior fingerprinting while conducting research. The instructions range from setting up simple, single-instance browser containers to more complex configurations involving multiple instances, using Kasm Workspaces images. The focus is on how containers can be used to protect against digital threats and manage attribution in a collaborative research environment.

## What Are Containers and How Do They Compare to VMs?

Containers are lightweight, standalone, and executable software packages that include everything needed to run a piece of software, including the code, runtime, libraries, and dependencies. Unlike virtual machines (VMs), containers share the host system's kernel and resources, making them much more efficient in terms of performance and resource usage.

### Benefits of Containers

**Isolation:** Containers provide process and network isolation, ensuring that software runs in a secure, isolated environment.
- *Real-World Example:* A research team uses containers to run multiple instances of a browser for OSINT operations, ensuring that each instance is isolated and cannot interfere with or affect others, which would be a risk if all instances were running on a shared VM.

**Efficiency:** Containers are lightweight compared to VMs, allowing for faster startup times and reduced resource consumption.
- *Real-World Example:* A development team uses containers to deploy services in production. Since containers are lightweight, they can quickly scale up or down depending on the load, reducing costs and improving performance.

### Shortcomings Compared to VMs

**Shared Kernel:** Containers share the host system's kernel, which might pose a security risk if the kernel is compromised.
- *Real-World Example:* If a vulnerability exists in the host kernel, it could potentially be exploited to escape a container and affect other containers or the host system, which is less likely with a fully isolated VM.

**Limited Hardware Emulation:** Unlike VMs, containers cannot emulate hardware, which might be necessary for some applications.
- *Real-World Example:* A company needing to test software on different hardware architectures (e.g., ARM vs. x86) would need to use VMs or physical hardware, as containers cannot emulate different hardware architectures.

## Installing Docker

To begin using Docker, you need to install it on your system. Follow the official Docker installation guide based on your operating system:

1. [Install Docker](https://docs.docker.com/get-docker/)

## Installing Kasm Workspaces

To install Kasm Workspaces, follow the instructions provided in the [Kasm Workspaces Documentation](https://kasmweb.com/get-started) to install the Community Edition or the Enterprise Edition based on your requirements.

## Finding Containers

- **Docker Hub:** [hub.docker.com](https://hub.docker.com/)
- **Kasm-ready containers:** [Kasmweb Docker Hub](https://hub.docker.com/u/kasmweb/)

### kasmweb/firefox

- **Purpose:** This is a pre-configured Firefox browser container designed for privacy and security.
- **Use Case:** Perfect for researchers who need a secure, elevated private browsing environment without worrying about tracking or leaving a digital footprint.

### kasmweb/tor-browser

- **Purpose:** A containerized version of the Tor Browser, which routes your internet traffic through the Tor network for maximum elevated privacy.
- **Use Case:** Ideal for researchers who require the highest level of privacy and need to bypass censorship or access resources that are otherwise restricted.

### kasmweb/brave

- **Purpose:** Brave is a privacy-focused browser with built-in ad-blocking. This container version from Kasm is optimized for secure browsing.
- **Use Case:** Great for teams who need a browser that combines ease of use with strong privacy features.

### jlesage/firefox

- **Purpose:** A simple Firefox container that's easy to set up and use. It provides isolated browsing sessions without the complexities of a full Kasm environment.
- **Use Case:** Suitable for individual users who need a straightforward way to browse the internet securely.

### kali-linux/kali-rolling

- **Purpose:** A containerized version of Kali Linux, a popular distribution used for security auditing and penetration testing.
- **Use Case:** While more advanced, this container can be used by research teams needing to test security in an isolated environment.

## Basic Setup: Running a Firefox Browser in Docker

### Purpose

A simple, isolated environment for web browsing using a standard Firefox Docker image.

### Steps

1. **Pull the Firefox Docker Image:**
   ```bash
   docker pull jlesage/firefox
   ```

2. **Run the Docker Container:**
   ```bash
   docker run -d -p 5800:5800 jlesage/firefox
   ```

3. **Access the Browser:**
   Navigate to `http://localhost:5800` in your local web browser to access Firefox.

4. **Port Customization:**
   If port 5800 is already in use or you need to run multiple instances, you can change the port mapping:
   ```bash
   docker run -d -p 5900:5800 jlesage/firefox
   ```
   This command maps port 5900 on your host to port 5800 in the container, allowing you to access the browser at `http://localhost:5900`.

### Use Case

*Suitable for quick, isolated web browsing sessions with minimal setup.*

## Intermediate Setup: Using Kasm Workspaces for Enhanced Security

### Purpose

Leverage Kasm Workspaces' containerized browser images to ensure elevated privacy and protection from tracking while conducting sensitive research.

### Steps

1. **Search for and Pull the Kasm Firefox Docker Image:**
   Use Docker Hub to find good Docker images by searching for keywords related to your needs (e.g., "browser," "firefox," "security"). Review the image details, including the number of pulls, star ratings, and readme documentation, to ensure it's a well-maintained and trusted image.
   ```bash
   docker search kasmweb
   ```
   This command searches Docker Hub for images related to Kasm Workspaces.

2. **Pull the Specific Firefox Image:**
   ```bash
   docker pull kasmweb/firefox:1.14.0
   ```

3. **Run the Firefox Container via Kasm Workspaces:**
   ```bash
   sudo docker run --rm -it --shm-size=512m -p 6901:6901 -e USER=user -e VNC_PW=password kasmweb/firefox:1.14.0
   ```

4. **Run the Tor Browser via Kasm Workspaces:**
   ```bash
   sudo docker run --rm -it --shm-size=512m -p 6902:6901 -e USER=user -e VNC_PW=password kasmweb/tor-browser:1.15.0-rolling
   ```

5. **Access the Browsers:**
   - Firefox: `https://localhost:6901`
   - Tor Browser: `https://localhost:6902`
   - Use the default VNC password ("password") to access the sessions.

### Use Case

*Ideal for scenarios requiring enhanced security, such as OSINT operations or secure web research. Provides a managed attribution solution that prevents any lasting footprint after sessions.*

### Why Use Kasm Workspaces Images?

- **Individual Browser Images:** These allow you to run specific browsers in isolation with minimal setup. This is ideal for those who need to control their environment closely.
- **Full Kasm Workspaces Deployment:** Kasm provides a GUI for managing multiple browser sessions but requires more resources and comes with a limitation of 5 active sessions in the trial version. This option is better suited for smaller teams or users who prefer an easier, GUI-driven setup.

## Advanced Setup: Running Multiple Browser Instances for Team Research

### Purpose

Facilitate team-based research with multiple isolated browser instances using Docker containers.

### Steps

1. **Find and Pull Multiple Docker Images:**
   Pull the required browser images from Docker Hub.
   ```bash
   docker pull kasmweb/firefox:1.14.0
   ```
   ```bash
   docker pull kasmweb/tor-browser:1.15.0-rolling
   ```

2. **Run Multiple Containers with Different Ports:**
   Use the following commands to start different containers with distinct ports for each instance:
   ```bash
   docker run -d -p 6901:6901 kasmweb/firefox:1.14.0
   ```
   ```bash
   docker run -d -p 6902:6901 kasmweb/tor-browser:1.15.0-rolling
   ```

3. **Organize Containers with Docker Compose:**
   Use Docker Compose for managing multiple containers. Create a `docker-compose.yml` file:
   ```yaml
   version: '3'
   services:
     firefox:
       image: kasmweb/firefox:1.14.0
       ports:
         - "6901:6901"
     tor-browser:
       image: kasmweb/tor-browser:1.15.0-rolling
       ports:
         - "6902:6901"
   ```

4. **Start All Services:**
   ```bash
   docker-compose up -d
   ```

5. **Access the Browsers:**
   - Firefox: `http://localhost:6901`
   - Tor Browser: `http://localhost:6902`

### Use Case

*Perfect for collaborative research teams needing multiple isolated browsing environments to perform simultaneous tasks without any cross-interference.*

## Related Resources

- [Docker Hub](https://hub.docker.com/)
- [Kasm Workspaces Documentation](https://kasmweb.com/docs)
- [Kasm GitHub Repository](https://github.com/kasmtech)
