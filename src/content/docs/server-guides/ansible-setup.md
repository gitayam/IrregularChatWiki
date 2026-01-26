---
title: "Ansible-setup"
---

# Ansible-setup

## Matrix Server with Ansible
Return to [Recommend using Tailscale](/server-guides/) to connect to remote server instead of ssh.

For ssh connect using [keys](/general/ssh-keys)

For the full steps and options see the [official repo](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs)

### Pushing Updates
To push updates to the entire matrix server including all the add ons and clients you need to 0. Move into the Matrix Repo 1. git pull (updates repo) 2. Make (This will stage all updates including the new docker image versions) 3. Push setup and start

```shell
sudo make roles
sudo ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

### Remotely Pushing updates with ssh command
This is how you can setup the ansible script on a remote server to run “locally.” Each time you update you will need to git pull the repo

```shell
# sync the var config section with local
rsync -avz /Users/USERNAME/Git/matrix-docker-ansible-deploy root@proxmox-main:/root/Git/
1. push ansible setup and start
1. the & at the end will keep this script alive until finished
ssh root@proxmox-main 'ansible-playbook -i /root/Git/matrix-docker-ansible-deploy/inventory/hosts /root/Git/matrix-docker-ansible-deploy/setup.yml --tags=setup-all,start &'
1. ensure-matrix-users-created can be added before start
1. when creating users but user creation should be done with sso
```

### Configuration
[Documentation](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/6bef71ebb8e08d761ff52d7f660f5e4e6e5c9330/examples/hosts) ### hosts

```yaml
[matrix.irregularchat.com ansible_host=ip.add.re.ss ansible_port=22

[matrix_servers:vars](matrix_servers])
ansible_ssh_user=root

1. local install , same server running as script
1. matrix.irregularchat.com ansible_ssh_user=sac become=true become_user=root ansible_connection=local ansible_python_interpreter=/usr/bin/python3 matrix_coturn_turn_external_ip_address=ip.add.re.ss
```

### vars.yml
```yaml
# Traefik Reverse-Proxy Configuration
matrix_playbook_reverse_proxy_type: playbook-managed-traefik
matrix_playbook_ssl_enabled: true
1. new term 20240115
1. matrix_well_known_matrix_server_enabled: false
matrix_static_files_file_matrix_server_enabled: false
matrix_synapse_admin_enabled: true # Synapse Admin will be accessible at: https://matrix.DOMAIN/synapse-admin/

1. Devture Traefik Configuration
1. Source Guide: https://appelman.se/matrix-on-cloudflare/
devture_traefik_config_entrypoint_web_secure_enabled: false
devture_traefik_container_web_host_bind_port: "127.0.0.1:81"
devture_traefik_config_entrypoint_web_forwardedHeaders_insecure: true
   1. commented out 20240115
1. devture_traefik_additional_entrypoints_auto:
1. - name: matrix-federation
1. port: 8449
1. host_bind_port: "127.0.0.1:8449"
1. config: {}
matrix_playbook_public_matrix_federation_api_traefik_entrypoint_host_bind_port: 127.0.0.1:8449
matrix_playbook_public_matrix_federation_api_traefik_entrypoint_config_custom:
  forwardedHeaders:
    insecure: true

1. metrics
matrix_synapse_report_stats: true
prometheus_enabled: true
prometheus_node_exporter_enabled: false
prometheus_postgres_exporter_enabled: false
matrix_prometheus_nginxlog_exporter_enabled: false

grafana_enabled: false
grafana_anonymous_access: false
grafana_default_admin_user: "sacmin"
grafana_default_admin_password: "secret_here"

1. Coturn Server Configuration
matrix_coturn_enabled: false

1. Sliding Sync Configuration
1. Enables the Sliding Sync proxy
matrix_sliding_sync_enabled: true
1. # Maps a port on the host, passed into the Sliding Sync container's internal listening port. MUST be set as by default the container has no host bindings and thus can never be reached from outside the internal docker network. Not even locally. I have chosen host port 8018 so that it's well out of the way
matrix_sliding_sync_container_extra_arguments:
  - "-p 8018:8008"
1. Sets the server URL the server tells clients to try to connect to it with. This should be your https://matrix.yourdomain.com URL, including the "https://". MUST be set as for some reason the default tells clients to use an internal docker hostname, namely matrix-nginx-proxy container which obviously won't work externally and caused 404's in the sliding sync logs.
matrix_sliding_sync_environment_variable_syncv3_server: "https://matrix.irregularchat.com"

devture_traefik_config_certificatesResolvers_acme_email: ssl@irregularchat.com
enable_set_displayname: true

1. Homeserver and Registration Configuration
matrix_homeserver_implementation: synapse
matrix_homeserver_generic_secret_key: 'secret_here'
matrix_registration_enabled: true
matrix_registration_admin_secret: "secret_here"
matrix_domain: irregularchat.com
devture_postgres_connection_password: 'secret_here'
matrix_synapse_max_upload_size_mb: 150
matrix_synapse_media_retention_local_media_lifetime: 1 y
matrix_synapse_media_retention_remote_media_lifetime: 1 m
matrix_synapse_user_directory_prefer_local_users: true
1. wether to accept passwords or not. True is yes. false is no.
matrix_synapse_password_config_enabled: false
devture_systemd_service_manager_up_verification_delay_seconds: 65
1. Synapse Auto Compressor Configuration
matrix_synapse_auto_compressor_enabled: true

1. force redis, based on the change to keydb: https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/CHANGELOG.md
1. redis_enabled: true
keydb_enabled: false #default to true

### Clients
1. schildichat
matrix_client_schildichat_enabled: true

1. Element
matrix_client_element_default_theme: 'dark'

1. Jitsi Video Service
jitsi_enabled: true
matrix_client_element_jitsi_preferred_domain: 'jitsi.irregularchat.com'

1. EtherPad
etherpad_enabled: true

1. Uncomment below to enable the admin web UI
etherpad_admin_username: admin
etherpad_admin_password: secret_here

1. Synapse Workers Configuration
matrix_synapse_workers_enabled: true
matrix_synapse_workers_preset: specialized-workers

1. Dimensions
matrix_dimension_enabled: false
matrix_dimension_admins:
  - "@sacmin:irregularchat.com"
  - "@rod:irregularchat.com"

matrix_dimension_access_token: "secret_here"

##################################
   1. BOTS
##################################
1. Shared Configuration for Bots
   1. Source: https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook-shared-secret-auth.md
   1. Source: https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/f84a53d801307cc3e6c24cf40b0db217ffe8a1ab/docs/configuring-playbook-mautrix-bridges.md?plain=1#L42
matrix_synapse_ext_password_provider_shared_secret_auth_enabled: true
matrix_synapse_ext_password_provider_shared_secret_auth_shared_secret: 'secret_here'
matrix_synapse_password_config_localdb_enabled: false
matrix_bridges_encryption_enabled: true
matrix_bridges_encryption_default: true
matrix_admin: "@sac:irregularchat.com"

1. Mautrix WhatsAPP Bot Configuration
##Source https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook-bridge-mautrix-whatsapp.md
matrix_mautrix_whatsapp_enabled: true
matrix_mautrix_whatsapp_bridge_relay_enabled: true
matrix_mautrix_whatsapp_configuration_extension_yaml: |
  bridge:
    encryption:
      allow: true
      require: true

1. Mautrix Signal Bot Configuration
   1. Signal Bot
matrix_mautrix_signal_enabled: true
matrix_mautrix_signal_appservice_bot_username: 'signalbot'

1. Encryption settings
1. matrix_mautrix_signal_bridge_encryption_allow: true
1. matrix_mautrix_signal_bridge_encryption_default: true
matrix_mautrix_signal_configuration_extension_yaml: |
  bridge:
    encryption:
      allow: true
      require: true
    permissions:
      '@sac:irregularchat.com': admin
      '@*.*:irregularchat.com': relay
    relay:
      enabled: true

1. # Mjolnir Moderation Bot Configuration
1. matrix_bot_mjolnir_enabled: true
1. matrix_bot_mjolnir_pantalaimon_username: "mjolnir"
1. matrix_bot_mjolnir_access_token: "secret_here"
1. matrix_bot_mjolnir_management_room: "!DRqqGyInlMHNNtYQmI:irregularchat.com"
1. # # Anti-Spam Configuration
1. matrix_synapse_ext_spam_checker_mjolnir_antispam_enabled: true
1. matrix_synapse_ext_spam_checker_mjolnir_antispam_config_block_invites: true
1. matrix_synapse_ext_spam_checker_mjolnir_antispam_config_block_messages: true
1. matrix_synapse_ext_spam_checker_mjolnir_antispam_config_block_usernames: false
1. matrix_synapse_ext_spam_checker_mjolnir_antispam_config_ban_lists: []
1. Maubot Configuration
matrix_bot_maubot_enabled: true
matrix_bot_maubot_initial_password: 'secret_here'
matrix_bot_maubot_admins:
  - sac: 'secret_here'
  - rod: 'secret_here'
  - jon: 'secret_here'
  - josh: 'secret_here'

1. Discord Bot Configuration
matrix_mautrix_discord_enabled: true

##################################
##################################
1. OIDC Configuration
   1. roles/custom/matrix-synapse/templates/synapse/homeserver.yaml.j2
1. https://github.com/spantaleev/matrix-docker-ansible-deploy/commit/9427f9408dfded216d7c29027c234b9762a26727
##################################

matrix_synapse_oidc_enabled: true
matrix_synapse_oidc_providers:
  - idp_id: irregularchat-sso
    idp_name: "IrregularChat SSO"
    idp_icon: mxc://irregularchat.com/axcviKJxegoQTAOorOabNCpl
    discover: true
    issuer: "https://sso.irregularchat.com/application/o/element-messenger/"
    client_id: "client_id_here"
    client_secret: "secret_here"
    client_auth_method: client_secret_post
    scopes:
        - "openid"
        - "profile"
    allow_existing_users: true
    user_mapping_provider:
        config:
            localpart_template: "{% raw %}{% endraw %}"
            display_name_template: "{% raw %}{% endraw %}"
1. Auto-join rooms must be of the same homeserver and must be public
matrix_synapse_auto_join_rooms:
  - "#entry-public:irregularchat.com"
  - "#announcements:irregularchat.com"
  - "#public:irregularchat.com"
  - "#meetup:irregularchat.com"
   1. Set the rate limits for rooms
matrix_synapse_rc_invites:
  per_room:
    per_second: 100  # High value to effectively remove limit
    burst_count: 1000  # High value to effectively remove limit
  per_user:
    per_second: 100  # High value to effectively remove limit
    burst_count: 300  # High value to effectively remove limit

matrix_synapse_rc_message:
  per_second: 15  # Adjust as needed, allows 5 messages per second
  burst_count: 200  # Adjust as needed, allows bursts of 50 messages

##################################
   1. Email
##################################

exim_relay_sender_address: "no-reply@irregular.chat"
exim_relay_relay_use: true
exim_relay_relay_host_name: "email-smtp.us-east-1.amazonaws.com"
exim_relay_relay_host_port: 587
exim_relay_relay_auth: true
exim_relay_relay_auth_username: "username_here"
exim_relay_relay_auth_password: "secret_here"

##################################
   1. Backups
##################################
devture_postgres_backup_enabled: false # https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/e01aa667e7dd0a34f1f5af1572d73db7b602a9fd/docs/configuring-playbook-postgres-backup.md

backup_borg_enabled: true
backup_borg_location_repositories:
 - ssh://backup@192.168.x.xxx:xxx/PATH/Backups/Matrix/
backup_borg_storage_encryption_passphrase: "secret_here"
backup_borg_ssh_key_private: |
  -----BEGIN OPENSSH PRIVATE KEY-----
secret_here
  -----END OPENSSH PRIVATE KEY-----

```
