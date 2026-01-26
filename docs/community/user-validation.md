---
title: "User Validation"
tags: ["community", "onboarding", "verification", "signal"]
---

# User Validation

This guide covers how the IrregularChat community validates new members through a vouching system. Every member must be vouched for by an existing community member.

## Overview

IrregularChat uses a trust-based verification system:

1. **Every new member needs a voucher** - An existing community member who trusts them
2. **Vouchers are accountable** - By vouching, you confirm the person understands community standards
3. **Bot-assisted verification** - The Signal bot automates most of the process
4. **24-hour window** - New users have 24 hours to complete verification

## For Vouchers (Inviting Someone)

### Primary Method: Bot-Enabled (Recommended)

**Step 1: Initiate the Invite**

In any IrregularChat Signal group, type:
```
!invite
```

The bot will:
- Add you to the Entry/INDOC chat (if not already there)
- Send you detailed instructions via DM

**Step 2: Add Your Invitee**

1. Go to the Entry/INDOC chat in Signal
2. Tap the group name at the top
3. Select "Add members"
4. Add the person you're vouching for

**Step 3: Guide Your Invitee**

Tell them to type:
```
!request
```

They'll receive a template to fill out their introduction.

**Step 4: Confirm Your Vouch**

When your invitee mentions you in their introduction, the bot will ask you:

> "Do you trust and vouch for [Name] to join the IrregularChat community?"

Reply with `yes` to approve or `no` to deny.

**Step 5: Automatic Onboarding**

Once you confirm, the bot automatically:
- Creates their SSO account
- Sends them login credentials via DM
- Adds them to relevant groups based on their interests
- Removes them from Entry/INDOC

### Secondary Method: Manual Process

If the bot isn't available, use this manual process:

1. Ensure you have an SSO login at [sso.irregularchat.com](https://sso.irregularchat.com)
2. Login to the forum and follow: [irregular.chat/invite](https://irregular.chat/invite)
3. Join the Entry/INDOC Chat
4. Add your invitee to the Entry chat
5. Have them post their introduction
6. Notify an admin to approve with `!gtg @username`

### Voucher Responsibilities

By vouching for someone, you confirm:

- You know and trust this person
- They understand what IrregularChat is about
- They've read the community rules on the wiki front page
- You're willing to be accountable for their behavior
- They're a professional who will contribute positively

## For New Users (Being Invited)

### Step 1: Get Added to Entry Chat

Your voucher (the person who invited you) will add you to the Entry/INDOC chat.

### Step 2: Request Verification

In the Entry/INDOC chat, type:
```
!request
```

You'll receive a template asking for:
1. Your full name
2. Your organization
3. Who invited you (mention them with @)
4. Your email address
5. Your interests
6. LinkedIn profile (optional)

### Step 3: Post Your Introduction

Reply with your information in numbered format:

```
1. Jane Smith
2. ABC Corporation
3. @JohnDoe invited me
4. jane.smith@email.com
5. Cybersecurity, OSINT, AI/ML
6. linkedin.com/in/janesmith
```

**Important:** You must @mention your voucher so the bot can ask them to confirm.

### Step 4: Wait for Confirmation

Your voucher will receive a message asking them to confirm they vouch for you. Once they reply "yes":

- You'll receive your IrregularChat SSO login via DM
- You'll be added to groups matching your interests
- You'll receive welcome messages with resources for each group

### Step 5: Explore the Community

With your SSO login, you can access:
- [Forum](https://forum.irregularchat.com) - Discussions and announcements
- [Wiki](https://irregularpedia.org) - Knowledge base and guides
- Signal groups - Real-time chat based on your interests
- Other community services

## Introduction Template

When you type `!request`, you'll see this template:

```
1. NAME
2. YOUR_ORGANIZATION
3. Who invited you (Add & @mention them)
4. EMAIL_OR_EMAIL_ALIAS
5. YOUR_INTERESTS
6. LinkedIn profile (optional, type "skip" to skip)
```

### Tips for a Good Introduction

- **Be specific about interests** - Helps the bot add you to relevant groups
- **Use a real email** - Your SSO credentials will be sent there
- **Mention your voucher** - Required for verification to proceed
- **LinkedIn is optional** - But helps others connect with you

## Verification Timeline

| Event | Time Limit |
|-------|------------|
| Complete introduction | 24 hours |
| Voucher confirmation | 24 hours |
| Account creation | Automatic |
| Group additions | Automatic |

If verification isn't completed within 24 hours, the request expires and you'll need to start over.

## Bot Commands Reference

| Command | Who Can Use | Description |
|---------|-------------|-------------|
| `!invite` | Members | Start the invite process |
| `!request` | Anyone | See intro template / initiate verification |
| `!join` | Members | Self-service group joining |
| `!gtg @user` | Admins | Manually approve a user |
| `!pending` | Admins | View pending verifications |

## Troubleshooting

### "Access Denied" on !invite

You must be an existing community member (in at least one IrregularChat group besides Entry/INDOC).

### Voucher didn't receive confirmation prompt

Make sure the new user properly @mentioned the voucher using Signal's mention feature (tap @ then select the person).

### Bot didn't respond

The bot might be temporarily offline. Use the manual process or contact an admin.

### Verification expired

If the 24-hour window passed, the new user should type `!request` again and the voucher should be ready to confirm quickly.

### Wrong groups added

After verification, members can use `!join` to join additional groups or ask an admin to adjust with `!addto`.

## Related Pages

- [The IrregularChat Login](/general/the-irregularchat-login) - SSO account details
- [Community Guidelines](/community/index) - Community standards
- [Signal Welcome Prompts](/community/signal-welcome-prompts) - Group welcome messages
