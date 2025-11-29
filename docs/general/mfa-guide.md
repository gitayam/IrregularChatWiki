---
title: "MFA Guide"
---

# MFA Guide

## What is MFA
**Multi-factor authentication (MFA)** is a layered approach to securing online accounts and their data. MFA requires users to provide two or more authenticators to verify their identity before accessing services. This method significantly reduces the likelihood of unauthorized access. According to Microsoft, users who enable MFA are significantly less likely to get hacked. Even if one factor, like a password, is compromised, unauthorized users cannot bypass the second authentication requirement.

MFA is also called Two-Factor Authentication (2FA), Multi-Factor Authentication, Two-Step Authentication, or UFA. All these terms refer to using a combination of what the user knows, has, or is to confirm identity online. [Source: CISA](https://www.cisa.gov/mfa)

### MFA Combines Two or More Independent Credentials

## What the **user knows** (password).

## What the **user has** (security token).

## What the **user is** (biometric verification).

### MFA Backup Codes
Backup One-Time Passcodes (OTP) are vital for deployments and should be part of every user's emergency plan. Situations prohibiting personal devices may require using backup OTP to access accounts. Securely store backup codes and ensure they are accessible during critical times.

### Types of MFA

- **(WEAKEST)** Text Message (SMS) or Email: A service sends a code to your phone or email, which you use to log in. While better than no MFA, SMS/email-based authentication is considered the weakest form.

- Authenticator App: Generates MFA codes on your smartphone. These codes typically expire every 30 or 60 seconds.

- Push Notification: Instead of entering a code, you approve or deny a login request via a notification sent to your device.

- FIDO Authentication: Utilizes secure biometric mechanisms or physical keys, providing a highly secure authentication method.

- **(STRONGEST)** Universal 2nd Factor (U2F): Hardware tokens such as CAC, Nitrokey, or Yubikey. These hardware tokens are phishing-resistant and use protocols like FIDO2 for enhanced security. [Source: Yubico](https://www.yubico.com/authentication-standards/fido-u2f/)

### How To Enable MFA

### App MFA (TOTP)
Follow these steps to enable MFA with an authenticator app:

## Log in to the account.

## Navigate to Settings.

## Go to Security & Privacy.

## Enable or set up Multi-Factor Authentication (MFA).

## Select "Mobile App" (avoid SMS unless necessary).

## Scan the QR Code or enter the MFA "seed" manually.

## Securely store the MFA seed in a password manager or encrypted database.

## Print and save backup keys provided by the service.

#### Recommended Software for MFA

- [OTP Auth (iOS)](https://apps.apple.com/us/app/otp-auth/id659877384)

- [Aegis (Android)](https://getaegis.app/)

- [Authenticator (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/auth-helper/)

### Hardware Token (UFA)
Steps for enabling MFA using a hardware token:

## Log in to the account.

## Navigate to Settings.

## Go to Security & Privacy.

## Enable or add "Hardware keys."

## Insert the hardware token when prompted.

**Note: Backups**
Configure a duplicate hardware token and store it securely as a backup.

#### Recommended Hardware for UFA

- [Security Key C NFC by Yubico](https://www.yubico.com/product/security-key-c-nfc-by-yubico/): A budget-friendly Yubikey option offering phishing-resistant UFA.

**Note: About Buying Yubikeys**
Higher-end Yubikeys offer additional features such as encryption and signature capability, which may not be necessary for all users.

### References

- [CISA: What is MFA](https://www.cisa.gov/mfa)

- [Yubico: FIDO U2F Authentication](https://www.yubico.com/authentication-standards/fido-u2f/)
