---
title: "Router Hardening"
---

# Router Hardening

## Wireless Access Point Security and Privacy
For the full DFP Guides, see [Guide](/general/dfp-guide)

This page provides guidelines and recommendations for configuring wireless access points (WAP), commonly referred to as routers, to enhance users’ security and privacy.

### Resources for Home Network Security
Here are some excellent guides and resources on the web for home network security:

### NSA Best Practices for Securing Your Home Network

- The National Security Agency (NSA) offers a comprehensive guide to help teleworkers protect their home networks from cyber threats. It covers securing various devices, from computers and mobile phones to IoT devices.

- [NSA Guide](http://www.nsa.gov/Press-Room/News-Highlights/Article/Article/3304674/nsa-releases-best-practices-for-securing-your-home-network/)

### A Guide to WiFi Security on Home & Public Networks in 2024 - ProPrivacy

- This guide by ProPrivacy covers crucial aspects of WiFi security for both home and public networks, including how to access your router’s admin panel and change encryption settings.

- [ProPrivacy Guide](https://proprivacy.com/guides/wifi-security)

### How to Check if Your Home Network is Secure? | Actionable Tips - ProPrivacy

- ProPrivacy also offers actionable tips to check the security of your home network and ensure it’s secure against potential intrusions.

- [ProPrivacy Tips](https://proprivacy.com/guides/how-to-check-if-your-home-network-is-secure)

### How to Secure Your Home Network - Kaspersky

- Kaspersky’s guide starts with changing your network’s name (SSID) and covers more steps to secure your home network effectively.

- [Kaspersky Guide (Archive Link for Obvious Reasons)](https://web.archive.org/web/20240715205604/https://www.kaspersky.com/resource-center/preemptive-safety/how-to-set-up-a-secure-home-network)

### Home Network Security - CISA

- The Cybersecurity & Infrastructure Security Agency (CISA) provides insights into home network security, emphasizing the protection of devices connected to and the internet within a home.

- [CISA Home Network Security](https://www.cisa.gov/news-events/news/home-network-security)

### Configuration Recommendations

### Wireless Router Configuration

#### Factory Reset Router
If you have not had total control of the router since it was activated, you should factory reset it using the physical reset button (long press the small button) or through the admin portal. This is important as the router could already be exploited by backdoors, services, or users.

**Logging In Access Admin Portal**: You must access the admin page, typically by going to `192.168.1.1` in a browser. However, your router’s IP can differ, so check your network settings.
**Logging In to the Admin Portal**: The admin password is typically found on the router physically or may be something that you can search online for, such as:

- `Router_Brand "default admin" ("password" OR "credentials")`

#### Common Router Configuration
Secure your router effectively by following these key steps, each designed to enhance the security and performance of your network:

**Change the Default Admin Password**: The default password is often simple and known to attackers, making it imperative to change it to prevent unauthorized access. Use a [manager](/general/guide-to-password-managers).

- Access your router’s admin panel through a web browser.

- Locate the settings for the **administrative password** or **router password**.

- Change the default password to a strong, unique passphrase.

- Save the changes.

**Enable WPA3 Encryption**: The latest encryption standard, WPA3, significantly improves network security by making it harder for attackers to crack passwords.

- In the router’s admin interface, find the wireless or security settings.

- Look for the Wi-Fi encryption options and select WPA3. If WPA3 is not available, select WPA2-PSK as an alternative.

- Generate and save a password with a [manager](/general/guide-to-password-managers).

- Apply and save the settings.

**Disable WPS (Wi-Fi Protected Setup)**: While WPS offers convenience by allowing users to connect to the network easily, it also poses a security risk and should be disabled.

- Navigate to the wireless or WPS settings within the router’s admin interface.

- Find the option to disable WPS and select it.

- Save your changes.

**Update Firmware Regularly**: Firmware updates often contain security enhancements and bug fixes, making it crucial to keep your router’s firmware up to date.

- Go to the system or firmware update section of your router’s settings.

- Check for any available firmware updates.

- Download and install the update following the on-screen instructions. Restart the router if required.

**Separate your IoT devices from your main devices**: Internet of Things (IoT) devices (i.e., TV streaming sticks, smart lights, smart speakers, etc.) increase the attack surface and, if compromised, can be used to access other devices on your network. IoT devices often won’t have as robust security architecture/programs as your main devices.

- Authenticate IoT devices to only a single network.

- Recommend 2.4 GHz Guest network (many IoT devices won’t be 5 GHz compatible).

- Authenticate main devices (i.e., computers, cellphones) to a different network on your router.

**Disable Remote Management**: Remote management can be a vulnerability if not used securely, allowing potential external access to your router’s settings.

- Locate the remote management or WAN management settings in the router’s admin interface.

- Ensure remote management is turned off or set to the most restrictive setting possible.

- Save the changes.

**Use a Guest Network**: A guest network isolates visitors’ internet use from your main network, safeguarding your personal data. The guest network isolates your devices and the admin portal from devices on that guest network. DO NOT let guests onto your main (non-guest WIFI).

- Find the guest network settings in your router’s configuration.

- Enable the guest network feature and set a unique SSID (totally unassociated from your main WIFI) and password.

- Generate and save a password with a [manager](/general/guide-to-password-managers).

- Configure the network to isolate guest users from your main network.

- Save and apply the settings.

**Create a Backup**: Saving a backup of your router’s settings ensures you can quickly restore your network’s configuration in case of a reset or error. Save backup to [manager](/general/guide-to-password-managers).

- Look for the backup or save settings option in the router’s admin panel.

- Follow the prompts to create a backup of your current settings.

- Store the backup file in a secure, encrypted drive.

**DNS Configuration**: Changing your DNS settings can not only speed up your internet connection but also add an additional layer of security by blocking malicious sites.

- Log into your router’s admin interface.

- Navigate to the DNS settings section.

- Replace the default DNS server addresses with a more secure and faster DNS service. Recommended options include:
  * Cloudflare: `1.1.1.1` and `1.0.0.1`
  * Quad9: `9.9.9.9`

- Save your changes and reboot the router if necessary.

#### Travel Router Configuration
To ensure security and efficiency while using a travel router, follow these configuration steps:

**Connection Methods**: Choose how to connect based on your needs.

- For Ethernet: Plug the Ethernet cable from the modem or another network connection into the travel router.

- For Wireless: Access the travel router’s network settings and configure it to connect to an available Wi-Fi network as a client.

**WIFI Name (SSID)**: Customize your network name to avoid identification.

- In the router’s settings, find the Wi-Fi or Wireless section.

- Change the SSID from the default to something unique that doesn’t disclose personal information.

- Save the changes.

**Wireless Power (Range)**: Adjust to manage the coverage area.

- Locate the wireless settings in your router’s admin interface.

- Look for a transmission power setting and adjust it accordingly. Lower it to reduce the range if needed.

- Apply the changes.

**Whitelisting**: Allow only known devices to connect.

- Find the MAC Address Filtering or Access Control section in the router settings.

- Enter the MAC addresses of the devices you wish to allow.

- Enable the filtering and save your settings.

**Regular Factory Reset (Restore from Backup)**: Maintain a clean state.

- Perform a factory reset via the router’s admin interface or a physical button, typically held for a few seconds.

- After resetting, access the router and restore settings from a previously saved encrypted backup file to quickly return to your preferred configuration.

**Security Audits**: Ensure your travel router remains secure.

- Regularly log into the router's admin interface to check for firmware updates.
