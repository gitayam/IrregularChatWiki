---
title: "Element (Matrix) Messenger"
---

# Element (Matrix) Messenger

1. 🚀 Exploring Element Messenger
Welcome to Element Messenger, a powerful Matrix client designed for seamless communication. This guide will help you navigate its features and start your journey with Element efficiently.

### What Makes Element Unique? 🌟
Element stands out due to its robust features tailored for group communications:

- **🕵️ Anonymity**: Sign up with just a username; no phone number required.

- **🌐 Accessibility**: Accessible on NIPR via the web. Self-hosting may be required for enhanced privacy.

- **📣 Custom Notifications**: Set up alerts for specific keywords to stay focused on relevant discussions.

- **💬 Organized Chats**: Utilize threads to keep conversations streamlined and organized.


*[Element]*


Explore the capabilities of Element on [Matrix Chat](https://matrix.irregularchat.com). While Matrix and Element are often used interchangeably, numerous clients are available across different platforms.

### Essential Resources

- [Official Element User Guide](https://static.element.io/pdfs/element-user-guide.pdf)

- [Matrix on Wikipedia](https://en.wikipedia.org/wiki/Matrix_(protocol)

- [Learn More About Matrix](https://matrix.org/docs/chat_basics/matrix-for-im/)

- [Deep Dive Into Matrix Protocol](https://nebuchadnezzar-megolm.github.io/static/paper.pdf)

📥 **[Download Element Messenger](https://element.io/download)** available for Desktop, Android, iOS, and Web.

### Using Matrix with the Irregular Chat Login 🔑

### Navigating Element Messenger
When selecting a Matrix link, choose **“Continue using Element”** for a smooth experience.

### Get Started

#### Logging In
**Ensure you are logged out from any other Matrix accounts, or use a separate client like Fluffy Chat.**

- **Download and Install Element**: Available on [Desktop and Mobile](https://element.io/download).

- **Configure and Login**:
  - Navigate to [Matrix Chat](https://matrix.irregularchat.com) or directly open the Element App.
  - Select **“I already have an account”** or **“Login”**.
  - Set the Homeserver to ``matrix.irregularchat.com`` without adding “HTTPS://”.
  - Follow prompts to update the homeserver. Login buttons will appear afterward.
- **Account Setup**:
  - Choose **“IrregularChat SSO”** or the Puzzle Piece Login 🧩.
  - You may ignore any upgrade notices.

#### Security Setup
- **Secure Your Account**:
  - **Security Phrase**: Create a security phrase and store it in a password manager. [Cross signing guide With Pictures](https://ems-docs.element.io/books/element-cloud-documentation/page/set-up-cross-signing).
  - **Cross-Device Signing**: Enable if using multiple devices to maintain security across all. Navigate to **Settings** → **Security & Privacy** → **Cryptography**.
  - If you didn’t set a recovery key the first time, reset your cross-device signing with this [guide](https://ems-docs.element.io/books/element-cloud-documentation/page/reset-cross-signing).
  - Avoid setting restrictions on sending encrypted messages to unverified sessions. Do NOT enable **Never send encrypted messages to unverified sessions from this session**.

#### Joining Spaces
- **Join the Conversation**: Enter the Irregular Chat [Public Entrance Space](http://url.irregular.chat/matrix-public).
- **Direct message one of the admins to be added to additional chats**:
  - [@sac](https://matrix.to/#/@sac:irregularchat.com)
  - [@asymmetricfox](https://matrix.to/#/@asymmetricfox:irregularchat.com)
  - [@dog142g](https://matrix.to/#/@dog142g:irregularchat.com)
  - [@jumson](https://matrix.to/#/@jumson:irregularchat.com)
- **Accept Invites**: You should receive invites to the [Main Space](https://matrix.to/#/!OcvzfbMBIgiwxTDcwY:irregularchat.com) (Without the invite, these links will not work).

**On the bottom of your screen**, select the icon resembling 4 boxes.
Go to the **“All Chats”** tab to see your invitations.
Select the **“>”** within spaces to see additional spaces and rooms.

- **Enter Spaces**:
  - On the bottom of your screen, select the notepad icon.
  - Select **browse spaces**.

#### Customize Your Experience
- **Personalize Your Nickname**: Use ``/myroomnick NewUsernameHere`` in each room to set a unique nickname.
- **Customize Notifications**: Go to **Settings** → **Notifications**
  - Custom to set custom notification keywords.
- **Spaces and Rooms**: When added to the Irregular Chat Space, look for the four (4) boxes to reveal the spaces and rooms within the Irregular Chat Space.
- **Bots and Easter Eggs**: Bots will assist with welcome messages and when you post social or news links.

**Inside Jokes**: If you have been in the community for a while, you will know that some running jokes or phrases typically produce a response. Now, it is automated.

**Social Link Proxy**: Twitter, Instagram, and TikTok links will receive a proxy or server download.

Additional sections are from the [Official Element User Guide](https://static.element.io/pdfs/element-user-guide.pdf).

#### Secure Backup - Encryption Keys / Security Phrase
[Secure Backup](https://ems-docs.element.io/books/element-cloud-documentation/page/set-up-cross-signing) - *See Element User Guide for Backup details*

#### Device Verification
*See Element User Guide for Device Verification details*

#### Threads
*See Element User Guide for Threads details*

#### Spaces and Rooms
*See Element User Guide for Spaces details*

#### Notifications
*See Element User Guide for Notification settings*


### Additional Tips 🚨
**Prioritize Your Privacy**: Enjoy confidential conversations with default end-to-end encryption, cross-signed device verification, and decentralization, allowing you the autonomy to choose your data’s residence. Create an account without divulging your phone number for added privacy and security.

**Stay Updated**: Keep abreast of known vulnerabilities and update your IrregularChat Matrix Server regularly for optimal security. The server and the client are updated automatically. Please keep your Element app up to date.

| CVE | Version Patched | Brief Description | Part Vulnerable |
|-----|-----------------|-------------------|-----------------|
| CVE-2022-31052 | 1.61.1 | Stack exhaustion in Synapse due to unbounded recursion | URL previews of some web pages |
| CVE-2022-23597 | 1.9.7 | Remote program execution bug with user interaction | Element Desktop before 1.9.7 |
| CVE-2021-41281 | 1.47.1 | File download from a remote server into an arbitrary directory | Synapse instances with media repository enabled |
| CVE-2021-39163 | 1.41.0 | Unauthorized access to name, avatar, topic, and number of members | Homeservers with untrusted users permitted to create groups |
| CVE-2021-39164 | 1.41.0 | Unauthorized access to membership of a room | Rooms with `shared` history visibility |
| CVE-2021-32659 | 2.6.1 | Unbridging without verifying predecessor field | Bridges with room upgrade handling |
| CVE-2021-32622 | 3.21.0 | Script execution in uploaded file preview | File upload preview before 3.21.0 |
| CVE-2021-29471 | 1.33.2 | Denial-of-service via poor matching engine performance | Synapse before version 1.33.2 |

### References 📚

- [Element Website](https://element.io/personal)


