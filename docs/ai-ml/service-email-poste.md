---
title: "Service - email - Poste"
---

# Service - email - Poste

SMTP + IMAP + POP3 + Antispam + Antivirus

Web administration + Web email

…on your server in ~5 minutes

https://poste.io/doc/

### Server Set Up

1. Create an Instance - See [Cloud Instance Setup](/general/cloud-instance-setup)

2. SSH Into Server

3. Mount Storage persistently - See [Linux Server Storage](/server-guides/linux-server-storage)

4. Set up a Server for Docker - See [Linux Server Initial Setup](/server-guides/linux-server-initial-setup)

## Run Poste Docker
```bash
sudo docker pull analogic/poste.io
sudo docker run --net=host -e TZ=America/New_York -v $HOME/datadrive/var/mailserver/data:/data --name "mailserver" --restart always -h "mail.irregularchat.com" -t analogic/poste.io
```

### Ports Explained

### Inbound Rules:
The following ports need to be open for incoming connections:

Ports that are opened by poste.io:

| Port | Purpose |
|------|---------|
| 25 | SMTP - processing incoming mails from remote mail servers |
| 80 | HTTP - redirect to https and authentication for Let's Encrypt |
| 110 | POP3 - standard protocol for accessing mailbox, STARTTLS required |
| 143 | IMAP - standard protocol for accessing mailbox, STARTTLS required |
| 443 | HTTPS - access to administration or webmail client |
| 465 | SMTPS - Legacy SMTPs port |
| 587 | MSA - SMTP port used by email clients after STARTTLS and auth |
| 993 | IMAPS - IMAP with encryption from the start |
| 995 | POP3S - POP3 with encryption from the start |
| 4190 | Sieve - remote sieve settings |
