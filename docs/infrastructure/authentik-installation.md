---
title: "Authentik Installation"
---

# Authentik Installation

## About Authentik
Authentik is an open-source identity provider that integrates seamlessly into your applications. It is designed to provide secure authentication and authorization services for your users.

### Requirements

- A host with at least 2 CPU cores and 2 GB of RAM

- Docker

- Docker Compose (Compose v2 is recommended, see [here for instructions on how to upgrade](https://docs.docker.com/compose/install/)

### Installation
To install Authentik using Docker Compose, follow these steps:

```

wget https://goauthentik.io/docker-compose.yml

sudo apt-get install -y pwgen

echo "PG_PASS=$(pwgen -s 40 1)" >> .env

echo "AUTHENTIK_SECRET_KEY=$(pwgen -s 50 1)" >> .env

echo "AUTHENTIK_ERROR_REPORTING__ENABLED=true" >> .env

```

### Run Authentik Compose File
This command initially installs Authentik and is also used to update settings and configurations:

```

docker-compose pull
docker-compose up -d

```

### Initial Setup
To start the initial setup, navigate to: `http://&lt;your server's IP or hostname&gt;:9443/if/flow/initial-setup/`.

### Benefits of Self-Hosting
Self-hosting Authentik has its advantages and disadvantages.

### Positives

- Full control over your authentication processes and user data.

- Ability to customize features to suit your community's needs.

- Enhanced privacy and security since data does not reside on third-party servers.

- Privacy is improved since data is not stored on third-party servers.

- Cost-effective compared to paid services which may charge per user.

- Automations can be set up to manage user accounts and permissions.

### Negatives

- Requires maintenance, including updates and backups.

- Initial setup and configuration may be complex for some users.

- Needs a reliable host with sufficient resources.

- Security may be compromised if not properly configured and the identity provider is a large target for attackers.

### Community Building
Self-hosting Authentik can significantly contribute to community building by providing a secure and customizable authentication solution. It allows community moderators to manage user accounts effectively, creating a trustworthy environment for all members.

For example, this community-made app allows moderators to use specific functions from Authentik: [Authentik Account Creation](https://github.com/irregularchat/authentik-account-creation).
