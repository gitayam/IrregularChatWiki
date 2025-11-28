---
title: "How to Search Log Files"
---

# How to Search Log Files

## How to Check and Make Sense of Logs on Different Operating Systems
If you need to go back to the guide, click * Cyber Incident Response Guide*

### Mobile: iOS

#### Use Analytics & Improvements

## Go to **Settings** > **Privacy** > **Analytics & Improvements**.

## Select **Analytics Data** to view system and app logs.

#### Identify Suspicious Activity

## Look for entries such as `sysdiagnose` or `stacks+appName`, indicating app crashes or system issues.

## Search for terms like `privacy`, `location`, or `permission` to find logs related to privacy settings changes.

## Check for any entries with `daemon` or `process` indicating background activities.

### Mobile: Android

#### Enable Developer Options

## Go to **Settings** > **About phone**.

## Tap **Build number** seven times to enable Developer Options.

#### Access Logs through Developer Options

## Go to **Settings** > **System** > **Developer options**.

## Scroll to **Debugging** and select **Take bug report** or **Log viewer**.

#### Check for Suspicious Activity

## Look for frequent app crashes or unexpected system behavior in the logs.

## Identify any unusual network activities or connection attempts.

## Check for logs indicating changes in security settings or permissions granted to unfamiliar apps.

## Look for repeated attempts to access secure features or data without authorization.

### Windows

#### Open the Event Viewer

## Press the Windows key + R to open the Run dialog box.

## Type `eventvwr.msc` and press Enter.

## The Event Viewer will open.

#### Look for Error or Warning Logs Related to Security

## Navigate to **Windows Logs** > **Security**.

## Sort the logs by Event ID, Level, or Source.

## Look for Event IDs:
  - `4624` (successful logon),
  - `4625` (failed logon),
  - `4648` (explicit login).

#### Search for Suspicious Activity

## Look for repeated failed login attempts from the same source IP.

## Look for logon attempts from unfamiliar locations or at unusual times.

## Look for logs indicating changes to security settings or software.

## Look for logs indicating new software installations or changes to existing software.

### MacOS

#### Open Console

## Launch the **Console** application from the **Utilities** folder within the **Applications** folder.

#### Look for Error or Warning Logs Related to Security

## Check logs related to security software such as antivirus or firewall.

## Search for logs with keywords like `error` or `warning`.

#### Search for Suspicious Activity

## Look for repeated failed logon attempts from the same source IP.

## Look for logon attempts from unfamiliar locations or at unusual times.

## Check logs indicating changes to security settings or software.

## Look for logs indicating new software installations or changes to existing software.

### Linux

#### Open Terminal

## Launch the **Terminal** application.

#### Look for Error or Warning Logs Related to Security

## Use the command:
  `sudo grep -E 'error|warning' /var/log/auth.log`
  to view security logs.

#### Check Users

## Use the command:
  `sudo getent passwd | grep '/home' | cut -d: -f1`
  to see all users with a home directory.

## Use the command:
  `sudo getent passwd | cut -d: -f1`
  to see all users, even those without a home directory.

#### Search for Suspicious Activity

## Look for repeated failed login attempts from the same source IP.

## Look for logon attempts from unfamiliar locations or at unusual times.

## Check logs indicating changes to security settings or software.

## Look for logs indicating new software installations or changes to existing software.
