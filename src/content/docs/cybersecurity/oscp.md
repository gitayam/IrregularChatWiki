---
title: "OSCP"
description: "OSCP exam prep resources, platform comparison, and community tips for penetration testing certification"
tags: ["certifications", "cybersecurity", "oscp", "pentesting", "htb", "tryhackme"]
---

## PEN-200: Penetration Testing with Kali Linux (OSCP)

The OSCP is one of the most recognized offensive security certifications. This page covers exam prep platforms, community tips, and curated resources for passing the exam.

Join the [Certs IrregularChat](https://forum.irregularchat.com/t/community-links-to-chats-and-services/229#p-598-tech-8) (Login Required)

:::caution[OSCP+ Exam Changes (Effective November 1, 2024)]
- **Bonus points removed**: Completing PEN-200 labs no longer grants exam credit. Score 70/100 through the live exam only.
- **Active Directory partial credit**: You can now earn partial points on the AD set without fully compromising the domain controller. AD set = 40 pts (10+10+20 for DC), 3 standalone machines = 60 pts (20 each).
- **AD start position**: Exam begins with a standard user account on the AD domain ("assumed compromise") rather than a privileged entry.
- **OSCP+ expiration**: New passes earn OSCP+ which expires after 3 years. Legacy OSCP remains valid indefinitely.
:::

---

## Prep Platforms

:::tip[Community Recommendation]
The most cost-effective path recommended by the community: **TryHackMe** (beginner fundamentals) → **HTB Academy CPTS path** (deep technical skills) → **OSCP** (resume signal). The CPTS path alone covers more depth than PEN-200, especially for Active Directory.
:::

### Hack The Box Academy (CPTS)

The **Certified Penetration Testing Specialist (CPTS)** is the course most frequently recommended in the community for OSCP prep. One community member specifically recommended "the CPTS pipeline" over OSCP for those wanting hands-on skills.

- **Course**: [Penetration Tester Job Role Path](https://academy.hackthebox.com/path/preview/penetration-tester) — 28 modules, ~480 sections
- **Certification**: [CPTS Exam](https://academy.hackthebox.com/preview/certifications/htb-certified-penetration-testing-specialist) — 10-day unproctored lab engagement + professional report
- **Coverage**: Nmap, footprinting, web attacks (SQLi, XSS, file inclusion), password attacks, pivoting/tunneling, Active Directory enumeration and attacks, Windows and Linux privilege escalation, documentation and reporting
- **Why for OSCP**: Covers all OSCP objectives plus deeper AD content (forest pivoting, Kerberos attacks, lateral movement). The 10-day exam format builds better real-world skills than the 24-hour OSCP time crunch.
- **Requirement**: Must complete 100% of the Penetration Tester path before scheduling the exam

### TryHackMe

TryHackMe is more guided and beginner-friendly — ideal for building fundamentals before HTB or OSCP.

- **[Offensive Pentesting Path](https://tryhackme.com/path/outline/pentesting)** — Designed specifically for OSCP candidates. Covers buffer overflows, AD attacks (Kerberoasting, AS-REP Roasting, Pass-the-Ticket), and network exploitation. Good supplement after PEN-200 labs but not sufficient alone.
- **[Jr Penetration Tester Path](https://tryhackme.com/path/outline/jrpenetrationtester)** — Web vulnerabilities, network enumeration, basic exploitation. More structured entry point.
- **[Complete Beginner Path](https://tryhackme.com/path/outline/beginner)** — Start here if new to pentesting.

### Platform Comparison

| | Hack The Box Academy | TryHackMe |
|---|---|---|
| **Best for** | Intermediate to advanced | Beginner to intermediate |
| **Style** | Self-directed, minimal hand-holding | Step-by-step guided rooms |
| **OSCP relevance** | High — CPTS exceeds OSCP scope | Moderate — good supplemental prep |
| **AD depth** | Deep (forest pivoting, Kerberos, lateral movement) | Basic to intermediate |
| **Certifications** | CPTS, CBBH, CDSA, CWEE | PT1, SAL1 |

### Cost Comparison

| Platform / Product | Cost | Notes |
|---|---|---|
| **HTB Academy — Student Plan** | **$8/month** | Requires school/university email. Covers full CPTS path. |
| HTB Academy — Silver Annual | $490/year | Includes CPTS exam voucher |
| HTB CPTS Exam Voucher (standalone) | ~$210 | Must complete 100% of path first |
| **TryHackMe Premium** | **$16.99/month or $126/year** | 20% student discount available |
| TryHackMe PT1 Exam | $297 | Includes free retake + 3-month subscription |
| OffSec PEN-200 + OSCP+ Bundle | $1,749 | 90-day lab + 1 exam attempt |
| OffSec Learn One (Annual) | $2,749/year | 1 year lab access + 2 exam attempts |

:::tip[Budget Path]
HTB Academy student plan ($8/month x 4 months = $32) + CPTS voucher ($210) = **~$242 total** for CPTS certification. Compare to $1,749+ for OSCP. Many use CPTS to build skills, then attempt OSCP for the resume signal.
:::

---

## Community Feedback

Insights from IrregularChat members who have taken the OSCP:

- **"OSCP was recommended to help round out my resume as a new cyber officer. I started ethical hacking way before joining cyber, so I do enjoy it. The likelihood of me using this skill in a working environment is low. I just personally care about being a technically competent leader."**

- **"I'm going to go out on a limb here and offer a different approach, but it is situational dependent. Why are you taking the OSCP exam? If you just want the cert, read and apply the recommendations above. If you plan to employ the skills/knowledge, I have a much different recommendation: to do the CPTS pipeline."**

- **"I would also recommend setting up a repo of notes/cheat sheets in Obsidian. I also automated my initial Nmap scan process and website enumeration and created global variables of the IPs and URLs with bash scripts I built."**

- **"Got my OSCP on my second attempt. My first attempt was pre-AD, and I bombed it, only 10 points. On my second attempt, I did the Learn One and still only used about 5 months of it because I was deployed during half of it."**

---

## Practice Resources

Labs, challenges, and machine lists to sharpen your skills.

- [NetSecFocus "TJ Null's" Trophy Room (Google Sheet)](https://docs.google.com/spreadsheets/u/1/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/htmlview) — The definitive OSCP-like machine list
- [IrregularChat Community OSCP Tracker (Google Sheet)](https://docs.google.com/spreadsheets/d/18weuz_Eeynr6sXFQ87Cd5F0slOj9Z6rt/edit?gid=487240997#gid=487240997) — Community-shared prep tracker
- [All About OSCP](https://oscp.infosecsanyam.in/)
- [TJNull's Preparation Guide for PWK/OSCP](https://www.netsecfocus.com/oscp/2019/03/29/The_Journey_to_Try_Harder-_TJNulls_Preparation_Guide_for_PWK_OSCP.html)
- [Cracking the New Pattern](https://jaiguptanick.medium.com/oscp-cracking-the-new-pattern-6c4f1c9e2409)
- [Reddit OSCP Journey and Tips](https://www.reddit.com/r/oscp/comments/k7x4o1/just_passed_oscpmy_journey_and_tips/)
- [Avoiding Common OSCP Pitfalls](https://robertscocca.medium.com/avoiding-common-oscp-pitfalls-d2dd929fdb03)
- [Total OSCP Guide](https://sushant747.gitbooks.io/total-oscp-guide/content/)
- [OSCP Scripts](https://github.com/HackedBaked/OSCP_Scripts)
- [Enumeration Cheatsheets](https://infinitelogins.com/enumeration-cheatsheets/)
- [General OSCP Cheatsheet](https://trojand.com/cheatsheet/OSCP/General_Cheatsheet.html)
- [0xsyr0 OSCP Resources (GitHub)](https://github.com/0xsyr0/OSCP)

---

## Active Directory Resources

### Purple Team

- [SwisskyRepo - Active Directory Attack](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Active%20Directory%20Attack.md)
- [HackTricks - AD Methodology](https://book.hacktricks.xyz/windows-hardening/active-directory-methodology/)

### Red Team

- [GitHub - 0xJs - Certified Red Team Professional Cheatsheet](https://github.com/0xJs/CRTP-cheatsheet)
- [GitHub - 0xJs - Red Teaming Cheat Sheet for Windows Active Directory](https://github.com/0xJs/RedTeaming_CheatSheet/tree/main/windows-ad)
- [iRed Team - Offensive Security Cheatsheets](https://www.ired.team/offensive-security-experiments/offensive-security-cheetsheets)
- [Zer1t0's Blog - Attacking Active Directory](https://zer1t0.gitlab.io/posts/attacking_ad/)
- [Lümmelsec - A Low Dive into Kerberos Delegations](https://luemmelsec.github.io/S4fuckMe2selfAndUAndU2proxy-A-low-dive-into-Kerberos-delegations/)

### Blue Team

- [WADComs - Windows Active Directory Command Line](https://wadcoms.github.io/)
- [AD Group Related Queries](https://ldapwiki.com/wiki/Active%20Directory%20Group%20Related%20Searches)
- [AD User Related Queries](https://ldapwiki.com/wiki/Active%20Directory%20User%20Related%20Searches)

---

## Mind Maps

- [Whimsical - Target Machine IP Workflow Mind Map](https://whimsical.com/target-machine-ip-23aVmgehajqmAvT9cH4q2K)
- [Orange Cyber - Penetration Testing Active Directory Mind Map](https://orange-cyberdefense.github.io/ocd-mindmaps/img/pentest_ad_dark_2023_02.svg)

---

## Privilege Escalation Resources

### Windows

- [Total OSCP Guide - Windows Privilege Escalation](https://sushant747.gitbooks.io/total-oscp-guide/content/privilege_escalation_windows.html)
- [Swisskyrepo - Windows Privesc](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md)

### Linux

- [Swisskyrepo - Linux Privesc](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md)

---

## Tools for Penetration Testing

- [Dirsearch](https://github.com/maurosoria/dirsearch)
- [Gobuster](https://github.com/OJ/gobuster)
- [FeroxBuster](https://github.com/epi052/feroxbuster)

---

## Red Team GitHub Repositories

- [A0RX - Red-Blue Team Party](https://github.com/A0RX/Red-Blueteam-party)
- [MantisSTS - Red Team Tools](https://github.com/MantisSTS/RedTeamTools)

---

## Building Labs for Practice

- [Setting up AWS Red Team Active Directory Lab](https://philkeeble.com/automation/windows/activedirectory/AWS-RedTeam-ADLab-Setup/)
- [SANS Webcast: Building Your Own Super Duper Home Lab](https://youtu.be/uzqwoufhwyk)
