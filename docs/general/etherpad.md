---
title: "Etherpad"
---

# Etherpad

## Why Etherpad
Return to [Guides](/server-guides/)

Etherpad is a highly customizable open-source online editor providing real-time collaborative editing. While it is not end-to-end encrypted, owning the infrastructure provides a great solution for everyday collaboration and is an excellent alternative to common services.

For a more advanced and secure option, [Cryptpad](https://cryptpad.org/) offers additional features and more than just a Wordpad-style service.

### Install Code
The following code sets up Etherpad:

## Setting up the environment

## Installing Etherpad

## Configuring a read database (MariaDB) instead of the development db

## Establishing SSL

  - Read Me**:
The script will prompt for the domain, subdomain, and SQL password. For security purposes, the SQL password will not display as you type.

```

#!/bin/bash
1. source: https://hub.docker.com/r/etherpad/etherpad
user_prompts(){
    echo "domain: "
    read -r domain
    echo "sub-domain: "
    read -r subdomain
    echo "SQL Password: "
    read -s -r sql_password
}
dependencies="certbot openssl nano nodejs"
etherpad_user_setup(){
    #source: https://www.howtoforge.com/how-to-install-the-etherpad-collaborative-web-editor-on-rocky-linux-8/#step-3---install-mariadb
    sudo adduser --system --home /opt/etherpad --create-home etherpad
    cd /opt/etherpad || exit
}
system_setup(){
    apt update
    # update system and make sure sudo is installed
    apt install -y sudo
    sudo apt update
    sudo apt upgrade
    # loop through all the required dependencies
    if [ -n "$dependencies" ];then
        for pkg in $dependencies;do
            echo "Installing $pkg"
            #install but don't spit out all the noise
            sudo apt install -y "$pkg" 2&>/dev/null
        done
    fi
    etherpad_user_setup
}
setup_git(){
    # assume location is /opt/etherpad
    # running install commands as newly created etherpad user
    sudo -H -u etherpad bash -c "cd /opt/etherpad || exit"
    sudo -H -u etherpad bash -c "curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -"
    sudo -H -u etherpad bash -c "git clone --branch master https://github.com/ether/etherpad-lite.git"
    sudo -H -u etherpad bash -c "cd etherpad-lite || exit"
    sudo -H -u etherpad bash -c "src/bin/run.sh"
    # create etherpad as a service
    echo "[Description=Etherpad, a collaborative web editor.
    After=syslog.target network.target
    [Service](Unit])
    Type=simple
    User=etherpad
    Group=etherpad
    WorkingDirectory=/opt/etherpad
    Environment=NODE_ENV=production
    ExecStart=/usr/bin/node --experimental-worker /opt/etherpad/etherpad-lite/node_modules/ep_etherpad-lite/node/server.js
    Restart=always
    [WantedBy=multi-user.target" | sudo tee -a /etc/systemd/system/etherpad.service

    sudo systemctl daemon-reload
    sudo systemctl enable etherpad --now
}
setup-mariadb(){
    sql_db_name="etherpad_lite_db"
    sql_user="etherpaduser"
    sudo apt install -y mariadb-server
    sudo systemctl enable mariadb --now
    sudo mariadb -e "CREATE DATABASE $sql_db_name DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;"
    sudo mariadb -e "CREATE USER '$sql_user'@'localhost' identified by '$sql_password';"
    sudo mariadb -e "GRANT ALL PRIVILEGES ON $sql_db_name.* TO '$sql_user'@'localhost' IDENTIFIED BY '$sql_password';"
    ##FIXME: remove dirty db
    #sed -i '/"dbType"/i \/' settings.json
    ##FIXME: configure settings
    #  "dbType" : "mysql",
    #  "dbSettings" : {
    #     "user":     "etherpaduser",
    #     "host":     "localhost",
    #     "port":     3306,
    #     "password": "$sql_password",
    #     "database": "$sql_db_name",
    #     "charset":  "utf8mb4"
    #  },
    #FIXME
    #  "trustProxy": true,
    #sed -i '/"trustProxy"/s/false/true' settings.json
}
setup_ssl(){
    sudo mkdir -p /var/lib/letsencrypt
    sudo certbot certonly --standalone --agree-tos --preferred-challenges http -m ssl@"$domain" -d "$subdomain"."$domain"
    # cert is saved to /etc/letsencrypt/live/$domain
    sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
    #create a renew cron
    echo "#!/bin/sh
certbot renew --cert-name $domain --webroot -w /var/lib/letsencrypt/ --post-hook
systemctl reload nginx
"| sudo tee -a /etc/cron.daily/certbot-renew
    sudo chmod +x /etc/cron.daily/certbot-renew
}
main(){
    user_prompts
    system_setup
    setup_git
    setup-mariadb
    setup_ssl
    #set node to production
    export NODE_ENV=production
    systemctl start etherpad
}
main

```

For further information, visit the official [Etherpad site](https://etherpad.org/) or [Docker Hub for Etherpad](https://hub.docker.com/r/etherpad/etherpad).
[Tools]
