---
title: "NextCloud Terminal Commands"
---

# NextCloud Terminal Commands

Return to [server-guides](/server-guides/)

### Nextcloud

### How to run `occ` commands?
Run the following: `sudo docker exec --user www-data -it nextcloud-aio-nextcloud php occ your-command`. Of course, `your-command` needs to be exchanged with the command you want to run.


### Reset Password
sudo docker exec –user www-data -it nextcloud-aio-nextcloud php occ user:resetpassword admin


### Brute-force protection FAQ - Enable User, WhiteList IP
Nextcloud features built-in brute-force protection that may get triggered, block an IP address, or disable a user.

You can unblock an ip-address by running

```shell
sudo docker exec --user www-data -it nextcloud-aio-nextcloud php occ security:bruteforce:reset <ip-address>
```
enable a disabled user by running

```shell
sudo docker exec --user www-data -it nextcloud-aio-nextcloud php occ user:enable <name of user>
```
See https://docs.nextcloud.com/server/latest/admin_manual/configuration_server/occ_command.html#security for further information.
