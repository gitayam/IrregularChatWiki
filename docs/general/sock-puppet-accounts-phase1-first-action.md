---
title: "Sock Puppet Accounts/Phase1 First Action"
---

# Sock Puppet Accounts/Phase1 First Action

## Principle
Minimize your “attack surface” and be deliberate before taking any action. You cannot take this step back!

Return to [Puppet Creation Outline](/general/sock-puppet-accounts-creation)


## Actions

### Prep your gear
Why is this in the “first action”? Because things you do *may* impact your sock. For instance, if you are setting up a VM, the mirror you download an ISO from might persist with artifacts in your machine. Or if you think you will have to interact with a target on SMS, there is a reasonable risk they may compromise your phone… is that IMEI previously associated with you?

- **Phone**: This can be the trickiest part, especially for High-Risk socks. If building a low-risk sock, using an old phone with a new, pre-paid SIM may work. If high-risk, you might need a new device and use it in a location not associated with you (i.e., phone GPS and cell towers).

- Some online services let you send an MFA code to an unassociated individual for a by-use fee. This is an option but introduces other risks.

- **VPS**: The first IP you use to create an account/touch a resource matters. Using a static VPS (either to host environments or just tunnel traffic) is the best way I have found to balance protection and usability. When it comes to the “high value” social media platforms, I have had no luck creating or using Sock with a public VPN (e.g., Nord, Proton, PIA)

- **Isolate**: You must isolate your sock’s environment from your own. There are several ways to do this. The solution you choose depends on your threat model.

- separate browser profile

- a different browser

- another user account

- a local VM

- a remote VM or browser (e.g., kasm)

- **Apps**: Consider how you will load applications in your environment. Do you need to have already an account to get the required application (i.e., in iOS)

- **Mobile Emulator**: This can be very useful after getting started but hard to use for account setup

***Remember what artifacts may come over from your setup!*** You can’t take things back once you start. # Resources

- Android Emulators

- [Studio Guide](/general/android-virtual-device)

- [Android Studio](https://developer.android.com/studio)

- [BlissOS](https://docs.blissos.org/installation/install-in-a-virtual-machine/)

- [GenyMotion](https://www.genymotion.com/)

- [BlueStacks](https://andauth.co/BlueStacks)

- [Android x86](https://www.android-x86.org/)

- [Redroid](https://github.com/remote-android/redroid-doc) (works on Kasm)

- VM Software

- [VMware](https://www.vmware.com/)

- [Oracle VM VirtualBox](https://www.virtualbox.org/) (see for a guide)

- [https://www.proxmox.com/en/ Proxmox

- Powerful open-source server solutions)

- [Kasm Workspaces | The Container Streaming Platform](https://www.kasmweb.com/)

- [ExifTool by Phil Harvey](https://exiftool.org/)

- [Managers](/general/guide-to-password-managers)

- [KeePassXC](https://keepassxc.org/) (password, 2FA, and key manager)

- [Bitwarden](https://bitwarden.com/)
