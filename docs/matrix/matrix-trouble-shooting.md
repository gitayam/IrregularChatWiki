---
title: "Matrix Trouble Shooting"
---

# Matrix Trouble Shooting

### Federation Issues

- [Check Federation](https://federationtester.matrix.org)

- [Matrix Federation Documentation](https://spec.matrix.org/v1.6/server-server-api/#server-discovery)

### Common Tasks

### Reconfigure and send Ansible Restart.
Sends the ansible command with absolute paths. This requires the middle server to have ssh keys to the matrix server.


#### Primary
```shell
# assumes command is executed from within the matrix-docker-ansible-deploy/ dir
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

#### Alternative
```shell
# manually via ssh, this assumes tailscale is being used and the absolute paths are as follows on the proxmox server. This should be the Alternative method
ssh root@irregularchat-matrix "ansible-playbook -i /root/Git/matrix-docker-ansible-deploy/inventory/hosts  /root/Git/matrix-docker-ansible-deploy/setup.yml --tags=setup-all,start&"
```

### Updating Ansible Server
```shell
#from in the repository
sudo make roles
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start
```

### Checking Logs
```shell
systemctl status matrix-synapse.service
```
```shell
journalctl -fu matrix-synapse.service
```

### Check Matrix Federation
```shell
sudo netstat -tuln | grep -E "8449|81"
```

### Restarting Services
```shell
systemctl restart matrix-synapse.service
```
or using Ansible, you may want to send a restart

***

### Issues and Answers

### Issue: SSO Issue can’t set up recover key because no password

#### Solution: Disabling Password Configuration
Matrix Synapse’s password configuration can be disabled to allow SSO accounts to configure and store security keys and phrases without a password. This adjustment removes the reliance on a password for security settings, enabling SSO users to manage their encryption keys and security phrases independently.

The specific configuration change in Matrix Synapse is:

```yaml
matrix_synapse_password_config_enabled: false
```

### Issue: Can’t create BOT access tokens when passwords are disabled.
When passwords are disabled, bots can’t create access tokens or log in with access tokens.

```yaml
matrix_synapse_password_config_enabled: true
```
Set the config to true obtain the access token AND log in to the bot as needed. Then, change the config to false.
