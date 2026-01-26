---
title: "Configuring Gitlab"
---

# Configuring Gitlab

see https://docs.gitlab.com/ee/install/docker.html#configuration

```shell
export GITLAB_HOME=/home/gitlab
```

### Reconfigure Commands
After changes to the `/etc/gitlab/gitlab.rb` file run:

```shell
docker exec -it gitlab /bin/bash
```
or directly edit

```shell
sudo docker exec -it gitlab editor /etc/gitlab/gitlab.rb
```
```shell
sudo docker exec -it gitlab-ctl reconfigure
```
```
gitlab_rails[= true gitlab_rails['smtp_address']('smtp_enable']) = &quot;smtp.server&quot; gitlab_rails[= 465 gitlab_rails['smtp_user_name']('smtp_port']) = &quot;smtp user&quot; gitlab_rails[= &quot;smtp password&quot; gitlab_rails['smtp_domain']('smtp_password']) = &quot;example.com&quot; gitlab_rails[= &quot;login&quot; gitlab_rails['smtp_enable_starttls_auto']('smtp_authentication']) = true gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
```
