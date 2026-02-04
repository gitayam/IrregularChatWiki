---
title: "Mantrix with Ansible"
---

# Mantrix with Ansible

Return to [Server Guides](/server-guides/)

## Pushing Updates

### Remotely Pushing updates with ssh command
```shell
# sync the var config section with local
rsync -avz /Users/sacas/Git/Irregularchat2.0/matrix-docker-ansible-deploy root@ssh.alfaren.xyz:/root/Git/
1. push ansible setup and start
ssh root@ssh.alfaren.xyz 'ansible-playbook -i /root/Git/matrix-docker-ansible-deploy/inventory/hosts /root/Git/matrix-docker-ansible-deploy/setup.yml --tags=setup-all,start &'
1. ensure-matrix-users-created can be added before start when creating users but user creation should be done with sso
```

### Configuration
```
***
## The bare domain name which represents your Matrix identity.
## Matrix user ids for your server will be of the form (`@user:&lt;matrix-domain&gt;`).
1. 1. Note: this playbook does not touch the server referenced here.
## Installation happens on another server (&quot;matrix.&lt;matrix-domain&gt;&quot;).
1. 1. If you've deployed using the wrong domain, you'll have to run the Uninstalling step,
1. because you can't change the Domain after deployment.
1. 1. Example value: example.com
matrix_domain: irregulars.io

############CUSTOM############
matrix_synapse_allow_public_rooms_over_federation: true

matrix_base_data_path: &quot;/datadrive/matrix&quot;
devture_systemd_service_manager_up_verification_delay_seconds: 7

matrix_homeserver_admin_contacts:
  - matrix_id: &quot;@sac:irregulars.io&quot;
    email_address: sac@irregularchat.com
    role: admin
  - email_address: security@irregularchat.com
    role: security

matrix_ssl_lets_encrypt_support_email: 'matrix@irregularchat.com'

## This is something which is provided to Let's Encrypt when retrieving SSL certificates for domains.
1. 1. In case SSL renewal fails at some point, you'll also get an email notification there.
1. 1. If you decide to use another method for managing SSL certificates (different than the default Let's Encrypt),
1. you won't be required to define this variable (see `docs/configuring-playbook-ssl-certificates.md`).
1. 1. Example value: someone@example.com
devture_traefik_config_certificatesResolvers_acme_email: 'matrix@irregularchat.com'

matrix_registration_enabled: true
matrix_registration_admin_secret: &quot;secret_here&quot;

matrix_homeserver_generic_secret_key: 'secret_here'
devture_postgres_connection_password: 'secret_here'

### Signal Bot ###
matrix_mautrix_signal_enabled: true
matrix_mautrix_signal_relaybot_enabled: true
matrix_mautrix_signal_login_shared_secret: 'secret_here'
matrix_mautrix_signal_bridge_permissions: {&quot;@sac:irregulars.io&quot;: &quot;admin&quot;, &quot;*&quot;: &quot;user&quot;, &quot;*&quot;: &quot;relay&quot;}
### Signal Bot ###
### SSO Configuration ###
1. oidc_providers:
1. - idp_id: authentik
1. idp_name: authentik
1. discover: true
1. issuer: &quot;https://sso.irregulars.io/application/o/element-messenger/&quot; # TO BE FILLED: domain and slug
1. client_id: &quot;74efbe99d72cb3913b853b6a2b2f9d44b5687a6d&quot; # TO BE FILLED
1. client_secret: &quot;111ca129a5d5ddecd621e006aa50287a8b9b9d37af7ab9e9783daa38a4394f3ec30591f4af91baf629a63e5e5ad38527dafe54afaee584676164f7d69ef5dd2f&quot; # TO BE FILLED
1. client_auth_method: client_secret_post
1. scopes: [&quot;openid&quot;, &quot;profile&quot;](server-guides](/server-guides-md))
1. authorization_endpoint: &quot;https://sso.irregulars.io/application/o/authorize/&quot;
1. token_endpoint: &quot;https://sso.irregulars.io/application/o/token/&quot;
1. userinfo_endpoint: &quot;https://sso.irregulars.io/application/o/userinfo/&quot;
1. jwks_uri: &quot;https://sso.irregulars.io/application/o/element-messenger/jwks/&quot;
1. skip_verification: true
1. user_mapping_provider:
1. config:
1. subject_claim: &quot;id&quot;
1. localpart_template: &quot;&quot;
1. display_name_template: &quot;&quot;
1. email_template: &quot;&quot;
1. attribute_requirements:
1. - attribute: userGroup
1. value: &quot;synapseUsers&quot;
### //SSO Configuration ###
############ //CUSTOM ############
## The Matrix homeserver software to install.
## See:
1. - `roles/custom/matrix-base/defaults/main.yml` for valid options
1. - the `docs/configuring-playbook-IMPLEMENTATION_NAME.md` documentation page, if one is available for your implementation choice
   1. matrix_homeserver_implementation: synapse
#https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook-dendrite.md
matrix_homeserver_implementation: dendrite

## A secret used as a base, for generating various other secrets.
## By default, the playbook manages its own Traefik (https://doc.traefik.io/traefik/) reverse-proxy server.
## It will retrieve SSL certificates for you on-demand and forward requests to all other components.
## For alternatives, see `docs/configuring-playbook-own-webserver.md`.
matrix_playbook_reverse_proxy_type: playbook-managed-traefik
```
