---
title: "Managing Matrix"
---

# Managing Matrix

### Synapse Management
[source](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/8051fd7012c7ce5b97b53e345dda0b61f866a689/docs/configuring-playbook-synapse-admin.md)

```yaml
matrix_synapse_admin_enabled: true
```
After installation, Synapse Admin will be accessible at:  https://matrix.irregularchat.com/synapse-admin/ ## Starting Matrix

### Updating Matrix

### Upgrading Ansible Script
This is important to do as this accounts for all upgrades to services and dependancies but also for improvements in the script and matrix.


### Primary Option - Upgrade

### Secondary Option - Upgrade
NOTE: After upgrading you’ll want to run the following command AFTER upgrading the git repo, for more information see [Trouble Shooting](/matrix/matrix-troubleshooting)

```shell
sudo make roles
ansible-playbook -i inventory/hosts setup.yml --tags=start
```

### Migrating Matrix

### Trouble Shooting Matrix
[Trouble Shooting](/matrix/matrix-troubleshooting) ### Federation https://federationtester.matrix.org/
