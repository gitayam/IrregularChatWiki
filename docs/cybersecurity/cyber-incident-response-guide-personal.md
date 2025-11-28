---
title: "Cyber Incident Response Guide (Personal)"
---

# Cyber Incident Response Guide (Personal)

## Overview

- [Identify](#identify)
- [Secure](#secure)
- [Restore](#restore)
- [Report](#report)
- [Learn](#learn)
- [Monitor](#monitor)

**Prevention is the best option!** The [DFP Guide](/general/dfp-guide) can help you prevent incidents and prepare backups for recovery.

This guide is designed to help you react to potential cyber incidents on personal devices, accounts, and networks. If you're feeling overwhelmed, don't worry—we'll walk you through each step.

### Prevention

Preventing cyber incidents is crucial. Follow best practices to secure your devices, accounts, and networks. Refer to the [DFP Guide](/general/dfp-guide) for detailed instructions.

## Identify

The first step is to **identify** what happened. Don't panic—we'll help you figure it out.

### Possible Signs of a Cyber Incident

#### Online Account Issues

Ask yourself:

- **Are you locked out of your account?**
- **Is there money missing from your financial account?**
- **Do you see changes or activities in your accounts that you didn't make?**

If you answer **YES** to any of these questions, proceed to [Secure Your Online Accounts](#secure-your-online-accounts).

If you answer **NO**, continue monitoring your accounts for unusual activity.

If you're **UNSURE**, consider changing your passwords as a precaution and enabling multi-factor authentication.

#### Device Behavior Issues

Ask yourself:

- **Is your computer acting on its own (e.g., mouse moving, unexpected restarts)?**
- **Did you receive a ransomware message?**
- **Did you get a fake antivirus or update message?**
- **Have you noticed new plugins, toolbars, or applications that you didn't install?**
- **Is your device running slowly or behaving abnormally?**
- **Are you seeing unexpected pop-ups on your computer?**
- **Are your internet searches being redirected to unfamiliar sites?**

If you answer **YES** to any of these questions, proceed to [Log File Analysis](#log-file-analysis) and [Secure Your Local Devices](#secure-your-local-devices).

If you answer **NO**, keep an eye on your device performance and consider running a periodic malware scan.

If you're **UNSURE**, run a malware scan and ensure all software is updated.

#### Data Leaks and Breaches

Ask yourself:

- **Has your private information (like photos or personal details) been shared online without your permission?**
- **Have personal images, videos, or other media been shared online without your consent?**
- **Have you received notifications from companies about a hack of their systems?**
- **Do you suspect a data breach involving your accounts?**

If you answer **YES** to any of these questions:

- Alert family and friends to be cautious of anyone pretending to be you.
- [Freeze Your Credit](https://inteltechniques.com/freeze.html) to prevent identity theft.
- Proceed to [Identify and Lock Down](#identify-and-lock-down) and [Secure Your Online Accounts](#secure-your-online-accounts).

If you answer **NO**, continue practicing good security hygiene and monitor for any alerts from services you use.

If you're **UNSURE**, check if any of your accounts have been involved in known breaches using [Have I Been Pwned](https://haveibeenpwned.com/).

#### Social Engineering and Scams

**Phishing Attempts**

Ask yourself:

- **Did you receive an email or message asking for personal or financial information?**

If **YES**:
- Do not respond or click on any links.
- Mark the email as spam and delete it.
- Proceed to [Secure Your Network](#secure-your-network) if you've interacted with the message.

If **NO**, remain vigilant against suspicious communications.

If you're **UNSURE**, verify the sender's identity through another communication channel before taking action.

**Financial Scams**

Ask yourself:

- **Did someone request money or your banking information?**

If **YES**:
- Be cautious. Scammers often pressure you using fear or urgency.
- Read about [common financial scams](http://www.consumerfinance.gov/ask-cfpb/what-are-some-common-types-of-scams-en-2092/).
- Proceed to report the incident if necessary.

If **NO**, stay alert for unusual requests for money or information.

If you're **UNSURE**, consult with someone trustworthy before proceeding with any requests.

#### Accidents

Ask yourself:

- **Has your device been lost or stolen?**

If **YES**:
- Change passwords for your accounts and enable two-factor authentication.
- Try to locate the device using a tracking app or service.
- Consider remotely wiping the device to protect your data.

If **NO**, ensure that tracking features are enabled on all devices as a precaution.

If you're **UNSURE**, check recent locations if tracking was enabled previously.

- **Did you accidentally delete important files or information?**

If **YES**, proceed to [Restore](#restore) for data recovery steps.

If **NO**, consider setting up regular backups to prevent future data loss issues.

If you're **UNSURE**, check if the files are in the recycle bin or use recovery software as needed.

#### Log File Analysis

To analyze log files for suspicious activity effectively, refer to our detailed guide: How to Search Log Files. This guide provides instructions for operating systems including iOS, Android, Windows, MacOS, and Linux. It covers accessing logs, identifying suspicious activities, and interpreting log entries related to security incidents.

While you are on this step you should look at [Secure Your Local Devices](#secure-your-local-devices) as well.

## Secure

Now that you've identified a potential issue, let's **secure** your digital environment.

### Secure Your Online Accounts

Take these steps immediately:

1. **Change Passwords**: Update passwords for all important accounts. Use a [Password Manager](/general/guide-to-password-managers) to store them securely.
2. **Enable Multi-Factor Authentication (MFA)**: This adds an extra layer of security. See our [MFA Guide](/general/mfa-guide) for help.
3. **Check for Data Breaches**: Visit [Have I Been Pwned](https://haveibeenpwned.com/) to see if your email has been compromised.
4. **Prioritize Critical Accounts**:
   - Email Accounts: Especially ones used for account recovery.
   - Financial Accounts: Banks, credit cards, crypto wallets.
   - Mobile Carrier Account: To prevent SIM swapping.
   - Social Media: To prevent impersonation.
5. **Remove Personal Data from Data Brokers**: Use opt-out lists like the [Big Ass Data Broker Opt-Out List](https://github.com/yaelwrites/Big-Ass-Data-Broker-Opt-Out-List).

### Secure Your Local Devices

Take these steps to secure your devices:

1. **Disconnect from the Internet**: Unplug your network cable or turn off Wi-Fi to prevent further unauthorized access.
2. **Run a Malware Scan**: Use reputable antivirus software to scan and remove any threats.
3. **Update Your Software**: Ensure your operating system and applications are up to date.
4. **Review Installed Programs**: Uninstall any software you don't recognize.
5. **Check Your Browser Extensions**: Remove any unfamiliar plugins or toolbars.
6. **Change Your Device Passwords**: Use strong, unique passwords.
7. **Consider Professional Help**: If you're unsure, seek assistance from a trusted professional.

### Secure Your Network

Ensure your network is safe:

1. **Change Router Passwords**: Update the default login credentials.
2. **Update Router Firmware**: Install the latest firmware updates.
3. **Disable Remote Management**: Prevent external access to your router settings.
4. **Set Up a Guest Wi-Fi Network**: Isolate your main devices from guests.
5. **Monitor Network Traffic**: Use tools to detect unusual activity.
6. Refer to the [Router Hardening](/general/router-hardening) Guide for detailed steps.

### Identify and Lock Down

Protect yourself from identity theft:

1. [Freeze Your Credit](https://inteltechniques.com/freeze.html): Contact major credit bureaus. See [IntelTechniques Credit Freeze Guide](https://inteltechniques.com/freeze.html).
2. **Review Financial Statements**: Look for unauthorized transactions.
3. **Update Security Settings**: Strengthen privacy and security settings on all accounts.
4. **Remove Unnecessary Personal Information**: From social media and other online platforms.

## Restore

Recover from the incident:

1. **Account Recovery**:
   - Reset passwords and security questions.
   - Use masked emails for sensitive accounts.

2. **Data Recovery**:
   - Restore files from backups if available.
   - Use data recovery software or consult a professional.

3. **Reinstall Operating System**:
   - In severe cases, consider reinstalling your OS to ensure all malware is removed.

## Report

Reporting helps prevent future incidents:

1. **Contact Financial Institutions**: Inform them of any unauthorized activity.
2. **Report to Law Enforcement**: File a report with your local police department.
3. **Notify Affected Parties**: Let friends and family know if they might be impacted.
4. **File Complaints**:
   - With the [FTC](https://reportfraud.ftc.gov/#/) for scams and fraud.
   - With other relevant authorities.

## Learn

Understand and learn from the incident:

1. **Review What Happened**: Identify how the incident occurred.
2. **Educate Yourself**: Read about best security practices.
3. **Implement Preventive Measures**: Update your habits and tools to enhance security.

## Monitor

Keep an eye out to prevent future incidents:

1. **Regularly Check Accounts**: Monitor bank statements and account activities.
2. **Use Monitoring Services**: Consider credit and identity theft monitoring services.
3. **Use Monitoring Apps**: Little Snitch and other options are broken down in [AlternativeTo.net](https://alternativeto.net/software/little-snitch/)
4. **Stay Updated**: Follow reputable sources for security news.
