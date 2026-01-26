---
title: "Matrix-accounts"
---

# Matrix-accounts

## Matrix Account Management
For comprehensive details, refer to the official documentation:

- [Registering Users Guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/registering-users.md)

- [Obtaining Access Tokens Guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/9f5d4018c7deff00e29d9b5846b9de028f1bc084/docs/obtaining-access-tokens.md)

### Create Account
To create a new Matrix user account with Ansible, use the following command:

```

ansible-playbook -i inventory/hosts setup.yml --extra-vars='username=usernamehere password=changemenowplease admin=yes' --tags=register-user

```

- Replace `usernamehere` with the desired username.

- Replace `changemenowplease` with a strong, unique password.

- Add `admin=yes` if the account should have administrative privileges.

### Access Token
To obtain an access token for a Matrix user, follow this process:

```

curl -XPOST -d '{
    "identifier": { "type": "m.id.user", "user": "USERNAME" },
    "password": "PASSWORD",
    "type": "m.login.password",
    "device_id": "YOURDEVICEID"
}' 'https://matrix.YOURDOMAIN/_matrix/client/r0/login'

```

- Replace `USERNAME` with the Matrix username.

- Replace `PASSWORD` with the user's password.

- Replace `YOURDEVICEID` with the desired device ID (optional).

- Replace `YOURDOMAIN` with your Matrix server's domain name.

The response will include the access token, which can be used for authentication in scripts or bots.
