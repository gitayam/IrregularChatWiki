---
title: "Mobile Hardening Guide"
tags: ["security", "privacy", "mobile", "android", "ios", "dfp"]
---

# Mobile Hardening Guide

## Mobile Device Hardening: Android | iOS

Ensure the safety and security of your mobile devices with these guidelines and recommendations tailored for Android and iOS systems. Additional resources are available at the [DFP Checklists](https://github.com/irregularchat/public-resources/tree/main/Checklists).

There is a larger [Section](/general/dfp-guide) that is broader than just mobile devices.

:::caution[Threat Model Context]
Some advice in this guide (and common security guidance) may be **overly cautious for everyday users**. A group of CISOs published an [open letter critiquing outdated security advice](https://www.hacklore.org/letter) including:
- **Public USB chargers ("juice jacking")** — No verified cases affecting everyday users in the wild
- **Disabling Bluetooth/NFC** — Wireless exploits are extraordinarily rare and require specialized hardware
- **Public WiFi avoidance** — Modern encryption makes large-scale compromises exceedingly rare

**However**, for **high-threat environments** (military operations, journalists in conflict zones, targeted individuals), these precautions may still be warranted. Know your threat model and adjust accordingly.
:::

***

## Official Security Guidance

These guides from government cybersecurity agencies provide authoritative recommendations:

| Source | Document | Description |
|--------|----------|-------------|
| **NSA** | [Mobile Device Best Practices (PDF)](https://media.defense.gov/2021/Sep/16/2002855921/-1/-1/0/MOBILE_DEVICE_BEST_PRACTICES_FINAL_V3%20-%20COPY.PDF) | One-page infographic covering essential mobile security practices |
| **CISA** | [Mobile Communications Best Practice Guidance (Nov 2025)](https://www.cisa.gov/sites/default/files/2025-11/guidance-mobile-communications-best-practices-20251124_508c.pdf) | Latest guidance addressing Salt Typhoon telecom intrusions |
| **CISA** | [Federal Mobile Workplace Security (2024)](https://www.cisa.gov/sites/default/files/2024-08/Federal-Mobile-Workplace-Security_508_2024-08-14.pdf) | Comprehensive enterprise mobile security guide |
| **NIST** | [SP 800-124 Rev. 2](https://csrc.nist.gov/pubs/sp/800/124/r2/final) | Guidelines for Managing the Security of Mobile Devices in the Enterprise |
| **CIS** | [Google Android Benchmarks](https://www.cisecurity.org/benchmark/google_android) | Detailed configuration benchmarks for Android |

***

## Critical CISA Recommendations (2024-2025)

CISA's [December 2024 guidance](https://www.cisa.gov/resources-tools/resources/mobile-communications-best-practice-guidance) was issued in response to Chinese state-sponsored threat actors (Salt Typhoon) compromising U.S. telecom infrastructure. Key recommendations:

### Use End-to-End Encrypted Messaging

> CISA strongly recommends using encrypted messaging apps like **Signal** for all communications.

- **Signal** - Cross-platform, supports encrypted voice/video calls, group chats, disappearing messages
- Available: [iOS](https://apps.apple.com/us/app/signal-private-messenger/id874139669) | [Android](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesignal)

### Avoid SMS for Multi-Factor Authentication

:::danger[Critical Change]
CISA now advises: **Do NOT use SMS for multi-factor authentication.** SMS is vulnerable to SIM-swapping attacks, which increased by **1,055% in the UK** and **240% globally** in 2024.
:::

**Use instead:**
- Hardware security keys (FIDO2/WebAuthn) — **Best option**
- FIDO passkeys
- Authenticator apps (Aegis, 2FAS)

### VPN Guidance

:::tip[CISA's Position on Personal VPNs]
> "Do not use a personal virtual private network (VPN). Personal VPNs simply shift residual risks from your internet service provider (ISP) to the VPN provider, often increasing the attack surface."

This applies to **commercial VPN services**. Enterprise/organizational VPNs for accessing work resources remain appropriate.
:::

### Keep Hardware Current

> "Opt for the latest hardware version from your cell phone manufacturer, as newer hardware often incorporates critical security features that older hardware cannot support."

Software updates alone cannot provide maximum security benefits without current hardware security features.

***

## NSA Mobile Device Best Practices

Key highlights from the [NSA guide](https://media.defense.gov/2021/Sep/16/2002855921/-1/-1/0/MOBILE_DEVICE_BEST_PRACTICES_FINAL_V3%20-%20COPY.PDF):

### Essential Practices

| Practice | Recommendation |
|----------|---------------|
| **Lock Screen** | Use 6+ digit PIN; enable wipe after 10 failed attempts |
| **Auto-Lock** | Set device to lock after 5 minutes of inactivity |
| **Weekly Reboot** | Restart your device at least once per week |
| **App Management** | Install minimal apps; only from official stores |
| **Jailbreaking** | Never jailbreak or root your device |
| **Software Updates** | Enable automatic updates for OS and apps |

### Physical Security

- Maintain physical control of your device at all times
- Consider a protective case that muffles the microphone
- Cover your camera when not in use
- For sensitive conversations, consider voice-encrypting apps

***

## Comprehensive Security Checklist

### Device Configuration

- [ ] Enable full device encryption
- [ ] Set strong PIN/password (6+ digits, not sequential or birthdates)
- [ ] Enable biometric authentication (prefer non-index fingers for fingerprint)
- [ ] Configure auto-lock (5 minutes or less)
- [ ] Enable "wipe after failed attempts" (10 attempts)
- [ ] Disable lock screen notifications for sensitive apps

### Software & Updates

- [ ] Enable automatic OS updates
- [ ] Enable automatic app updates
- [ ] Remove unused applications
- [ ] Review and minimize app permissions regularly
- [ ] Only install apps from official stores (App Store, Google Play, F-Droid)

### Authentication & Accounts

- [ ] Use a password manager ([Bitwarden](https://bitwarden.com/), [KeePass](https://keepassxc.org/))
- [ ] Enable hardware-based MFA where possible (YubiKey, passkeys)
- [ ] Use authenticator apps instead of SMS for 2FA
- [ ] Set a SIM PIN to prevent unauthorized SIM changes
- [ ] Contact carrier to add account PIN/passphrase for porting protection

### Communication

- [ ] Use end-to-end encrypted messaging (Signal, Element)
- [ ] Disable SMS fallback in messaging apps where possible
- [ ] Use encrypted email (ProtonMail)

### Privacy

- [ ] Disable Advertising ID / Reset it regularly
- [ ] Turn off personalized ads
- [ ] Disable always-on virtual assistants (Siri, Google Assistant)
- [ ] Review location permissions; use "While Using" instead of "Always"
- [ ] Disable location services for apps that don't need it

***

## iOS-Specific Hardening

### Lockdown Mode (For High-Risk Users)

[Apple Lockdown Mode](https://support.apple.com/en-us/105120) is an **extreme protection** for users who may be targeted by sophisticated cyberattacks (journalists, activists, government officials).

**When enabled, Lockdown Mode:**
- Blocks most message attachment types except images, video, and audio
- Disables link previews in Messages
- Blocks incoming FaceTime calls from unknown contacts
- Prevents connection to non-secure Wi-Fi networks
- Disables 2G/3G cellular (iPhone/iPad)
- Requires device unlock to connect accessories
- Blocks configuration profiles and MDM enrollment

**Enable:** Settings → Privacy & Security → Lockdown Mode → Turn On

:::caution
Lockdown Mode does **not** clean existing infections. It's a preventive measure, not antivirus. It also creates a detectable fingerprint that may identify you as a high-value target.
:::

### iOS Security Settings

| Setting | Location | Recommendation |
|---------|----------|---------------|
| Stolen Device Protection | Face ID & Passcode | Enable |
| USB Accessories | Face ID & Passcode | Require unlock |
| Significant Locations | Privacy → Location Services → System Services | Disable |
| iPhone Analytics | Privacy → Analytics | Disable all |
| Apple Advertising | Privacy → Apple Advertising | Disable personalized ads |
| Safari Fraud Warning | Safari | Enable |
| Hide IP Address | Safari → Privacy | Enable |

***

## Android-Specific Hardening

### Stock Android Security

| Setting | Location | Recommendation |
|---------|----------|---------------|
| Google Play Protect | Play Store → Profile → Play Protect | Enable |
| Find My Device | Settings → Security | Enable |
| App Permissions | Settings → Apps → Permissions | Review and minimize |
| Unknown Sources | Settings → Security | Keep disabled |
| Developer Options | Settings → About → Build Number | Keep disabled |
| USB Debugging | Developer Options | Keep disabled |

### Privacy-Focused Android Operating Systems

For maximum privacy and security, consider replacing stock Android with a hardened alternative:

| OS | Focus | Best For | Device Support |
|----|-------|----------|----------------|
| [**GrapheneOS**](https://grapheneos.org/) | Maximum security | Security-focused users | Google Pixel only |
| [**CalyxOS**](https://calyxos.org/) | Privacy + usability | Transition from stock Android | Pixel, some others |
| [**LineageOS**](https://lineageos.org/) | Customization | Wide device support | Many devices |

**GrapheneOS Advantages:**
- Hardened kernel and memory allocation
- Sandboxed Google Play Services (optional, no privileged access)
- Vanadium browser (hardened Chromium without Google tracking)
- Fastest security updates among privacy ROMs
- Required for hardware security features (Titan M chip)

**CalyxOS Advantages:**
- More beginner-friendly
- Includes microG (Google Services alternative) by default
- Tor integration built-in
- Broader device support than GrapheneOS

### F-Droid: Alternative App Store

[F-Droid](https://f-droid.org/) is an open-source app repository focused on privacy:

**Recommended F-Droid Apps:**
- **Aegis** - 2FA authenticator
- **KeePassDX** - Password manager
- **Element** - Matrix messenger
- **TrackerControl** - Monitor app tracking
- **Insular** - App isolation
- **Aurora Store** - Privacy-respecting Google Play frontend

***

## SIM Security & Swapping Prevention

SIM swapping attacks increased dramatically in 2024 (1,055% in UK, 240% globally). Even eSIMs are [not immune to sophisticated attacks](https://hackhunting.wordpress.com/2024/12/31/esim-vulnerabilities-lead-to-sim-swapping-attacks/).

### Protection Measures

1. **Set a SIM PIN**
   - Requires PIN to use SIM in another device
   - iOS: Settings → Cellular → SIM PIN
   - Android: Settings → Security → SIM card lock

2. **Add Carrier Account Security**
   - Contact your carrier to add a unique passcode/passphrase
   - Request a "port freeze" or "number lock"
   - Ask about their SIM swap verification procedures

3. **Never Use SMS for High-Value 2FA**
   - Banking, crypto, email should use authenticator apps or hardware keys
   - SMS 2FA is better than nothing, but vulnerable

4. **Monitor for Warning Signs**
   - Sudden loss of cellular service
   - Unexpected "SIM changed" notifications
   - Unable to make/receive calls or texts

5. **eSIM Considerations**
   - Enable biometric authentication for eSIM changes
   - eSIMs eliminate physical SIM theft but can still be ported
   - [GSMA eSIM Security Framework](https://www.gsma.com/esim/) provides certification standards

***

## Recommended Mobile Apps

### Password Management

| App | Platforms | Notes |
|-----|-----------|-------|
| [Bitwarden](https://bitwarden.com/) | iOS, Android, Desktop, Web | Open-source, self-hostable |
| [KeePassXC](https://keepassxc.org/) / [KeePassDX](https://www.keepassdx.com/) | Cross-platform | Offline, open-source |

**Avoid:** LastPass (multiple breaches)

### Two-Factor Authentication

| App | Platforms | Notes |
|-----|-----------|-------|
| [YubiKey](https://www.yubico.com/) | Hardware | Best security, FIDO2/WebAuthn |
| [Aegis](https://getaegis.app/) | Android | Open-source, encrypted backups |
| [2FAS](https://2fas.com/) | iOS, Android | Open-source, browser extension |
| [OTP Auth](https://apps.apple.com/us/app/otp-auth/id659877384) | iOS | iCloud sync |

**Avoid:**
- SMS-based 2FA (vulnerable to SIM swapping)
- Google Authenticator (sync not end-to-end encrypted)
- Authy (requires phone number, not open-source)

### Secure Communication

| App | Purpose | Notes |
|-----|---------|-------|
| [Signal](https://signal.org/) | Messaging | CISA-recommended, E2EE |
| [Element](https://element.io/) | Matrix client | Decentralized, E2EE |
| [ProtonMail](https://proton.me/mail) | Email | Swiss-based, E2EE |

### Security Tools

| App | Purpose | Platform |
|-----|---------|----------|
| [Malwarebytes](https://www.malwarebytes.com/) | Malware scanning | iOS, Android |
| [TrackerControl](https://trackercontrol.org/) | App tracking monitor | Android (F-Droid) |
| [Cryptomator](https://cryptomator.org/) | File encryption | iOS, Android |
| [OpenKeychain](https://www.openkeychain.org/) | PGP key management | Android |

***

## Side-Loading Apps (Android)

### Risks and Benefits

**Benefits:**
- Access to open-source apps not on Play Store
- Apps without Google tracking
- Greater control over app sources

**Risks:**
- Potential malware exposure
- No automatic security scanning
- May void warranty

### Safe Side-Loading Practices

1. Only side-load from trusted sources (F-Droid, app developer's official site)
2. Verify APK signatures/checksums when available
3. Use a sandboxed environment if possible
4. Keep "Install unknown apps" disabled by default
5. Enable only for specific app installation, then disable

***

## Enterprise Considerations

For organizations managing mobile devices, refer to:

- [NIST SP 800-124 Rev. 2](https://csrc.nist.gov/pubs/sp/800/124/r2/final) - Enterprise mobile device management
- [CISA Enterprise Mobility Management Checklist](https://www.cisa.gov/resources-tools/resources/capacity-enhancement-guide-federal-agencies-ceg-mobile-device) - Federal agency guidance

Key enterprise capabilities:
- **Mobile Device Management (MDM)** - Centralized policy enforcement
- **Mobile Application Vetting (MAV)** - App security assessment
- **Mobile Threat Defense (MTD)** - Real-time threat detection

***

## References & Further Reading

### Government Sources
- [NSA Telework and Mobile Security Guidance](https://www.nsa.gov/Press-Room/Telework-and-Mobile-Security-Guidance/)
- [CISA Mobile Communications Best Practice Guidance](https://www.cisa.gov/resources-tools/resources/mobile-communications-best-practice-guidance)
- [NIST Mobile Device Security Publications](https://csrc.nist.gov/publications)
- [Army CID SIM Swapping Flyer (PDF)](https://www.cid.army.mil/Portals/118/Documents/Cyber-Flyers/Cyberflyer_SIMSwapping_01-29-2024.pdf)

### Privacy Resources
- [Privacy Guides - Mobile](https://www.privacyguides.org/android/)
- [EFF Surveillance Self-Defense](https://ssd.eff.org/)
- [GrapheneOS Documentation](https://grapheneos.org/faq)
- [CalyxOS Documentation](https://calyxos.org/docs/)

### Related Wiki Pages
- [DFP Guide](/general/dfp-guide) - Digital Force Protection overview
- [Quick DFP Guide](/general/quick-dfp-guide) - Quick reference
- [VPN Recommendation](/privacy/vpn-recommendation) - VPN guidance
- [MFA Guide](/general/mfa-guide) - Multi-factor authentication
- [Password Manager Guide](/general/guide-to-password-managers) - Password management
