---
title: "SSH Keys"
---

# SSH Keys

## SSH Keys

### What They Are
SSH keys are a pair of cryptographic keys used for secure access to systems over a network. They consist of a public key, which is shared, and a private key, which is kept secret. SSH keys provide a more secure and convenient way to authenticate than traditional passwords.

### Difference Between SSH and GPG Keys

- **SSH Keys**: Used primarily for secure authentication to servers and services. They provide access control and secure communication.

- **GPG Keys**: Used for encrypting, decrypting, and signing emails and files. GPG keys provide data integrity and authenticity.

**Always remember NEVER share your PRIVATE keys**

### Key Type Comparison
**Recommendation** -

- **Best for security and performance**: **ssh-ed25519**
  - **Strengths**: Very strong security, small key size, fast performance.
  - **Weaknesses**: Newer, less universally supported (but rapidly growing).
  - **Use case**: Best for strong security and performance where supported.

- **ssh-rsa** (Most Compatible)
  - **Strengths**: Widely supported, highly compatible.
  - **Weaknesses**: Requires larger keys for equivalent security, slower performance.
  - **Use case**: Best for broad compatibility.

- **ecdsa-sha2-nistp256**, **ecdsa-sha2-nistp384**, **ecdsa-sha2-nistp521**
  - **Strengths**: Strong security with smaller key sizes, better performance.
  - **Weaknesses**: Potentially weaker NIST curves, less compatibility.
  - **Use case**: Good for strong security and performance where compatibility is less critical.

- **ssh-dss** (Don’t Use)
  - **Strengths**: Early standard.
  - **Weaknesses**: Limited to 1024-bit keys, weaker security, often deprecated.
  - **Use case**: Not recommended.

### Creating Your Keys

### Terminal
To generate an SSH key using the terminal, use the following command:

**Most Secure Keys**

```

ssh-keygen -t ssh-ed25519 -C "your_email@example.com"

```

**Advanced ED25519 Command**

```

ssh-keygen -t ed25519 -C "username@example.com" -f ~/.ssh/username_id_ed25519 -N "your_passphrase"

```

**Compatible and Secure**

```

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

```

Follow the prompts to save the key, typically in `~/.ssh/id_rsa`.


### GUI
Tools like [PuTTYgen](https://www.puttygen.com/) for Windows or [Keychain Access](https://support.apple.com/guide/keychain-access/welcome/mac) for macOS can be used to generate SSH keys using a graphical interface.

### Using Your Keys

### Using to SSH
To use your SSH key for connecting to a server, add your public key to the `~/.ssh/authorized_keys` file on the server:

```

ssh-add ~/.ssh/username_id_ed25519

```

After this, you can log in to the server (remote) with `ssh username@host.tld`. If you are prompted for your PIN, it is the PIN you created when generating your SSH keys.

You may also SSH directly to a server without adding your SSH key to the server’s `~/.ssh/authorized_keys` file:

```

ssh -i ~/.ssh/username_id_ed25519 username@hostname

```


### Using with Git

#### Private Repos
To use your SSH key with private Git repositories, add the key to your SSH agent and configure the repository URL to use SSH:

```

ssh-add ~/.ssh/username_id_ed25519
git remote set-url origin git@github.com:username/repo.git

```


#### Using to Sign Git Commits
To sign Git commits with your SSH key, configure Git to use the key:

```

git config --global user.signingkey <your-key-id>
git config --global commit.gpgSign true

```


### Using GPG Keys for SSH Authentication

#### Generating a GPG Key Pair
If you don’t already have a GPG key pair, generate one:

```

gpg --full-generate-key

```

Follow the prompts to create your key pair.


#### Enabling SSH Support in GPG
Edit or create the `~/.gnupg/gpg-agent.conf` file to include the following line:

```

enable-ssh-support

```


#### Starting the GPG Agent
Start or reload the GPG agent:

```

gpg-connect-agent updatestartuptty /bye

```


#### Extracting the SSH Public Key from Your GPG Key
Use the following command to extract the SSH public key from your GPG key:

```

ssh-add -L

```

If the key is not listed, you can add it manually:

```

gpg --export-ssh-key <your-gpg-key-id>

```

Replace `&lt;your-gpg-key-id&gt;` with your actual GPG key ID.


#### Adding the Public Key to Your `authorized_keys` on the Remote Server
Copy the extracted public key and add it to the `~/.ssh/authorized_keys` file on the remote server.


#### Configuring Your Shell to Use the GPG Agent for SSH
Ensure your SSH client is configured to use the GPG agent by adding the following to your `~/.bashrc` or `~/.zshrc`:

```

export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)

```

Reload your shell configuration:

```

source ~/.bashrc  ## or source ~/.zshrc

```

By following these steps, you can use your GPG key for SSH authentication, leveraging the benefits of GPG key management.

### Securely Storing Your Keys

### SSH Agent
Use `ssh-agent` to manage your keys and avoid entering the passphrase multiple times:

```

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/username_id_ed25519

```


### KeyPassXC
[KeyPassXC](https://keepassxc.org/) is a cross-platform password manager that can securely store your SSH keys.

When configuring your .ssh/config file you may want to pass the IdentityFile directive to a host to ensure that the ssh agent only uses a specific key to connect to a host. This directive requires you to provide the path to your key file. When we add an ssh key to the KeePassXC agent we are deleting the file from our filesystem in order to protect it which conflicts with this. The solution is to pass the .pub public key file for your host to the IdentityFile instead of the private key. you can generate a key as described in the above sections. Add that key to your keepassxc agent to protect it and then keep the public key in your .ssh/ directory. This will allow you to set your .ssh/config to use a key that is only available in the agent.

```

Host git.example.com
  Hostname git.example.com
  Port 22
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/mygitkey.pub

```

### References

- [OpenSSH](https://www.openssh.com/)

- [PuTTYgen](https://www.puttygen.com/)

- [Keychain Access](https://support.apple.com/guide/keychain-access/welcome/mac)

- [KeyPassXC](https://keepassxc.org/)
