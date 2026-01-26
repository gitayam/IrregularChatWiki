---
title: "Self-Hosting Jitsi"
---

# Self-Hosting Jitsi

## Self-Hosting Jitsi Guide
This guide provides instructions for self-hosting Jitsi as part of a Matrix Docker setup, covering the main configuration variables, troubleshooting known issues, and managing the service.

### Configuration Variables (VARS)
Add the following configuration options to your `vars.yml` file to enable and configure Jitsi:

```
matrix_jitsi_enabled: true
matrix_jitsi_enable_guests: true
matrix_jitsi_enable_lobby: false
jitsi_prosody_auth_matrix_uvs_sync_power_levels: false
```

These variables control Jitsi's behavior within your Matrix instance:

- `matrix_jitsi_enabled`: Enables Jitsi for video conferencing.

- `matrix_jitsi_enable_guests`: Allows guests to join without an account.

- `matrix_jitsi_enable_lobby`: Enables or disables the Jitsi lobby feature for waiting rooms.

- `jitsi_prosody_auth_matrix_uvs_sync_power_levels`: Syncs Jitsi moderation with Matrix power levels.

### Managing Jitsi
To manage the Jitsi service (start, stop, restart), use the following commands:

### Stopping Jitsi
To stop only the Jitsi service, run:

```
ansible-playbook -i inventory/hosts setup.yml --tags=stop-group --extra-vars=group=jitsi
```

### Restarting Jitsi
To stop and then start the Jitsi service, run:

```
ansible-playbook -i inventory/hosts setup.yml --tags=stop-group --extra-vars=group=jitsi; ansible-playbook -i inventory/hosts setup.yml --tags=install-service jitsi
```

This will ensure Jitsi is properly restarted after changes or issues.

### Troubleshooting
If you encounter issues, here are a few troubleshooting tips:

### No Moderator Assigned to Calls
This is a common issue tracked on GitHub. You can check this known issue here: [No moderator assigned to calls](https://github.com/spantaleev/matrix-docker-ansible-deploy/issues/2589).

As a potential fix, you may need to clean up the Jitsi folder:

```
rm -rf /matrix/jitsi
```

### Sync Power Levels
Ensure that the following variable is set to `false` if you're having issues with Matrix power level synchronization for Jitsi:

```
jitsi_prosody_auth_matrix_uvs_sync_power_levels: false
```

This prevents Jitsi from syncing moderation with Matrix power levels, which can sometimes cause unexpected behavior.

### Additional Resources
For more detailed documentation and community support, visit the official Matrix Docker Ansible Deploy [repository](https://github.com/spantaleev/matrix-docker-ansible-deploy).
