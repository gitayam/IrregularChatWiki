---
title: "Mobilizon Instalation"
---

# Mobilizon Instalation

## About Mobilizon
Mobilizon is a free and federated tool for organizing events, part of the Framasoft ecosystem. It is a decentralized alternative to Facebook Events, Meetup, and other proprietary platforms. Mobilizon is free and open-source software that allows you to create and manage events, and it is designed to respect your privacy and freedom.

[Installation Guide](https://docs.joinmobilizon.org/administration/install/docker/)

```

git clone https://framagit.org/framasoft/joinmobilizon/docker.git docker-mobilizon
cd docker-mobilizon
cp env.template .env
for i in "changethis" .env; do sed 's/changethis/gpg --gen-random --armor 1 50'

```
