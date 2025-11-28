---
title: "Setting up Maubot"
---

# Setting up Maubot

## Maubot in the Community
Using the following Plugins:

- https://github.com/gitayam/matrix-to-discourse

- https://github.com/ggogel/SocialMediaDownloadMaubot

- https://github.com/maubot/reminder

- https://github.com/maubot/reactbot

Some of these plugins have been modified from the source to fit the community's needs.

### Maubot Documentation
Maubot is used for moderation and management tasks within Matrix environments. Below are useful resources and steps for setting up and managing Maubot.

**GitHub Repository and Project Documentation**

- [Maubot Configuration Documentation on GitHub](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook-bot-maubot.md)

- [Official Maubot Project Documentation](https://docs.mau.fi/maubot/usage/basic.html)

**Plugins Available**

- Find available plugins [here](https://plugins.mau.bot).

**Admin Dashboard**

- The Maubot admin dashboard can be accessed at: [matrix.irregularchat.com/_matrix/maubot/](https://matrix.irregularchat.com/_matrix/maubot/).

### Maubot Access Token with SSO
To obtain a Maubot access token using SSO, follow these steps:
Reference: [Maubot Authentication Documentation](https://docs.mau.fi/maubot/usage/cli/auth.html)

```

#Launch an interactive shell in the Maubot container
sudo docker exec -it matrix-bot-maubot /bin/sh

```
```

HOMESERVER_URL="https://matrix.irregularchat.com"
USERNAME="maubotuser"
#You must login before authenticating. This is logging in to the maubot portal
mbc login -u "$USERNAME" -s "$HOMESERVER_URL" -a homeserver -p passwordHERE

```

```

1. now while authenticated, login to the user account
1. If you have an SSO for the user
DOMAIN="https://matrix.irregularchat.com"
HOMESERVER_URL="https://matrix.irregularchat.com"
USERNAME="bot.user"
mbc login -u $USERNAME -s $HOMESERVER_URL -a $DOMAIN -p "passwordHERE"

```

```

1. now while authenticated, login to the user account
1. If you have an SSO for the user
DOMAIN="https://matrix.irregularchat.com"
HOMESERVER_URL="https://matrix.irregularchat.com"
USERNAME="bot.user"
mbc auth -s "$HOMESERVER_URL" -h "$DOMAIN" -o --update-client -u "$USERNAME"

```

The output should look like this:
`Opening http://matrix-nginx-proxy:12080/_matrix/client/v3/login/sso/redirect?redirectUrl=https://matrix.irregularchat.com/_matrix/maubot/v1/client/auth_external_sso/complete/randomhere`

## Open a browser and replace `http://matrix-nginx-proxy:12080` with `https://matrix.irregularchat.com`.

2. Log in using Single Sign-On (SSO).

### Packaging the Plugin
To package a plugin for Maubot, use the following command:

```

1. Inside the cloned git directory
zip -9r plugin-name.mbp *

```


[Management]
