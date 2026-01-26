---
title: "Gitlab"
---

# Gitlab

### Docker Compose
```
version: '3'

services:
  redis:
    restart: always
    image: redis:latest
    command:
      - --loglevel warning
    volumes:
      - redis-data:/data

  postgresql:
    restart: always
    image: sameersbn/postgresql:latest
    volumes:
      - postgresql-data:/var/lib/postgresql
    environment:
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_NAME=${DB_NAME}
      - DB_EXTENSION=${DB_EXTENSION}

  gitlab:
    restart: always
    image: sameersbn/gitlab:latest
    depends_on:
      - redis
      - postgresql
    ports:
      - &quot;480:80&quot;
      - &quot;22:22&quot;
    volumes:
      - gitlab-data:/home/gitlab/data
    healthcheck:
      test: [&quot;/usr/local/sbin/healthcheck&quot;](&quot;CMD&quot;,)
      interval: 5m
      timeout: 10s
      retries: 3
      start_period: 5m
    environment:
      - DEBUG=${DEBUG}
      - DB_ADAPTER=${DB_ADAPTER}
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_USER=${DB_USER}
      - DB_PASS=${DB_PASS}
      - DB_NAME=${DB_NAME}
      - REDIS_HOST=${REDIS_HOST}
      - REDIS_PORT=${REDIS_PORT}
      - TZ=${TZ}
      - GITLAB_TIMEZONE=${GITLAB_TIMEZONE}
      - GITLAB_HTTPS=${GITLAB_HTTPS}
      - SSL_SELF_SIGNED=${SSL_SELF_SIGNED}
      - GITLAB_HOST=${GITLAB_HOST}
      - GITLAB_PORT=${GITLAB_PORT}
      - GITLAB_SSH_PORT=${GITLAB_SSH_PORT}
      - GITLAB_RELATIVE_URL_ROOT=${GITLAB_RELATIVE_URL_ROOT}
      - GITLAB_SECRETS_DB_KEY_BASE=${GITLAB_SECRETS_DB_KEY_BASE}
      - GITLAB_SECRETS_SECRET_KEY_BASE=${GITLAB_SECRETS_SECRET_KEY_BASE}
      - GITLAB_SECRETS_OTP_KEY_BASE=${GITLAB_SECRETS_OTP_KEY_BASE}
      - GITLAB_ROOT_PASSWORD=${GITLAB_ROOT_PASSWORD}
      - GITLAB_ROOT_EMAIL=${GITLAB_ROOT_EMAIL}
      - GITLAB_NOTIFY_ON_BROKEN_BUILDS=${GITLAB_NOTIFY_ON_BROKEN_BUILDS}
      - GITLAB_NOTIFY_PUSHER=${GITLAB_NOTIFY_PUSHER}
      - GITLAB_EMAIL=${GITLAB_EMAIL}
      - GITLAB_EMAIL_REPLY_TO=${GITLAB_EMAIL_REPLY_TO}
      - GITLAB_INCOMING_EMAIL_ADDRESS=${GITLAB_INCOMING_EMAIL_ADDRESS}
      - GITLAB_BACKUP_SCHEDULE=${GITLAB_BACKUP_SCHEDULE}
      - GITLAB_BACKUP_TIME=${GITLAB_BACKUP_TIME}
      - SMTP_ENABLED=${SMTP_ENABLED}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - SMTP_STARTTLS=${SMTP_STARTTLS}
      - SMTP_AUTHENTICATION=${SMTP_AUTHENTICATION}
      - IMAP_ENABLED=${IMAP_ENABLED}
      - IMAP_HOST=${IMAP_HOST}
      - IMAP_PORT=${IMAP_PORT}
      - IMAP_USER=${IMAP_USER}
      - IMAP_PASS=${IMAP_PASS}
      - IMAP_SSL=${IMAP_SSL}
```

### .env file
```
# PostgreSQL
DB_USER=gitlab
DB_PASS=SECRET_HERE
DB_NAME=gitlabhq_production
DB_EXTENSION=pg_trgm,btree_gist

## GitLab
DEBUG=false
DB_ADAPTER=postgresql
DB_HOST=postgresql
DB_PORT=5432
REDIS_HOST=redis
REDIS_PORT=6379
TZ=America/New_York
GITLAB_TIMEZONE=America/New_York
GITLAB_HTTPS=false
SSL_SELF_SIGNED=false
GITLAB_HOST=localhost
GITLAB_PORT=10080
GITLAB_SSH_PORT=10022
GITLAB_RELATIVE_URL_ROOT=gitlab.irregularchat.com
GITLAB_SECRETS_DB_KEY_BASE=SECRET_HERE
GITLAB_SECRETS_SECRET_KEY_BASE=SECRET_HERE
GITLAB_SECRETS_OTP_KEY_BASE=SECRET_HERE
GITLAB_ROOT_PASSWORD=SECRET_HERE
GITLAB_ROOT_EMAIL=rootsac@irregularchat.com
GITLAB_NOTIFY_ON_BROKEN_BUILDS=true
GITLAB_NOTIFY_PUSHER=false
GITLAB_EMAIL=notifications@example.com
GITLAB_EMAIL_REPLY_TO=noreply@example.com
GITLAB_INCOMING_EMAIL_ADDRESS=reply@example.com
GITLAB_BACKUP_SCHEDULE=daily
GITLAB_BACKUP_TIME=01:00

## SMTP
SMTP_ENABLED=true
SMTP_HOST=mail.riseup.net
SMTP_PORT=465
SMTP_USER=irregularchat@riseup.net
SMTP_PASS=SECRET_HERE
SMTP_STARTTLS=true
SMTP_AUTHENTICATION=login

## IMAP
IMAP_ENABLED=false
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=mailer@example.com
IMAP_PASS=password
IMAP_SSL=true
IMAP_STARTTLS=false

## OAuth
OAUTH_ENABLED=true
OAUTH_AUTO_SIGN_IN_WITH_PROVIDER=&quot;IrregularChat Login&quot;
OAUTH_ALLOW_SSO=true
OAUTH_BLOCK_AUTO_CREATED_USERS=true
OAUTH_AUTO_LINK_LDAP_USER=false
OAUTH_AUTO_LINK_SAML_USER=false
OAUTH_EXTERNAL_PROVIDERS=
OAUTH_CAS3_LABEL=cas3
OAUTH_CAS3_SERVER=
OAUTH_CAS3_DISABLE_SSL_VERIFICATION=false
OAUTH_CAS3_LOGIN_URL=/cas/login
OAUTH_CAS3_VALIDATE_URL=/cas/p3/serviceValidate
OAUTH_CAS3_LOGOUT_URL=/cas/logout
OAUTH_AUTH0_CLIENT_ID=SECRET_HERE
OAUTH_AUTH0_CLIENT_SECRET=SECRET_HERE
OAUTH_AUTH0_DOMAIN=https://sso.irregularchat.com/application/o/authorize/
OAUTH_AUTH0_SCOPE=
```
