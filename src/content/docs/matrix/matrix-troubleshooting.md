---
title: "Matrix Troubleshooting"
---

# Matrix Troubleshooting

## Federation and Common Tasks for Matrix Server

This page addresses common tasks and issues with Matrix federation and server management, providing solutions and resources for troubleshooting and maintenance.

### Federation Issues

Matrix federation enables servers to communicate with each other. Use the following tools and resources for diagnosing federation problems:

- [Check Federation](https://federationtester.matrix.org)
- [Matrix Federation Documentation](https://spec.matrix.org/v1.6/server-server-api/#server-discovery)

### Common Tasks

This section outlines routine tasks for managing and troubleshooting a Matrix server.

### Reconfigure and Send Ansible Restart

Reconfigures and restarts the Matrix server using Ansible. Ensure the middle server has SSH keys configured for accessing the Matrix server.

#### Primary

```bash
# Assumes command is executed from within the matrix-docker-ansible-deploy/ directory
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

#### Alternative

```bash
# Manually via SSH, assumes Tailscale is being used. Update absolute paths as necessary.
ssh root@irregularchat-matrix "ansible-playbook -i /root/Git/matrix-docker-ansible-deploy/inventory/hosts  /root/Git/matrix-docker-ansible-deploy/setup.yml --tags=setup-all,start &"
```

### Updating Ansible Server

Updates the Ansible server with the latest roles and configuration.

```bash
# From within the repository
sudo make roles
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

### Checking Logs

Check the logs of the Matrix Synapse service for troubleshooting.

```bash
systemctl status matrix-synapse.service
journalctl -fu matrix-synapse.service
```

### Check Matrix Federation

Verify federation by ensuring ports are open and listening.

```bash
sudo netstat -tuln | grep -E "8449|81"
```

### Restarting Services

Restart the Matrix Synapse service:

```bash
systemctl restart matrix-synapse.service
```

Alternatively, use Ansible to send a restart command.

## Issues and Answers

This section provides solutions to common Matrix server issues.

### Issue: SSO Issue – Can't Set Up Recovery Key Due to No Password

**Solution: Disabling Password Configuration**

Matrix Synapse's password configuration can be disabled to allow SSO accounts to configure and store recovery keys without a password. Update the configuration as follows:

```yaml
matrix_synapse_password_config_enabled: false
```

This allows SSO users to manage encryption keys and security phrases independently.

### Create Bot Access Tokens with SSO

To create bot access tokens using SSO:

1. Log in through the web interface.
2. Navigate to **Settings > About > Access Token** and copy the token.
3. Exit the browser page WITHOUT logging out.

### Issue: Can't Create Bot Access Tokens When Passwords Are Disabled

~~When passwords are disabled, bots cannot create access tokens or log in with access tokens.~~

~~To resolve this temporarily, update the configuration:~~

```yaml
matrix_synapse_password_config_enabled: true
```

~~Set the configuration to `true`, obtain the access token, and log in to the bot. Then, change the configuration back to `false`.~~
