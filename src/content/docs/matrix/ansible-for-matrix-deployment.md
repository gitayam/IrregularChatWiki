---
title: "Ansible for Matrix Deployment"
---

# Ansible for Matrix Deployment

## Installing Ansible for Matrix Deployment
Return to [Guides](/server-guides/).

If you are installing on an LXC, see the [Linux Container LXC Setup](/server-guides/proxmox-linux-container-lxc-setup) guide first. Set DNS using the [DNS Guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-dns.md).

### Steps

### Install Ansible
Refer to the official [Ansible Installation Guide](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-ubuntu).

```

wget -qO - 'https://proget.makedeb.org/debian-feeds/prebuilt-mpr.pub' | gpg --dearmor | sudo tee /usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg 1> /dev/null
echo "deb [signed-by=/usr/share/keyrings/prebuilt-mpr-archive-keyring.gpg](arch=amd64) https://proget.makedeb.org prebuilt-mpr $(lsb_release -cs)" | sudo tee /etc/apt/sources.list.d/prebuilt-mpr.list
sudo apt update

sudo apt install just

sudo apt install -y python3-pip # Install pip
python3 -m pip install --user ansible # Use pip to install Ansible
pip install passlib

```

### Running Ansible
After DNS is fully configured and ready:

```

make roles
ansible-playbook -i inventory/hosts setup.yml --tags=setup-all,start

```

### Vars Creation
```

echo "domain.tld: matrix."
read domain
echo "remote IP address: "
read remote_ip
git clone https://github.com/spantaleev/matrix-docker-ansible-deploy.git
cd ./matrix-docker-ansible-deploy
mkdir inventory/host_vars/matrix.$domain
cp examples/vars.yml inventory/host_vars/matrix.$domain/vars.yml
cp examples/hosts inventory/hosts
sed 's/YOUR_BARE_DOMAIN_NAME_HERE/$domain/g' inventory/host_vars/matrix.$domain/vars.yml

```

### VARS Configuration
```

sed 's/synapse/dendrite/' inventory/host_vars/matrix.$domain/vars.yml

```

### References

- [Ansible Installation Documentation](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-ubuntu)

- [Matrix Docker Ansible Deploy Repository](https://github.com/spantaleev/matrix-docker-ansible-deploy)

- [DNS Guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-dns.md)
