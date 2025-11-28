---
title: "Setting up cryptpad server"
---

# Setting up cryptpad server

## About Cryptpad
>
CryptPad provides a full-fledged office suite with all the tools necessary for productive collaboration. Applications include Rich Text, Spreadsheets, Code/Markdown, Kanban, Slides, Whiteboard, and Forms.

### About This Cryptpad Server Guide
The Source is ]https://docs.cryptpad.org/en/admin_guide/installation.html]

The instructions are pretty clear for the most part and there is an npm option and a docker option. As of October 2024, the docker option is not stable and worth using instead of the javascript option.

Below are some quick links and code that may be helpful.

### Trouble Shooting Cryptpad
https://cryptpad.irregularchat.com/checkup/

### Configuring Cryptpad

### Configuring Office Products

### Configuring an Identity Provider

### Serving Cryptpad

### Serving Detached
PM2 should be used instead of foreverjs and not just node.

```

pm2 start server.js --name cryptpad

pm2 save

pm2 list

```

### NGINX
```

sudo apt update;sudo apt install nginx -y

sudo mkdir -p /etc/nginx/conf.d/

sudo nano /etc/nginx/conf.d/cryptpad.conf

sudo openssl dhparam -out /etc/nginx/dhparam.pem 4096

```

### Updating Cryptpad
Beyond the guidance from the [documentation](https://docs.cryptpad.org/en/admin_guide/maintenance.html), it has worked to ```
git pull
``` and restart the server without waiting for the next version.


[[:Category:Server](:Category:Self-hosting]
